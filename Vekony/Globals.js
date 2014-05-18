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
                return 480;
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
        return Constants;
    })();
    ShellGame.Constants = Constants;
})(ShellGame || (ShellGame = {}));
//# sourceMappingURL=Globals.js.map
