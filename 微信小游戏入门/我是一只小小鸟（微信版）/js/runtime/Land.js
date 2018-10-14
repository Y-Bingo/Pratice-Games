import {
    Sprite
} from "../base/Sprite.js";
import {
    DataStore
} from "../base/DataStore.js";

export class Land extends Sprite {
    constructor() {
        const img = DataStore.getInstance().getRes("land");
        super(img, 0, 0, img.width, img.height, 0, DataStore.getInstance().canvas.height - img.height, img.width, img.height);
        // 地板的水平变化坐标
        this.landX = 0;
        this.landSpeed = 2;
    }

    draw() {
        this.landX = this.landX + this.landSpeed;
        if (this.landX > this.img.width - DataStore.getInstance().canvas.width) {
            this.landX = 0;
        }
        super.draw(this.img,
            this.srcX, this.srcY,
            this.srcW, this.srcH, -this.landX, this.y,
            this.width, this.height);
    }
}