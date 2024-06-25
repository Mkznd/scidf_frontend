import Search from "../../components/search/search";
import axios from "axios";
import {useEffect, useState} from "react";

const PaperSearch = () => {
    const [refinedSearch, setRefinedSearch] = useState('');

    useEffect(() => {
        console.log(refinedSearch);
    }, [refinedSearch]);

    return (
        <div>
            <Search handleSearch={handleSearch}/>
        </div>
    );

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const searchText = e.currentTarget.querySelector('input').value;
        const response = await axios.post('http://localhost:8000/refine', null, {
            params: {
                search: searchText
            }
        });
        setRefinedSearch(response.data)
    }
}

export default PaperSearch;
