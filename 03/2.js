// @ts-check
import { readFile } from "node:fs/promises";

const searchValue = /\*/g;
const main = async () => {
	const input = (await readFile("./input.txt")).toString("utf-8");

	const lines = input.split("\n").filter(Boolean);

	const symbolMap = {};

	lines.forEach((line, lineNumber) =>
		[...line.matchAll(/\d+/g)].forEach((match) => {
			const valueString = match[0];
			const value = parseInt(valueString, 10);
			const index = match.index;
			const minIndex = Math.max(index - 1, 0);
			const maxIndex = index + valueString.length;

			const onPrevLineMatch = lineNumber > 0 && [
				...lines[lineNumber - 1]
					.substring(minIndex, maxIndex + 1)
					.matchAll(searchValue),
			];
			if (onPrevLineMatch?.length) {
				onPrevLineMatch.forEach((match) => {
					const mapIndex = [lineNumber - 1, minIndex + match.index].join(":");
					symbolMap[mapIndex] = [...(symbolMap[mapIndex] ?? []), value];
				});
			}
			const onNextLineMatch = lines[lineNumber + 1] && [
				...lines[lineNumber + 1]
					.substring(minIndex, maxIndex + 1)
					.matchAll(searchValue),
			];
			if (onNextLineMatch?.length) {
				onNextLineMatch.forEach((match) => {
					const mapIndex = [lineNumber + 1, minIndex + match.index].join(":");
					symbolMap[mapIndex] = [...(symbolMap[mapIndex] ?? []), value];
				});
			}
			if (line[index - 1] === "*") {
				const mapIndex = [lineNumber, index - 1].join(":");
				symbolMap[mapIndex] = [...(symbolMap[mapIndex] ?? []), value];
			}
			if (line[maxIndex] === "*") {
				const mapIndex = [lineNumber, maxIndex].join(":");
				symbolMap[mapIndex] = [...(symbolMap[mapIndex] ?? []), value];
			}
		}),
	);

	const result = Object.values(symbolMap)
		.filter((values) => values.length === 2)
		.reduce((acc, curr) => acc + curr[0] * curr[1], 0);

	console.log(result);
};

main();
