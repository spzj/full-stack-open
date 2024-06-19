import { createSlice, nanoid } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: nanoid(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: anecdotesAtStart.map(asObject),
  reducers: {
    vote(state, action) {
      return state.map((a) =>
        a.id !== action.payload ? a : { ...a, votes: a.votes + 1 }
      );
    },
    createAnecdote(state, action) {
      return state.concat(asObject(action.payload));
    },
  },
});

export const { vote, createAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
