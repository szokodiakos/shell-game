var ShellGame;
(function (ShellGame) {
    var Game = (function () {
        function Game() {
        }
        Object.defineProperty(Game.prototype, "CashInBank", {
            get: function () {
                return this.cashInBank;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Game.prototype, "CanRaiseCups", {
            get: function () {
                return this.canRaiseCups;
            },
            enumerable: true,
            configurable: true
        });

        Game.prototype.play = function () {
            var constants = new ShellGame.Constants();

            this.canRaiseCups = false;
            this.bet = 0;

            this.cashInBank = 10;
            this.level = 1;

            this.stage = new Kinetic.Stage({
                container: "gameCanvas",
                width: constants.CANVAS_WIDTH,
                height: constants.CANVAS_HEIGHT
            });

            this.layer = new Kinetic.Layer();

            var cup1 = new ShellGame.Cup(0 /* Left */, false, constants.CUP_IMAGE_URL, this);
            var cup2 = new ShellGame.Cup(1 /* Middle */, true, constants.CUP_IMAGE_URL, this);
            var cup3 = new ShellGame.Cup(2 /* Right */, false, constants.CUP_IMAGE_URL, this);

            this.cupCollection = [];
            this.cupCollection.push(cup1, cup2, cup3);

            this.stage.add(this.layer);
        };

        Game.prototype.shuffleCups = function (bet) {
            var _this = this;
            var times = Math.floor(this.level * 1.1);
            var speed = Math.floor(20 - this.level * 0.7);
            if (speed < 2) {
                speed = 2;
            }
            var timeout = Math.floor(1000 - this.level * 50);
            if (timeout < 0) {
                timeout = 0;
            }
            console.log("times: " + times + "\nspeed: " + speed + "\ntimeout: " + timeout);
            this.bet = bet;
            this.updateBank(false);
            this.putBackCups(function () {
                _this.shuffleThem(times, speed, timeout, _this, 0, function () {
                    _this.showSelectCupMenu();
                });
            });
        };

        Game.prototype.shuffleThem = function (times, speed, timeout, self, progress, callBack) {
            if (progress < times) {
                var random = Math.floor((Math.random() * 3));
                var otherRandom = random;
                while (otherRandom == random) {
                    otherRandom = Math.floor((Math.random() * 3));
                }
                self.cupCollection[random].swapCups(speed, self.cupCollection[otherRandom], function () {
                    setTimeout(self.shuffleThem, timeout, times, speed, timeout, self, progress + 1, callBack);
                });
            } else {
                callBack();
            }
        };

        Game.prototype.showSelectCupMenu = function () {
            var _this = this;
            $("#selectCupMenuDiv").toggle("slide", function () {
                _this.canRaiseCups = true;
            });
        };

        Game.prototype.guess = function (cupHasBall) {
            var _this = this;
            this.canRaiseCups = false;
            var self = this;
            $("#selectCupMenuDiv").toggle("slide", function () {
                if (cupHasBall) {
                    $("#successMenuDiv").toggle("slide");
                    _this.updateBank(true);
                    _this.increaseLevel();
                } else {
                    if (_this.cashInBank === 0) {
                        $("#loseMenuDiv").toggle("slide", function () {
                            $("#gameCanvas").toggle("slide", {
                                direction: 'up'
                            });
                        });
                    } else {
                        $("#failedMenuDiv").toggle("slide");
                    }
                }
                for (var i = 0; i < self.cupCollection.length; i++) {
                    if (!self.cupCollection[i].Selected) {
                        self.cupCollection[i].raiseCup();
                    }
                    self.cupCollection[i].Selected = false;
                }
            });
        };

        Game.prototype.updateBank = function (succeeded) {
            if (succeeded) {
                this.cashInBank += this.bet * 2;
            } else {
                this.cashInBank -= this.bet;
            }
            $("#cashInBankLabel").text("$ " + this.cashInBank);
        };

        Game.prototype.putBackCups = function (finished) {
            for (var i = 0; i < this.cupCollection.length; i++) {
                this.cupCollection[i].putDownCup(finished);
            }
        };

        Game.prototype.raiseAllCups = function () {
            for (var i = 0; i < this.cupCollection.length; i++) {
                this.cupCollection[i].raiseCup();
            }
        };

        Game.prototype.increaseLevel = function () {
            this.level++;
            $("#levelLabel").text("Level " + this.level);
        };
        return Game;
    })();
    ShellGame.Game = Game;
})(ShellGame || (ShellGame = {}));
