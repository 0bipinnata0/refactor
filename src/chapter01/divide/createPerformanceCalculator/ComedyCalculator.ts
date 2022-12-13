import PerformanceCalculator from './PerformanceCalculator';

class ComedyCalculator extends PerformanceCalculator {
	get amount(): number {
		let result = 30_000;
		if (this.performance.audience > 20) {
			result += 10_000 + 500 * (this.performance.audience - 20);
		}
		result += 300 * this.performance.audience;
		return result;
	}
}

export default ComedyCalculator;
