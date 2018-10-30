/* eslint no-console:0 */

const express = require("express");
const helmet = require("helmet");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const app = express();


app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', function(req, res) {
  res.redirect('/login.html');
});

app.use(
  express.static("./css", {
    index: false,
    maxAge: "1ms"
  })
);

app.use(
  express.static("./html", {
    index: false,
    maxAge: "1ms"
  })
);

app.use(
  express.static("./js", {
    index: false,
    maxAge: "1ms"
  })
);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.info(`Server listening at port ${PORT}`);
}); 

