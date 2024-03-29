export function range(start = 0, end?: number, step?: number, isRight = false) {
	if (!start && !end) return [];

	if (!end) {
		end = start;
		start = 0;
	}

	if (step === undefined) {
		step = end < start ? -1 : 1;
	}

	const result = [];
	const length = Math.abs(Math.ceil((end - start) / (step || 1)));

	for (let i = 0; i < length; i++) {
		result.push(start);
		start += step;
	}

	return isRight ? result.reverse() : result;
}

export function rangeRight(start = 0, end?: number, step?: number) {
	return range(start, end, step, true);
}
