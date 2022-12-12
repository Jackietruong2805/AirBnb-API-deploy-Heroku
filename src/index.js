const express = require('express');
const app = express();
const cors = require('cors');
const rootRoutes = require('./Routes');
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.static("."));
app.use(express.json());

app.use('/api', rootRoutes);



app.listen(port);