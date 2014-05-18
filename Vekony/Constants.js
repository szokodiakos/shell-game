var ShellGame;
(function (ShellGame) {
    var Constants = (function () {
        function Constants() {
        }
        Object.defineProperty(Constants.prototype, "CANVAS_WIDTH", {
            get: function () {
                return 640;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "CANVAS_HEIGHT", {
            get: function () {
                return this.CANVAS_WIDTH * this.CANVAS_RATIO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "BALL_IMAGE_URL", {
            get: function () {
                return "img/ball.png";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "CUP_IMAGE_URL", {
            get: function () {
                return "img/cup.png";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "SCALE_FACTOR", {
            get: function () {
                /* on for example a 640 width screen
                * we would like to have a
                * 100 pixels wide cup.
                *
                * cup image width is 318 px.
                * 100/318 = approx. 0.3144
                */
                return (this.CANVAS_WIDTH / 640) * 0.3144;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "CANVAS_RATIO", {
            get: function () {
                return 0.75;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "MIDDLE_CUP_POSITION", {
            get: function () {
                return new ShellGame.Position(this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "LEFT_CUP_POSITION", {
            get: function () {
                return new ShellGame.Position(this.CANVAS_WIDTH * (1 / 5), this.CANVAS_HEIGHT / 2);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Constants.prototype, "RIGHT_CUP_POSITION", {
            get: function () {
                return new ShellGame.Position(this.CANVAS_WIDTH * (4 / 5), this.CANVAS_HEIGHT / 2);
            },
            enumerable: true,
            configurable: true
        });
        return Constants;
    })();
    ShellGame.Constants = Constants;
})(ShellGame || (ShellGame = {}));
//# sourceMappingURL=Constants.js.map
