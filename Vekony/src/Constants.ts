module ShellGame {
    export class Constants {
        get CANVAS_WIDTH(): number {
            return 640;
        }
        get CANVAS_HEIGHT(): number {
            return this.CANVAS_WIDTH * this.CANVAS_RATIO;
        }
        get BALL_IMAGE_URL(): string {
            return "img/ball.png";
        }
        get CUP_IMAGE_URL(): string {
            return "img/cup.png";
        }
        get SCALE_FACTOR(): number {

            /* on for example a 640 width screen
             * we would like to have a 
             * 100 pixels wide cup.
             * 
             * cup image width is 318 px.
             * 100/318 = approx. 0.3144
             */
            return (this.CANVAS_WIDTH / 640) * 0.3144;
        }
        get CANVAS_RATIO(): number {
            return 0.75;
        }
        get MIDDLE_CUP_POSITION(): Position {
            return new Position(this.CANVAS_WIDTH/2, this.CANVAS_HEIGHT/2);
        }
        get LEFT_CUP_POSITION(): Position {
            return new Position(this.CANVAS_WIDTH * (1/5), this.CANVAS_HEIGHT / 2);
        }
        get RIGHT_CUP_POSITION(): Position {
            return new Position(this.CANVAS_WIDTH * (4/5), this.CANVAS_HEIGHT / 2);
        }
        constructor() {
            
        }
    }
} 