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
	return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data: {
	customer: string;
	performances: RichPlayPerformance[];
	totalVolumeCredit: number;
	totalAmount: number;
}) {
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
}

function htmlStatement(invoice: Invoice, plays: Plays) {
	return renderHTML(createStatementData(invoice, plays));
}

function renderHTML(data: {
	customer: string;
	performances: RichPlayPerformance[];
	totalVolumeCredit: number;
	totalAmount: number;
}) {
	let result = `<h1>Statement for ${data.customer}</h1>\n`;
	result += '<table>\n';
	for (const perf of data.performances) {
		// print line for this order
		result += `<tr><td>${perf.play.name} </td><td> ${perf.audience} seats</td>`;
		result += `<td>${usd(perf.amount)}</td></tr>\n`;
	}
	result += '</table>\n';
	result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
	result += `<p>You earned <em>${data.totalVolumeCredit}</em> credits</p>\n`;
	return result;
}

// function format(aNumber: number) {
function usd(aNumber: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	}).format(aNumber / 100);
}
export default statement;
