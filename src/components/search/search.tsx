import {useEffect, useState} from 'react';
import axios from "axios";

const Search = ({handleSearch}) => {
    const [searchValue, setSearchValue] = useState('');

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
