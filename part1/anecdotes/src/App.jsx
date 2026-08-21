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

const getRandomInt = (max) => Math.floor(Math.random() * max);

const getMostVotedIndex = (votes) => {
  const maxVotes = Math.max(...votes, 0);
  return votes.indexOf(maxVotes);
};

const Anecdote = ({ text, votes }) => (
  <div>
    <h1>Anecdote of the day</h1>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
);

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const maxVotes = Math.max(...votes, 0);

  if (maxVotes === 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes yet</p>
      </div>
    );
  }

  const mostVotedIndex = getMostVotedIndex(votes);

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotedIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length));
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const voteAnecdote = () => {
    setVotes((currentVotes) => {
      const nextVotes = [...currentVotes];
      nextVotes[selected] += 1;
      return nextVotes;
    });
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
