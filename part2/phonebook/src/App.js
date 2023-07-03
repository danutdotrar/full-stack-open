import { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
    const [newName, setNewName] = useState("");

    const addName = (e) => {
        e.preventDefault();

        const personsObject = {
            name: newName,
            id: persons.length + 1,
        };

        setPersons(persons.concat(personsObject));
        checkIfExists(newName);
        setNewName("");
    };

    const handleInputChange = (e) => {
        console.log(e.target.value);
        setNewName(e.target.value);
    };

    const checkIfExists = (input) => {
        persons.filter((person) =>
            person.name === input ? alert(`${input} already exists`) : ""
        );
    };

    return (
        <div>
            <h2>Phonebook</h2>

            <form onSubmit={addName}>
                <div>
                    name: <input value={newName} onChange={handleInputChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>

            <h2>Numbers</h2>
            <div>
                <ul>
                    {persons.map((person) => (
                        <li key={person.id}>{person.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
