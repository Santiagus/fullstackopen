const Course = ({ courses }) => {
  return courses.map(course => (
    <>
      <div key={course.id}>
        <h1>{course.name}</h1>
        <ul>
          {course.parts.map(part => (
            <li key={part.id}>
              {part.name}: {part.exercises} exercises
            </li>
          ))}
        </ul>
      </div>
      <p>Total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</p>
    </>
  ));
};

export default Course;
