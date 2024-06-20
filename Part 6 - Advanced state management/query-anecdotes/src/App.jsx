import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from './requests';

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: true,
    refetchOnWindowFocus: false,
  });
  const anecdotes = result.data;

  if (result.isPending) {
    return <div>anecdote service fetching data from server.</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  );
};

export default App;
