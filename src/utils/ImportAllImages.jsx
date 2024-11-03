const ImportAllImages = (context) => {
  const imagesMap = { frames: 0 };

  context.keys().forEach((fileName) => {
    // Extract just the number part from the filename (e.g., "1" from "./1.png")
    const index = parseInt(fileName.match(/(\d+)\.png$/)[1], 10);
    imagesMap[index] = context(fileName);
    imagesMap.frames += 1;
  });

  return imagesMap;
};

export default ImportAllImages;
