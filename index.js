const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const userInfoDb = client.db('fastElectro').collection('userInfo');
        const userReviews = client.db('fastElectro').collection('reviews');
       
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

        // get one service by id
        app.get('/serviceDetails/:id', async(req, res)=>{

            const serviceId = req.params.id;
            const query = {_id:ObjectId(serviceId)};

            const singleService = await fastElectro.findOne(query);
            res.send(singleService)
        })
        // get all reviews 
        app.get('/allReviews', async(req, res)=>{
            const query = {};
            const cursor = userReviews.find(query);
            const allReviews = await cursor.toArray();
            res.send(allReviews);
            

        })

        // user specific reviews
        app.get('/userSpecificReview',async (req, res)=>{
            const emailQueries = req.query.email;
            const query = {
                email:emailQueries
            }
            const cursor = userReviews.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        // post user information
        app.post('/userInfo', async(req, res)=>{
            const userData = req.body;
            const result = await userInfoDb.insertOne(userData);
            console.log(result)
            // res.send('hello')
        })

        // post new service
        app.post('/addService', async(req, res)=>{
            const newService = req.body;
            const result = await fastElectro.insertOne(newService);
            res.send(result);
           
        })
        // post reviews 
        app.post('/addReview', async(req, res)=>{
            const review = req.body;
            const result = await userReviews.insertOne(review);
            res.send(result);
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