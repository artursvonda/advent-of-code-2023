// @ts-check
import { readFile } from "node:fs/promises";

const main = async () => {
	const input = (await readFile("./input.txt")).toString("utf-8");

	const result = input.split("\n").reduce((acc, item) => {
		if (item === "") {
			return acc;
		}

		// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
		const [, cubesString] = item.split(":");

		const max = cubesString.split(";").reduce(
			(acc, subsets) => {
				const subsetMap = Object.fromEntries(
					subsets.split(",").map((subset) => {
						const [amountString, color] = subset.trim().split(" ");
						const amount = parseInt(amountString, 10);

						return [color, amount];
					}),
				);

				return {
					red: Math.max(acc.red, subsetMap.red || 0),
					green: Math.max(acc.green, subsetMap.green || 0),
					blue: Math.max(acc.blue, subsetMap.blue || 0),
				};
			},
			{ red: 0, green: 0, blue: 0 },
		);

		const power = max.red * max.green * max.blue;

		return acc + power;
	}, 0);

	console.log(result);
};

main();
