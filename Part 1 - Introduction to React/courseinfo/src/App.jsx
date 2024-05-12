const Header = (course) => {
  return (
    <>
      <h1>{course.title}</h1>
    </>
  );
};

const Part = ({ title, exercises }) => {
  return (
    <>
      <p>
        {title} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} title={part.title} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Total = ({ exercises }) => {
  const totalSum = exercises.reduce(
    (accumulator, curr) => accumulator + curr,
    0
  );
  return (
    <>
      <p>Number of exercises {totalSum}</p>
    </>
  );
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
      <Header title={course} />
      <Content
        parts={[
          { title: part1, exercises: exercises1 },
          { title: part2, exercises: exercises2 },
          { title: part3, exercises: exercises3 },
        ]}
      />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;
