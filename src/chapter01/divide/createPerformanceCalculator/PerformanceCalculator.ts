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
	get volumeCredits() {
		let result = 0;
		result += Math.max(this.performance.audience - 30, 0);
		//  add extra credit for every ten comedy attendees
		if ('comedy' === this.play.type) {
			result += Math.floor(this.performance.audience / 5);
		}
		return result;
	}
}

export default PerformanceCalculator;
