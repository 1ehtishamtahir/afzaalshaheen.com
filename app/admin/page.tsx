'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('hero');

  // Check auth & fetch content
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      if (res.ok) {
        setAuthenticated(true);
        fetchContent();
      } else {
        setAuthenticated(false);
      }
    } catch {
      setAuthenticated(false);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      } else {
        setError('Failed to fetch site content');
      }
    } catch {
      setError('Connection failed');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthenticated(true);
        fetchContent();
      } else {
        const data = await res.json();
        setError(data.error || 'Authentication failed');
      }
    } catch {
      setError('Connection failed');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSuccess('Content updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save content');
      }
    } catch {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, pathParts: string[]) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        
        // Dynamically update nested content object
        setContent((prev: any) => {
          const next = { ...prev };
          let current = next;
          for (let i = 0; i < pathParts.length - 1; i++) {
            current = current[pathParts[i]];
          }
          current[pathParts[pathParts.length - 1]] = data.filePath;
          return next;
        });
        setSuccess('Image uploaded and updated!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to upload image');
      }
    } catch {
      setError('Upload request failed');
    }
  };

  const addListItem = (key: string, template: any) => {
    const updated = [...(content[key] || []), { ...template, id: Date.now() }];
    setContent({ ...content, [key]: updated });
  };

  const removeListItem = (key: string, index: number) => {
    const updated = (content[key] || []).filter((_: any, i: number) => i !== index);
    setContent({ ...content, [key]: updated });
  };

  const addFabricBlock = () => {
    const updated = { ...content.fabricStory };
    updated.blocks = [...updated.blocks, { eyebrow: ' The Studio ', title: 'New Story Block', body: 'Block copy here.' }];
    setContent({ ...content, fabricStory: updated });
  };

  const removeFabricBlock = (index: number) => {
    const updated = { ...content.fabricStory };
    updated.blocks = updated.blocks.filter((_: any, i: number) => i !== index);
    setContent({ ...content, fabricStory: updated });
  };

  const addPolicyLink = () => {
    setContent({ ...content, footer: { ...content.footer, policyLinks: [...(content.footer.policyLinks || []), 'New Policy Link'] } });
  };

  const removePolicyLink = (index: number) => {
    const policyLinks = (content.footer.policyLinks || []).filter((_: string, i: number) => i !== index);
    setContent({ ...content, footer: { ...content.footer, policyLinks } });
  };

  // Login UI
  if (authenticated === false) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0e100f', color: '#fffce1', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ maxWidth: 400, width: '100%', padding: 40, border: '1px solid #42433d', borderRadius: 8, backgroundColor: '#191919' }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, textTransform: 'uppercase', marginBottom: 24, textAlign: 'center' }}>Admin Access</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '12px 20px', borderRadius: 100, border: '1px solid #42433d', backgroundColor: '#0e100f', color: '#fffce1', outline: 'none' }}
              required
            />
            {error && <p style={{ color: '#e8c88f', fontSize: 13, textAlign: 'center', margin: 0 }}>{error}</p>}
            <button type="submit" className="btn-gradient-pill" style={{ padding: '12px 20px', fontSize: 14 }}>
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0e100f', color: '#fffce1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading site configuration...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0e100f', color: '#fffce1', padding: 48 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, borderBottom: '1px solid #42433d', paddingBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 600, textTransform: 'uppercase', margin: 0 }}>CMS Dashboard</h1>
            <p style={{ fontSize: 13, color: '#7c7c6f', margin: '4px 0 0' }}>Manage homepage text and media assets</p>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {success && <span style={{ color: '#fffce1', fontSize: 14 }}>{success}</span>}
            {error && <span style={{ color: '#e8c88f', fontSize: 14 }}>{error}</span>}
            <button
              onClick={handleSave}
              className="btn-gradient-pill"
              style={{ padding: '10px 24px', fontSize: 14 }}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, borderBottom: '1px solid #42433d', paddingBottom: 8, overflowX: 'auto' }}>
          {['hero', 'studio', 'collections', 'products', 'fabric', 'lookbook', 'trust', 'newsletter', 'social', 'footer', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                background: 'none',
                border: 'none',
                color: activeTab === tab ? '#fffce1' : '#7c7c6f',
                fontSize: 14,
                fontWeight: activeTab === tab ? 600 : 400,
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '2px solid #b08d57' : 'none',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div style={{ backgroundColor: '#191919', padding: 32, borderRadius: 8, border: '1px solid #42433d' }}>
          
          {/* HERO */}
          {activeTab === 'hero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>Hero Section</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, color: '#7c7c6f' }}>Eyebrow Accent</label>
                  <input
                    type="text"
                    value={content.hero.eyebrow}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, eyebrow: e.target.value } })}
                    style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, color: '#7c7c6f' }}>CTA Button Text</label>
                  <input
                    type="text"
                    value={content.hero.ctaText}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaText: e.target.value } })}
                    style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, color: '#7c7c6f' }}>Heading Line 1</label>
                  <input
                    type="text"
                    value={content.hero.line1}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, line1: e.target.value } })}
                    style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, color: '#7c7c6f' }}>Heading Line 2</label>
                  <input
                    type="text"
                    value={content.hero.line2}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, line2: e.target.value } })}
                    style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#7c7c6f' }}>Subheading Copy</label>
                <textarea
                  rows={3}
                  value={content.hero.subheading}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, subheading: e.target.value } })}
                  style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', resize: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#7c7c6f' }}>Background Image (Recommended Size: 1920x1200 WebP/JPG)</label>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <input
                    type="text"
                    value={content.hero.bgImage}
                    readOnly
                    style={{ flex: 1, padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#7c7c6f' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, ['hero', 'bgImage'])}
                    style={{ display: 'none' }}
                    id="hero-bg-upload"
                  />
                  <label htmlFor="hero-bg-upload" className="btn-ghost-pill" style={{ padding: '10px 20px', fontSize: 13 }}>
                    Upload File
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STUDIO */}
          {activeTab === 'studio' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>Studio Section</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#7c7c6f' }}>Eyebrow Annotation</label>
                <input
                  type="text"
                  value={content.brandStatement.eyebrow}
                  onChange={(e) => setContent({ ...content, brandStatement: { ...content.brandStatement, eyebrow: e.target.value } })}
                  style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#7c7c6f' }}>Brand Statement Copy</label>
                <textarea
                  rows={4}
                  value={content.brandStatement.text}
                  onChange={(e) => setContent({ ...content, brandStatement: { ...content.brandStatement, text: e.target.value } })}
                  style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', resize: 'none' }}
                />
              </div>
            </div>
          )}

          {/* COLLECTIONS */}
          {activeTab === 'collections' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>Featured Collections</h3>
                <button
                  className="btn-ghost-pill"
                  style={{ padding: '8px 16px', fontSize: 12 }}
                  onClick={() => addListItem('collections', { title: 'New Collection', subtitle: 'Subtitle copy here.', href: '#', image: '', paddingTop: 0 })}
                >
                  + Add Collection
                </button>
              </div>
              {content.collections.map((col: any, index: number) => (
                <div key={col.id} style={{ border: '1px solid #42433d', padding: 24, borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, textTransform: 'uppercase', color: '#b08d57' }}>Collection Item #{index + 1}</h4>
                    <button
                      onClick={() => removeListItem('collections', index)}
                      style={{ padding: '6px 14px', fontSize: 12, background: 'none', border: '1px solid #7c7c6f', borderRadius: 100, color: '#7c7c6f', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 13, color: '#7c7c6f' }}>Title</label>
                      <input
                        type="text"
                        value={col.title}
                        onChange={(e) => {
                          const updated = [...content.collections];
                          updated[index].title = e.target.value;
                          setContent({ ...content, collections: updated });
                        }}
                        style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 13, color: '#7c7c6f' }}>Subtitle</label>
                      <input
                        type="text"
                        value={col.subtitle}
                        onChange={(e) => {
                          const updated = [...content.collections];
                          updated[index].subtitle = e.target.value;
                          setContent({ ...content, collections: updated });
                        }}
                        style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 13, color: '#7c7c6f' }}>Featured Image (Recommended Size: 900x1200 WebP/JPG)</label>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <input
                        type="text"
                        value={col.image}
                        readOnly
                        style={{ flex: 1, padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#7c7c6f' }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, ['collections', String(index), 'image'])}
                        style={{ display: 'none' }}
                        id={`coll-upload-${index}`}
                      />
                      <label htmlFor={`coll-upload-${index}`} className="btn-ghost-pill" style={{ padding: '10px 20px', fontSize: 13 }}>
                        Upload File
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRODUCTS */}
          {activeTab === 'products' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>New Arrivals (8 Product Grid)</h3>
                <button
                  className="btn-ghost-pill"
                  style={{ padding: '8px 16px', fontSize: 12 }}
                  onClick={() => addListItem('newArrivals', { name: 'New Product', price: 'PKR 0000-0000', image: '' })}
                >
                  + Add Product
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {content.newArrivals.map((product: any, index: number) => (
                  <div key={product.id} style={{ border: '1px solid #42433d', padding: 20, borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, textTransform: 'uppercase', color: '#b08d57', fontSize: 14 }}>Product #{index + 1}</h4>
                      <button
                        onClick={() => removeListItem('newArrivals', index)}
                        style={{ padding: '4px 12px', fontSize: 11, background: 'none', border: '1px solid #7c7c6f', borderRadius: 100, color: '#7c7c6f', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label style={{ fontSize: 12, color: '#7c7c6f' }}>Product Name</label>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => {
                            const updated = [...content.newArrivals];
                            updated[index].name = e.target.value;
                            setContent({ ...content, newArrivals: updated });
                          }}
                          style={{ padding: 10, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', fontSize: 13 }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <label style={{ fontSize: 12, color: '#7c7c6f' }}>Price</label>
                        <input
                          type="text"
                          value={product.price}
                          onChange={(e) => {
                            const updated = [...content.newArrivals];
                            updated[index].price = e.target.value;
                            setContent({ ...content, newArrivals: updated });
                          }}
                          style={{ padding: 10, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', fontSize: 13 }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 12, color: '#7c7c6f' }}>Image (Recommended Size: 600x800 WebP/JPG)</label>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <input
                          type="text"
                          value={product.image}
                          readOnly
                          style={{ flex: 1, padding: 10, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#7c7c6f', fontSize: 12 }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, ['newArrivals', String(index), 'image'])}
                          style={{ display: 'none' }}
                          id={`product-upload-${index}`}
                        />
                        <label htmlFor={`product-upload-${index}`} className="btn-ghost-pill" style={{ padding: '8px 16px', fontSize: 12 }}>
                          Upload
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FABRIC */}
          {activeTab === 'fabric' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>Fabric Story</h3>
                <button
                  className="btn-ghost-pill"
                  style={{ padding: '8px 16px', fontSize: 12 }}
                  onClick={addFabricBlock}
                >
                  + Add Block
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#7c7c6f' }}>Featured Image (Recommended Size: 900x1200 WebP/JPG)</label>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <input
                    type="text"
                    value={content.fabricStory.bgImage}
                    readOnly
                    style={{ flex: 1, padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#7c7c6f' }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, ['fabricStory', 'bgImage'])}
                    style={{ display: 'none' }}
                    id="fabric-bg-upload"
                  />
                  <label htmlFor="fabric-bg-upload" className="btn-ghost-pill" style={{ padding: '10px 20px', fontSize: 13 }}>
                    Upload File
                  </label>
                </div>
              </div>

              {content.fabricStory.blocks.map((block: any, index: number) => (
                <div key={index} style={{ border: '1px solid #42433d', padding: 24, borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, textTransform: 'uppercase', color: '#b08d57' }}>Story Block #{index + 1}</h4>
                    <button
                      onClick={() => removeFabricBlock(index)}
                      style={{ padding: '6px 14px', fontSize: 12, background: 'none', border: '1px solid #7c7c6f', borderRadius: 100, color: '#7c7c6f', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 13, color: '#7c7c6f' }}>Eyebrow</label>
                      <input
                        type="text"
                        value={block.eyebrow}
                        onChange={(e) => {
                          const updated = { ...content.fabricStory };
                          updated.blocks[index].eyebrow = e.target.value;
                          setContent({ ...content, fabricStory: updated });
                        }}
                        style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: 13, color: '#7c7c6f' }}>Title</label>
                      <input
                        type="text"
                        value={block.title}
                        onChange={(e) => {
                          const updated = { ...content.fabricStory };
                          updated.blocks[index].title = e.target.value;
                          setContent({ ...content, fabricStory: updated });
                        }}
                        style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <label style={{ fontSize: 13, color: '#7c7c6f' }}>Body Copy</label>
                    <textarea
                      rows={3}
                      value={block.body}
                      onChange={(e) => {
                        const updated = { ...content.fabricStory };
                        updated.blocks[index].body = e.target.value;
                        setContent({ ...content, fabricStory: updated });
                      }}
                      style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', resize: 'none' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LOOKBOOK */}
          {activeTab === 'lookbook' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>Masonry Lookbook (6 Images)</h3>
                <button
                  className="btn-ghost-pill"
                  style={{ padding: '8px 16px', fontSize: 12 }}
                  onClick={() => addListItem('lookbook', { src: '', alt: 'Premium menswear look', tall: false })}
                >
                  + Add Image
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {content.lookbook.map((img: any, index: number) => (
                  <div key={img.id} style={{ border: '1px solid #42433d', padding: 20, borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0, textTransform: 'uppercase', color: '#b08d57', fontSize: 14 }}>Image Slot #{index + 1} ({img.tall ? 'Tall' : 'Wide'})</h4>
                      <button
                        onClick={() => removeListItem('lookbook', index)}
                        style={{ padding: '4px 12px', fontSize: 11, background: 'none', border: '1px solid #7c7c6f', borderRadius: 100, color: '#7c7c6f', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 12, color: '#7c7c6f' }}>Alt Description</label>
                      <input
                        type="text"
                        value={img.alt}
                        onChange={(e) => {
                          const updated = [...content.lookbook];
                          updated[index].alt = e.target.value;
                          setContent({ ...content, lookbook: updated });
                        }}
                        style={{ padding: 10, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', fontSize: 13 }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 12, color: '#7c7c6f' }}>Image File (Tall: 800x1200, Wide: 1200x900)</label>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <input
                          type="text"
                          value={img.src}
                          readOnly
                          style={{ flex: 1, padding: 10, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#7c7c6f', fontSize: 12 }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, ['lookbook', String(index), 'src'])}
                          style={{ display: 'none' }}
                          id={`lookbook-upload-${index}`}
                        />
                        <label htmlFor={`lookbook-upload-${index}`} className="btn-ghost-pill" style={{ padding: '8px 16px', fontSize: 12 }}>
                          Upload
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRUST */}
          {activeTab === 'trust' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>Trust Badges</h3>
                <button
                  className="btn-ghost-pill"
                  style={{ padding: '8px 16px', fontSize: 12 }}
                  onClick={() => addListItem('trustStrip', { title: 'New Badge', body: 'Badge description here.' })}
                >
                  + Add Badge
                </button>
              </div>
              {content.trustStrip.map((item: any, index: number) => (
                <div key={index} style={{ border: '1px solid #42433d', padding: 20, borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, textTransform: 'uppercase', color: '#b08d57', fontSize: 14 }}>Badge #{index + 1}</h4>
                    <button
                      onClick={() => removeListItem('trustStrip', index)}
                      style={{ padding: '4px 12px', fontSize: 11, background: 'none', border: '1px solid #7c7c6f', borderRadius: 100, color: '#7c7c6f', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 12, color: '#7c7c6f' }}>Badge Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...content.trustStrip];
                        updated[index].title = e.target.value;
                        setContent({ ...content, trustStrip: updated });
                      }}
                      style={{ padding: 10, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', fontSize: 13 }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 12, color: '#7c7c6f' }}>Description Text</label>
                    <input
                      type="text"
                      value={item.body}
                      onChange={(e) => {
                        const updated = [...content.trustStrip];
                        updated[index].body = e.target.value;
                        setContent({ ...content, trustStrip: updated });
                      }}
                      style={{ padding: 10, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', fontSize: 13 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NEWSLETTER */}
          {activeTab === 'newsletter' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>Newsletter Banner</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, color: '#7c7c6f' }}>Eyebrow Text</label>
                  <input
                    type="text"
                    value={content.newsletter.eyebrow}
                    onChange={(e) => setContent({ ...content, newsletter: { ...content.newsletter, eyebrow: e.target.value } })}
                    style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, color: '#7c7c6f' }}>Banner Title</label>
                  <input
                    type="text"
                    value={content.newsletter.title}
                    onChange={(e) => setContent({ ...content, newsletter: { ...content.newsletter, title: e.target.value } })}
                    style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#7c7c6f' }}>Description Copy</label>
                <textarea
                  rows={3}
                  value={content.newsletter.body}
                  onChange={(e) => setContent({ ...content, newsletter: { ...content.newsletter, body: e.target.value } })}
                  style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', resize: 'none' }}
                />
              </div>
            </div>
          )}

          {/* SOCIAL */}
          {activeTab === 'social' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>Social Media Links</h3>
                <button
                  className="btn-ghost-pill"
                  style={{ padding: '8px 16px', fontSize: 12 }}
                  onClick={() => addListItem('socialLinks', { label: 'New Platform', href: 'https://' })}
                >
                  + Add Platform
                </button>
              </div>
              <p style={{ fontSize: 13, color: '#7c7c6f', margin: 0 }}>
                These appear in the footer "Follow" column. Paste the full profile URLs, e.g. https://instagram.com/yourhandle
              </p>
              {content.socialLinks.map((link: any, index: number) => (
                <div key={index} style={{ border: '1px solid #42433d', padding: 20, borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, textTransform: 'uppercase', color: '#b08d57', fontSize: 14 }}>Platform #{index + 1}</h4>
                    <button
                      onClick={() => removeListItem('socialLinks', index)}
                      style={{ padding: '4px 12px', fontSize: 11, background: 'none', border: '1px solid #7c7c6f', borderRadius: 100, color: '#7c7c6f', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 12, color: '#7c7c6f' }}>Platform Label</label>
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => {
                          const updated = [...content.socialLinks];
                          updated[index].label = e.target.value;
                          setContent({ ...content, socialLinks: updated });
                        }}
                        style={{ padding: 10, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', fontSize: 13 }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 12, color: '#7c7c6f' }}>Profile URL</label>
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => {
                          const updated = [...content.socialLinks];
                          updated[index].href = e.target.value;
                          setContent({ ...content, socialLinks: updated });
                        }}
                        style={{ padding: 10, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', fontSize: 13 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FOOTER */}
          {activeTab === 'footer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>Footer Content</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#7c7c6f' }}>Brand Description</label>
                <textarea
                  rows={3}
                  value={content.footer.brandText}
                  onChange={(e) => setContent({ ...content, footer: { ...content.footer, brandText: e.target.value } })}
                  style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', resize: 'none' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#7c7c6f' }}>Copyright Line (shown after the year)</label>
                <input
                  type="text"
                  value={content.footer.copyright}
                  onChange={(e) => setContent({ ...content, footer: { ...content.footer, copyright: e.target.value } })}
                  style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: 13, color: '#7c7c6f' }}>Bottom Policy Links</label>
                  <button
                    className="btn-ghost-pill"
                    style={{ padding: '6px 14px', fontSize: 11 }}
                    onClick={addPolicyLink}
                  >
                    + Add Link
                  </button>
                </div>
                {content.footer.policyLinks.map((item: string, index: number) => (
                  <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const policyLinks = [...content.footer.policyLinks];
                        policyLinks[index] = e.target.value;
                        setContent({ ...content, footer: { ...content.footer, policyLinks } });
                      }}
                      style={{ flex: 1, padding: 10, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1', fontSize: 13 }}
                    />
                    <button
                      onClick={() => removePolicyLink(index)}
                      style={{ padding: '6px 12px', fontSize: 11, background: 'none', border: '1px solid #7c7c6f', borderRadius: 100, color: '#7c7c6f', cursor: 'pointer', whiteSpace: 'nowrap' }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT */}
          {activeTab === 'contact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h3 style={{ margin: 0, textTransform: 'uppercase', fontSize: 18 }}>Contact Information</h3>
              <p style={{ fontSize: 13, color: '#7c7c6f', margin: 0 }}>
                Displayed in the footer "Contact" column.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, color: '#7c7c6f' }}>Phone</label>
                  <input
                    type="text"
                    value={content.contact.phone}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
                    style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ fontSize: 13, color: '#7c7c6f' }}>Email</label>
                  <input
                    type="text"
                    value={content.contact.email}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                    style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#7c7c6f' }}>Address</label>
                <input
                  type="text"
                  value={content.contact.address}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })}
                  style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label style={{ fontSize: 13, color: '#7c7c6f' }}>WhatsApp Link (full wa.me URL)</label>
                <input
                  type="text"
                  value={content.contact.whatsapp}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, whatsapp: e.target.value } })}
                  style={{ padding: 12, backgroundColor: '#0e100f', border: '1px solid #42433d', borderRadius: 4, color: '#fffce1' }}
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
