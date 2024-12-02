export const bytesToMegabytes = (bytes: number | null): string => {
  if (bytes === null) return '';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};
