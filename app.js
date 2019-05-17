const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const port = 3000;

app.get('/', (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`App listening on port ${port}!`));