import axios, {AxiosResponse} from "axios";
import Paper from "../../../types/paper.tsx";
import Highlight from "../../../types/highlight.ts";
import {useEffect, useState} from "react";
import PaperResponse from "../../../types/paperResponse.ts";

import {Box, Grid, List, ListItem} from '@mui/material';
import Search from "../../components/search/search.tsx";
import PaperList from "../../components/paperList/paperList.tsx";
import Summary from "../../components/paperSummary/paperSummary.tsx";


const PaperSearch = () => {
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
    const [papers, setPapers] = useState([] as PaperResponse[]);
    const [currentSummary, setCurrentSummary] = useState('' as string);
    const [summaries, setSummaries] = useState([] as string[]);
    const [highlights, setHighlights] = useState([] as (Highlight[])[]);
    const [currentHighlights, setCurrentHighlights] = useState([] as Highlight[]);
    const [currentPdfUrl, setCurrentPdfUrl] = useState('' as string);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (papers.length && !selectedPaper) setSelectedPaper(papers[0].paper);
        console.log(papers[0])
    }, [papers, selectedPaper, setSelectedPaper]);

    async function fetchSummary() {
        if (!selectedPaper) return;
        console.log(selectedPaper.id);
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}/summary`, {url: selectedPaper.download_link}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    useEffect(() => {
        if (!selectedPaper) return;
        const startTime = performance.now();
        Promise.all(
            [fetchSummary(), fetchHighlights()]
        ).then(([summaryResponse, highlightsResponse]: [AxiosResponse, AxiosResponse]) => {
            setCurrentSummary(summaryResponse.data.summary);
            setCurrentHighlights(highlightsResponse.data.highlights.map((highlight: {
                excerpt: string,
                takeaway: string
            }) => ({
                excerpt: highlight.excerpt,
                takeaway: highlight.takeaway
            } as Highlight)));
        }).catch((error) => {
            console.error("Error fetching summary:", error);
        })
        const timeTaken = performance.now() - startTime;
        console.log(`Time taken by fetching all: ${timeTaken}ms`);
    }, [selectedPaper]);

    async function fetchHighlights() {
        if (!selectedPaper) {
            return;
        }
        console.log(selectedPaper.id);
        return axios.post(`${import.meta.env.VITE_BACKEND_URL}/highlight`, {url: selectedPaper.download_link}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }

    useEffect(() => {
        if (!currentHighlights.length) return;
        const fetchPdf = async () => {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/paper_highlight`,
                    {url: selectedPaper?.download_link, highlights: currentHighlights.map(h => h.excerpt)},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/pdf'
                        },
                        responseType: 'blob' // Ensure the response is a Blob
                    }
                );
                // Convert the Blob to an object URL
                const pdfBlob = new Blob([response.data], {type: 'application/pdf'});
                const pdfObjectUrl = URL.createObjectURL(pdfBlob);
                setCurrentPdfUrl(pdfObjectUrl);
            } catch (error) {
                console.error("Error fetching PDF:", error);
            }
        };

        fetchPdf();

        // Clean up the object URL when the component unmounts
        return () => {
            if (currentPdfUrl) {
                URL.revokeObjectURL(currentPdfUrl);
            }
        };
    }, [currentHighlights]);


    return (
        <div className={"pt-2"}>
            <Search handleSearch={handleSearch}/>
            <Box sx={{flexGrow: 1}} className={"mt-5 pt-5 border-t-2"}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <PaperList papers={papers.map(p => p.paper)} selectedPaper={selectedPaper}
                                   setSelectedPaper={setSelectedPaper}
                                   loading={loading}/>
                    </Grid>
                    <Grid item xs={6}>
                        {selectedPaper && <Summary text={currentSummary}/>}
                        {selectedPaper && <iframe src={currentPdfUrl} style={{width: "100%", height: 720}}/>}
                    </Grid>
                    <Grid item xs={3}>
                        <List>
                            {currentHighlights.map((highlight, index) => (
                                <ListItem key={index} className={"border-2"}>
                                    <p>{highlight.takeaway}</p>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );

    async function handleSearch(e: React.FormEvent) {
        const startTime = performance.now()
        e.preventDefault();
        setLoading(true)
        setSelectedPaper(null)
        const searchText = e.currentTarget.querySelector('input').value;
        const searchResults = await searchPapers(searchText);
        console.log(searchResults.data);
        setPapers(searchResults.data);
        setLoading(false);
        console.log("Time taken by search: " + (performance.now() - startTime) + "ms")
    }

    async function searchPapers(researchTopic: string) {
        return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/search`, {research_topic: researchTopic}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export default PaperSearch;
