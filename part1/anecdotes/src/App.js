import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);
const HighestVote = ({ points, anecdotes }) => {
  const mostpoints = Math.max(...points);

  return (
    <>
      <h2>Anecdotes with most votes</h2>
      <div>{anecdotes[points.indexOf(mostpoints)]}</div>
      <div>has {mostpoints} votes</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(6).fill(0));

  const handleNextAnecdote = () => () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVote = () => () => {
    const copy = [...points];
    copy[selected] = copy[selected] + 1;
    setPoints(copy);
  };

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]}</div>
      <Button handleClick={handleVote()} text={"vote"} />
      <Button handleClick={handleNextAnecdote()} text={"next anecdote"} />
      <HighestVote points={points} anecdotes={anecdotes} />
    </>
  );
};

export default App;
