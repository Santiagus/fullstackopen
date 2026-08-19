import { useState } from "react";

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
  return <div>Timed counter : {value}</div>;
};

const ClickCounter = ({ value }) => {
  return <div>Click counter : {value}</div>;
};

// const App = ({ counter }) => {
const App = () => {
  const [counter, setCounter] = useState(0);
  const [clickCounter, setClickCounter] = useState(0);
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

  const handleClick = () => {
    console.log("Clicked!!!");
  };

  const increaseByOne = () => setClickCounter(clickCounter + 1);
  const setToZero = () => setClickCounter(0);

  setTimeout(() => setCounter(counter + 1), 1000);

  // console.log("rendering...", counter);

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
      <Counter value={counter} />
      <ClickCounter value={clickCounter} />
      <button onClick={increaseByOne}>plus</button>{" "}
      <button onClick={setToZero}>zero</button>{" "}
    </div>
  );
};

export default App;
