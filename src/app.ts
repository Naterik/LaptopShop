import express from "express"
import 'dotenv/config'
import webRoutes from "./routes/web";
import getConnection from "./config/database";
import initDatabase from "config/seed";

const app = express();
const PORT = process.env.PORT || 8080

//config req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//config static files
app.use(express.static('public'))

//config viewEngine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')


//config routes
webRoutes(app);
//config database connection
getConnection();


//fake data
initDatabase();

app.listen(PORT, () => {
    console.log(`My app is running in : ${PORT}`)
})