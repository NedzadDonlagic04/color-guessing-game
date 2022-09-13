// Used to represent the randomly generated hsl colors
export class HSL {
    constructor()
    {
        const randNum = (min, max) => {
            return Math.floor( Math.random() * (max - min) ) + min;
        }

        this.hue = randNum(0, 360);
        this.saturation = randNum(0, 101);
        this.lightness = randNum(0, 101);
    }

    get hsl()
    {
        return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
    }
}