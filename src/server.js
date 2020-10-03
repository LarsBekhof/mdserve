const express = require('express');
const markdown = require('markdown').markdown;
const cheerio = require('cheerio');
const fs = require('fs');

const port = 3000;
const mdDialect = 'Maruku';
const stylesheetUrl = 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css';

const dom = cheerio.load('<html><head></head><body class="markdown-body"></body></html>');
const style = `<link rel="stylesheet" href="${stylesheetUrl}">`;
dom('head').append(style);

const app = express();

app.get('*', (req, res) => {
	fs.readFile(req.path, (err, data) => {
		if (err) {
			res.send(err.toString());
		} else {
			dom('body').html(markdown.toHTML(data.toString(), mdDialect));

			res.send(dom.html());
		}
	});
});

app.listen(port, () => console.log(`Serving markdown at 127.0.0.1:${port}`));
