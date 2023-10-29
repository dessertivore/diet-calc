import logo from './logo.png';
import React, {useState, useEffect} from 'react';
import './index.css';

//this is the form which takes the data and then outputs the calcs
function MyForm() {
  const [data, setData] = useState({
    weight: '',
    years: '',
    months: '',
  });
  const [kcalReq, setKcalRequirement] = useState(0);
  const [fluidReq, setFluidRequirement] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/calc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          setKcalRequirement(responseData['kcal req']);
          setFluidRequirement(responseData['fluid req']);
        } else {
          console.error('Failed to fetch data from the server.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Call fetchData when the data object changes
    fetchData();
  }, [data]);

  return (
    <div>
      <form>
        <label>
          Weight (kg):
          <input
            type="number"
            value={data.weight}
            //autorefresh - no need for submit button
            onChange={(e) => setData({ ...data, weight: parseFloat(e.target.value) })}
          />
        </label>
        <br />
        <label>
          Age (years):
          <input
            type="number"
            value={data.years}
            onChange={(e) => setData({ ...data, years: parseInt(e.target.value)})}
          />
        </label>
        <br />
        <label>
          Age (months):
          <input
            type="number"
            value={data.months}
            onChange={(e) => setData({...data, months: parseInt(e.target.value)})}
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
  )}

   //what the webpage looks like
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Nutritional Calculator</h1>
        <p>
          Calculate the nutritional requirements for infants under 1 year of age.
        </p>
        <a
          className="App-link"
          href="https://www.sophietalksfood.co.uk"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Sophie Landau (@SophieTalksFood)
        </a>
        <MyForm />

      </header>
      
      </div>
  );
}

export default App;
