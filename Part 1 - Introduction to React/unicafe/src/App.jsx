import { useState } from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ counters }) => {
  const totalSum = counters
    .map((c) => c.counter)
    .reduce((accumulator, curr) => accumulator + curr, 0);

  if (totalSum == 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  } else {
    const average = totalSum / counters.length;

    const positiveProp =
      (100 * counters.find((p) => p.text === "good").counter) / totalSum;

    return (
      <table>
        <tbody>
          {counters.map(({ text, counter }, index) => (
            <StatisticLine key={index} text={text} value={counter} />
          ))}
          <StatisticLine text={"all"} value={totalSum} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={`${positiveProp} %`} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [goodCounter, setGood] = useState(0);
  const [neutralCounter, setNeutral] = useState(0);
  const [badCounter, setBad] = useState(0);

  const handleGoodClick = () => setGood(goodCounter + 1);
  const handleNeutralClick = () => setNeutral(neutralCounter + 1);
  const handleBadClick = () => setBad(badCounter + 1);

  const counters = [
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
      <Statistics counters={counters} />
    </div>
  );
};

export default App;
