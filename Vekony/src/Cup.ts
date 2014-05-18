module ShellGame {
    export class Cup {
        private constants: Constants;
        private ball: Ball;
        private hasBall: boolean;
        private game: Game;
        private kineticImage: Kinetic.Image;
        private raisedUp: boolean;
        private isSwapInProgress: boolean;
        private selected: boolean;

        get KineticImage(): Kinetic.Image {
            return this.kineticImage;
        }
        get IsSwapInProgress(): boolean {
            return this.isSwapInProgress;
        }
        set IsSwapInProgress(value: boolean) {
            this.isSwapInProgress = value;
        }
        get RaisedUp(): boolean {
            return this.raisedUp;
        }
        get HasBall(): boolean {
            return this.hasBall;
        }
        get Selected(): boolean {
            return this.selected;
        }
        set Selected(value: boolean) {
            this.selected = value;
        }

        constructor(place: Place, hasBall: boolean, imageUrl: string, game: Game) {
            this.constants = new Constants();
            var position = new Position(0, 0);
            this.isSwapInProgress = false;
            this.raisedUp = false;
            this.selected = false;
            switch (place) {
                case Place.Left:
                    position = this.constants.LEFT_CUP_POSITION;
                    break;

                case Place.Middle:
                    position = this.constants.MIDDLE_CUP_POSITION;
                    break;

                case Place.Right:
                    position = this.constants.RIGHT_CUP_POSITION;
                    break;

                default:
                    position = new Position(0, 0);
                    break;
            }
            this.hasBall = hasBall;
            this.game = game;
            var image = new Image();
            image.src = imageUrl;
            var self = this;
            image.onload = () => {
                var width = image.width * self.constants.SCALE_FACTOR;
                var height = image.height * self.constants.SCALE_FACTOR;

                var x = position.X - width / 2;
                var y = position.Y - height / 2;

                if (self.hasBall) {
                    var ballPosition = new Position(x + width / 2, y + height * 0.8)
                    self.ball = new Ball(self.constants.BALL_IMAGE_URL, self.game, ballPosition);
                }
                self.kineticImage = new Kinetic.Image({
                    x: x,
                    y: y,
                    image: image,
                    width: width,
                    height: height
                });
                self.kineticImage.on("click", () => {

                    // if the user can raise cups, raise it
                    if (self.game.CanRaiseCups) {

                        self.selected = true;

                        // if this cup has ball => yay, else duh
                        self.game.guess(self.hasBall);

                        if (!self.raisedUp) {
                            self.raiseIt(0, self);
                        } else {
                            self.putIt(0, self, null);
                        }
                        self.raisedUp = !self.raisedUp;
                    }
                });
                self.game.layer.add(self.kineticImage);
                self.kineticImage.moveToTop();
                self.game.layer.draw();
            }
        }

        private raiseIt(progress: number, self: Cup): void {
            if (progress < 25) {
                self.kineticImage.move({
                    x: 0,
                    y: -(self.constants.CANVAS_WIDTH / 160)
                });
                self.game.layer.draw();
                setTimeout(self.raiseIt, 5, progress + 1, self);
            }
        }

        private putIt(progress: number, self: Cup, callBack: Function): void {
            if (progress < 25) {
                self.kineticImage.move({
                    x: 0,
                    y: self.constants.CANVAS_WIDTH / 160
                });
                self.game.layer.draw();
                setTimeout(self.putIt, 5, progress + 1, self, callBack);
            } else {
                callBack();
            }
        }
        public swapCups(speed: number, otherCup: Cup, onSwapDone: Function): void {
            if (!this.isSwapInProgress && !otherCup.IsSwapInProgress) {
                this.isSwapInProgress = true;
                otherCup.IsSwapInProgress = true;

                var thisCupsPosition = this.kineticImage.position();
                var otherCupsPosition = otherCup.KineticImage.position();
                var xDistance = Math.abs(otherCupsPosition.x - thisCupsPosition.x);
                var yDistance = Math.abs(otherCupsPosition.y - thisCupsPosition.y);
                if (otherCupsPosition.x < thisCupsPosition.x) {
                    xDistance = xDistance * (-1);
                }
                if (otherCupsPosition.y < thisCupsPosition.y) {
                    yDistance = yDistance * (-1);
                }
                this.move(speed, 0, xDistance, yDistance, this, () => {
                    this.isSwapInProgress = false;
                    if (!otherCup.IsSwapInProgress) {
                        onSwapDone();
                    }
                });
                otherCup.move(speed, 0, (-1) * xDistance, (-1) * yDistance, otherCup, () => {
                    otherCup.IsSwapInProgress = false;
                    if (!this.isSwapInProgress) {
                        onSwapDone();
                    }
                });
            }
        }

        public move(speed: number, progress: number, xDistance: number, yDistance: number, self: Cup, callBack: Function): void {
            if (progress < speed) {
                var xStep = xDistance / speed;
                var yStep = yDistance / speed;
                self.KineticImage.move({
                    x: xStep,
                    y: yStep
                });
                if (self.hasBall) {
                    self.ball.KineticImage.move({
                        x: xStep,
                        y: yStep
                    });
                }
                self.game.layer.draw();
                setTimeout(self.move, speed, speed, progress + 1, xDistance, yDistance, self, callBack);
            } else {
                callBack();
            }
        }

        public raiseCup() {
            this.raisedUp = true;
            this.raiseIt(0, this);
        }

        public putDownCup(callBack: Function) {
            this.raisedUp = false;
            this.putIt(0, this, () => {
                callBack();
            });
        }
    }
}