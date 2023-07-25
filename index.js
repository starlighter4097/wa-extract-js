const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', (req, res) => {
    const htmlText = req.body.html_text;
    const outputFile = req.body.output_file;

    const phoneNumbers = extractPhoneNumbers(htmlText);

    res.redirect(`/processed?phone_numbers=${phoneNumbers.join(',')}&output_file=${outputFile}`);
});

app.get('/processed', (req, res) => {
    const items = req.query.phone_numbers.split(',');
    const heading = req.query.output_file;

    res.render('processed', { items, heading });
});

function extractPhoneNumbers(htmlText) {
    // Regex pattern to match a specific pattern in the HTML text
    const pattern = /\+\d{1,4}\s\d{5}\s\d{5}/g;

    // Find all matches of the pattern in the HTML text
    const matches = htmlText.match(pattern);
    const uniqueMatches = [...new Set(matches)];

    return uniqueMatches;
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
module.exports = app;
