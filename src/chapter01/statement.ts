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
	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `Statement for ${invoice.customer}\n`;
	const format = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format;

	for (const perf of invoice.performances) {
		const play = plays[perf.playID];
		const thisAmount = amountFor(perf, play);
		//  add volume credits
		volumeCredits += Math.max(perf.audience - 30, 0);
		//  add extra credit for every ten comedy attendees
		if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

		// print line for this order
		result += ` ${play.name}: ${format(thisAmount / 100)} (${
			perf.audience
		} seats)\n`;
		totalAmount += thisAmount;
	}

	result += `Amount owed is ${format(totalAmount / 100)}\n`;
	result += `You earned ${volumeCredits} credits\n`;
	return result;
}

function amountFor(perf: PlayPerformance, play: PlayValue) {
	let thisAmount = 0;

	switch (play.type) {
		case 'tragedy':
			thisAmount = 40_000;
			if (perf.audience > 30) {
				thisAmount += 1_000 * (perf.audience - 30);
			}
			break;
		case 'comedy':
			thisAmount = 30_000;
			if (perf.audience > 20) {
				thisAmount += 10_000 + 500 * (perf.audience - 20);
			}
			thisAmount += 300 * perf.audience;
			break;
		default:
			throw new Error(`unknown type: ${play.type}`);
	}
	return thisAmount;
}

export default statement;
