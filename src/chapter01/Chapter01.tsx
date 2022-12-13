import invoices from './invoices.json';

import plays from './plays.json';

import statement from './divide/statement';
const Chapter01 = () => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignored
	const result = statement(invoices[0], plays);
	console.info(result);
	return <div>chapter01</div>;
};

export default Chapter01;
