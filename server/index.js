require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const IC = require('./controllers/inventoryController');

const { SERVER_PORT, DB_STRING } = process.env;

app.use(express.json());

massive(DB_STRING)
    .then(db => {
        app.set('db', db);
        console.log('DB linked');
    })
    .catch(err => console.log(err));

// INVENTORY ENDPOINTS
app.get('/api/inventory/:inventory_id?', IC.getInventory);
app.post('/api/inventory', IC.addInventory);

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))