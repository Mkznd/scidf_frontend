import Paper from "../../../types/paper.tsx";
import {Box, List, ListItem} from "@mui/material";

interface PaperListProps {
    papers: Paper[];
    setSelectedPaper: (paper: Paper) => void;
    selectedPaper: Paper | null;
    loading: boolean;
}

const PaperList = ({papers, selectedPaper, setSelectedPaper, loading}: PaperListProps) => {
    if (loading && papers.length === 0) return (<div className={"text-center"}>Loading...</div>);

    return (
        <Box sx={{width: "100%"}}>
            <List className={"pt-0 pl-2"}>
                {papers.map((paper, index) => (
                    <ListItem key={index} elevation={0}
                              className={`flex flex-col justify-around !items-start border-2 rounded-sm min-h-20 pt-0 !mt-0 mb-3 cursor-pointer ${paper.id == selectedPaper?.id ? "bg-slate-200" : ""}`}
                              onClick={() => setSelectedPaper(paper)}>
                        <h2 className={"text-xl"}>{paper.title}</h2>
                        <p>{paper.authors.join(', ')}</p>
                        <div>{paper.published}</div>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default PaperList;
