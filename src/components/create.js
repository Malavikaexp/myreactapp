import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useState,useEffect } from 'react';
import axios from 'axios';

export default function Create({ onNewDataAdded }) {
    const [APIData, setAPIData] = useState([]);;
    const [name, setName] = useState('');
    const [Qualification, setQualification] = useState('');

    // useEffect(() => {
    //     getData();
    // }, [])

    // const getData = async () => {
    //     await axios.get(`https://652d15d2f9afa8ef4b26c279.mockapi.io/tutorials`)
    //         .then((getData) => {
    //              setAPIData(getData.data);
    //          })
    // }

    const postData = () => {
        axios.post(`https://652d15d2f9afa8ef4b26c279.mockapi.io/tutorials`, {
            name,
            Qualification,
        })
        .then(() => {
           // getData();
            setName('');
            setQualification('');

            onNewDataAdded();

        })
    }

    return (
        <div style={{ marginTop: 20}}>
            <h2>Add Candidates</h2>
            <Form className="create-form">
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Qualification</label>
                    <input placeholder='Qualification' value={Qualification} onChange={(e) => setQualification(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}