import { useState } from "react";

const Button = ({ handleClick, text }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const Title = ({ title }) => <h1>{title}</h1>;

const points = Array(8).fill(0);

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [voted, setVoted] = useState(0);
    const [max, setMax] = useState(0);

    const setRandomSelected = () => {
        const randomNumber = Math.floor(Math.random() * anecdotes.length);
        setSelected(randomNumber);
    };

    const setMostVoted = (index) => {
        points[index] += 1;
        setVoted(points[index]);

        setTheMax(points);
    };

    const setTheMax = (arr) => {
        let indexMax = arr.indexOf(Math.max(...arr));

        setMax(indexMax);
    };

    return (
        <>
            <Title title={"Anecdote of the day"} />

            <div>{anecdotes[selected]}</div>
            <p>has {points[selected]} votes</p>

            <Button
                handleClick={() => setMostVoted([selected])}
                text={"vote"}
            />
            <Button
                handleClick={() => setRandomSelected()}
                text={"next anecdote"}
            />
            <Title title={"Anecdote with most votes"} />

            <p>{anecdotes[max]}</p>
            <p>has {points[max]} votes</p>
        </>
    );
};
export default App;
