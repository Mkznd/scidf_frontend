import Paper from "../../../types/paper.tsx";
import {useEffect} from "react";

interface PaperDetailsProps {
    paper: Paper;
}

const PaperDetails = ({paper}: PaperDetailsProps) => {

    useEffect(() => {
        console.log(paper);
    }, [paper]);

    return (
        <div className="flex h-screen">
            {/* Left side - PDF view */}
            <div className="w-2/3 h-full bg-gray-100 p-4">
                {/* Embed your PDF here, for now using an iframe as a placeholder */}
                <iframe
                    src={`${paper.download_link}`}
                    className="w-full h-full"
                    title="PDF Viewer"
                />
            </div>

            {/* Right side - Space for two other components */}
            <div className="w-1/3 h-full flex flex-col">
                {/* Top component */}
                <div className="flex-1 bg-white p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Top Component</h2>
                    {/* Add your content here */}
                </div>

                {/* Bottom component */}
                <div className="flex-1 bg-white p-4">
                    <h2 className="text-xl font-bold">Bottom Component</h2>
                    {/* Add your content here */}
                </div>
            </div>
        </div>
    );
};

export default PaperDetails;
