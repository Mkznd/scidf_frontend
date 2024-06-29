import Paper from "../../../types/paper.tsx";

interface PaperListProps {
    papers: Paper[];
    setPaper: (paper: Paper) => void;
}

const PaperList = ({papers, setPaper}: PaperListProps) => {
    if (papers.length === 0) return (<div className={"text-center"}>No papers found</div>);

    return (
        <div className={"flex flex-col justify-center gap-5"}>
            {papers.map((paper: Paper) => {
                return (
                    <div key={paper.id} className={"border-b-2 p-2"}>
                        <h2 className={"text-2xl"} onClick={() => setPaper(paper)}>{paper.title}</h2>
                        <div>{paper.authors.join(', ')}</div>
                        <div>{paper.published}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default PaperList;
