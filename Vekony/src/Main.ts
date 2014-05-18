/// <reference path="../des/jquery.d.ts" />
/// <reference path="../des/jqueryui.d.ts" />


// useful: https://github.com/borisyankov/DefinitelyTyped
module ShellGame {

    $(() => {
        var game = new Game();
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
            content: function() {
                return $(this).attr("alt");
            },
            open: (event, ui) => {
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
        $("#triggerMenuButton").on("click", () => {
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
            $("#newGameButton").on("click", () => {
                location.reload();
            });
        });
        $("#startButton").on("click", () => {
            if (textBoxIsValid) {
                var bet: number = $("#placeBetTextBox").val();
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

                    // user must not give greater than in bank && positive
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

                // user must give number
                $("#placeBetTextBox").css({
                    "border": "1px solid red",
                    "color": "red"
                });
            }
        });
        $("#okFromSuccess").on("click", () => {
            $("#successMenuDiv").toggle("slide", () => {
                $("#betMenuDiv").toggle("slide");
            });
        });
        $("#okFromFailed").on("click", () => {
            $("#failedMenuDiv").toggle("slide", () => {
                $("#betMenuDiv").toggle("slide");
            });
        });
    });
} 