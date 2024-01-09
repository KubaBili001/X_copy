import { Request, Response} from 'express'
import * as mongoDB from "mongodb";
import User from './models/User';

const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser')
const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const fs = require('fs').promises;

// PORT NUMBER
const port: number = 3001

let client: mongoDB.MongoClient;

// Get database connection string from a text file
const getConn = async () => {
    try {
        const data: string = await fs.readFile('../database/db-conn.txt', 'utf8');
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};


// Assign database string using promise
getConn()
.then(result => {
    //Create a MongoClient with a MongoClientOptions object to set the Stable API version
    client = new MongoClient(result, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    })
.catch(err => console.error(err));

// Create server
const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    console.log("/")
    res.send('api is working')
})

app.post('/signin', (req: Request, res: Response) => {
    console.log("/signin")
    const { username, password }: Login = req.body;
    console.log(username, password)

    const validate = async function () {
        try {
            await client.connect();

            const database = client.db("tin_project");
            const users = database.collection("user");
            
            const query = { username: username };
            
            const user = (await users.findOne(query)) as User;

            if(!user){
                return false
            }

            if(!(await bcrypt.compare(password, user.password))){
                return false
            }

            return true

        } finally {
            await client.close();
        }
    }
    validate()
        .then(result => {
            console.log(result)
            res.send(result)
        }
            )
        .catch(console.dir) 

})

app.post('/register', (req: Request, res: Response) => {

})

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})

// Function validating users password
function validateHash(hash: string){
    bcrypt
        .compare('kubabili', hash)
        .then((res: boolean) => {
            if(res){
                console.log(true)
            }else{
                console.log(false)
            }
        })
        .catch((err: Error) => console.log(err.message))
}    

// TYPES

type Login = {
    username: string,
    password: string
}

