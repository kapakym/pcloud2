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

const videoExtensions = new Set([
  '.mp4',
  '.mov',
  '.wmv',
  '.webm',
  '.avi',
  '.flv',
  '.mkv',
  '.mts',
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

export const filterVideo = (files: string[]): string[] => {
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    console.log(ext, videoExtensions.has(ext));
    return videoExtensions.has(ext);
  });
};

export function removeSpecialCharacters(str) {
  // Регулярное выражение, которое заменяет все символы, кроме букв и пробелов, на пустую строку
  return str.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
}
