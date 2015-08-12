# dx-phantomcss-reporter

Reporter for [dx-phantomcss](https://github.com/devex-web-frontend/dx-phantomcss)

Generates html-report using config from `dx-phantomcss`

## Installation
```console
$ npm install --save devex-web-frontend/dx-phantomcss-reporter devex-web-frontend/dx-phantomcss
```

NOTE: `dx-phantomcss-report` does not require `dx-phantomcss` as a dependency, but generally it can use basic config which is located in `dx-phantomcss` package.

## CLI

Run with command:

```sh
dx-phantomcss-reporter report ./node_modules/dx-phantomcss/config/phantomcss.js
```

Or add to package.json scripts section
```json
{
	"scripts": {
		"report": "dx-phantomcss-reporter report ./node_modules/dx-phantomcss/config/phantomcss.js"
	}
}
```

### Commands

- `report <configPath>`
Generates regression report basing on phantomcss `configPath` provided (Basic config is located in `dx-phantomcss` package)

### Options
- `-d, --destination [destinationPath]`
Additional parameter specifying destination folder for generated report. Default value is `./report`