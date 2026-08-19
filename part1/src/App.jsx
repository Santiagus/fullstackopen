const Header = (props) => {
  console.log("Header :", props.course);
  return <h1>{props.course}</h1>;
};

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((element) => (
        <Part
          key={element.name}
          part={element.name}
          exercises={element.exercises}
        />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const Counter = ({ value }) => {
  return <div>Counter : {value}</div>;
};

const App = ({ counter }) => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
      <Counter value={counter} />
    </div>
  );
};

export default App;
