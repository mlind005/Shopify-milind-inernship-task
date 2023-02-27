import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard';
import { useParams } from 'react-router-dom';
import axios from "axios"

import {
    Page, LegacyCard,
    FormLayout, Form, TextField, Button, Stack, Frame,
    Loading,
    SkeletonBodyText,ButtonGroup
} from '@shopify/polaris';

var url = "http://localhost:6969/api/v1"





const Details = () => {
    const { customer_id } = useParams()
    const [isLoading, setLoading] = useState(true)

  

    const [cust, setcust] = useState({});
    const [inputs, setInputs] = useState({ id: "", email: "", first_name: "", last_name: "",  })
    const [orders, setOrders] = useState({ id: "", email: "", first_name: "", last_name: "",  })




    // here we are getting data from webApi

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        try {
            let res = await axios.get(`${url}/customer/details/${customer_id}`)
            setLoading(false)
            const { id, email, first_name, last_name } = res.data.customer
            setInputs({ id, email, first_name, last_name })
            setcust({ id, email, first_name, last_name })
            setOrders(res.data.Orders)
        }
        catch (err) {
            console.log(err)
        }
    }


    const handleSubmit = async() => {
       
        try{
            let res =await axios.put(`${url}/customer/update/`,inputs)
            alert(res.data.message);
            getData();
        }
        catch{

        }
    }





    if (isLoading) {
        return (
            <div style={{ height: '100px' }}>
                <Frame>
                    <Loading />
                    <SkeletonBodyText />
                </Frame>
            </div>
        )
    }





    return (
        <div>
            <Page title={`${cust.first_name}  ${cust.last_name}'s Dashboard`}>
                <LegacyCard title="Type to change" sectioned>

                    <FormLayout>
                        <FormLayout.Group>
                            <TextField
                                name="first_name"
                                value={inputs.first_name}
                                onChange={(value) => {
                                    setInputs({ ...inputs, first_name: value })
                                }}
                                label="First Name"
                                type="text"
                                autoComplete="off"

                            />

                            <TextField
                                name="last_name"
                                value={inputs.last_name}
                                onChange={(value) => {
                                    setInputs({ ...inputs, last_name: value })
                                }}
                                label="Last Name"
                                type="text"
                                autoComplete="off"
                            />

                        </FormLayout.Group>
                        <FormLayout.Group>
                            <TextField
                                name="email"
                                value={inputs.email}
                                onChange={(value) => {
                                    setInputs({ ...inputs, email: value })
                                }}
                                label="Email"
                                type="email"
                                autoComplete="off"
                                none
                            />
                           
                        </FormLayout.Group>
                        
                        <ButtonGroup>
                            <Button primary onClick={handleSubmit}>Submit</Button>
                            <Button onClick={getData}>Refresh</Button>
                        </ButtonGroup>
                    </FormLayout>

                </LegacyCard>
            </Page>
            <Page title={`${cust.first_name}  ${cust.last_name}'s Orders`}>
                {orders.map((cur) => <OrderCard {...cur} key={cur.order_id} />)}
            </Page>
        </div>
    )
}

export default Details




