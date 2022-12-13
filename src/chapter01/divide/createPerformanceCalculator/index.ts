import type { PlayPerformance, PlayValue } from '../statement';
import ComedyCalculator from './ComedyCalculator';
import TragedyCalculator from './TragedyCalculator';

function createPerformanceCalculator(
	aPerformance: PlayPerformance,
	aPlay: PlayValue
) {
	switch (aPlay.type) {
		case 'tragedy':
			return new TragedyCalculator(aPerformance, aPlay);
		case 'comedy':
			return new ComedyCalculator(aPerformance, aPlay);
		default:
			throw new Error(`unknow type: ${aPlay.type}`);
	}
}

export default createPerformanceCalculator;
