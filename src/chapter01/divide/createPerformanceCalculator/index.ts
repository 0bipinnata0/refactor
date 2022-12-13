import type { PlayPerformance, PlayValue } from '../statement';
import PerformanceCalculator from './PerformanceCalculator';

function createPerformanceCalculator(
	aPerformance: PlayPerformance,
	aPlay: PlayValue
) {
	return new PerformanceCalculator(aPerformance, aPlay);
}

export default createPerformanceCalculator;
