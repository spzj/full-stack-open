import { useState } from "react";

const Header = ({ title }) => (
  <div>
    <h1>{title}</h1>
  </div>
);

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const numAnecdotes = anecdotes.length;
  const [selected, setSelected] = useState(0);

  const handleSelectedClick = () => {
    const newIndex = Math.floor(Math.random() * numAnecdotes);
    setSelected(newIndex);
  };

  const [voteCounter, setVote] = useState(Array(numAnecdotes).fill(0));

  const handleVoteClick = () => {
    const newVoteCounter = [...voteCounter];
    newVoteCounter[selected]++;
    setVote(newVoteCounter);
  };

  return (
    <div>
      <Header title={"Anecdote of the day"} />
      <Anecdote text={anecdotes[selected]} votes={voteCounter[selected]} />
      <Button onClick={handleVoteClick} text={"vote"} />
      <Button onClick={handleSelectedClick} text={"next anecdote"} />
    </div>
  );
};

export default App;
