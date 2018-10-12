
// 临界线
export class DeadLine {

    constructor () {
        this.lineWidth = 2;
        this.lineHeight = 8;
        this.lineGap = 3;
        this.x = 0;
        this.y = 0;
    }

    draw ( x, y ) {
        this.x = x || this.x;
        this.y = y || this.y;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        let lineCount = Math.floor(
            this.ctx.canvas.width / ( this.lineHeight + this.lineGap )
        );
        for ( let i = 0; i <= lineCount; i++ )
        {
            let startX = this.x + i * ( this.lineHeight + this.lineGap );
            let startY = this.y;
            let endX = startX + this.lineHeight;
            let endY = this.y;
            this.ctx.moveTo( startX, startY );
            this.ctx.lineTo( endX, endY );
        }
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }

}
