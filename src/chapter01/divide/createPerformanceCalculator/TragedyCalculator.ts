import PerformanceCalculator from './PerformanceCalculator';

class TragedyCalculator extends PerformanceCalculator {
	get amount(): number {
		let result = 40_000;
		if (this.performance.audience > 30) {
			result += 1_000 * (this.performance.audience - 30);
		}
		return result;
	}
}

export default TragedyCalculator;
