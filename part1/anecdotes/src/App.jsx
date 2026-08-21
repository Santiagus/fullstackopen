import { useState } from "react";

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

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  );
};
const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes);
  const mostVotedIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {maxVotes > 0 ? (
        <>
          <p>{anecdotes[mostVotedIndex]}</p>
          <p>has {maxVotes} votes</p>
        </>
      ) : (
        <p>No votes yet</p>
      )}
    </div>
  );
};
const App = () => {
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length));
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const voteAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
    console.log("Votes:", newVotes);
  };

  const nextAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length));
  };
  return (
    <>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={nextAnecdote}>Next anecdote</button>
      <button onClick={voteAnecdote}>Vote</button>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </>
  );
};

export default App;
