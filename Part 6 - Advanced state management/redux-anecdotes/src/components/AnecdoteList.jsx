import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) =>
    state.filter == 'ALL'
      ? state.anecdotes
      : state.anecdotes.filter((a) =>
          a.content
            .toLowerCase()
            .includes(state.filter.filterTerm.toLowerCase())
        )
  );
  const sendVote = (id) => {
    dispatch(vote(id));
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
              <button onClick={() => sendVote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
