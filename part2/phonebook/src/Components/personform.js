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

const Persons = ({ showArr }) => {
    return showArr.map((person) => (
        <li key={person.id}>
            {person.name} {person.number}
        </li>
    ));
};

export { PersonForm, Persons };
