import { useState } from 'react';
import './App.scss';

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
		</div>
	);
}

export default App;
