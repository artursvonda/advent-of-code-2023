// @ts-check
import { readFile } from "node:fs/promises";

// 12 red cubes, 13 green cubes, and 14 blue cubes
const max = {
	red: 12,
	green: 13,
	blue: 14,
};

const main = async () => {
	const input = (await readFile("./input.txt")).toString("utf-8");
	let possibleGames = 0;

	input.split("\n").forEach((item) => {
		if (item === "") {
			return;
		}

		// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
		const [gameString, cubesString] = item.split(":");
		const game = parseInt(gameString.match(/\d+/)[0], 10);

		const valid = cubesString.split(";").every((subsets) => {
			return subsets.split(",").every((subset) => {
				const [amountString, color] = subset.trim().split(" ");
				const amount = parseInt(amountString, 10);

				return amount <= max[color];
			});
		});

		if (valid) {
			possibleGames += game;
		}
	});

	console.log(possibleGames);
};

main();
