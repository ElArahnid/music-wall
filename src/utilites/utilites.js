
export const getNumber = (max = 101, min = 0) =>
    Math.floor(Math.random() * (max - min) + min);

    export const getColor = (a = 100) =>
    `rgba(${getNumber(256)},${getNumber(256)},${getNumber(256)},${a / 100})`;

    export const getWord = (n, w0, w1, w2) => {
    if (n % 100 < 11 || n % 100 > 14) {
        if (n % 10 === 1) {
            return w1;
        } else if (n % 10 >= 2 && n % 10 <= 4) {
            return w2;
        } else {
            return w0;
        }
    } else {
        return w0;
    }
};