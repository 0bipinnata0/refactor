export type Invoice = {
	customer: string;
	performances: PlayPerformance[];
};

export type PlayPerformance = {
	playID: PlayType;
	audience: number;
};

type RichPlayPerformance = PlayPerformance & {
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
	const stateData = {
		customer: invoice.customer,
		performances: invoice.performances.map(enrichPerformance)
	};
	return renderPlainText(
		{
			...stateData,
			totalVolumeCredit: totalVolumeCredit(stateData),
			totalAmount: totalAmount(stateData)
		},
		plays
	);
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
