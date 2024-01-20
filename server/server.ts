import { Request, Response} from 'express'
import * as mongoDB from "mongodb";
import { ObjectId } from 'mongodb';
import User from './models/User';

const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
const express = require('express')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const fs = require('fs').promises;
require('dotenv').config()

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
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    console.log("/")
    res.send('api is working')
})

app.post('/signin', (req: Request, res: Response) => {
    console.log("/signin")
    const { username, password }: Login = req.body;

    const validate = async function (): Promise<ApiResponse> {
        try {
            await client.connect();

            const database = client.db("tin_project");
            const users = database.collection("user");
            const query = { username: username };
            const user = (await users.findOne(query)) as User;

            if(!user){
                return {
                    message: "User name is not found. Invalid login credentials.",
                    success: false, 
                } as ApiResponse
            }

            if(!(await bcrypt.compare(password, user.password))){
                return {
                    message: "Incorrect password",
                    success: false, 
                } as ApiResponse
            }
        
            console.log(user._id.toString())

            return {
                token: jwt.sign(
                    {
                        role: user.role,
                        name: user.name,
                        email: user.email,
                    },
                        process.env.APP_SECRET,
                    { expiresIn: "1 day" }
                    ),
                message: "Correct password",
                success: true,
                id: user._id.toString()
            } as ApiResponse

        } finally {
            await client.close();
        }
    }
    validate()
        .then(result => { res.send(result) })
        .catch(console.dir) 
})

app.post('/signup', (req: Request, res: Response) => {
    console.log("/signup")

    const { name, lastName, email, username, password, date }: Register = req.body;

    console.log(date)

    const validate = async function () {
        try {
            await client.connect();

            const database = client.db("tin_project");
            const users = database.collection("user");
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const obj = { 
                username: username,
                email: email,
                password: hash,
                role: "user",
                name: name,
                last_name: lastName,
                birth_date: date,
                join_date: new Date() 
             };

             const result = await users.insertOne(obj); 

             console.log(`A document was inserted with the _id: ${result.insertedId}`);

            return {
                message: "User added.",
                success: true, 
            } as ApiResponse
        } catch (exc) {
            return {
                message: exc,
                success: false, 
            } as ApiResponse
        } finally {
            await client.close();
        }
    }
    validate()
        .then(result => { res.send(result) })
        .catch(console.dir) 
})

app.post('/posts', (req: Request, res: Response) => {

    console.log('posts')

    const userId: ObjectId = new ObjectId(req.body.userId)
    const skip: number = req.body.skip

    console.log(userId)

    const getPostsForFollowedUsers = async function (userId: ObjectId): Promise<ApiPostsResponse[]> {
        try {

          await client.connect();

          const followersCollection: mongoDB.Collection<Follower> = client.db("tin_project").collection<Follower>('followers');
      
          const result = await followersCollection.aggregate([
            { $match: { follower_id: userId } },
            { $lookup: { from: 'posts', localField: 'user_id', foreignField: 'user_id', as: 'userPosts' } },
            { $lookup: { from: "user", localField: "user_id", foreignField: "_id", as: "users" } },
            { $unwind: '$userPosts' },
            { $unwind: '$users' },
            { $sort: { 'date': 1 } },
            { $skip: skip },
            { $limit: 10 },
            { $project: { "_id": 0, "user_id": 0,  "follower_id": 0 } }

          ]).toArray();

          const res: ApiPostsResponse[] = await result.map((entry) => {
            return {
                    content: entry.userPosts.text_content,
                    image: entry.userPosts.picture,
                    username: entry.users.username
            }
          });

          return res;
        } finally {
          await client.close();
        }
      }

      getPostsForFollowedUsers(userId)
      .then(posts => { 
        res.send(posts) 
    })
      .catch(console.dir)
})

app.post('/addPost' , (req: Request, res: Response) => {

    console.log('addPost')

    const {image, content} : {image: string, content: string} = req.body
    const userId: ObjectId = new ObjectId(req.body.userId)

    const addPost = async function (image: string, content: string, userId: ObjectId): Promise<ApiResponse> {
        try {
          await client.connect();

          const posts: mongoDB.Collection<Post> = client.db("tin_project").collection<Post>('posts');
      
          const obj: Post = {
            date: new Date().toString(),
            user_id: userId,
            text_content: content,
            picture: image
          }

          await posts.insertOne(obj); 

          return {
            message: "Post succesfully added",
            success: true, 
        } as ApiResponse
        } catch (exc) {
            return {
                message: exc,
                success: false, 
            } as ApiResponse
        } finally {
          await client.close();
        }
      }

      addPost(image, content, userId)
      .then(posts => { res.send(posts) })
      .catch(console.dir)
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})

// TYPES

type Login = {
    username: string,
    password: string
}

type Register = {
    username: string,
    email: string,
    password: string,
    role: string,
    name: string,
    lastName: string,
    date: string,
    joinDate: string
}

type Follower = {
    id: ObjectId;
    user_id: ObjectId;
    follower_id: ObjectId;
}

type Post = {
    id?: ObjectId,
    date: string,
    user_id: ObjectId,
    text_content: string,
    picture: string
}

type ApiPostsResponse = {
    content: string,
    image: string,
    username: string
}

type ApiResponse = {
    token?: string,
    id?: string,
    message: string,
    success: boolean, 
}

