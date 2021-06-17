import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchForm = ({ handleInputChange, countrySearched }) => {
  return (
    <form>
      <div>
        find countries{" "}
        <input
          type="text"
          onChange={handleInputChange}
          value={countrySearched}
        />
      </div>
    </form>
  );
};

const Weather = ({ country }) => {
  const [weather, setWeather] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        console.log(response.data.current);
        setWeather(response.data);
      });
  }, [api_key, country.capital]);

  if (!weather) {
    return <div></div>;
  }
  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>
        <b>temparature:</b> {weather.current.temperature} celcius
      </p>
      <p>
        <img
          src={weather.current.weather_icons}
          alt={weather.current.weather_descriptions}
        />
      </p>
      <p>
        <strong>wind</strong> {weather.current.wind_speed} mph, direction{" "}
        {weather.current.wind_dir}
      </p>
    </div>
  );
};

const Country = ({ country }) => {
  console.log(country);
  return (
    <div>
      <h2>{country.name}</h2>

      <div>capital {country.capital}</div>
      <div>population {country.population}</div>

      <div>
        <h3>languages</h3>
        {country.languages.map((language) => (
          <div key={language}>{language.name}</div>
        ))}
      </div>

      <img src={country.flag} alt={`Flag of ${country.name}`} width="150" />
      <Weather country={country} />
    </div>
  );
};

const Countries = ({ countries, countrySearched, setCountrySearched }) => {
  const filteredCountries =
    countrySearched !== ""
      ? countries.filter((country, i) =>
          country.name.toLowerCase().includes(countrySearched.toLowerCase())
        )
      : countries;

  const handleCountrySwitch = (country) => () => {
    setCountrySearched(country.country.name);
  };

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else {
    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name}>
            {country.name}{" "}
            <button onClick={handleCountrySwitch({ country })}>show</button>
          </div>
        ))}
      </div>
    );
  }
};
const App = () => {
  const [countrySearched, setCountrySearched] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setCountrySearched(event.target.value);
  };

  return (
    <div>
      <SearchForm handleInputChange={handleSearch} country={countrySearched} />
      <Countries
        countries={countries}
        countrySearched={countrySearched}
        setCountrySearched={setCountrySearched}
      />
    </div>
  );
};

export default App;
