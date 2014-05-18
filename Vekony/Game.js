/// <reference path="kinetic.d.ts" />
/// <reference path="jquery.d.ts" />
var ShellGame;
(function (ShellGame) {
    var Game = (function () {
        function Game() {
        }
        Game.prototype.play = function () {
            // global constants
            var constants = new ShellGame.Constants();

            // make stage
            this.stage = new Kinetic.Stage({
                container: "gameCanvas",
                width: constants.CANVAS_WIDTH,
                height: constants.CANVAS_HEIGHT
            });

            // make layer
            this.layer = new Kinetic.Layer();

            // make cups
            var cup1 = new ShellGame.Cup(0 /* Left */, false, constants.CUP_IMAGE_URL, this);
            var cup2 = new ShellGame.Cup(1 /* Middle */, true, constants.CUP_IMAGE_URL, this);
            var cup3 = new ShellGame.Cup(2 /* Right */, false, constants.CUP_IMAGE_URL, this);

            var cupCollection = [];
            cupCollection.push(cup1, cup2, cup3);

            // add layer to stage
            this.stage.add(this.layer);

            $("#myButton").on("click", function () {
                var random = Math.floor((Math.random() * 3));
                var otherRandom = random;
                while (otherRandom == random) {
                    otherRandom = Math.floor((Math.random() * 3));
                }
                cupCollection[random].swapCups(cupCollection[otherRandom], function () {
                });
            });
        };
        return Game;
    })();
    ShellGame.Game = Game;
})(ShellGame || (ShellGame = {}));
//# sourceMappingURL=Game.js.map
