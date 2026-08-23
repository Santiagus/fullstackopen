const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map(part => (
          <li key={part.id}>
            {part.name}: {part.exercises} exercises
          </li>
        ))}
      </ul>
      <p>Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercisesgs</p>
    </div>
  );
};

export default Course;
