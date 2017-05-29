# mathjax-single-file #

A tool to build MathJax bundles.

## Getting Started ##

This project assumes you have NodeJS 6+ installed.

1. Install dependencies

```shell
npm install
```

2. Use

This library exports a single method `build` which takes several options and returns a string (the JS string of the build); it can write that string to disk.

```javascript
const build = require('main.js').build;
build(
  fontname,                                // TeX, STIX-Web, Asana-Math, Neo-Euler, Gyre-Pagella, Gyre-Termes, cf. http://docs.mathjax.org/en/latest/font-support.html Latin-Modern
    input,                                // MathML, TeX, AsciiMath
    output,                               // SVG, CommonHTML, (TODO: HTML-CSS)
    {                                     // options
        toFile: true,                     // write to file
        compress: true,                   // uglify output
        customExtensions: [],             // array of extension filenames; if empty, default extensions of the input are used
        folder: ''                        // folder name to write file output to; relative to `dist` defaults to `options.input+options.output+options.fontname`, e.g., `dist/MathMLSVGTeX`
    });
```

3. Build pre-configured bundles

```shell
npm run build
```

See `build.js` for details for those builds.

4. View test pages in your browser

```shell
npm start
```
