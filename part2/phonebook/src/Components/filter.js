const Filter = ({ value, onChange }) => {
    return (
        <div>
            filter names: <input value={value} onChange={onChange} />
        </div>
    );
};

export default Filter;
