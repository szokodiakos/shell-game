var ShellGame;
(function (ShellGame) {
    $(function () {
        var game = new ShellGame.Game();
        game.play();
        var textBoxIsValid = false;
        $("#infoMenuTable").hide();
        $("#betMenuDiv").hide();
        $("#gameCanvas").hide();
        $("#selectCupMenuDiv").hide();
        $("#successMenuDiv").hide();
        $("#failedMenuDiv").hide();
        $("#loseMenuDiv").hide();
        $("img").tooltip({
            items: "img[alt]",
            content: function () {
                return $(this).attr("alt");
            },
            open: function (event, ui) {
                ui.tooltip.css({
                    "max-width": "100px",
                    "font-size": "1em"
                });
            }
        });
        $("#newGameButton").button();
        $("#highScoreButton").button();
        $("#startButton").button();
        $("#okFromSuccess").button();
        $("#okFromFailed").button();
        $(".menu-link").bigSlide();
        $("#triggerMenuButton").on("click", function () {
            if ($("#arrowImage").hasClass("spin")) {
                $("#arrowImage").removeClass("spin");
            } else {
                $("#arrowImage").addClass("spin");
            }
        });
        $("#triggerMenuButton").trigger("click");
        $("#newGameButton").on("click", function () {
            $(this).button({
                label: "Restart game"
            });
            $("#infoMenuTable").toggle("slide");
            $("#betMenuDiv").toggle("slide");
            $("#gameCanvas").toggle("slide", {
                direction: 'up'
            });
            game.raiseAllCups();
            $("#newGameButton").on("click", function () {
                location.reload();
            });
        });
        $("#startButton").on("click", function () {
            if (textBoxIsValid) {
                var bet = $("#placeBetTextBox").val();
                game.shuffleCups(bet);
                $("#betMenuDiv").toggle("slide");
            } else {
                $("#placeBetTextBox").val("");
                $("#placeBetTextBox").attr("placeholder", "Place valid bet!");
            }
        });
        $("#placeBetTextBox").on("change", function () {
            textBoxIsValid = false;
            if (!isNaN(this.value)) {
                if (this.value > game.CashInBank || this.value < 1) {
                    $("#placeBetTextBox").css({
                        "border": "1px solid red",
                        "color": "red"
                    });
                } else {
                    $("#placeBetTextBox").css({
                        "border": "1px solid white",
                        "color": "white"
                    });
                    textBoxIsValid = true;
                }
            } else {
                $("#placeBetTextBox").css({
                    "border": "1px solid red",
                    "color": "red"
                });
            }
        });
        $("#okFromSuccess").on("click", function () {
            $("#successMenuDiv").toggle("slide", function () {
                $("#betMenuDiv").toggle("slide");
            });
        });
        $("#okFromFailed").on("click", function () {
            $("#failedMenuDiv").toggle("slide", function () {
                $("#betMenuDiv").toggle("slide");
            });
        });
    });
})(ShellGame || (ShellGame = {}));
