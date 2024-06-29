import PaperSearch from "./pages/paperSearch/paperSearch"
import Paper from "../types/paper.tsx";
import {useState} from "react";
import PaperDetails from "./pages/paperDetails/paperDetails.tsx";

export default function App() {
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

    return (
        <div>
            {!selectedPaper ? (
                <PaperSearch setSelectedPaper={setSelectedPaper}/>
            ) : (
                <PaperDetails paper={selectedPaper}/>
            )}
        </div>
    )
}
