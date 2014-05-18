var ShellGame;
(function (ShellGame) {
    var Position = (function () {
        function Position(x, y) {
            this.x = x;
            this.y = y;
        }
        Object.defineProperty(Position.prototype, "X", {
            get: function () {
                return this.x;
            },
            set: function (x) {
                this.x = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Position.prototype, "Y", {
            get: function () {
                return this.y;
            },
            set: function (y) {
                this.y = y;
            },
            enumerable: true,
            configurable: true
        });
        Position.prototype.toString = function () {
            return "{x: " + this.x + ", y: " + this.y + "}";
        };
        return Position;
    })();
    ShellGame.Position = Position;
})(ShellGame || (ShellGame = {}));
//# sourceMappingURL=Position.js.map
