const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// mongodb uri 
const uri = `mongodb+srv://${process.env.FAST_ELECTRO_USER}:${process.env.FAST_ELECTRO_PASSWORD}@cluster0.f6i98.mongodb.net/?retryWrites=true&w=majority`;

// mongodb client 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// meddle ware
app.use(cors());
app.use(express.json());



// connect with mongodb 


const run = async ()=>{
    try{
        const fastElectro = client.db('fastElectro').collection('electroServices');
       
        //get for home services
        app.get('/services', async(req, res)=>{
            const query = {};
            const cursor = fastElectro.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services);
        })

        // get for all services
        app.get('/allServices', async(req, res)=>{
            const query = {};
            const cursor = fastElectro.find(query);
            const allServices = await cursor.toArray(); 
            res.send(allServices)
        })


       
      
    }
    finally{

    }

}
run().catch(console.dir)




app.get('/', (req, res)=>{
    res.send('this is a fast electro web site')
})


app.listen(PORT, ()=>{
    console.log(`the ser ver is running on ${PORT}`)
})