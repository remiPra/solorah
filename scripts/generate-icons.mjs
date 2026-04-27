import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'public', 'solorah-logo-toulouse.jpg');

const targets = [
  { size: 16,  out: 'public/favicon-16.png' },
  { size: 32,  out: 'public/favicon-32.png' },
  { size: 180, out: 'public/apple-touch-icon.png' },
  { size: 192, out: 'public/icons/icon-192.png' },
  { size: 512, out: 'public/icons/icon-512.png' },
];

for (const { size, out } of targets) {
  await sharp(src)
    .resize(size, size, { fit: 'cover', position: 'center' })
    .png()
    .toFile(path.join(root, out));
  console.log(`✓ ${out} (${size}x${size})`);
}
