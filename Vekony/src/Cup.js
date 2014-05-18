var ShellGame;
(function (ShellGame) {
    var Cup = (function () {
        function Cup(place, hasBall, imageUrl, game) {
            this.constants = new ShellGame.Constants();
            var position = new ShellGame.Position(0, 0);
            this.isSwapInProgress = false;
            this.raisedUp = false;
            this.selected = false;
            switch (place) {
                case 0 /* Left */:
                    position = this.constants.LEFT_CUP_POSITION;
                    break;

                case 1 /* Middle */:
                    position = this.constants.MIDDLE_CUP_POSITION;
                    break;

                case 2 /* Right */:
                    position = this.constants.RIGHT_CUP_POSITION;
                    break;

                default:
                    position = new ShellGame.Position(0, 0);
                    break;
            }
            this.hasBall = hasBall;
            this.game = game;
            var image = new Image();
            image.src = imageUrl;
            var self = this;
            image.onload = function () {
                var width = image.width * self.constants.SCALE_FACTOR;
                var height = image.height * self.constants.SCALE_FACTOR;

                var x = position.X - width / 2;
                var y = position.Y - height / 2;

                if (self.hasBall) {
                    var ballPosition = new ShellGame.Position(x + width / 2, y + height * 0.8);
                    self.ball = new ShellGame.Ball(self.constants.BALL_IMAGE_URL, self.game, ballPosition);
                }
                self.kineticImage = new Kinetic.Image({
                    x: x,
                    y: y,
                    image: image,
                    width: width,
                    height: height
                });
                self.kineticImage.on("click", function () {
                    if (self.game.CanRaiseCups) {
                        self.selected = true;

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
            };
        }
        Object.defineProperty(Cup.prototype, "KineticImage", {
            get: function () {
                return this.kineticImage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cup.prototype, "IsSwapInProgress", {
            get: function () {
                return this.isSwapInProgress;
            },
            set: function (value) {
                this.isSwapInProgress = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cup.prototype, "RaisedUp", {
            get: function () {
                return this.raisedUp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cup.prototype, "HasBall", {
            get: function () {
                return this.hasBall;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Cup.prototype, "Selected", {
            get: function () {
                return this.selected;
            },
            set: function (value) {
                this.selected = value;
            },
            enumerable: true,
            configurable: true
        });

        Cup.prototype.raiseIt = function (progress, self) {
            if (progress < 25) {
                self.kineticImage.move({
                    x: 0,
                    y: -(self.constants.CANVAS_WIDTH / 160)
                });
                self.game.layer.draw();
                setTimeout(self.raiseIt, 5, progress + 1, self);
            }
        };

        Cup.prototype.putIt = function (progress, self, callBack) {
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
        };
        Cup.prototype.swapCups = function (speed, otherCup, onSwapDone) {
            var _this = this;
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
                this.move(speed, 0, xDistance, yDistance, this, function () {
                    _this.isSwapInProgress = false;
                    if (!otherCup.IsSwapInProgress) {
                        onSwapDone();
                    }
                });
                otherCup.move(speed, 0, (-1) * xDistance, (-1) * yDistance, otherCup, function () {
                    otherCup.IsSwapInProgress = false;
                    if (!_this.isSwapInProgress) {
                        onSwapDone();
                    }
                });
            }
        };

        Cup.prototype.move = function (speed, progress, xDistance, yDistance, self, callBack) {
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
        };

        Cup.prototype.raiseCup = function () {
            this.raisedUp = true;
            this.raiseIt(0, this);
        };

        Cup.prototype.putDownCup = function (callBack) {
            this.raisedUp = false;
            this.putIt(0, this, function () {
                callBack();
            });
        };
        return Cup;
    })();
    ShellGame.Cup = Cup;
})(ShellGame || (ShellGame = {}));
