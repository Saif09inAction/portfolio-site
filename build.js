// Build script for Vercel - copies files to dist folder
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

function copyRecursive(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  
  const entries = readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log('Starting build...');
  
  // Create dist directory
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }
  
  // Copy individual files
  const filesToCopy = [
    'index.html',
    'styles.css',
    'script.js',
    'translations.json'
  ];
  
  filesToCopy.forEach(file => {
    if (existsSync(file)) {
      copyFileSync(file, join('dist', file));
      console.log(`Copied ${file}`);
    } else {
      console.log(`File not found: ${file}`);
    }
  });
  
  // Copy images directory recursively
  if (existsSync('images')) {
    copyRecursive('images', 'dist/images');
    console.log('Copied images directory');
  }
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build error:', error);
  process.exit(1);
}
