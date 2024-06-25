import Search from "../../components/search/search";
import axios from "axios";

const PaperSearch = () => {

    return (
        <div>
            <Search handleSearch={handleSearch}/>
        </div>
    );

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const searchText = e.currentTarget.querySelector('input').value;
        const refinedQuery = await refineQuery(searchText);
        const refinedSubqueries = await createSubqueries(refinedQuery.data);
        console.log(refinedSubqueries);
    }

    async function refineQuery(query: string) {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/refine`, null, {
            params: {
                query: query
            }
        });
    }

    async function createSubqueries(query: string) {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/subqueries`, null, {
            params: {
                query: query
            }
        });
    }
}

export default PaperSearch;
