import { Request, Response} from 'express'

const bodyParser = require('body-parser')
const express = require('express')

const port: number = 3000
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('api is working')
})

app.post('signin', (req: Request, res: Response) => {

})

app.post('register', (req: Request, res: Response) => {

})

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})