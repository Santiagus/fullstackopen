import { useEffect, useRef, useState } from "react";

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

const ComplexCounter = ({ clicks, allClicks, onLeftClick, onRightClick }) => (
  <div>
    {clicks.left}
    <button onClick={onLeftClick}> left </button>
    <button onClick={onRightClick}> right </button>
    {clicks.right}
    <p>History : {allClicks}</p>
  </div>
);

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const hundredths = Math.floor((milliseconds % 1000) / 10);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0",
  )}.${String(hundredths).padStart(2, "0")}`;
};

const Chronometer = () => {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [partials, setPartials] = useState([]);
  const startedAt = useRef(null);
  const elapsedBeforeStart = useRef(0);

  useEffect(() => {
    if (!isRunning) return undefined;

    const intervalId = setInterval(() => {
      setElapsed(elapsedBeforeStart.current + Date.now() - startedAt.current);
    }, 10);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const start = () => {
    startedAt.current = Date.now();
    elapsedBeforeStart.current = elapsed;
    setIsRunning(true);
  };

  const stop = () => {
    if (!isRunning) return;

    const currentElapsed =
      elapsedBeforeStart.current + Date.now() - startedAt.current;
    setElapsed(currentElapsed);
    elapsedBeforeStart.current = currentElapsed;
    setIsRunning(false);
  };

  const printPartial = () => {
    const currentElapsed = isRunning
      ? elapsedBeforeStart.current + Date.now() - startedAt.current
      : elapsed;
    const partial = formatTime(currentElapsed);

    console.log("Partial:", partial);
    setPartials((previousPartials) => [...previousPartials, partial]);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsed(0);
    setPartials([]);
    startedAt.current = null;
    elapsedBeforeStart.current = 0;
  };

  return (
    <section>
      <h2>Chronometer</h2>
      <p>{formatTime(elapsed)}</p>
      <Button onClick={start} text="start" />
      <Button onClick={stop} text="stop" />
      <Button onClick={printPartial} text="print partial" />
      <Button onClick={reset} text="reset" />
      {partials.length > 0 && <p>Partials: {partials.join(", ")}</p>}
    </section>
  );
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
  useEffect(() => {
    const timeoutId = setTimeout(() => setCounter((value) => value + 1), 1000);
    return () => clearTimeout(timeoutId);
  }, [timedCounter]);

  // Click counter plus, minus, zero
  const [clickCounter, setClickCounter] = useState(0);
  const decreaseByOne = () => setClickCounter(clickCounter - 1);

  const setToValue = (value) => () => {
    console.log("value :", value); // print the new value to console
    setClickCounter(value);
  };

  // console.log("rendering...", counter);
  // Complex useState
  const [complexClicks, setClicks] = useState({ left: 0, right: 0 });
  const [allClicks, setAllClicks] = useState([]);

  const handleLeftClick = () => {
    const newClicks = {
      left: complexClicks.left + 1,
      right: complexClicks.right,
    };
    setClicks(newClicks);
    // clicks history
    setAllClicks(allClicks.concat("L"));
  };

  const handleRightClick = () => {
    const newClicks = {
      left: complexClicks.left,
      right: complexClicks.right + 1,
    };
    setClicks(newClicks);
    // clicks history
    setAllClicks(allClicks.concat("R"));
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
      <TimedCounter value={timedCounter} />
      <ClickCounter value={clickCounter} />
      {/* <Button onClick={increaseByOne} text="plus" /> */}
      <Button onClick={setToValue(clickCounter + 1)} text="plus" />
      <Button onClick={decreaseByOne} text="minus" />
      {/* <Button onClick={setToZero} text="zero" /> */}
      <Button onClick={setToValue(0)} text="zero" />
      <ComplexCounter
        clicks={complexClicks}
        allClicks={allClicks}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
      <Chronometer />
      
    </div>
  );
};

export default App;
