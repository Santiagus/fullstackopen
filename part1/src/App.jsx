const Header = (props) => {
  console.log("Header :", props.course);
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  console.log("Procesing Part", props);
  console.log(props.part);
  console.log(props.exercises);

  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  console.log("Processing Content", props);

  return (
    <div>
      {props.parts.map((element, index) => (
        <Part key={index} part={element[0]} exercises={element[1]} />
      ))}
    </div>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[
          [part1, exercises1],
          [part2, exercises2],
          [part3, exercises3],
        ]}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
