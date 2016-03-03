# Postabular

![](https://img.shields.io/npm/v/postabular.svg) ![](https://img.shields.io/npm/l/postabular.svg)

*This project is under active development. Everything will change.*

Postabular is a tool for transforming tabular data with JS plugins. These plugins can simplify the tedious tasks about visualizating data: cleaning, validating, and transforming.

```
npm i -g postabular
```

## Usage

Use postabular from CLI with local plugin:

```
postabular -l example/set_first_row_to_1 -o output.csv input.csv
```
Use postabular from CLI with plugin package:

```
postabular -u lint-empty-cell -o output.csv input.csv
```

for more help:

```
postabular -h
```

## Plugin Development

Check `example` directory. These examples are a part of test suit so they're always updated to latest version.

## Special Thanks

Postabular is heavily inspired by [PostCSS](http://github.com/postcss/postcss) from both design and implementation perspective.
