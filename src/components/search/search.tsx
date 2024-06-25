import React, {useState} from 'react';

const Search = () => {
    const [searchValue, setSearchValue] = useState('');

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const a = fetch(`http://localhost:8000/`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        console.log(searchValue);
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
