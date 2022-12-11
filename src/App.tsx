import { useState } from 'react';
import './App.scss';
import Chapter01 from './chapter01/Chapter01';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<div>
				<button
					onClick={() => {
						setCount(count + 1);
					}}
				>
					+1
				</button>
				<div>{count}</div>
				<button onClick={() => setCount(count - 1)}>-1</button>
			</div>
			<div>test home page</div>
			<Chapter01 />
		</div>
	);
}

export default App;
