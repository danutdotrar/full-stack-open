const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
    <p>
        <strong>Total of {sum} exercises</strong>
    </p>
);

const Part = ({ part }) => {
    return part.map((item) => (
        <p key={item.id}>
            {item.name} {item.exercises}
        </p>
    ));
};

const Content = ({ parts }) => (
    <>
        <Part part={parts} />
    </>
);

const Course = ({ course }) => {
    return course.map((item) => {
        return (
            <div key={item.id}>
                <Header course={item.name} />
                <Content parts={item.parts} />
                <Total
                    sum={item.parts.reduce(
                        (acc, val) => acc + val.exercises,
                        0
                    )}
                />
            </div>
        );
    });
};

export default Course;
