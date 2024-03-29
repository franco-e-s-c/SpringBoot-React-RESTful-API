import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import { Client } from './client';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '@mui/material/Button';

type Props = {
    parameter: Client[];
}

const ClientList = (props: Props) => {
    const [clients, setClients] = useState<Client[]>(props.parameter);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null)
    const handleDelete = (id: number, e: React.MouseEvent<HTMLButtonElement>) =>{
        console.log(id);
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        setIsPending(true)
        const abortCont = new AbortController();
        fetch(`http://localhost:8080/clients/${id}`,{
            method: "DELETE",
            headers: header,
            signal: abortCont.signal
        })
        .then(res=>{
            if(!res.ok){
                throw Error('Error')
            }
            return
        })
        .then(()=>{
            setIsPending(false);
            setClients(clients.filter(i=> i.id !== id));
        })
        .catch(err=>{
            if(err.name === 'AbortError'){
                console.log('fetch aborted')
            }
            else{
                setIsPending(false)
                console.log(err.message)
                setError(err.message)
            }
        })
    }
    return (
        <Box mb={2}>
            <Typography variant='h3' mb={2}>Client List</Typography>
            <TableContainer sx={{width: "90vw", maxHeight: "60vh", minHeight: "60vh"}} component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell width={2}></TableCell>
                            <TableCell width={2}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {clients && clients!.map((client: Client)=>(
                        <TableRow key={client.id}>
                            <TableCell>{client.id}</TableCell>
                            <TableCell>{client.name}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell><Link to={"/clients/"+client.id}><Button color='success' variant='contained'>Edit</Button></Link></TableCell>
                            <TableCell>{!isPending && <Button color='error' variant='contained' onClick={(e)=>handleDelete(client.id, e)}>Delete</Button>}
                                        {isPending && <Button color='error' disabled variant='contained' onClick={(e)=>handleDelete(client.id, e)}>Deleting...</Button>}
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ClientList;