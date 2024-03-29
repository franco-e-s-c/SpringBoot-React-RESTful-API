import { Button, Stack, TextField, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { Client } from "./client";
import { useNavigate, useParams } from "react-router-dom";


const Add = () => {
    const {id} = useParams<{id?: string}>()
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [nameError, setNameError] = useState<boolean | string>(false);
    const [mailError, setMailError] = useState<boolean | string>(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState<string|null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchClientData(id);
        }
    }, [id]);

    const fetchClientData = async (id: string) => {
        const response = await fetch(`http://localhost:8080/clients/${id}`);
        if (!response.ok) {
            throw new Error("Failed to fetch client data");
        }
        const data: Client = await response.json();
        setName(data.name);
        setMail(data.email);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) =>{
        event.preventDefault();
        if(name === "" || mail ===""){
            if (name === "") setNameError("Name field is required");
            if (mail === "") setMailError("Mail field is required");
            return
        }
        if(nameError || mailError){
            if (name === "") setNameError("Name field is required");
            if (mail === "") setMailError("Mail field is required");
            return
        }
        const client = {
            "name": name,
            "email": mail
        }
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        setIsPending(true);
        // const {data, isPending: pend, error} = useFetch<Client>("http://localhost:8080/clients", "POST", JSON.stringify(client), header);
        const abortCont = new AbortController();
        fetch('http://localhost:8080/clients'+ (id ? '/'+id: ''),{
            method: (id)? "PUT": "POST",
            headers: header,
            body: JSON.stringify(client),
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
            navigate("/",);
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

    const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = (event)=>{
        setName(event.target.value);
        if(event.target.value === ""){
            setNameError("Name field is required")
        }
        else if (!/^[a-zA-Z ]+$/.test(event.target.value)) {
            setNameError("Name must contain only letters and spaces");
        } 
        else{
            setNameError(false);
        }
    }

    const handleMailChange: React.ChangeEventHandler<HTMLInputElement> = (event)=>{
        setMail(event.target.value);
        if(event.target.value === ""){
            setMailError("Email field is required")
        }
        else if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(event.target.value)) {
            setMailError("Invalid Email");
          } else {
            setMailError(false);
          }   
    }
    return ( 
        <div className="add">
            {error && <div>{ error }</div>}
            <Typography variant="h4" mb={2}>Add a Client</Typography>
                <Stack component="form" onSubmit={handleSubmit} noValidate spacing={2} autoComplete="off">
                    <TextField 
                        value={name}
                        error={typeof nameError === "string"}
                        helperText={nameError}
                        onChange={handleNameChange}
                        margin="dense"
                        required 
                        label="Name" variant="filled" size="medium" 
                        inputProps={{style:{color: "aliceblue"}}}
                        InputLabelProps={{className: "textfield__label"}}>
                    </TextField>
                    <TextField 
                        value={mail}
                        error={typeof mailError === "string"}
                        helperText={mailError}
                        onChange={handleMailChange}
                        margin="dense"
                        required 
                        label="Email" variant="filled" size="medium" 
                        inputProps={{style:{color: "aliceblue"}}}
                        InputLabelProps={{className: "textfield__label"}}>
                    </TextField>
                    {!isPending && <Button variant="contained" color="success" style={{fontWeight:'600'}} type="submit">{id? "Save": "Add"}</Button>}
                    {isPending && <Button disabled variant="contained" color="success" style={{fontWeight:'600'}} type="submit">{id? "Saving...": "Adding..."}</Button>}
                </Stack>
        </div>
     );
}
 
export default Add;