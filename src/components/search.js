import "../css/search.css";

export const Search = ({ error, setUserSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    setUserSearch(event.target[0].value);
  };

  const formatError = () => {
    var result = null;
    if (error !== null) {
      result = "No result!";
    }
    return result;
  };

  const errorMessage = formatError();

  return (
    <form className="useBorderBox" onSubmit={handleSubmit}>
      <img alt="search icon" />
      <input
        type="search"
        name="username"
        id="username"
        placeholder="Search Github username..."
      />
      <p id="error">{errorMessage}</p>
      <button>Search</button>
    </form>
  );
};

export default Search;
