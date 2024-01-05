const express = require('express');
const dotenv = require('dotenv');
const bybitRoutes = require('./bybit/routes/bybitRoutes');
const binanceRouter = require('./binance/routes/binanceRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/bybit', bybitRoutes);
app.use('/binance', binanceRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
