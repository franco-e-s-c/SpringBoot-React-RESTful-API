import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
    return (  
        <Box>
            <AppBar>
                <Toolbar>
                    <Link to="/">
                    <IconButton aria-label="Home">
                        <HomeIcon></HomeIcon>
                    </IconButton>
                    </Link>
                    <Typography variant="subtitle1">Home</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
 
export default Navbar;