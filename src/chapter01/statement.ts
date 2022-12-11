export type Invoice = {
	customer: string;
	performances: PlayPerformance[];
};

export type PlayPerformance = {
	playID: PlayType;
	audience: number;
};

export type PlayType = 'hamlet' | 'as-like' | 'othello';
export type PlayValue = {
	name: string;
	type: 'tragedy' | 'comedy';
};

export type Plays = {
	[key in PlayType]: PlayValue;
};

function statement(invoice: Invoice, plays: Plays) {
	function amountFor(aPerformance: PlayPerformance) {
		let result = 0;
		switch (playFor(aPerformance).type) {
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
				throw new Error(`unknown type: ${playFor(aPerformance).type}`);
		}
		return result;
	}
	function playFor(aPerformance: PlayPerformance) {
		return plays[aPerformance.playID];
	}
	function volumeCreditsFor(aPerformance: PlayPerformance) {
		let result = 0;
		result += Math.max(aPerformance.audience - 30, 0);
		//  add extra credit for every ten comedy attendees
		if ('comedy' === playFor(aPerformance).type) {
			result += Math.floor(aPerformance.audience / 5);
		}
		return result;
	}

	// function format(aNumber: number) {
	function usd(aNumber: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2
		}).format(aNumber);
	}

	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `Statement for ${invoice.customer}\n`;
	for (const perf of invoice.performances) {
		volumeCredits += volumeCreditsFor(perf);

		// print line for this order
		result += ` ${playFor(perf).name}: ${usd(amountFor(perf) / 100)} (${
			perf.audience
		} seats)\n`;
		totalAmount += amountFor(perf);
	}

	result += `Amount owed is ${usd(totalAmount / 100)}\n`;
	result += `You earned ${volumeCredits} credits\n`;
	return result;
}

export default statement;
