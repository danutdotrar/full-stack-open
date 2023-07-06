const PersonForm = ({
    onSubmit,
    newName,
    handleInputChange,
    newNumber,
    handleNumberChange,
}) => {
    return (
        <form onSubmit={onSubmit}>
            <InputType
                text="name"
                newThing={newName}
                handleThing={handleInputChange}
            />
            <InputType
                text="number"
                newThing={newNumber}
                handleThing={handleNumberChange}
            />

            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

const InputType = ({ text, newThing, handleThing }) => {
    return (
        <div>
            {text}: <input value={newThing} onChange={handleThing} />
        </div>
    );
};

const Persons = ({ person, removePerson }) => {
    return (
        <li>
            {person.name} {person.number}
            <button onClick={removePerson}>delete</button>
        </li>
    );
};

export { PersonForm, Persons };
