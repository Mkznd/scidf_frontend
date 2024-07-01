import Paper from "../../../types/paper.tsx";
import {useEffect, useState} from "react";

interface PaperDetailsProps {
    paper: Paper;
}

const PaperDetails = ({paper}: PaperDetailsProps) => {
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        console.log(paper);
    }, [paper]);

    return (
        <div className="flex h-screen">
            <div className="w-2/3 h-full bg-gray-100 p-4">
                <iframe
                    src={`${paper.download_link}#page=${page}`}
                    className="w-full h-full"
                    title="PDF Viewer"
                />
            </div>

            <div className="w-1/3 h-full flex flex-col">
                <div className="flex-1 bg-white p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Summary</h2>
                    <button onClick={
                        () => {
                            setPage(page + 1);
                        }
                    }>Go to next page
                    </button>
                </div>

                <div className="flex-1 bg-white p-4">
                    <h2 className="text-xl font-bold">Key points</h2>
                </div>
            </div>
        </div>
    );
};

export default PaperDetails;
