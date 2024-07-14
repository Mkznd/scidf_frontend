import {pdfjs} from 'react-pdf';

// Plugins
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.js'

// Create new plugin instance

const PdfView = ({file}) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <div>

        </div>
    );
};

export default PdfView;
