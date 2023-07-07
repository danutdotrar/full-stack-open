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
                    // if (matchingCountries.length > 10) {
                    //     setCountry([
                    //         "Too many matches, specify another filter",
                    //     ]);
                    // }

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
                {country.length > 0 && (
                    <>
                        {country.length > 1 ? (
                            <ul>
                                {country.map((country) => (
                                    <li key={country}>{country}</li>
                                ))}
                            </ul>
                        ) : country.length == 1 ? (
                            <>
                                <ul>
                                    <li>
                                        {/* {TO DO - TEST WITOUT THE CONSOLE.LOG} */}

                                        {console.log(country.length)}
                                        {country[0].name.common}
                                    </li>
                                </ul>
                            </>
                        ) : (
                            ""
                        )}{" "}
                    </>
                )}
            </div>
        </div>
    );
};

export default App;
