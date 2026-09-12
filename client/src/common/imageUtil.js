export const getImageSrc = (image) => {
  if (!image) return null;
  if (typeof image !== 'string') return null;
  if (image.startsWith('http://') || image.startsWith('https://') || image.startsWith('data:image/')) {
    return image;
  }
  return 'data:image/jpg;base64,' + image;
};