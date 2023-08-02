const Form = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <button type="submit">Save Blog List</button>
        </form>
    );
};

const FormInput = ({ text, value, handler }) => {
    return (
        <div>
            {text}: <input value={value} onChange={handler} />
        </div>
    );
};

export { Form, FormInput };
