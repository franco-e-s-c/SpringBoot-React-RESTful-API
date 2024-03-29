import ClientList from "./ClientList";
import { Client } from "./client";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';

const Home = () => {
    const {data: clients, isPending, error} = useFetch<Client[]>("http://localhost:8080/clients", "GET")
    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {clients && <ClientList parameter={clients}></ClientList>}
            <Link to="/add"><Button variant="contained" style={{fontWeight:'600'}} startIcon={<PersonIcon/>}>Add Client</Button></Link>
        </div>
     );
}
 
export default Home;