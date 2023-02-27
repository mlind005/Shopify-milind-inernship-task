const express = require("express")
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose')
const Customer = require("./Scemas/Customer");
const { findOne } = require("./Scemas/Customer");

const Url = "https://milind-internship-store.myshopify.com/admin/api/2023-01"

const accesstoken = "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"




async function Saveindatabese(id, email, first_name, last_name, orders_count, phone, created_at){
    try{
        
    }
    catch(err){
        console.log("while in function its errr")
    }
}








// getting all costomers data
router.get("/customers", async (req, res) => {
    try {
        
        const response = await axios.get(`${Url}/customers.json`, {
            headers: {
                'X-Shopify-Access-Token': accesstoken
            }
        });
        if (response) {
            const myData = response.data.customers


// destructuring the data

            let customers = myData.map((cur) => {
                const { id, email, first_name, last_name, orders_count, phone, created_at } = cur
                return ({id, email, first_name, last_name, orders_count, phone, created_at })
            })
            

            
            // now we just store this data in our local mongoDb database 
            

            res.status(200).json({ customers })
        }
    }
    catch (err) {
        res.status(200).json({ message: "hghl" })
        console.log(err)
    }
})




// getting order data for the customer by id which contains customer data too 
router.get("/customer/details/:c_id", async (req, res) => {
    try {
       
        const c_id = req.params.c_id
        const response = await axios.get(`${Url}/customers/${c_id}/orders.json`, {
            headers: {
                'X-Shopify-Access-Token': accesstoken
            }

        });
        if (response) {
            let rowData = response.data.orders

            // getting customers data of customer 
            const { customer } = rowData[0];
        
            
            let Orders = []
            Orders = rowData.map((cur) => {
                const { id, name, created_at, line_items, total_price } = cur

                // here destructuring bacause it contains lots of fields 
                const order_items = line_items.map((ele) => {
                    return {
                        p_id: ele.id,
                        p_name: ele.name,
                        p_quantity: ele.quantity,
                        p_price: ele.price,
                    }
                })
                return ({
                    order_id: id,
                    order_name: name,
                    order_date: created_at,
                    order_items: order_items,
                    Total: total_price
                })
            })
           
           

            res.status(200).json({customer,Orders })
            
            
        }
    }
    catch (err) {
        res.status(200).json({ customer:"",Orders:'' })
        console.log(err)
    }
})



// here we are putting put request for the customer fields change 

router.put("/customer/update", async(req,res)=>{
   try{
        const {id, email, first_name, last_name, phone} = req.body
        


        const response = await axios.put( `${Url}/customers/${id}.json`,
            {
                'customer': {
                    'id': id,
                    'email': email,
                    "first_name":first_name,
                    "last_name":last_name,
                    
                }
            },
            {
                headers: {
                    'X-Shopify-Access-Token':accesstoken,
                    'Content-Type': 'application/json'
                }
            }
        );
       
        // here we are going to update ours customers data in local database 
       



        if(response.status==200){
            const updated = await Customer.updateMany({Special_id:id},{$set:{
             email, first_name, last_name
            }})
            

            res.status(200).json({message:"Customer successfully updated "})
        }
        else{
            res.status(200).json({message:"Customer  update failed "})
        }
   }
   catch(err){
    console.log(err)
   }
})



router.post("/customers/database",async(req,res)=>{
    try{
        var customers = req.body
        customers = customers.map((item)=>{
        const {id,email,first_name,last_name,orders_count,phone,} =item
            return({"Special_id":item.id,
            email,first_name,last_name,orders_count,phone, })})


      customers.forEach( async(cur)=>{
          const findC = await Customer.findOne({Special_id:cur.Special_id})
        if(findC){
            console.log(cur.Special_id)
        }
        else{
            const newC = new Customer({...cur})
            await newC.save()
            console.log("created")
        }
      })

        // const result = await Customer.insertMany([...customers])
        // console.log(result)
        
        

       
        
    }
    catch(err){
        console.log(err)
    }
})


module.exports = router;