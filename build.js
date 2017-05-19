var build = require('./main.js').build;

build(
    'TeX',
    'TeX',
    'CommonHTML', {
        toFile: true,
        compress: true
    });
build(
    'TeX',
    'TeX',
    'SVG', {
        toFile: true,
        compress: true
    });
build(
    'STIX-Web',
    'TeX',
    'SVG', {
        toFile: true,
        compress: true
    });
build(
    'TeX',
    'MathML',
    'SVG', {
        toFile: true,
        compress: true
    });
// build(
//     'TeX',
//     'TeX',
//     'HTML-CSS', {
//         toFile: true,
//         compress: true
//     });
