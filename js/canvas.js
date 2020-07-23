class Canvas {
    constructor(context, canvas, draw, name, station, idsignature) {
        this.context = context;
        this.canvas = canvas;
        this.draw = draw;
        this.name = name;
        this.station = station;
        this.idsignature = idsignature;
    }
    ctx() {
        this.ctx = this.canvas.getContext(this.context);
    }
    drawLine(x, y, x2, y2) {
        this.ctx;
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    clear() {
        this.ctx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
    signature() {
        this.x = 0;
        this.y = 0;
        this.x2;
        this.y2;

    }
}