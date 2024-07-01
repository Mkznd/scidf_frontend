import {Document, Page, pdfjs} from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({file}) => {
    return (
        <div>
            <Document
                file={file}
                onLoadError={console.error}
            >
                <Page pageNumber={1}/>
            </Document>
        </div>
    );
};

export default PdfViewer;
