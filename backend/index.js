const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Backend is up and running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is up and running on port ${PORT}');
});
