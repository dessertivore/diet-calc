import logo from './logo.png';
import React, {useState, useEffect} from 'react';

function MyForm() {
  const [weight, setWeight] = useState(''); 
  const [ageYears, setAgeYears] = useState('');   
  const [ageMonths, setAgeMonths] = useState(''); 
  const [kcalReq, setKcalRequirement] = useState(0);
  const [fluidReq, setFluidRequirement] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8000/?weight=${weight}&years=${ageYears}&months=${ageMonths}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Extract numeric values from the API response
        const { "kcal req": kcalReq, "fluid req": fluidReq } = data;
        setKcalRequirement(kcalReq);
        setFluidRequirement(fluidReq);
        setData(data); // Set the data for conditional rendering
      })
      .catch((error) => {
        console.error('API Error:', error);
      });
  }, [weight, ageYears, ageMonths]);

  
  return (
    <div>
      <h1>Nutritional Calculator</h1>
      <form>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <br />
        <label>
          Age (years):
          <input
            type="number"
            value={ageYears}
            onChange={(e) => setAgeYears(e.target.value)}
          />
        </label>
        <br />
        <label>
          Age (months):
          <input
            type="number"
            value={ageMonths}
            onChange={(e) => setAgeMonths(e.target.value)}
          />
        </label>
      </form>
      {data ? (
        <div>
          {kcalReq !== 0 && fluidReq !== 0 ? (
            <div>
              <p>Kcal Requirement: {kcalReq}</p>
              <p>Fluid Requirement: {fluidReq}</p>
            </div>
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Calculate the nutritional requirements for infants under 1 year of age.
        </p>
        <a
          className="App-link"
          href="https://www.sophietalksfood.co.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Sophie Landau <code>(@SophieTalksFood)</code> 
        </a>
        <MyForm />

      </header>
      
      </div>
  );
}

export default App;
