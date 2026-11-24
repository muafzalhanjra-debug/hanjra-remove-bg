import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 22 * 1024 * 1024 } });

app.use(express.static(__dirname));
app.post('/api/remove-bg', upload.single('image'), async (req, res) => {
  if (!process.env.REMOVEBG_API_KEY) return res.status(503).json({ error: 'Server API key is not configured yet.' });
  if (!req.file) return res.status(400).json({ error: 'No image file was received.' });
  if (!req.file.mimetype.startsWith('image/')) return res.status(400).json({ error: 'Please upload a supported image file.' });
  try {
    const form = new FormData();
    form.append('image_file', new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname || 'image');
    form.append('size', 'auto');
    form.append('format', 'png');
    const apiResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST', headers: { 'X-Api-Key': process.env.REMOVEBG_API_KEY }, body: form
    });
    if (!apiResponse.ok) {
      const body = await apiResponse.text();
      return res.status(apiResponse.status).json({ error: `AI service returned ${apiResponse.status}. ${body.slice(0, 500)}` });
    }
    res.set('Content-Type', apiResponse.headers.get('content-type') || 'image/png');
    res.set('Cache-Control', 'no-store');
    res.send(Buffer.from(await apiResponse.arrayBuffer()));
  } catch (err) {
    console.error('Removal API error:', err.message);
    res.status(500).json({ error: 'Could not process the image. Please try again.' });
  }
});
app.get('/health', (_req, res) => res.json({ ok: true }));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Hanjra Remove BG running on http://localhost:${port}`));
