import { Sprite } from "../base/Sprite.js";
import { Director } from "../Director.js";

export class Pie extends Sprite {
    
    constructor( img, top ) {
        super(  img, 
                2, 0, 
                img.width - 4, img.height, 
                window.innerWidth, 0,
                img.width, img.height);
        this.top = top;
    }

    draw() {
        const landSpeed = Director.getInstance().landSpeed;
        this.x = this.x - landSpeed;
        super.draw(
            this.img,
            0, 0,
            this.srcW, this.srcH,
            this.x, this.y,
            this.width, this.height
        );
    }

}