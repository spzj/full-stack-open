import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const Part = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

const Statistics = ({ props }) => {
  const totalSum = props
    .map((p) => p.counter)
    .reduce((accumulator, curr) => accumulator + curr, 0);

  const average = totalSum / props.length;

  const positiveProp =
    (100 * props.find((p) => p.text === "good").counter) / totalSum;

  console.log(positiveProp);
  return (
    <>
      {props.map(({ text, counter }, index) => (
        <Part key={index} text={text} value={counter} />
      ))}
      <Part text={"all"} value={totalSum} />
      <Part text={"average"} value={average} />
      <Part text={"positive"} value={`${positiveProp} %`} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [goodCounter, setGood] = useState(0);
  const [neutralCounter, setNeutral] = useState(0);
  const [badCounter, setBad] = useState(0);

  const handleGoodClick = () => setGood(goodCounter + 1);
  const handleNeutralClick = () => setNeutral(neutralCounter + 1);
  const handleBadClick = () => setBad(badCounter + 1);

  const feedback = [
    {
      text: "good",
      counter: goodCounter,
    },
    {
      text: "neutral",
      counter: neutralCounter,
    },
    {
      text: "bad",
      counter: badCounter,
    },
  ];

  return (
    <div>
      <Header title={"give feedback"} />
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      <Header title={"statistics"} />
      <Statistics props={feedback} />
    </div>
  );
};

export default App;
