import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Validate session cookie using cookies()
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate clean filename
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}_${sanitizedFilename}`;

    // Target upload path
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, new Uint8Array(buffer));

    // Return the public-facing URL
    return NextResponse.json({ filePath: `/images/uploads/${filename}` });
  } catch {
    return NextResponse.json({ error: 'Failed to upload image file' }, { status: 500 });
  }
}
