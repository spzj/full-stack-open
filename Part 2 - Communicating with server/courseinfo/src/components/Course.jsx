const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Total = ({ parts }) => {
  const totalSum = parts.reduce((a, b) => a + b.exercises, 0);
  return (
    <p>
      <strong>total of {totalSum} exercises</strong>
    </p>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header key={course.id} course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
