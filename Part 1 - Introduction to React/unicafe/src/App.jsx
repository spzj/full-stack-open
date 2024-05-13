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

const Part = ({ text, value }) => <p>{text} {value}</p>;

const Content = ({ props }) => {
  return (
    <>
      {props.map(({ text, counter }, index) => (
        <Part key={index} text={text} value={counter} />
      ))}
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
      <Content props={feedback} />
    </div>
  );
};

export default App;
