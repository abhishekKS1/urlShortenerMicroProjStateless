const express = require("express");
const { connectToMongoDB } = require("./connect.js");

const cookieParser = require("cookie-parser");
const {
    restrictToLoggedinUserOnly,
    checkAuth
} = require("./middlewares/auth.js");

const path = require("path");
const URL = require("./models/url.js");

const urlRoute = require("./routes/url.js");
const staticRoute = require("./routes/staticRouter.js");
const userRoute = require("./routes/user.js");

const app = express();
const PORT = 7001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(
    console.log("MongoDB connected!")
);

app.set("view engine", "ejs");

app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );
    try{
        res.redirect(entry.redirectUrl);
    } catch(err){
        console.log(err)
    }
    
});

app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});
