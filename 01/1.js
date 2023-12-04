import {readFile} from "node:fs/promises";

const main = async () => {
    const input = (await readFile('./input.txt')).toString('utf-8')

    const inputParsed = input.split('\n').map((item) => {
        let digits = item.replaceAll(/\D/g, '');
        const firstDigit = digits[0];
        const lastDigit = digits[digits.length - 1];

        const number = parseInt(firstDigit + lastDigit, 10);

        return isNaN(number) ? 0 : number;
    });

    const sum = inputParsed.reduce((acc, item) => {
        return acc + item;
    }, 0)

    console.log(sum);

}

main();
