# MDServe
MDServe is a tool to view markdown files in your browser

## Installation
`npm i -g @larsbekhof/mdserve`

## Features
**View markdown files in the browser:** While the MDServe server is running you can access all your markdown file through the HTTP path

**Hot reloading:** Just safe your markdown file and the browser window will reload

**Customizable styling:** Custom CSS stylesheets can be loaded

## Options
- `port` (default `--port=3000`)
- `stylesheet` (default `--stylesheet=https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css`)

## Usage
```
mdserve [--port=3000, --stylesheet=https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css]
```

Then go to:
`http://localhost:3000/path/to/file.md`
