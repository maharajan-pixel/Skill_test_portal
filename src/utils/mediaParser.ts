/**
 * Parses Google Drive links and common image URLs to render preview images
 */
export function parseDriveOrImageUrl(url: string): string {
  if (!url) return '';
  // Google Drive format: https://drive.google.com/file/d/FILE_ID/view...
  const driveMatch = url.match(/drive\.google\.com\/(?:file\/d\/|uc\?(?:export=view&)?id=)([a-zA-Z0-9_-]+)/i);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }
  return url;
}

export function extractMediaParts(text: string): { cleanText: string; imageUrls: string[] } {
  if (!text) return { cleanText: '', imageUrls: [] };
  
  const imageUrls: string[] = [];
  const urlRegex = /(https?:\/\/[^\s]+?\.(?:png|jpg|jpeg|gif|webp|svg)|https?:\/\/drive\.google\.com\/(?:file\/d\/|uc\?(?:export=view&)?id=)[a-zA-Z0-9_-]+(?:\/view\?[^\s]*)?)/gi;
  
  const cleanText = text.replace(urlRegex, (matchedUrl) => {
    imageUrls.push(parseDriveOrImageUrl(matchedUrl));
    return '';
  }).trim();

  return { cleanText, imageUrls };
}
