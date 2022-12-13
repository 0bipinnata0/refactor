import type { PlayPerformance, PlayValue } from '../statement';

class PerformanceCalculator {
	performance: PlayPerformance;
	play: PlayValue;
	constructor(aPerformance: PlayPerformance, aPlay: PlayValue) {
		this.performance = aPerformance;
		this.play = aPlay;
	}

	get amount(): number {
		throw new Error('subclass responsibility');
	}

	get volumeCredits(): number {
		return Math.max(this.performance.audience - 30, 0);
	}
}

export default PerformanceCalculator;
