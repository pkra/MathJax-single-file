var build = require('./main.js').build;

build(
    'TeX',
    'TeX',
    'CommonHTML');
build(
    'TeX',
    'TeX',
    'SVG');
build(
    'STIX-Web',
    'TeX',
    'SVG'
);
