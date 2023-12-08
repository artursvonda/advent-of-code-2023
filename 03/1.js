// @ts-check
import { readFile } from "node:fs/promises";

const searchValue = /[\d.]/g;
const main = async () => {
	const input = (await readFile("./input.txt")).toString("utf-8");

	const lines = input.split("\n").filter(Boolean);

	const partNumbers = lines
		.map((line, lineNumber) =>
			[...line.matchAll(/\d+/g)]
				.map((match) => {
					const valueString = match[0];
					const value = parseInt(valueString, 10);
					const index = match.index;
					const minIndex = Math.max(index - 1, 0);
					const maxIndex = index + valueString.length;

					const onPrevLineMatch =
						lineNumber > 0 &&
						lines[lineNumber - 1]
							.substring(minIndex, maxIndex + 1)
							.replaceAll(searchValue, "");
					const onPrevLine = !!onPrevLineMatch;
					const onNextLineMatch =
						lines[lineNumber + 1] &&
						lines[lineNumber + 1]
							.substring(minIndex, maxIndex + 1)
							.replaceAll(searchValue, "");
					const onNextLine = !!onNextLineMatch;
					const onPrev = line[index - 1] && !line[index - 1].match(searchValue);
					const onNext = line[maxIndex] && !line[maxIndex].match(searchValue);
					const valid = onPrevLine || onNextLine || onPrev || onNext;

					return valid ? value : 0;
				})
				.filter(Boolean)
				.reduce((acc, item) => acc + item, 0),
		)
		.reduce((acc, item) => acc + item, 0);

	console.log(partNumbers);
};

main();
