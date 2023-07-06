import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

import Filter from "./Components/filter";
import { PersonForm, Persons } from "./Components/personform";

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }

    return <div className="error">{message}</div>;
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [newError, setErrorMessage] = useState(null);

    useEffect(() => {
        personService.getAll().then((response) => {
            setPersons(response.data);
        });
    }, []);

    const addName = (e) => {
        e.preventDefault();

        const existingPerson = persons.find(
            (person) => person.name === newName
        );

        if (existingPerson) {
            alert(`${newName} already exists`);
        } else {
            const personsObject = {
                name: newName,
                number: newNumber,
            };

            personService.create(personsObject).then((response) => {
                setPersons(persons.concat(response.data));

                setNewName("");

                setNewNumber("");
            });

            setErrorMessage(`Added ${personsObject.name}`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 2000);
        }
    };

    const removePerson = (id) => {
        const person = persons.filter((person) => person.id !== id);
        personService
            .deletePerson(id)
            .then(() => setPersons(person))
            .catch((error) => console.log(error));
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

            <Notification message={newError} />

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
                    {personsToShow.map((person) => (
                        <Persons
                            key={person.id}
                            person={person}
                            removePerson={() => removePerson(person.id)}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
