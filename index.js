const express = require('express')
const { MongoClient } = require('mongodb');
require("dotenv").config();//dotenv config
const app = express()
const cors = require('cors')//cors for own server connected with own;
const port = process.env.PORT || 5000;


//Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f2uob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// console.log(uri)

async function run(){
    try{
        await client.connect();
        console.log('yes database connected')
        const database = client.db("Tour-Dibo");
        const servicesCollection = database.collection("services");
        const eventsCollection = database.collection("users");

        //getServices
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            // console.log(services);
            res.send(services);
        })

        //AddServices
        app.post('/services', async (req, res) => {
            const newService = req.body;
            const result = await servicesCollection.insertOne(newService);
            res.json(result);
        })
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req,res) => {
    res.send('tour dibo server')
})

app.listen(port, () => {
    console.log('running server on port', port)
})