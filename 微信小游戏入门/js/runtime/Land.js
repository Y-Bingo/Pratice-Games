import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";
import { Director } from "../Director.js";

export class Land extends Sprite {
    constructor() {
        const img = DataStore.getInstance().getRes( "land" );
        super( img, 0, 0, img.width, img.height, 0, window.innerHeight - img.height, img.width, img.height );
        // 地板的水平变化坐标
        this.landX = 0;
    }

    draw() {
        const landSpeed = Director.getInstance().landSpeed;
        this.landX = this.landX + landSpeed;
        if( this.landX > this.img.width - window.innerWidth ) {
            this.landX = 0;
        }
        super.draw( this.img, 
                    this.srcX, this.srcY, 
                    this.srcW, this.srcH, 
                   -this.landX, this.y, 
                   this.width, this.height );
    }
}