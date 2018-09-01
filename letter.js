var Letter = function (string) {
    this.string = string,
        this.guess = false,
        this.placeholders = function () {
            if (this.string === " ") {
                return " ";
            } else if (!this.guess) {
                return "_";
            } else {
                return string;
            }
        }
    this.check = function (userGuess) {
        if (userGuess === this.string) {
            this.guess = true;
        }
    }
};

module.exports = Letter;