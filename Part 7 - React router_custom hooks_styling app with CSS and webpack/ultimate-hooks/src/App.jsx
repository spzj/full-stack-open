import { useField, useResource } from './hooks';

const App = () => {
  const content = useField('text');
  const name = useField('text');
  const number = useField('text');

  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.reset();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    name.reset();
    number.reset();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <label htmlFor='note-content'>Content</label>
        <input
          id='note-content'
          type={content.type}
          value={content.value}
          onChange={content.onChange}
          required
        />
        <button type='submit'>Create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          <label htmlFor='person-name'>Name</label>
          <input
            id='person-name'
            type={name.type}
            value={name.value}
            onChange={name.onChange}
            required
          />
        </div>
        <div>
          <label htmlFor='person-number'>Number</label>
          <input
            id='person-number'
            type={number.type}
            value={number.value}
            onChange={number.onChange}
            required
          />
        </div>
        <button type='submit'>Create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
