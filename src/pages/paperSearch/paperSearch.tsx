import Search from "../../components/search/search";
import axios from "axios";
import Paper from "../../../types/paper.tsx";
import PaperList from "../../components/paperList/paperList.tsx";
import {useState} from "react";

interface PaperSearchProps {
    setSelectedPaper: (paper: Paper) => void;
}

const PaperSearch = ({setSelectedPaper}: PaperSearchProps) => {
    const [papers, setPapers] = useState([] as Paper[]);

    return (
        <div className={"flex justify-center flex-col gap-10"}>
            <Search handleSearch={handleSearch}/>
            <PaperList papers={papers} setPaper={setSelectedPaper}/>
        </div>
    );

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const searchText = e.currentTarget.querySelector('input').value;
        const refinedQuery = await refineQuery(searchText);
        const refinedSubqueries = (await createSubqueries(refinedQuery.data)).data as string[];
        const searchResults = await searchPapers(refinedSubqueries);
        console.log(searchResults.data);
        setPapers(searchResults.data);
    }

    async function searchPapers(refinedSubqueries: string[]) {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search`, {queries: refinedSubqueries}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async function refineQuery(query: string) {
        const a = axios.post(`${import.meta.env.VITE_BACKEND_URL}/refine`, {query: query}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await a;
    }

    async function createSubqueries(query: string) {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/subqueries`, {query: query}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default PaperSearch;
