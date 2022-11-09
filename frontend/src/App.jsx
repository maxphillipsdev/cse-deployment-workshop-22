import React from 'react';
import './App.css';

const BASE_URL =
  'https://cse-deployment-workshop-22-production-7dea.up.railway.app';

function App() {
  const [results, setResults] = React.useState([]);

  const fetchResults = async () => {
    setResults([]);
    fetch(`${BASE_URL}/results`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  };

  const handleClick = async (crewmate) => {
    await fetch(`${BASE_URL}/vote`, {
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
        {/*  embed a gif */}
        <img src="https://media.tenor.com/9t6T1DT0oFUAAAAC/sussy-imposter-sussy.gif" />
        <div className="results">
          {results &&
            results.map((result) => (
              <Result
                key={result.crewmate}
                result={result}
                handleClick={handleClick}
              />
            ))}
        </div>
      </header>
    </div>
  );
}

const Result = ({ result, handleClick }) => {
  return (
    <div>
      <p>{result.crewmate}</p>
      <p>{result.votes && `${result.votes} votes`}</p>
      <button onClick={() => handleClick(result.crewmate)}>Vote</button>
    </div>
  );
};

export default App;
