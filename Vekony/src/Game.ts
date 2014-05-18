/// <reference path="../des/kinetic.d.ts" />
/// <reference path="../des/jquery.d.ts" />

module ShellGame {
    export class Game {
        public layer: Kinetic.Layer;
        private stage: Kinetic.Stage;
        private cashInBank: number;
        private canRaiseCups: boolean;
        private level: number;
        private bet: number;
        private cupCollection: Cup[];
        private levelLut: Object[];

        public get CashInBank(): number {
            return this.cashInBank;
        }
        public get CanRaiseCups(): boolean {
            return this.canRaiseCups;
        }

        /**
         * Starts the game
         */
        public play(): void {

            // global constants
            var constants = new Constants();

            // init game progress
            this.canRaiseCups = false;
            this.bet = 0;

            // databind to UI
            this.cashInBank = 10;
            this.level = 1;

            // make stage
            this.stage = new Kinetic.Stage({
                container: "gameCanvas",
                width: constants.CANVAS_WIDTH,
                height: constants.CANVAS_HEIGHT
            });

            // make layer
            this.layer = new Kinetic.Layer();

            // make cups
            var cup1 = new Cup(Place.Left, false, constants.CUP_IMAGE_URL, this);
            var cup2 = new Cup(Place.Middle, true, constants.CUP_IMAGE_URL, this);
            var cup3 = new Cup(Place.Right, false, constants.CUP_IMAGE_URL, this);

            this.cupCollection = [];
            this.cupCollection.push(cup1, cup2, cup3);

            // add layer to stage
            this.stage.add(this.layer);
        }

        /**
         * Public function for initing cup shuffle
         */
        public shuffleCups(bet: number) {
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
            this.putBackCups(() => {   
                this.shuffleThem(times, speed, timeout, this, 0, () => {
                    this.showSelectCupMenu();
                });
            });
        }

        /**
         * Private function for shuffling the cups (parameters depend on current
         * level)
         */
        private shuffleThem(times: number, speed: number, timeout: number, self: Game, progress: number, callBack: Function) {
            if (progress < times) {
                var random = Math.floor((Math.random() * 3));
                var otherRandom = random;
                while (otherRandom == random) {
                    otherRandom = Math.floor((Math.random() * 3));
                }
                self.cupCollection[random].swapCups(speed, self.cupCollection[otherRandom], () => {
                    setTimeout(self.shuffleThem, timeout, times, speed, timeout, self, progress + 1, callBack);
                });
            } else {
                callBack();
            }
        }

        /**
         * Shows the Select cup sidebar menu with question smiley
         */
        private showSelectCupMenu(): void {
            $("#selectCupMenuDiv").toggle("slide", () => {
                this.canRaiseCups = true;
            });
        }

        /**
         * After the user clicked on a cup, this method handles
         * win or fail.
         */
        public guess(cupHasBall: boolean): void {
            this.canRaiseCups = false;
            var self = this;
            $("#selectCupMenuDiv").toggle("slide", () => {
                if (cupHasBall) {
                    $("#successMenuDiv").toggle("slide");
                    this.updateBank(true);
                    this.increaseLevel();
                } else {
                    if (this.cashInBank === 0) {
                        $("#loseMenuDiv").toggle("slide", () => {
                            $("#gameCanvas").toggle("slide", {
                                direction: 'up'
                            });
                        });
                    } else {
                        $("#failedMenuDiv").toggle("slide");
                    }
                }
                for (var i = 0; i < self.cupCollection.length; i++){
                    if (!self.cupCollection[i].Selected) {
                        self.cupCollection[i].raiseCup();
                    }
                    self.cupCollection[i].Selected = false;
                }
            });
        }

        /**
         * Updates user's banked cash
         */
        private updateBank(succeeded: boolean) {
            if (succeeded) {
                this.cashInBank += this.bet * 2;
            } else {
                this.cashInBank -= this.bet;
            }
            $("#cashInBankLabel").text("$ " + this.cashInBank);
        }

        /**
         * Puts back all cups
         */
        public putBackCups(finished: Function): void {
            for (var i = 0; i < this.cupCollection.length; i++) {
                this.cupCollection[i].putDownCup(finished);
            }
        }

        public raiseAllCups(): void {
            for (var i = 0; i < this.cupCollection.length; i++) {
                this.cupCollection[i].raiseCup();
            }
        }

        private increaseLevel(): void {
            this.level++;
            $("#levelLabel").text("Level " + this.level);
        }
    }
} 