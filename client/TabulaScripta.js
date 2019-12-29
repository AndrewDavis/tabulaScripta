class TabulaScripta {
  constructor() {
    this.canvas = document.getElementById("tabula");
    this.context = this.canvas.getContext("2d");

    this.columnWidth = 80.0;
    this.rowHeight = 20.0;

    //TODO: Do we want [int][int] here, or do we want [String][int] (i.e. "A5")?
    //Will inevitably end up converting back and forth between the two...
    this.cells = {};
    this.cells[5] = {};
    this.cells[5][8] = "10.1";
    this.cells[5][9] = "73.64";
    this.cells[8] = {};
    this.cells[8][0] = "Blahblahblah";
    this.cells[8][13] = "This is meaningful.";

    this.onResize();
  }

  setImageDataPixel(imageData, x, y, r, g, b, a = 255) {
    let pixelIndex = ((x | 0) + (y | 0) * imageData.width) * 4;
    imageData.data[pixelIndex] = r | 0;
    imageData.data[pixelIndex + 1] = g | 0;
    imageData.data[pixelIndex + 2] = b | 0;
    imageData.data[pixelIndex + 3] = a | 0;
  }

  onResize() {
    this.canvas.width = document.body.clientWidth - 4;
    this.canvas.height = document.body.clientHeight - 4;
    this.floorWidth = ((this.canvas.width / this.columnWidth) | 0) * this.columnWidth;
    this.floorHeight = ((this.canvas.height / this.rowHeight) | 0) * this.rowHeight;

    this.cellsImageData = this.context.createImageData(this.canvas.width, this.canvas.height);
    //Draw the headers background color.
    for (let pixelX = 0.0; pixelX < this.floorWidth; ++pixelX) {
      for (let pixelY = 0.0; pixelY < this.rowHeight; ++pixelY) {
        this.setImageDataPixel(this.cellsImageData, pixelX, pixelY, 0, 16, 0, 255);
      }
    }
    for (let pixelX = 0.0; pixelX < this.columnWidth; ++pixelX) {
      for (let pixelY = 0.0; pixelY < this.floorHeight; ++pixelY) {
        this.setImageDataPixel(this.cellsImageData, pixelX, pixelY, 0, 16, 0, 255);
      }
    }
    //Draw the cells.
    for (let lineX = 0.0; lineX < this.canvas.width; lineX += this.columnWidth) {
      for (let pixelY = 0.0; pixelY < this.floorHeight; ++pixelY) {
        this.setImageDataPixel(this.cellsImageData, lineX, pixelY, 200, 215, 200, 65);
      }
    }
    for (let lineY = 0.0; lineY < this.canvas.height; lineY += this.rowHeight) {
      for (let pixelX = 0.0; pixelX < this.floorWidth; ++pixelX) {
        this.setImageDataPixel(this.cellsImageData, pixelX, lineY, 200, 215, 200, 65);
      }
    }

    this.draw();
  }

  draw() {
    this.context.clearRect(0.0, 0.0, this.canvas.width, this.canvas.height);
    this.context.putImageData(this.cellsImageData, 0.0, 0.0);

    //Draw the header texts.
    this.context.fillStyle = "#808580";
    this.context.font = "14px monospace";
    this.context.textAlign = "center";
    this.context.textBaseline = "hanging";
    for (let columnIndex = 0; columnIndex < this.floorWidth / this.columnWidth; ++columnIndex) {
      //TODO: Instead of just wrapping at 26, add another letter column ("AA") etc...
      this.context.fillText(String.fromCharCode(65 + columnIndex % 26),
        (parseFloat(columnIndex) + 1.5) * this.columnWidth + 2.0,
        0.5 * this.rowHeight - 5.0);
    }
    for (let rowIndex = 0; rowIndex < this.floorHeight / this.rowHeight; ++rowIndex) {
      this.context.fillText(rowIndex + 1,
        0.5 * this.columnWidth + 2.0,
        (parseFloat(rowIndex) + 1.5) * this.rowHeight - 5.0);
    }

    //Draw the cells' contents.
    //TODO: Scale font.
    this.context.fillStyle = "#FFFFFF";
    this.context.font = "14px monospace";
    this.context.textAlign = "left";
    this.context.textBaseline = "hanging";
    for (let [ columnIndex, columns ] of Object.entries(this.cells)) {
      for (let [ rowIndex, cellString ] of Object.entries(columns)) {
        this.context.fillText(cellString,
          (parseFloat(columnIndex) + 1.0) * this.columnWidth + 2.0,
          (parseFloat(rowIndex) + 1.5) * this.rowHeight - 5.0);
      }
    }
  }
}