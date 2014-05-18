module ShellGame {
    export class Ball {
        private constants: Constants;
        private game: Game;
        private kineticImage: Kinetic.Image;

        get KineticImage(): Kinetic.Image {
            return this.kineticImage;
        }

        constructor(imageUrl: string, game: Game, position: Position) {
            this.constants = new Constants();
            this.game = game;
            var image = new Image();
            image.src = imageUrl;
            var self = this;
            image.onload = () => {
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
            }
        }
    }
} 