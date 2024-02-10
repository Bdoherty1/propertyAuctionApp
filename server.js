const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/scrape', async (req, res) => {
    try {
        const targetUrl = 'https://currentauctions.towneauction.com';
        const response = await fetch(targetUrl);
        const html = await response.text();

        const $ = cheerio.load(html);
        const data = [];

        $('table tbody tr').each((index, element) => {
            const columns = $(element).find('td');
            const rowData = {
                name: $(columns[0]).text().trim(),
                currentBid: $(columns[1]).text().trim(),
                endsIn: $(columns[2]).text().trim(),
                // Add more properties as needed
            };
            data.push(rowData);
        });

        res.json(data);
    } catch (error) {
        console.error('Error scraping website:', error);
        res.status(500).json({ error: 'Error scraping website' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});