import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';
import styles from '../styles/anecdoteForm.module.css';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
      dispatch({ type: 'CREATE', payload: newAnecdote.content });
    },
    onError: (error) => {
      dispatch({ type: 'ERROR', payload: error.response.data.error });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value.trim();
    event.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content: anecdote, votes: 0 });
  };

  return (
    <div className={styles.container}>
      <h3>create new</h3>
      <form className={styles.form} onSubmit={onCreate}>
        <input name='anecdote' />
        <button className={styles.createButton} type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
