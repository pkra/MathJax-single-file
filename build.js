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
build(
    'TeX',
    'MathML',
    'CommonHTML', {
        toFile: true,
        compress: true
    });

// Readium build
build(
    'TeX',
    'MathML',
    'SVG', {
        toFile: true,
        compress: true,
        customExtensions: [
        '/extensions/mml2jax.js',
        '/extensions/MathML/mml3.js',
        '/extensions/AssistiveMML.js'
    ],
     folder: 'readium'
    });


// build(
//     'TeX',
//     'TeX',
//     'HTML-CSS', {
//         toFile: true,
//         compress: true
//     });
