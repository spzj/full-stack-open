const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <div className="mt-1">
      <form onSubmit={addPerson} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <div>
            <input
              value={newName}
              onChange={handleNameChange}
              className="w-full text-base bg-white border border-slate-300 rounded-md shadow-sm focus:outline-indigo-300 focus:ring-1 py-1.5 pl-2"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Number
            <div>
              <input
                value={newNumber}
                onChange={handleNumberChange}
                className="w-full text-base bg-white border border-slate-300 rounded-md shadow-sm focus:outline-indigo-300 focus:ring-1 py-1.5 pl-2"
              />
            </div>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
