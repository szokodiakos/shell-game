/// <reference path="jquery.d.ts" />
/// <reference path="jqueryui.d.ts" />
var ShellGame;
(function (ShellGame) {
    $(function () {
        var game = new ShellGame.Game();
        game.play();
        $("#tabs").tabs();
    });
})(ShellGame || (ShellGame = {}));
//# sourceMappingURL=Main.js.map
