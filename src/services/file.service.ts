export const readFile = (file: File): void => {
  const reader = new FileReader();
  reader.onload = (readerEvent: ProgressEvent<FileReader>): void => {
    const avatar = readerEvent.target?.result;

    if (avatar && typeof avatar === 'string') {
      window.store.set({ avatar });
    }
  };

  reader.readAsDataURL(file);
};
