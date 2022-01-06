import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import intitWebRoutes from "./route/web"
require('dotenv').config()

let app = express();
let port = process.env.PORT || 6969;
//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

viewEngine(app);
intitWebRoutes(app);

console.log(process.env.PORT);
app.listen(port , () => {
    console.log('App nodejs runing on port : ' + port);
})