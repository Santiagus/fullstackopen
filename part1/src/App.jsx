import { useState } from "react";

const Header = (props) => {
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

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text}</button>
);

const TimedCounter = ({ value }) => {
  return <div>Timed counter : {value}</div>;
};

const ClickCounter = ({ value }) => {
  return <div>Click counter : {value}</div>;
};

// const App = ({ counter }) => {
const App = () => {
  // Course info
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

  // Labeled timed counter
  const [timedCounter, setCounter] = useState(0);
  setTimeout(() => setCounter(timedCounter + 1), 1000);

  // Click counter plus, minus, zero
  const [clickCounter, setClickCounter] = useState(0);
  const increaseByOne = () => setClickCounter(clickCounter + 1);
  const decreaseByOne = () => setClickCounter(clickCounter - 1);
  const setToZero = () => setClickCounter(0);

  // console.log("rendering...", counter);
  // Complex useState
  const [complexClicks, setClicks] = useState({ left: 0, right: 0 });
  const handleLeftClick = () => {
    const newClicks = {
      left: complexClicks.left + 1,
      right: complexClicks.right,
    };
    setClicks(newClicks);
  };
  const handleRightClick = () => {
    const newClicks = {
      left: complexClicks.left,
      right: complexClicks.right + 1,
    };
    setClicks(newClicks);
  };
  const ComplexCounter = ({ value }) => {
    return (
      <div>
        {complexClicks.left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {complexClicks.right}
      </div>
    );
  };
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
      <TimedCounter value={timedCounter} />
      <ClickCounter value={clickCounter} />
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={decreaseByOne} text="minus" />
      <Button onClick={setToZero} text="zero" />
      <ComplexCounter value={complexClicks} />
    </div>
  );
};

export default App;
