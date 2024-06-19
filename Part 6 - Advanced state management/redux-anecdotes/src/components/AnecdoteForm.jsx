import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value.trim();
    event.target.anecdote.value = '';
    if (anecdote) {
      const newAnecdote = await anecdoteService.createNew(anecdote);
      dispatch(createAnecdote(newAnecdote));
      dispatch(setNotification(`you created '${newAnecdote}'`));
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
