const express = require('express');
const path = require('path');
const homeRoutes = require('./app/routes/homeRoutes');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
