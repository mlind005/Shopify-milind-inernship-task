import { LegacyCard, DataTable,Page,ResourceList,ResourceItem ,Avatar,Text,Stack
,SkeletonBodyText,
Frame, Loading
} from '@shopify/polaris';
import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"

var url = "http://localhost:6969/api/v1"


const Home = () => {
  let navigate = useNavigate()
const [loading,setLoading] =  useState(true);
const [customers,setcustomers] = useState([])

useEffect(()=>{
  getData();
},[])
  const getData = async() =>{
    try{
      let res = await axios.get(`${url}/customers`)
      setcustomers(res.data.customers)
      setLoading(false)
      ToDatabase(res.data.customers)
    }
    catch(err){
      console.log(err)
    }
  }

  const ToDatabase = async(Data) =>{
    try{
      let res = await axios.post(`${url}/customers/database`,Data)
      console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }



const handleRowClick = (customer_id) =>{
  
  navigate(`Customer/${customer_id}`)
  
}

if(loading){
  return (
  <div style={{height: '100px'}}>
      <Frame>
        <Loading />
        <SkeletonBodyText/>
      </Frame>
    </div>
  )
}

      return (
        <div>
          
        <Page title="Customers Details page">
        <LegacyCard>
        <ResourceList
          resourceName={{ singular: 'customer', plural: 'customers' }}
          items={customers}
          renderItem={(item) => {
            const { id,email,first_name,last_name,orders_count,phone, } = item;
            const media = <Avatar customer size="medium" name={first_name} />;

            return (
              <ResourceList.Item
              id={id}
                // url={url}
                media={media}
                accessibilityLabel={`View details for ${email}`}
                onClick ={(id)=>handleRowClick(id)}
              >
                
               
                <Stack distribution="equalSpacing">
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {first_name}   {last_name}
                  
                </Text>
               
                <Text variant="bodyMd" fontWeight="bold" as="h3" alignment="end">
                  {orders_count} orders
                 <br />
                  {phone} 
                </Text>
                  
                </Stack>
                <div>{email}</div>
              </ResourceList.Item>
            );
          }}
          />
          
        </LegacyCard>
        
        </Page>
          </div>
      );
}

export default Home






