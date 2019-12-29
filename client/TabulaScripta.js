class TabulaScripta {
  constructor() {
    this.canvas = document.getElementById("tabula");
    this.context = this.canvas.getContext("2d");

    this.columnWidth = 80.0;
    this.rowHeight = 20.0;

    this.cells = {};
    this.cells[5] = {};
    this.cells[5][8] = "10.1";
    this.cells[5][9] = "73.64";
    this.cells[8] = {};
    this.cells[8][0] = "Blahblahblah";
    this.cells[8][13] = "This is meaningful.";

    this.onResize();
  }

  setImageDataPixel(x, y, r, g, b, a = 255) {
    let pixelIndex = ((x | 0) + (y | 0) * this.cellsImageData.width) * 4;
    this.cellsImageData.data[pixelIndex] = r | 0;
    this.cellsImageData.data[pixelIndex + 1] = g | 0;
    this.cellsImageData.data[pixelIndex + 2] = b | 0;
    this.cellsImageData.data[pixelIndex + 3] = a | 0;
  }

  onResize() {
    this.canvas.width = document.body.clientWidth - 4;
    this.canvas.height = document.body.clientHeight - 4;
    this.floorWidth = ((this.canvas.width / this.columnWidth) | 0) * this.columnWidth;
    this.floorHeight = ((this.canvas.height / this.rowHeight) | 0) * this.rowHeight;

    this.cellsImageData = this.context.createImageData(this.canvas.width, this.canvas.height);
    //Draw the cells.
    for (let lineX = 0.0; lineX < this.canvas.width; lineX += this.columnWidth) {
      for (let pixelY = 0.0; pixelY < this.floorHeight; ++pixelY) {
        this.setImageDataPixel(lineX, pixelY, 255, 255, 255, 50);
      }
    }
    for (let lineY = 0.0; lineY < this.canvas.height; lineY += this.rowHeight) {
      for (let pixelX = 0.0; pixelX < this.floorWidth; ++pixelX) {
        this.setImageDataPixel(pixelX, lineY, 255, 255, 255, 50);
      }
    }

    this.draw();
  }

  draw() {
    this.context.clearRect(0.0, 0.0, this.canvas.width, this.canvas.height);
    this.context.putImageData(this.cellsImageData, 0.0, 0.0);

    //Draw the cells.
    // this.context.strokeStyle = "#FFFFFF";
    // this.context.lineWidth = 1.0;
    // for (let lineX = 0.0; lineX < this.canvas.width; lineX += this.columnWidth) {
    //   this.context.beginPath();
    //   this.context.moveTo(lineX, 0.0);
    //   this.context.lineTo(lineX, this.canvas.height);
    //   this.context.stroke();
    // }
    // for (let lineY = 0.0; lineY < this.canvas.height; lineY += this.rowHeight) {
    //   this.context.beginPath();
    //   this.context.moveTo(0.0, lineY);
    //   this.context.lineTo(this.canvas.width, lineY);
    //   this.context.stroke();
    // }

    //Draw the cells' contents.
    //TODO: Scale font.
    this.context.fillStyle = "#FFFFFF";
    this.context.font = "12px serif";
    this.context.textAlign = "left";
    this.context.textBaseline = "hanging";
    for (let [ columnIndex, columns ] of Object.entries(this.cells)) {
      for (let [ rowIndex, cellString ] of Object.entries(columns)) {
        this.context.fillText(cellString, parseFloat(columnIndex) * this.columnWidth + 2.0, (parseFloat(rowIndex) + 0.5) * this.rowHeight - 4.0);
      }
    }
  }
}