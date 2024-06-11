const Persons = ({ filteredPersons, handleDeleteClick }) => {
  return (
    <div className="mt-4 ml-6 mr-6 flex flex-col justify-center max-h-screen overflow-y-auto">
      {filteredPersons.map((p) => (
        <div key={p.id} className="mb-1 flex items-center justify-between bg-white hover:bg-slate-100 border border-gray-200 rounded-md shadow-md">
          <div>
            <p className="ml-4 font-bold text-indigo-600 text-lg">{p.name}</p>
            <div className="ml-4 mb-1 flex items-center">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#475569"
                >
                  <path d="M763-145q-121-9-229.5-59.5T339-341q-86-86-135.5-194T144-764q-2-21 12.29-36.5Q170.57-816 192-816h136q17 0 29.5 10.5T374-779l24 106q2 13-1.5 25T385-628l-97 98q20 38 46 73t57.97 65.98Q422-361 456-335.5q34 25.5 72 45.5l99-96q8-8 20-11.5t25-1.5l107 23q17 5 27 17.5t10 29.5v136q0 21.43-16 35.71Q784-143 763-145ZM255-600l70-70-17.16-74H218q5 38 14 73.5t23 70.5Zm344 344q35.1 14.24 71.55 22.62Q707-225 744-220v-90l-75-16-70 70ZM255-600Zm344 344Z" />
                </svg>
              </span>
              <p className="text-base text-slate-600">{p.number}</p>
            </div>
          </div>
          <button
            onClick={() => handleDeleteClick(p)}
            className="mr-4 py-3 flex items-center justify-center font-semibold text-sm text-white w-16 h-6 bg-indigo-600 hover:bg-indigo-500 rounded-md shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2"
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
