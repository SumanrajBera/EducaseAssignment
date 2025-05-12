require('dotenv').config();
const express = require("express")
const ExpressError = require("./utils/ExpressError");
const app = express()
const path = require("path")
const ejsMate = require("ejs-mate")
const connectDB = require("./db");

const schoolRouter = require("./routes/school.js")

const port = 8080

let connection;

async function main() {
    return connectDB
}

main()
    .then((res) => {
        console.log("MySQL DB Connected");
        connection = res;
    })
    .catch((err) => { console.log("Error connecting to MySQL DB:", err) })

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.engine('ejs', ejsMate)

// Routing
app.use("/", schoolRouter)

// Rollback route
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
});

// Error handling
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Server side error" } = err
    res.status(statusCode).render("error.ejs", { err })
})

app.listen(port, () => {
    console.log("App is listening on port: ", port)
})