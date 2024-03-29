import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const NotFound = () => {
    return ( 
        <Box>
            <h2>Not Found</h2>
            <p>404</p>
            <Link to="/"><Typography variant="body1">Homepage</Typography></Link>
        </Box>
     );
}
 
export default NotFound;