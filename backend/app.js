import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control_Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/movies', async (req, res) => {
    const movies = await fs.readFile('./data/movies.json', 'utf8');
    res.json(JSON.parse(movies));
});

app.post('/rents', async (req, res) => {
    const rentData = req.body.rent;

    if (rentData === null || rentData.items === null || rentData.items.length === 0) {
        return res.status(400).json({ message: 'Missing data.' });
    }

    if (rentData.customer.email === null || !rentData.customer.email.include('@') || rentData.customer.name === null || rentData.customer.name.trim() === '' || rentData.customer.street === null || rentData.customer.street.trim() === '' || rentData.customer['postal-code'] === null || rentData.customer['postal-code'].trim() === '' || rentData.customer.city === null || rentData.customer.city.trim() === '') {
        return res.status(400).json({
            message: 'Missing data: Email, name, street, postal code or city is missing.',
        });
    }

    const newRent = {
        ...rentData,
        id: (Math.random() * 1000).toString(),
    };
    const rents = await fs.readFile('./data/rents.json', 'utf8');
    const allRents = JSON.parse(rents);
    allRents.push(newRent);
    await fs.writerFile('./data/rents.json', JSON.stringify(allRents));
    res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    res.status(404).json({ message: 'Not found' });
});

app.listen(3000);