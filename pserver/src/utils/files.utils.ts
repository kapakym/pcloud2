import * as fs from 'fs';
import * as path from 'path';

const imageExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.bmp',
  '.tiff',
  '.svg',
]);

export const getFilesNonRecursively = (directory: string): string[] => {
  const results: string[] = [];
  const queue: string[] = [directory];

  while (queue.length > 0) {
    const currentDir = queue.shift()!;
    const list = fs.readdirSync(currentDir);

    list.forEach((file) => {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);

      if (stat && stat.isDirectory()) {
        queue.push(filePath);
      } else {
        results.push(filePath);
      }
    });
  }

  return results;
};

export const filterImages = (files: string[]): string[] => {
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.has(ext);
  });
};
