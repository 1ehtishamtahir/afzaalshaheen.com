import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cookies } from 'next/headers';

const contentFilePath = path.join(process.cwd(), 'data', 'site-content.json');

export async function GET() {
  try {
    if (!fs.existsSync(contentFilePath)) {
      return NextResponse.json({ error: 'Content file not found' }, { status: 404 });
    }
    const rawData = fs.readFileSync(contentFilePath, 'utf8');
    const data = JSON.parse(rawData);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to read content data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Validate session cookie using cookies()
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updatedData = await request.json();
    
    // Ensure the data directory exists
    const dirPath = path.dirname(contentFilePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Write back to file
    fs.writeFileSync(contentFilePath, JSON.stringify(updatedData, null, 2), 'utf8');
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save content data' }, { status: 500 });
  }
}
