import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from './requests';
import styles from './styles/app.module.css';

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: true,
    refetchOnWindowFocus: false,
  });
  const anecdotes = result.data;

  if (result.isPending) {
    return <div>anecdote service fetching data from server.</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.appContainer}>
        <h1>Anecdotes</h1>
        <AnecdoteForm />
        <Notification />
        <AnecdoteList anecdotes={anecdotes} />
      </div>
    </div>
  );
};

export default App;
