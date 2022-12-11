import createStatementData from './createStatementData';

export type Invoice = {
	customer: string;
	performances: PlayPerformance[];
};

export type PlayPerformance = {
	playID: PlayType;
	audience: number;
};

export type RichPlayPerformance = PlayPerformance & {
	play: PlayValue;
	amount: number;
	volumeCredits: number;
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
	return renderPlainText(createStatementData(invoice, plays), plays);
}

function renderPlainText(
	data: {
		customer: string;
		performances: RichPlayPerformance[];
		totalVolumeCredit: number;
		totalAmount: number;
	},
	plays: Plays
) {
	let result = `Statement for ${data.customer}\n`;
	for (const perf of data.performances) {
		// print line for this order
		result += ` ${perf.play.name}: ${usd(perf.amount / 100)} (${
			perf.audience
		} seats)\n`;
	}
	result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
	result += `You earned ${data.totalVolumeCredit} credits\n`;
	return result;

	// function format(aNumber: number) {
	function usd(aNumber: number) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2
		}).format(aNumber);
	}
}
export default statement;
