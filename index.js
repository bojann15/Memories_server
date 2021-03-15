import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import PostMessage from "./models/postMessage.js"


const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes)
app.get('/', (req, res) => {
    res.send('Hello to memories API');
});



//const CONNECTION_URL = 'mongodb+srv://bojann:bojann123@cluster0.vvqbi.mongodb.net/<dbname>?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((errorr) => console.log(errorr.message));

mongoose.set('useFindAndModify', false);

