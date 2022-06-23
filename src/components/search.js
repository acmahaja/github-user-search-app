import '../css/search.css'

export const Search = ({error, setUserSearch}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        setUserSearch(event.target[0].value);
    }
    return (<form className='useBorderBox' onSubmit={handleSubmit}>
        <img alt="search icon" />
        <input type="search" name="username" id="username" placeholder='Search Github username...'/>
        <p id="error"></p>
        <button>Search</button>
    </form>)
}

export default Search;