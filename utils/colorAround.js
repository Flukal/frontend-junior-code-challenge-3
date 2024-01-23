export const colorSurroundingBoxes = (colors, index, color) => {
  const gridSize = Math.sqrt(colors.length);
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  // Define the indices of the surrounding boxes
  const surroundingIndices = [
    index - gridSize, // Top
    index - gridSize + 1, // Top right
    index + 1, // Right
    index + gridSize + 1, // Bottom right
    index + gridSize, // Bottom
    index + gridSize - 1, // Bottom left
    index - 1, // Left
    index - gridSize - 1, // Top left
  ];

  // Update the color of the surrounding boxes
  surroundingIndices.forEach((i) => {
    // Check if the index is within the grid
    if (i >= 0 && i < colors.length) {
      // Check if the box is in the same row or column as the selected box
      const iRow = Math.floor(i / gridSize);
      const iCol = i % gridSize;
      if (iRow === row || iRow === row + 1 || iRow === row - 1) {
        if (iCol === col || iCol === col + 1 || iCol === col - 1) {
          colors[i] = color;
        }
      }
    }
  });

  return colors;
};