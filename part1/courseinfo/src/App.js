const Header = (prop) => {
    // console.log(prop);
    return (
        <>
            <h1>{prop.course}</h1>
        </>
    );
};

const Content = (prop) => {
    return (
        <>
            <Part part={prop.parts[0].name} exercise={prop.parts[0].exercise} />
            <Part part={prop.parts[1].name} exercise={prop.parts[1].exercise} />
            <Part part={prop.parts[2].name} exercise={prop.parts[2].exercise} />
        </>
    );
};

const Part = (prop) => {
    return (
        <>
            <p>
                {prop.part} {prop.exercise}
            </p>
        </>
    );
};

const Total = (prop) => {
    return (
        <>
            <p>
                Number of exercises{" "}
                {prop.parts[0].exercise +
                    prop.parts[1].exercise +
                    prop.parts[2].exercise}
            </p>
        </>
    );
};

const App = () => {
    const course = "Half Stack application development";

    const parts = [
        {
            name: "Fundamentals of React",
            exercise: 10,
        },
        {
            name: "Using props to pass data",
            exercise: 7,
        },
        {
            name: "State of a component",
            exercise: 14,
        },
    ];

    // const exercises = parts.map((item) => item.exercise);
    // const sum = exercises.reduce((acc, val) => acc + val, 0);

    return (
        <div>
            <Header course={course} />

            <Content parts={parts} />

            <Total parts={parts} />
        </div>
    );
};

export default App;
