import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./Components/filter";
import { PersonForm, Persons } from "./Components/personform";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/persons")
            .then((response) => setPersons(response.data));
    }, []);

    const addName = (e) => {
        e.preventDefault();

        const existingPerson = persons.find(
            (person) => person.name === newName
        );

        console.log(existingPerson);

        if (existingPerson) {
            alert(`${newName} already exists`);
        } else {
            const personsObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1,
            };
            setPersons(persons.concat(personsObject));
        }

        setNewName("");
        setNewNumber("");
    };

    const handleInputChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleFilterChange = (e) => {
        console.log(e.target.value);
        setNewFilter(e.target.value);
    };
    const personsToShow = newFilter
        ? persons.filter(
              (person) => person.name.toLowerCase() === newFilter.toLowerCase()
          )
        : persons;

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter value={newFilter} onChange={handleFilterChange} />

            <h2>Add new</h2>

            <PersonForm
                onSubmit={addName}
                newName={newName}
                newNumber={newNumber}
                handleInputChange={handleInputChange}
                handleNumberChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <div>
                <ul>
                    <Persons showArr={personsToShow} />
                </ul>
            </div>
        </div>
    );
};

export default App;
