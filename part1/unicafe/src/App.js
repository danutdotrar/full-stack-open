import { useState } from "react";

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const Header = ({ text }) => <h1>{text}</h1>;

const StatisticsLine = ({ string, state }) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td>{string}</td>
                    <td>{state}</td>
                </tr>
            </tbody>
        </table>
    );
};

const Statistics = ({ good, neutral, bad, all, average, positiveFeedback }) => {
    if (all == 0) return <p>No feedback given</p>;

    return (
        <>
            <StatisticsLine string={"good"} state={good} />
            <StatisticsLine string={"neutral"} state={neutral} />
            <StatisticsLine string={"bad"} state={bad} />
            <StatisticsLine string={"all"} state={all} />
            <StatisticsLine string={"average"} state={average} />
            <StatisticsLine string={"positive"} state={positiveFeedback} />
        </>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const all = good + bad + neutral;
    const average = (good * 1 + neutral * 0 + bad * -1) / all || 0;
    const positiveFeedback = all ? (good / all) * 100 : 0;

    const setToGood = (value) => {
        setGood(value);
    };

    const setToNeutral = (value) => {
        setNeutral(value);
    };

    const setToBad = (value) => {
        setBad(value);
    };

    return (
        <>
            <Header text={"Give Feedback"} />
            <Button handleClick={() => setToGood(good + 1)} text={"good"} />
            <Button
                handleClick={() => setToNeutral(neutral + 1)}
                text={"neutral"}
            />
            <Button handleClick={() => setToBad(bad + 1)} text={"bad"} />

            <Header text={"Statistics"} />
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                all={all}
                average={average}
                positiveFeedback={positiveFeedback}
            />
        </>
    );
};

export default App;
