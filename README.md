# mathjax-single-file #

An **experimental** MathJax build as a single file.

This built offers two example configurations -- MMMLSVG, TeXSVG -- providing

* MathML input or TeX input
* Distributions / Configurations
  * MMLSVG: mml3.js, webfonts matching, AssistiveMML + SVG output (including TeX "fonts")
  * TeXSVG: almost all core TeX extensions + SVG output (including TeX "fonts")
  * TeXHTML: almost all core TeX extension + CommonHTML output (excluding fonts)
      * **Note.** webfonts URL defaults to cdnjs.com. This can be changed via `MathJax.OutputJax.CommonHTML.webfontDir` (as a regular MathJax configuration or in the relevant helper file string).
  * All distributions include the necessary MathJax internals

See the Gruntfile for more information.

For more background, see [https://github.com/mathjax/MathJax/wiki/Single-file-built](https://github.com/mathjax/MathJax/wiki/Single-file-built)

## Getting Started ##

This project assumes you have NodeJS installed.

1. Install dependencies

```shell
npm install grunt-cli -g
npm install
```

2. Build the MathJax configuration bundles

```shell
grunt
```

3. View test pages in your browser

```shell
npm start
```



