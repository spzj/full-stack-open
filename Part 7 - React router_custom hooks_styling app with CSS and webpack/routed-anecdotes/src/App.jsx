import { useState } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';

import About from './components/About';
import Anecdote from './components/Anecdote';
import AnecdoteList from './components/AnecdoteList';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Notification from './components/Notification';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      url: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      url: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const match = useMatch('/anecdotes/:id');
  const matchedAnecdote = match
    ? anecdotes.find((a) => a.id === Number(match.params.id))
    : null;

  return (
    <div>
      <header>
        <h1>Software anecdotes</h1>
      </header>
      <Menu />
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path='/anecdotes/:id'
          element={<Anecdote anecdote={matchedAnecdote} />}
        />
        <Route
          path='/create'
          element={
            <CreateNew addNew={addNew} setNotification={setNotification} />
          }
        />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
