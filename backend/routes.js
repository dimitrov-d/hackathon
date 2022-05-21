const config = require('dotenv').config().parsed;
const { MongoClient } = require('mongodb');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const categories = req.body.categories;
    const client = new MongoClient(config.MONGO_DB_URL);
    await client.connect();
    const db = client.db('Cluster0');
    const collection = db.collection('users');
    await collection.insertOne({ name , password, email, categories });
    console.log(req.body);

    res.send('Register Success!')
});

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const client = new MongoClient(config.MONGO_DB_URL);
    await client.connect();
    const db = client.db('Cluster0');
    const collection = db.collection('users');
    const user = await collection.findOne({ password, email });
    if(user == null) {
        res.status(400).send("User not exist");
    }
    res.status(200).send('Login Success!');
});


router.get('/diets', async (req, res) => {
    const client = new MongoClient(config.MONGO_DB_URL);
    await client.connect();
    const db = client.db('Cluster0');
    
    db.collection("foodDiets").find({}).toArray(function(err, result) {
        if (err) return res.status(400).send("Empty");
        return res.status(200).send(result);
    
      });
    });

    router.get('/allergens', async (req, res) => {
        const client = new MongoClient(config.MONGO_DB_URL);
        await client.connect();
        const db = client.db('Cluster0');
        
        db.collection("allergens").find({}).toArray(function(err, result) {
            if (err) return res.status(400).send("Empty");
            return res.status(200).send(result);
        
          });
        });


        router.get('/meals', async (req, res) => {
            const client = new MongoClient(config.MONGO_DB_URL);
            await client.connect();
            const db = client.db('Cluster0');
            
            db.collection("meals").find({}).toArray(function(err, result) {
                if (err) return res.status(400).send("Empty");
                return res.status(200).send(result);
            
              });
            });
    
    //if(foodDiets == null) res.status(400).send({});

    



module.exports = { router };
