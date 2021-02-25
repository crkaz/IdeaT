import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdeasService } from '../../idea/shared/services/ideas.service';

const BLACK = '#000000';
const WHITE = '#FFFFFF';
const YELLOW = '#eBD549';
const PI = Math.PI;
const TWO_PI = PI * 2;
const MAX_ZOOM = 2;
const MIN_ZOOM = 0.5;

@Component({
  selector: 'ideat-business-canvas-board',
  templateUrl: './business-canvas-board.component.html',
  styleUrls: ['./business-canvas-board.component.css']
})
export class BusinessCanvasBoardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('crkanvas', { static: false }) CANVAS: ElementRef;

  public CTX: CanvasRenderingContext2D;

  canvasScale = 1;
  panPos = [0, 0];
  panning = false;
  lastPanX = null;
  lastPanY = null;
  drawing = false;
  erasing = false;
  lastDrawX = null;
  lastDrawY = null;
  lastEDrawX = null;
  lastEDrawY = null;
  panOffsetX = 0;
  panOffsetY = 0;
  drawCoords = [];
  panRedrawInterval = 15;
  panRedrawCounter = 0;
  subscription: Subscription;
  WIDTH = 2450;
  deleting = false;

  constructor(public ideaService: IdeasService) { }


  ngAfterViewInit(): void {
    this.initCanvas();
    this.subscription = this.ideaService.getMessage().subscribe(message => {
      this.redrawObjects(true);
    });
  }

  onResize(e): void {
    this.WIDTH = this.CANVAS.nativeElement.offsetWidth;
    this.redrawObjects();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initCanvas(): void {
    this.CTX = this.CANVAS.nativeElement.getContext('2d');
    this.drawBC();

    this.CANVAS.nativeElement.addEventListener('contextmenu', (e) => { e.preventDefault(); return false; });
    this.CANVAS.nativeElement.addEventListener('mousedown', (e) => { this.handleMouseDown(e); });
    this.CANVAS.nativeElement.addEventListener('mousemove', (e) => { this.handleMouseMove(e); });
    this.CANVAS.nativeElement.addEventListener('mouseup', (e) => { this.handleMouseUp(e); });
    this.CANVAS.nativeElement.addEventListener('mouseout', (e) => { this.stopDrawing(e); });
    this.CANVAS.nativeElement.addEventListener('wheel', (e) => { this.handleMouseWheel(e); });

    this.CTX.lineJoin = 'round';
    this.CTX.lineCap = 'round';
    this.CTX.lineWidth = 3;
    this.CTX.imageSmoothingEnabled = true;

    this.redrawObjects();
  }

  drawBC(): void {

  }

  handleMouseDown(e): void {
    switch (e.which) {
      case 1:
        this.stickyCollisionDetection(e);
        this.drawing = true;
        break;
      case 2:
        this.erasing = true;
        break;
      case 3:
        this.panning = true;
        break;
    }
  }

  handleMouseUp(e): void {
    switch (e.which) {
      case 1:
        if (!this.deleting) {
          this.createSticky(e);
        }
        else {
          this.deleting = false;
        }
        break;
      case 2:
        break;
      case 3:
        this.redrawObjects(true);
        break;
    }
    this.stopDrawing(e);
  }

  handleMouseMove(e): void {
    switch (e.which) {
      case 1:
        this.draw(e);
        break;
      case 2:
        this.erase(e);
        break;
      case 3:
        this.pan(e);
        break;
    }
  }

  handleMouseWheel(e): void {
    const dY = e.wheelDeltaY;
    const scaleFactor = 0.1;
    let scale = 1;
    dY > 0 ? scale += scaleFactor : scale -= scaleFactor;

    const acs = this.canvasScale * scale;
    if (this.between(acs, MIN_ZOOM, MAX_ZOOM)) {
      this.canvasScale = acs;
      this.CTX.scale(scale, scale);
      this.redrawObjects(true);
    }
  }

  draw(e): void {
    if (!this.drawing) { return; }
    this.CTX.strokeStyle = this.getColour();
    this.CTX.beginPath();
    const x = (e.offsetX - this.panOffsetX) * this.inverseCanvasScale();
    const y = (e.offsetY - this.panOffsetY) * this.inverseCanvasScale();
    !this.lastDrawX ? [this.lastDrawX, this.lastDrawY] = [x, y] : this.CTX.moveTo(this.lastDrawX, this.lastDrawY);   // Ensure we start drawing from where user clicks rather than origin.
    this.drawCoords.push({ x: this.lastDrawX, y: this.lastDrawY });
    this.CTX.lineWidth = 2;
    this.CTX.lineTo(x, y);
    this.CTX.stroke();
    [this.lastDrawX, this.lastDrawY] = [x, y];
  }

  erase(e): void {
    if (!this.erasing) { return; }
    this.CTX.strokeStyle = WHITE;
    this.CTX.beginPath();
    const x = (e.offsetX - this.panOffsetX) * this.inverseCanvasScale();
    const y = (e.offsetY - this.panOffsetY) * this.inverseCanvasScale();
    !this.lastEDrawX ? [this.lastEDrawX, this.lastEDrawY] = [x, y] : this.CTX.moveTo(this.lastEDrawX, this.lastEDrawY);   // Ensure we start drawing from where user clicks rather than origin.
    this.CTX.lineWidth = 30;
    this.CTX.lineTo(x, y);
    this.CTX.stroke();
    [this.lastEDrawX, this.lastEDrawY] = [x, y];
  }

  createSticky(e): void {
    if (this.drawCoords.length < 2) {
      const colour = YELLOW;
      const x = (e.offsetX - this.panOffsetX) * this.inverseCanvasScale();
      const y = (e.offsetY - this.panOffsetY) * this.inverseCanvasScale();
      const width = 130;
      const height = 110;
      const maxCharsPerLine = 25;
      const text = this.chunkStr(this.ideaService.LOREM_DESC[Math.floor(Math.random() * 4) + 1], maxCharsPerLine).join('\n');
      this.CTX.fillStyle = colour;
      this.ideaService.stickies.push({ x, y, width, height, colour, text });
      this.CTX.fillRect(x, y, width, height);
      this.CTX.fillStyle = BLACK;
      this.CTX.font = '10px Arial';
      let i = 1;
      for (const subStr of text.split('\n')) {
        this.CTX.fillText(subStr, x, y + (10 * i));
        i += 1;
      }
    }
  }

  pan(e): void {
    const left = this.lastPanX < e.offsetX;
    const up = this.lastPanY < e.offsetY;
    const panRate = 2;
    if (this.lastPanX) {
      left ? this.translate(-panRate, null) : this.translate(panRate, null);
      up ? this.translate(null, -panRate) : this.translate(null, panRate);
      left ? this.panPos[0] -= panRate : this.panPos[0] += panRate;
      up ? this.panPos[1] -= panRate : this.panPos[1] += panRate;
    }
    [this.lastPanX, this.lastPanY] = [e.offsetX, e.offsetY];

    this.redrawObjects();
  }

  stopDrawing(e): void {
    this.drawing = false;
    this.erasing = false;
    this.panning = false;
    this.lastDrawX = null;  // Ensure we start drawing from where user clicks rather than origin.
    this.lastPanX = null;
    const shouldDraw = this.drawCoords.length > 15;
    shouldDraw ? this.ideaService.drawnObjects.push(this.drawCoords) : this.redrawObjects(true);
    this.drawCoords = [];
  }

  getColour(): string {
    // let colour = COLOUR_PICKER.value;
    let colour = BLACK;
    if (colour.length != 6 && colour[0] != '#') {
      colour = BLACK;
    }
    return colour;
  }

  translate(x, y): void {
    this.CTX.translate(x, y);
    x ? this.panOffsetX += x : null;
    y ? this.panOffsetY += y : null;
  }

  // util operator
  between(val, lower, upper, equiv = true): boolean {
    if (equiv) {
      if (val >= lower && val <= upper) { return true; }
    }
    if (val > lower && val < upper) { return true; }
    return false;
  }

  chunkStr(str, n): any[] {
    const ret = [];
    let i;
    let len;

    for (i = 0, len = str.length; i < len; i += n) {
      ret.push(str.substr(i, n));
    }

    return ret;
  }

  inverseCanvasScale(): number {
    return 1 / this.canvasScale;
  }

  redrawObjects(force = false): void {
    if (!force && this.panRedrawCounter++ % this.panRedrawInterval !== 0) { return; }

    this.drawBC();

    const virtualWidth = this.WIDTH * this.inverseCanvasScale();
    this.CTX.clearRect(0 - this.panOffsetX, 0 - this.panOffsetY, virtualWidth, virtualWidth);

    this.CTX.strokeStyle = BLACK;
    this.CTX.lineWidth = 2;
    this.ideaService.drawnObjects.forEach(obj => {
      let [lX, lY] = [null, null];
      obj.forEach(coords => {
        if (!lX) {
          [lX, lY] = [coords.x, coords.y];
          this.CTX.beginPath();
        } else {
          this.CTX.moveTo(lX, lY);
          this.CTX.lineTo(coords.x, coords.y);
          [lX, lY] = [coords.x, coords.y];
        }
      });
      this.CTX.stroke();
    });

    this.ideaService.stickies.forEach(sticky => {
      this.CTX.fillStyle = sticky.colour;
      this.CTX.fillRect(sticky.x, sticky.y, sticky.width, sticky.height);
      this.CTX.fillStyle = BLACK;
      this.CTX.font = '10px Arial';
      let i = 1;
      for (const subStr of sticky.text.split('\n')) {
        this.CTX.fillText(subStr, sticky.x, sticky.y + (10 * i));
        i += 1;
      }
    });
  }

  stickyCollisionDetection(e): boolean {
    try {
      this.ideaService.stickies.forEach(sticky => {
        const x = (e.offsetX - this.panOffsetX) * this.inverseCanvasScale();
        const y = (e.offsetY - this.panOffsetY) * this.inverseCanvasScale();

        if (sticky.x < x &&
          sticky.x + sticky.width > x &&
          sticky.y < y &&
          sticky.y + sticky.height > y) {
          const index = this.ideaService.stickies.indexOf(sticky);
          if (index > -1) {
            this.ideaService.stickies.splice(index, 1);
            this.redrawObjects(true);
            this.deleting = true;
            return true;
          }
        }
      });
    } catch {
    }
    return false;
  }
}
