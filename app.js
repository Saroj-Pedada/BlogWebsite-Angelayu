const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec imperdiet justo vel ante maximus vehicula." +
    "Vivamus convallis libero ut pulvinar ultrices. Aenean tempor diam eget orci euismod gravida. Quisque a metus laoreet, vehicula mi sed," +
    " mattis est. Sed ut est elementum libero eleifend porttitor eu id ligula. Praesent tempus pretium aliquam. ";

const aboutContent = "Proin quis fringilla tortor. Aliquam turpis quam, ultrices sit amet euismod et, iaculis vitae eros." +
    "Quisque vulputate porta dapibus. Proin lobortis eu tellus nec imperdiet. Integer tincidunt nec libero non dictum. Aenean sed metus lacus." +
    " Maecenas vitae orci ex. Nulla in odio dapibus, sagittis magna nec, posuere turpis. Maecenas sed ante et turpis imperdiet imperdiet.";

const contactContent = "Cras nec metus elit. Ut ullamcorper urna in velit auctor, sit amet mollis odio accumsan. Mauris fringilla" +
    "pretium mattis. Cras vel orci semper, lobortis arcu ac, fringilla enim. Mauris consequat eros at sapien dictum euismod. Cras sagittis risus " +
    "sit amet est placerat dignissim. Curabitur placerat eu turpis sed efficitur. Quisque eleifend feugiat erat. Proin quis odio nisi.";

var arr = [];

app.get("/", function (req, res) {
    res.render("home", {
        startingContent: homeStartingContent,
        posts: arr
    });
});

app.get("/contact", function (req, res) {
    res.render("contact", { startingContent: contactContent });
});

app.get("/about", function (req, res) {
    res.render("about", { startingContent: aboutContent });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const post = {
        title: req.body.titleText,
        content: req.body.postText
    };
    arr.push(post);
    res.redirect("/")
})

app.get("/posts/:title", function (req, res) {
    let requestedTitle = req.params.title;
    arr.forEach(function (element) {
        if (lodash.lowerCase(element.title) == lodash.lowerCase(requestedTitle)) {
            res.render("post", {
                title: element.title,
                content: element.content
            });
        }    
    });
    res.send("Error 404! Page not found")
})

app.listen(3000, function () {
    console.log("Succesfully running on port 3000");
});