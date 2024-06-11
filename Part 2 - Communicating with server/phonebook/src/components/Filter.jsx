const Filter = ({ filter, handleFilterChange, handleCreateClick }) => {
  return (
    <div className="mt-4 ml-6 mr-6">
      <form onSubmit={handleCreateClick} className="flex items-center justify-center w-full">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#94a3b8"
            >
              <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
            </svg>
          </span>
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            className="placeholder:italic placeholder:text-slate-400 w-full text-base bg-white border border-slate-300 rounded-md shadow-sm focus:outline-indigo-300 focus:ring-1 py-1.5 pl-9"
            placeholder="Search by name"
            name="search"
          />
        </div>
        <button className="ml-4 py-4 flex items-center justify-center text-sm text-white font-semibold w-16 h-6 bg-indigo-600 hover:bg-indigo-500 rounded-md shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2">
          Create
        </button>
      </form>
    </div>
  );
};

export default Filter;
