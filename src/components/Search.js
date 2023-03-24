import {useState} from "react";
import {useGlobalContext} from "../Context";

function Search() {

    const [searchText, setSearchText] = useState('');
    const {setSearchTerm, fetchRandomMeal} = useGlobalContext()

    function handleSubmit(e){
        e.preventDefault()
        if(searchText) {
            setSearchTerm(searchText)
        } else {
            setSearchTerm('')
        }
    }
    function handleChange(e) {
        setSearchText(e.target.value)
    }
    function randomMeal() {
        setSearchText('')
        setSearchText('')
        fetchRandomMeal()
    }
    return (
        <header className="search-container">
            <form onSubmit={handleSubmit}>
                <input type="text" name="search"  value={searchText} onChange={handleChange} className="form-input" placeholder="type favourite meal"/>
                <button className="btn"   type="submit">Search</button>
                <button className="btn btn-hipster" type="button" onClick={randomMeal}>Surprise Me!</button>
            </form>
        </header>
    )
}

export default Search