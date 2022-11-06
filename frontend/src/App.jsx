import React from 'react';
import './App.css';

function App() {
  const [results, setResults] = React.useState([]);

  const fetchResults = async () => {
    setResults([]);
    fetch('/api/results')
      .then((res) => res.json())
      .then((data) => setResults(data));
  };

  const handleClick = async (crewmate) => {
    await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ crewmate }),
    });
    await fetchResults();
  };

  React.useEffect(() => fetchResults(), []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Who is sus?</h1>
        {results &&
          results.map((result) => (
            <div key={result.crewmate}>
              <p>
                {result.crewmate}
                {result.votes && `: ${result.votes} votes.`}
              </p>
              <button onClick={() => handleClick(result.crewmate)}>Vote</button>
            </div>
          ))}
      </header>
    </div>
  );
}

export default App;
