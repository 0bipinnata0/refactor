import type {
	Invoice,
	Plays,
	PlayPerformance,
	PlayValue,
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

	function amountFor(
		aPerformance: PlayPerformance & {
			play: PlayValue;
		}
	) {
		let result = 0;
		switch (aPerformance.play.type) {
			case 'tragedy':
				result = 40_000;
				if (aPerformance.audience > 30) {
					result += 1_000 * (aPerformance.audience - 30);
				}
				break;
			case 'comedy':
				result = 30_000;
				if (aPerformance.audience > 20) {
					result += 10_000 + 500 * (aPerformance.audience - 20);
				}
				result += 300 * aPerformance.audience;
				break;
			default:
				throw new Error(`unknown type: ${aPerformance.play.type}`);
		}
		return result;
	}

	function volumeCreditsFor(
		aPerformance: PlayPerformance & {
			play: PlayValue;
		}
	) {
		let result = 0;
		result += Math.max(aPerformance.audience - 30, 0);
		//  add extra credit for every ten comedy attendees
		if ('comedy' === aPerformance.play.type) {
			result += Math.floor(aPerformance.audience / 5);
		}
		return result;
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
		const onePhase = {
			...aPerformance,
			play: playFor(aPerformance)
		};
		return {
			...onePhase,
			amount: amountFor(onePhase),
			volumeCredits: volumeCreditsFor(onePhase)
		};
	}
}

export default createStatementData;
