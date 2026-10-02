import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'save-photo-api',
        configureServer(server) {
          server.middlewares.use('/images', (req, res, next) => {
            const cleanUrl = (req.url || '').split('?')[0].replace(/^\//, '');
            const filePath = path.resolve(__dirname, 'public/images', cleanUrl);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeTypes: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.webp': 'image/webp',
                '.gif': 'image/gif',
              };
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
              res.setHeader('Cache-Control', 'no-cache, must-revalidate');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
            next();
          });

          server.middlewares.use('/api/save-photo', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const { slotId, dataUrl } = JSON.parse(body);
                  if (slotId && dataUrl && dataUrl.startsWith('data:image/')) {
                    const base64Data = dataUrl.split(',')[1];
                    const ext = dataUrl.includes('image/png') ? 'png' : 'jpg';
                    const targetFile = path.resolve(__dirname, `public/images/${slotId}.${ext}`);
                    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
                    fs.writeFileSync(targetFile, Buffer.from(base64Data, 'base64'));

                    // Also save as standard .jpg if png to ensure both extensions are available
                    const jpgFile = path.resolve(__dirname, `public/images/${slotId}.jpg`);
                    if (targetFile !== jpgFile) {
                      fs.writeFileSync(jpgFile, Buffer.from(base64Data, 'base64'));
                    }

                    // Update manifest.json so all visitors load the saved image
                    try {
                      const manifestPath = path.resolve(__dirname, 'public/images/manifest.json');
                      let manifest: Record<string, string> = {};
                      if (fs.existsSync(manifestPath)) {
                        manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
                      }
                      manifest[slotId] = `/images/${slotId}.jpg`;
                      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
                    } catch (mErr) {
                      console.error('Failed to update manifest.json:', mErr);
                    }

                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, path: `/images/${slotId}.${ext}` }));
                    return;
                  }
                } catch (err) {
                  console.error('Failed to save photo to disk:', err);
                }
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid payload' }));
              });
            } else {
              res.statusCode = 405;
              res.end();
            }
          });

          server.middlewares.use('/api/save-yt-link', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const { url, title, artist } = JSON.parse(body);
                  const manifestPath = path.resolve(__dirname, 'public/images/manifest.json');
                  let manifest: Record<string, string> = {};
                  if (fs.existsSync(manifestPath)) {
                    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
                  }
                  if (url) manifest['youtube-song-url'] = url;
                  if (title) manifest['youtube-song-title'] = title;
                  if (artist) manifest['youtube-song-artist'] = artist;
                  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, url, title, artist }));
                  return;
                } catch (err) {
                  console.error('Failed to save youtube link:', err);
                }
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid payload' }));
              });
            } else {
              res.statusCode = 405;
              res.end();
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
