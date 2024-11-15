import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("I am hamid Abdullah Testing");
})

app.get('/weather', (req, res) => {
    res.send("Weather Details ...");
});

app.listen(3000, () => {
    console.log("Server is Running On Port 3000");
});
