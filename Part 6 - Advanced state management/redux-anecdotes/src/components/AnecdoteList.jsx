import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const getAnecdotes = (state) => state.anecdotes;
  const getFilter = (state) => state.filter;
  const selectAnecdotes = createSelector(
    [getAnecdotes, getFilter],
    (anecdotes, filter) => {
      if (filter) {
        return anecdotes.filter((a) =>
          a.content.toLowerCase().includes(filter.toLowerCase())
        );
      } else {
        return [...anecdotes];
      }
    }
  );
  const anecdotes = useSelector(selectAnecdotes)

  const handleVoteClick = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(createNotification(`you voted '${anecdote.content}'`));
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVoteClick(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
