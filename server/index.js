import mongoose from 'mongoose';
import cors from 'cors'
import bodyParser from 'body-parser';
import express from 'express'
import session from 'express-session'
import dotenv from 'dotenv';
import router from './routers/routers.js';
import paypal from 'paypal-rest-sdk'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

paypal.configure({
  mode: 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET
})

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: '*', // Allow your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
app.set('view engine', 'ejs')



//connect to mongoose
const PORT = process.env.PORT || 5000;
const dbUrl = process.env.DATABASE_URL;



//--------------------------
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = path.dirname(__filename);
 app.use(express.static(path.join(__dirname, '../client/build')));
 app.get('/api/endpoints', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use(router);
 app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
 });
//------------------------------------


const connectMongoose = async() => {
    await mongoose.connect(dbUrl)
    .then(() => app.listen(PORT, () => console.log`successfully connected to mongoose `))
    .catch((error) => console.log(error.message))
}

connectMongoose();




