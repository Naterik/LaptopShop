/// <reference path="./types/index.d.ts" />
import express from "express"
import 'dotenv/config'
import webRoutes from "./routes/web";
import getConnection from "./config/database";
import initDatabase from "config/seed";
import passport from "passport";
import configPassportLocal from "middleware/passport.local";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import { apiRoute } from "routes/api";
import cors from "cors"
const app = express();
const PORT = process.env.PORT || 8080

//config cors
app.use(cors({ origin: ["http://localhost:5173"] }))
//config req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//config static files
app.use(express.static('public'))

//config viewEngine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

//config session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}
));
app.use(passport.authenticate('session'));

//config passport
app.use(passport.initialize());
configPassportLocal();

//middleware
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});

//config routes
webRoutes(app);

apiRoute(app);
//config database connection
getConnection();

//fake data
initDatabase();

app.use((req, res) => {
    res.render("status/404")
})

app.listen(PORT, () => {
    console.log(`My app is running in : ${PORT}`)
})