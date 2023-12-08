import { readFile } from "node:fs/promises";

const digitMap = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

const namedDigitRegex = new RegExp(`^(${Object.keys(digitMap).join("|")})`);

const main = async () => {
	const input = (await readFile("./input.txt")).toString("utf-8");

	const inputParsed = input.split("\n").map((item) => {
		if (item === "") {
			return 0;
		}

		let remaining = item;
		const digits = [];

		while (remaining.length > 0) {
			const digitMatch = remaining.match(/^\d/);
			const namedMatch = remaining.match(namedDigitRegex);
			if (digitMatch) {
				digits.push(digitMatch);
			} else if (namedMatch) {
				const found = remaining.match(namedDigitRegex)[0];
				digits.push(digitMap[found]);
			}
			remaining = remaining.substring(1);
		}

		const firstDigit = digits[0];
		const lastDigit = digits[digits.length - 1];

		const number = parseInt(`${firstDigit}${lastDigit}`, 10);

		return isNaN(number) ? 0 : number;
	});

	const sum = inputParsed.reduce((acc, item) => {
		return acc + item;
	}, 0);

	console.log(sum);
};

main();
