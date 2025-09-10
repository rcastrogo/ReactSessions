import { useState } from 'react';

import './App.css';

import PolButton from './PolButton';



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <PolButton></PolButton>
      </div>
      <footer>
        {JSON.stringify(count)}
      </footer>
    </>
  );
}

export default App;
