import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ props }) => {
  return (
    <>
      {props.map(({ onClick, text }, index) => (
        <button key={index} onClick={onClick}>
          {text}
        </button>
      ))}
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

  const feedback = [
    {
      text: "good",
      counter: goodCounter,
      onClick: () => setGood(goodCounter + 1),
    },
    {
      text: "neutral",
      counter: neutralCounter,
      onClick: () => setNeutral(neutralCounter + 1),
    },
    {
      text: "bad",
      counter: badCounter,
      onClick: () => setBad(badCounter + 1),
    },
  ];

  return (
    <div>
      <Header title={"give feedback"} />
      <Button props={feedback} />
      <Header title={"statistics"} />
      <Statistics props={feedback} />
    </div>
  );
};

export default App;
