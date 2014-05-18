/// <reference path="jquery.d.ts" />
var ShellGame;
(function (ShellGame) {
    $(function () {
        // global constants
        var constants = new ShellGame.Constants();

        // make cups
        var cup1 = new ShellGame.Cup(0 /* Left */, false, constants.CUP_IMAGE_URL);
        var cup2 = new ShellGame.Cup(1 /* Middle */, true, constants.CUP_IMAGE_URL);
        var cup3 = new ShellGame.Cup(2 /* Right */, false, constants.CUP_IMAGE_URL);

        // add a ball to cup2 (middle cup)
        cup2.Ball = new ShellGame.Ball(constants.BALL_IMAGE_URL);

        // make canvas
        var canvas = document.getElementById("gameCanvas");
        canvas.width = constants.CANVAS_WIDTH;
        canvas.height = constants.CANVAS_HEIGHT;
        canvas.style["border"] = "1px solid #000000";
        var ctx = canvas.getContext("2d");

        // draw cups
        cup1.draw(ctx);
        cup2.draw(ctx);
        cup3.draw(ctx);
    });
})(ShellGame || (ShellGame = {}));
//# sourceMappingURL=app.js.map
