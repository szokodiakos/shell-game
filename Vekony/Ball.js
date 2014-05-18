var ShellGame;
(function (ShellGame) {
    var Ball = (function () {
        function Ball(imageUrl, game, position) {
            this.constants = new ShellGame.Constants();
            this.game = game;
            var image = new Image();
            image.src = imageUrl;
            var self = this;
            image.onload = function () {
                var width = image.width * self.constants.SCALE_FACTOR;
                var height = image.height * self.constants.SCALE_FACTOR;

                var x = position.X - width / 2;
                var y = position.Y - height / 2;

                self.kineticImage = new Kinetic.Image({
                    x: x,
                    y: y,
                    image: image,
                    width: width,
                    height: height
                });
                self.game.layer.add(self.kineticImage);
                self.kineticImage.moveToBottom();
                self.game.layer.draw();
            };
        }
        Object.defineProperty(Ball.prototype, "KineticImage", {
            get: function () {
                return this.kineticImage;
            },
            enumerable: true,
            configurable: true
        });
        return Ball;
    })();
    ShellGame.Ball = Ball;
})(ShellGame || (ShellGame = {}));
//# sourceMappingURL=Ball.js.map
