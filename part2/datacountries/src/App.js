import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [country, setCountry] = useState([]);
    const [searchCountry, setSearchCountry] = useState("");

    useEffect(() => {
        console.log("country - ", searchCountry);

        if (searchCountry) {
            console.log("fetching country data...");

            axios
                .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
                .then((response) => {
                    const matchingCountries = response.data.filter((country) =>
                        country.name.common
                            .toLowerCase()
                            .includes(searchCountry.toLowerCase())
                    );

                    // Over 10 countries
                    if (matchingCountries.length > 10) {
                        setCountry(["too many"]);
                    }

                    // Between 1 and 10
                    if (
                        matchingCountries.length > 1 &&
                        matchingCountries.length < 10
                    ) {
                        if (matchingCountries) {
                            setCountry(
                                matchingCountries.map(
                                    (country) => country.name.common
                                )
                            );
                        }
                    }

                    if (matchingCountries.length == 1) {
                        setCountry(matchingCountries);

                        console.log(matchingCountries);
                    }
                });
        }
    }, [searchCountry]);

    const handleInputChange = (e) => {
        setSearchCountry(e.target.value);
    };

    return (
        <div>
            <h2>Find countries:</h2>
            <input value={searchCountry} onChange={handleInputChange} />
            <div>
                {
                    <>
                        <RenderCountry country={country} />
                    </>
                }
            </div>
        </div>
    );
};

const RenderCountry = ({ country }) => {
    if (country.length < 10 && country.length > 1) {
        return (
            <>
                <ul>
                    {country.map((country) => (
                        <li key={country}>{country}</li>
                    ))}
                </ul>
            </>
        );
    }

    if (country == "too many") {
        console.log("nullll");
        return (
            <>
                <p>Too many matches, please specify another filter</p>
            </>
        );
    }

    if (country.length == 1) {
        return (
            <>
                <h2>{country[0].name.common}</h2>
                <p>Capital: {country[0].capital}</p>
                <p>Area: {country[0].area}</p>

                <h2>Languages:</h2>
                <ul>
                    {typeof country[0].languages === "object"
                        ? Object.values(country[0].languages).map(
                              (value, key) => <li key={key}>{value}</li>
                          )
                        : ""}
                </ul>
                <div>
                    <img
                        src={country[0].flags.png}
                        style={{ width: "200px" }}
                    />
                </div>
            </>
        );
    }
};

export default App;
