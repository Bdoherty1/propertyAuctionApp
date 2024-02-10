async function scrapeWebsite(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Display the scraped data in the HTML document
        const outputDiv = document.getElementById('output');
        if (data) {
            outputDiv.textContent = JSON.stringify(data, null, 2);
        } else {
            outputDiv.textContent = 'Error scraping website. Please check the console for details.';
        }
    } catch (error) {
        console.error('Error scraping website:', error);
        const outputDiv = document.getElementById('output');
        outputDiv.textContent = 'Error scraping website. Please check the console for details.';
    }
}

// Example usage
document.getElementById('scrapeButton').addEventListener('click', () => {
    const targetUrl = '/scrape'; // Changed to match the server route
    scrapeWebsite(targetUrl);
});