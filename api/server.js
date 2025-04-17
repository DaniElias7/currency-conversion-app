import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';



import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT;

// Replace with your actual API key from ExchangeRate-API
const API_KEY = process.env.EXCHANGERATE_API_KEY;

// Basic in-memory cache
const exchangeRateCache = {};
const cacheExpiryTime = 60 * 60 * 1000; // keep in memory for 1 hour

app.use(cors()); // Enable CORS for all origins (for development)
app.use(express.json()); // To parse JSON request bodies (not strictly needed for this example)

app.get('/api/convert', async (req, res) => {
    const { from, to, amount } = req.query;

    if (!from || !to || !amount || isNaN(amount)) {
        return res.status(400).json({ error: 'Invalid parameters.' });
    }

    const amountToConvert = parseFloat(amount);
    const fromUpperCase = from.toUpperCase();
    console.log('Source Currency (Uppercase):', fromUpperCase);

    const toUpperCase = to.toUpperCase();

    // Simple caching logic
    if (exchangeRateCache[fromUpperCase] && exchangeRateCache[fromUpperCase].timestamp > Date.now() - cacheExpiryTime) {
        const rates = exchangeRateCache[fromUpperCase].rates;
        if (rates && rates[toUpperCase]) {
            const convertedAmount = amountToConvert * rates[toUpperCase];
            return res.json({ convertedAmount: convertedAmount.toFixed(2) });
        }
    }

    try {
        const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromUpperCase}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result === 'error') {
            return res.status(400).json({ error: data['error-type'] });
        }

        if (data.conversion_rates && data.conversion_rates[toUpperCase]) {
            const exchangeRate = data.conversion_rates[toUpperCase];
            const convertedAmount = amountToConvert * exchangeRate;

            // Update the cache
            exchangeRateCache[fromUpperCase] = {
                rates: data.conversion_rates,
                timestamp: Date.now(),
            };

            return res.json({ convertedAmount: convertedAmount.toFixed(2) });
        } else {
            return res.status(404).json({ error: `Exchange rate for ${toUpperCase} not found.` });
        }
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return res.status(500).json({ error: 'Failed to fetch exchange rates.' });
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});