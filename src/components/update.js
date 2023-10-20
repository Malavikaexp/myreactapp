import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button,  Form } from 'semantic-ui-react';
import axios from "axios";

export default function Update(){

    const {id} = useParams();
    const [data,setUpdateData] = useState([])
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get(`https://652d15d2f9afa8ef4b26c279.mockapi.io/tutorials/`+id)
        .then(res => setUpdateData(res.data))
        .catch(err => console.log(err))
    },[])

    function handleSave(event){
        event.preventDefault();
        axios.put(`https://652d15d2f9afa8ef4b26c279.mockapi.io/tutorials/`+id,data)
        .then(res =>{
            alert("data updated successfully");
            navigate('/');
        })

    }

    return(
        <div>
            
            <h2>Update Candidates</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={data.name} onChange={e => setUpdateData({...data, name : e.target.value})}/>
                </Form.Field>
                <Form.Field>
                    <label>Qualification</label>
                    <input placeholder='Qualification' value={data.Qualification} onChange={e => setUpdateData({...data, Qualification : e.target.value})} />
                </Form.Field>
                <Button onClick={handleSave} type='submit'>Save</Button>
            </Form>

        </div>
    )
}
