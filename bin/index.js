#! /usr/bin/env node

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { Converter } = require('showdown');
const cheerio = require('cheerio');
const fs = require('fs');

// Get CLI arguments
const inputs = process.argv.slice(2);

const {
	port,
	stylesheet,
} = inputs.reduce((defaults, option) => {
	const [optionFlag, value] = option.split('=')
	const optionName = optionFlag.slice(2);

	defaults[optionName] = value;

	return defaults;
}, {
	port: 3000,
	stylesheet: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css',
});

// Generating dom
const dom = cheerio.load('<html><head></head><body><div class="markdown-body"></div></body></html>');
const style = `<link rel="stylesheet" href="${stylesheet}">`;
const client = `
	<script src="/socket.io/socket.io.js"></script>
	<script>
		const socket = io();
		socket.on('reload', () => location.reload());
	</script>
`;
dom('head').append(style);
dom('body').append(client);

const mdConverter = new Converter();
mdConverter.setFlavor('github');

app.get(/^((?!socket.io).)*$/, (req, res) => {
	const path = req.url;

	fs.readFile(path, (err, data) => {
		if (err) {
			res.send(err.toString());
			return;
		}

		dom('.markdown-body').html(mdConverter.makeHtml(data.toString()));
		res.send(dom.html());
	});

	io.on('connection', (socket) => {
		fs.watchFile(path, { interval: 50 }, () => socket.emit('reload'));
	});
});

http.listen(port, () => console.log(`Serving markdown at 127.0.0.1:${port}`));
