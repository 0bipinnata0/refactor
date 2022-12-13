import createPerformanceCalculator from './createPerformanceCalculator';
import type {
	Invoice,
	Plays,
	PlayPerformance,
	RichPlayPerformance
} from './statement';
function createStatementData(invoice: Invoice, plays: Plays) {
	const stateData = {
		customer: invoice.customer,
		performances: invoice.performances.map(enrichPerformance)
	};
	return {
		...stateData,
		totalVolumeCredit: totalVolumeCredit(stateData),
		totalAmount: totalAmount(stateData)
	};
	function playFor(aPerformance: PlayPerformance) {
		return plays[aPerformance.playID];
	}

	function totalVolumeCredit(data: {
		performances: {
			volumeCredits: RichPlayPerformance['volumeCredits'];
		}[];
	}) {
		return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
	}

	function totalAmount(data: {
		performances: {
			amount: RichPlayPerformance['amount'];
		}[];
	}) {
		return data.performances.reduce((total, p) => total + p.amount, 0);
	}

	function enrichPerformance(aPerformance: PlayPerformance) {
		const calculator = createPerformanceCalculator(
			aPerformance,
			playFor(aPerformance)
		);
		return {
			...aPerformance,
			play: calculator.play,
			amount: calculator.amount,
			volumeCredits: calculator.volumeCredits
		};
	}
}

export default createStatementData;
