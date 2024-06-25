import {useEffect, useState} from 'react';
import axios from "axios";

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [refinedSearch, setRefinedSearch] = useState('');

    useEffect(() => {
        console.log(refinedSearch);
    }, [refinedSearch]);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/refine', null, {
            params: {
                search: searchValue
            }
        });
        setRefinedSearch(response.data)
    }

    return (
        <form onSubmit={handleSearch} className={'flex justify-center gap-2'}>
            <input
                type="text"
                placeholder='Search...'
                value={searchValue}
                className={"border w-1/2 p-2"}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className={"border p-2"} type="submit">Search articles</button>
        </form>
    );
}

export default Search;
