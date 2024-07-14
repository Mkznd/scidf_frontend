import {Paper, Typography} from '@mui/material';

function Summary({text}: { text: string }) {
    return (
        <Paper elevation={3} sx={{padding: 2, marginBottom: 2}}>
            <Typography variant="h6">TL;DR</Typography>
            <Typography variant="body2" color="textSecondary">
                {text}
            </Typography>
        </Paper>
    );
}

export default Summary;
