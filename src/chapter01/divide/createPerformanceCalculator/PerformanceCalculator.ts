import type { PlayPerformance, PlayValue } from '../statement';
class PerformanceCalculator {
	performance: PlayPerformance;
	play: PlayValue;
	constructor(aPerformance: PlayPerformance, aPlay: PlayValue) {
		this.performance = aPerformance;
		this.play = aPlay;
	}

	get amount() {
		let result = 0;
		switch (this.play.type) {
			case 'tragedy':
				result = 40_000;
				if (this.performance.audience > 30) {
					result += 1_000 * (this.performance.audience - 30);
				}
				break;
			case 'comedy':
				result = 30_000;
				if (this.performance.audience > 20) {
					result += 10_000 + 500 * (this.performance.audience - 20);
				}
				result += 300 * this.performance.audience;
				break;
			default:
				throw new Error(`unknown type: ${this.play.type}`);
		}
		return result;
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
