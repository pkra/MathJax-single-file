/*
MathJax-grunt-combiner
======================

A grunt file to build single-file versions of MathJax

* Fetch a copy of MathJax and extract the unpacked folder
    `$ wget https://github.com/mathjax/MathJax/archive/master.zip && unzip master.zip "MathJax-master/unpacked/*"  && mv MathJax-master/unpacked . && rmdir MathJax-master`
* run `$ grunt MMLSVG`; output will be in `dist/MMLSVG/MathJax.js`


Latest version at https://github.com/pkra/MathJax-single-file

Copyright (c) 2014-2015 Mathjax Consortium

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

module.exports = function(grunt) {

  var mathjaxRoot = require.resolve('mathjax').substring(0, require.resolve('mathjax').length-10);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
        options: {
            stderr: false
        },
        prepTempHelpers: {
            command: 'head -n 3244 ' + mathjaxRoot + 'unpacked/MathJax.js > MathJax_part1 && tail -n 29 ' + mathjaxRoot + 'unpacked/MathJax.js > MathJax_part2' // TODO This is a hack until we can discuss modifying MathJax.js (e.g., https://www.npmjs.org/package/grunt-file-blocks)
        }
    },
    "file-creator": {
      prepTempHelpers: {
        "svg-helper1.js": function(fs, fd, done) {
          fs.writeSync(fd, ' MathJax.Hub.Register.StartupHook("SVG Jax Ready",function () {');
          done();
        },
        "svg-helper2.js": function(fs, fd, done) {
          fs.writeSync(fd, ' });');
          done();
        },
        "svg-helper2.js": function(fs, fd, done) {
          fs.writeSync(fd, ' });');
          done();
        },
        "MMLSVG-preload.js": function(fs, fd, done) { //TODO There has to be a better way.
          fs.writeSync(fd,
            'MathJax.Ajax.Preloading(\n'+
            '"[MathJax]/jax/input/MathML/config.js",\n'+
            '"[MathJax]/jax/output/SVG/config.js",\n'+
            '"[MathJax]/extensions/mml2jax.js",\n'+
            '"[MathJax]/extensions/MathEvents.js",\n'+
            '"[MathJax]/extensions/MathZoom.js",\n'+
            '"[MathJax]/extensions/MathMenu.js",\n'+
            '"[MathJax]/extensions/MathML/mml3.js",\n'+
            '"[MathJax]/jax/element/mml/jax.js",\n'+
            '"[MathJax]/extensions/toMathML.js",\n'+
            '"[MathJax]/jax/input/MathML/jax.js",\n'+
            '"[MathJax]/jax/output/SVG/jax.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/fontdata.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/fontdata-extra.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/mtable.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/mglyph.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/mmultiscripts.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/annotation-xml.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/maction.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/multiline.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/menclose.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/ms.js",\n'+
            '"[MathJax]/extensions/AssistiveMML.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/scr.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/opf.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/z.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/g.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/r.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/p.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/m.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/q.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/t.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/w.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/f.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/v.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/e.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/k.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/x.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/c.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/n.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/a.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/j.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/u.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/b.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/i.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/l.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/y.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/fr.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/o.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/s.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/d.js",\n'+
            '"[MathJax]/jax/input/MathML/entities/h.js",\n'+
            '"[MathJax]/jax/element/mml/optable/Arrows.js",\n'+
            '"[MathJax]/jax/element/mml/optable/MiscMathSymbolsA.js",\n'+
            '"[MathJax]/jax/element/mml/optable/Dingbats.js",\n'+
            '"[MathJax]/jax/element/mml/optable/GeneralPunctuation.js",\n'+
            '"[MathJax]/jax/element/mml/optable/SpacingModLetters.js",\n'+
            '"[MathJax]/jax/element/mml/optable/MiscTechnical.js",\n'+
            '"[MathJax]/jax/element/mml/optable/SupplementalArrowsA.js",\n'+
            '"[MathJax]/jax/element/mml/optable/GreekAndCoptic.js",\n'+
            '"[MathJax]/jax/element/mml/optable/LetterlikeSymbols.js",\n'+
            '"[MathJax]/jax/element/mml/optable/SupplementalArrowsB.js",\n'+
            '"[MathJax]/jax/element/mml/optable/BasicLatin.js",\n'+
            '"[MathJax]/jax/element/mml/optable/MiscSymbolsAndArrows.js",\n'+
            '"[MathJax]/jax/element/mml/optable/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/element/mml/optable/GeometricShapes.js",\n'+
            '"[MathJax]/jax/element/mml/optable/MathOperators.js",\n'+
            '"[MathJax]/jax/element/mml/optable/MiscMathSymbolsB.js",\n'+
            '"[MathJax]/jax/element/mml/optable/SuppMathOperators.js",\n'+
            '"[MathJax]/jax/element/mml/optable/CombDiactForSymbols.js",\n'+
            '"[MathJax]/jax/element/mml/optable/Latin1Supplement.js",\n'+
            '"[MathJax]/extensions/MatchWebFonts.js",\n'+
            '"[MathJax]/extensions/HelpDialog.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/MiscSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/SpacingModLetters.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/GreekAndCoptic.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/LetterlikeSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedB.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/GeometricShapes.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/MathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/SuppMathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/Arrows.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/PUA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/Dingbats.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/LatinExtendedA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/GeneralPunctuation.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/MiscSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/SpacingModLetters.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/MiscTechnical.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/GreekAndCoptic.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/LetterlikeSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/BoxDrawing.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/GeometricShapes.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/MathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/MiscMathSymbolsB.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/SuppMathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/Latin1Supplement.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/EnclosedAlphanum.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Typewriter/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Typewriter/Regular/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Typewriter/Regular/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Typewriter/Regular/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Regular/PUA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Regular/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Regular/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Bold/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Bold/PUA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Bold/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Bold/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Math/BoldItalic/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Caligraphic/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Caligraphic/Bold/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/GeneralPunctuation.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/GreekAndCoptic.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/LetterlikeSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedB.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/MathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/Arrows.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/MiscMathSymbolsA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/LatinExtendedA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/GeneralPunctuation.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/MiscSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/SpacingModLetters.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/MiscTechnical.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/SupplementalArrowsA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/GreekAndCoptic.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/LetterlikeSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/LatinExtendedB.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/GeometricShapes.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/MathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/SuppMathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/CombDiactForSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/Latin1Supplement.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Size3/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Size2/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Script/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Script/Regular/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Size1/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Italic/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Italic/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Italic/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Italic/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Regular/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Regular/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Regular/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Bold/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Bold/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Bold/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Bold/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Size4/Regular/Main.js"'+
            ');\n'+
            'MathJax.Hub.Config({"v1.0-compatible":false});\n'
          );
          done();
        },
        "TeXSVG-preload.js": function(fs, fd, done) { //TODO There has to be a better way.
          fs.writeSync(fd,
            'MathJax.Ajax.Preloading( \n'+
            '"[MathJax]/jax/input/TeX/config.js",\n'+
            '"[MathJax]/jax/output/SVG/config.js",\n'+
            '"[MathJax]/extensions/tex2jax.js",\n'+
            '"[MathJax]/extensions/MathEvents.js",\n'+
            '"[MathJax]/extensions/MathZoom.js",\n'+
            '"[MathJax]/extensions/MathMenu.js",\n'+
            '"[MathJax]/jax/element/mml/jax.js",\n'+
            '"[MathJax]/extensions/toMathML.js",\n'+
            '"[MathJax]/extensions/TeX/AMScd.js",\n'+
            '"[MathJax]/extensions/TeX/AMSmath.js",\n'+
            '"[MathJax]/extensions/TeX/AMSsymbols.js",\n'+
            '"[MathJax]/extensions/TeX/HTML.js",\n'+
            '"[MathJax]/extensions/TeX/action.js",\n'+
            '"[MathJax]/extensions/TeX/autobold.js",\n'+
            // '"[MathJax]/extensions/TeX/autoload-all.js",\n'+
            '"[MathJax]/extensions/TeX/bbox.js",\n'+
            // '"[MathJax]/extensions/TeX/begingroup.js",\n'+
            '"[MathJax]/extensions/TeX/boldsymbol.js",\n'+
            '"[MathJax]/extensions/TeX/cancel.js",\n'+
            '"[MathJax]/extensions/TeX/color.js",\n'+
            '"[MathJax]/extensions/TeX/enclose.js",\n'+
            '"[MathJax]/extensions/TeX/extpfeil.js",\n'+
            '"[MathJax]/extensions/TeX/mathchoice.js",\n'+
            '"[MathJax]/extensions/TeX/mediwiki-texvc.js",\n'+
            '"[MathJax]/extensions/TeX/mhchem.js",\n'+
            '"[MathJax]/extensions/TeX/newcommand.js",\n'+
            // '"[MathJax]/extensions/TeX/noErrors.js",\n'+
            // '"[MathJax]/extensions/TeX/noUndefined.js",\n'+
            '"[MathJax]/extensions/TeX/unicode.js",\n'+
            '"[MathJax]/extensions/TeX/verb.js",\n'+
            '"[MathJax]/jax/input/TeX/jax.js",\n'+
            '"[MathJax]/jax/output/SVG/jax.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/fontdata.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/fontdata-extra.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/mtable.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/mglyph.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/mmultiscripts.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/annotation-xml.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/maction.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/multiline.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/menclose.js",\n'+
            '"[MathJax]/jax/output/SVG/autoload/ms.js",\n'+
            '"[MathJax]/extensions/AssistiveMML.js",\n'+
            '"[MathJax]/jax/element/mml/optable/Arrows.js",\n'+
            '"[MathJax]/jax/element/mml/optable/MiscMathSymbolsA.js",\n'+
            '"[MathJax]/jax/element/mml/optable/Dingbats.js",\n'+
            '"[MathJax]/jax/element/mml/optable/GeneralPunctuation.js",\n'+
            '"[MathJax]/jax/element/mml/optable/SpacingModLetters.js",\n'+
            '"[MathJax]/jax/element/mml/optable/MiscTechnical.js",\n'+
            '"[MathJax]/jax/element/mml/optable/SupplementalArrowsA.js",\n'+
            '"[MathJax]/jax/element/mml/optable/GreekAndCoptic.js",\n'+
            '"[MathJax]/jax/element/mml/optable/LetterlikeSymbols.js",\n'+
            '"[MathJax]/jax/element/mml/optable/SupplementalArrowsB.js",\n'+
            '"[MathJax]/jax/element/mml/optable/BasicLatin.js",\n'+
            '"[MathJax]/jax/element/mml/optable/MiscSymbolsAndArrows.js",\n'+
            '"[MathJax]/jax/element/mml/optable/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/element/mml/optable/GeometricShapes.js",\n'+
            '"[MathJax]/jax/element/mml/optable/MathOperators.js",\n'+
            '"[MathJax]/jax/element/mml/optable/MiscMathSymbolsB.js",\n'+
            '"[MathJax]/jax/element/mml/optable/SuppMathOperators.js",\n'+
            '"[MathJax]/jax/element/mml/optable/CombDiactForSymbols.js",\n'+
            '"[MathJax]/jax/element/mml/optable/Latin1Supplement.js",\n'+
            '"[MathJax]/extensions/MatchWebFonts.js",\n'+
            '"[MathJax]/extensions/HelpDialog.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/MiscSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/SpacingModLetters.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/GreekAndCoptic.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/LetterlikeSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedB.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/GeometricShapes.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/MathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Regular/SuppMathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/Arrows.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/PUA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/Dingbats.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/LatinExtendedA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/GeneralPunctuation.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/MiscSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/SpacingModLetters.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/MiscTechnical.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/GreekAndCoptic.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/LetterlikeSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/BoxDrawing.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/GeometricShapes.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/MathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/MiscMathSymbolsB.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/SuppMathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/Latin1Supplement.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/AMS/Regular/EnclosedAlphanum.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Typewriter/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Typewriter/Regular/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Typewriter/Regular/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Typewriter/Regular/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Regular/PUA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Regular/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Regular/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Bold/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Bold/PUA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Bold/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Fraktur/Bold/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Math/BoldItalic/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Caligraphic/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Caligraphic/Bold/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/GeneralPunctuation.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/GreekAndCoptic.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/LetterlikeSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedB.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Italic/MathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/Arrows.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/MiscMathSymbolsA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/LatinExtendedA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/GeneralPunctuation.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/MiscSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/SpacingModLetters.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/MiscTechnical.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/SupplementalArrowsA.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/GreekAndCoptic.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/LetterlikeSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/LatinExtendedB.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/GeometricShapes.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/MathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/SuppMathOperators.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/CombDiactForSymbols.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Main/Bold/Latin1Supplement.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Size3/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Size2/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Script/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Script/Regular/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Size1/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Italic/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Italic/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Italic/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Italic/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Regular/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Regular/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Regular/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Regular/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Bold/Main.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Bold/Other.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Bold/BasicLatin.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/SansSerif/Bold/CombDiacritMarks.js",\n'+
            '"[MathJax]/jax/output/SVG/fonts/TeX/Size4/Regular/Main.js"'+
            ');\n'+
            'MathJax.Hub.Config({"v1.0-compatible":false});\n'
          );
          done();
        }
      }
    },
    clean: {
      prepTempHelpers: ['MathJax_part1','MathJax_part2','svg-helper1.js','svg-helper2.js', 'MMLSVG-preload.js', 'TeXSVG-preload.js']
    },
    concat: {
      options: {
//         separator: ';\n\n'
      },
      MMLSVG: {
        src: [
        'MathJax_part1', // TODO see above
        'MMLSVG-preload.js',
        'unpacked/jax/input/MathML/config.js',
        'unpacked/jax/output/SVG/config.js',
        'unpacked/extensions/mml2jax.js',
        'unpacked/extensions/MathEvents.js',
        'unpacked/extensions/MathZoom.js',
        'unpacked/extensions/MathMenu.js',
        'unpacked/jax/element/mml/jax.js',
        'unpacked/extensions/toMathML.js',
        'unpacked/jax/input/MathML/jax.js',
        'unpacked/jax/output/SVG/jax.js',
        'unpacked/jax/output/SVG/fonts/TeX/fontdata.js',
        'unpacked/jax/output/SVG/fonts/TeX/fontdata-extra.js',
        'unpacked/jax/output/SVG/autoload/mtable.js',
        'unpacked/jax/output/SVG/autoload/mglyph.js',
        'unpacked/jax/output/SVG/autoload/mmultiscripts.js',
        'unpacked/jax/output/SVG/autoload/annotation-xml.js',
        'unpacked/jax/output/SVG/autoload/maction.js',
        'unpacked/jax/output/SVG/autoload/multiline.js',
        'unpacked/jax/output/SVG/autoload/menclose.js',
        'unpacked/jax/output/SVG/autoload/ms.js',
        'unpacked/extensions/MathML/mml3.js',
        'unpacked/extensions/AssistiveMML.js',
        'unpacked/jax/input/MathML/entities/scr.js',
        'unpacked/jax/input/MathML/entities/opf.js',
        'unpacked/jax/input/MathML/entities/z.js',
        'unpacked/jax/input/MathML/entities/g.js',
        'unpacked/jax/input/MathML/entities/r.js',
        'unpacked/jax/input/MathML/entities/p.js',
        'unpacked/jax/input/MathML/entities/m.js',
        'unpacked/jax/input/MathML/entities/q.js',
        'unpacked/jax/input/MathML/entities/t.js',
        'unpacked/jax/input/MathML/entities/w.js',
        'unpacked/jax/input/MathML/entities/f.js',
        'unpacked/jax/input/MathML/entities/v.js',
        'unpacked/jax/input/MathML/entities/e.js',
        'unpacked/jax/input/MathML/entities/k.js',
        'unpacked/jax/input/MathML/entities/x.js',
        'unpacked/jax/input/MathML/entities/c.js',
        'unpacked/jax/input/MathML/entities/n.js',
        'unpacked/jax/input/MathML/entities/a.js',
        'unpacked/jax/input/MathML/entities/j.js',
        'unpacked/jax/input/MathML/entities/u.js',
        'unpacked/jax/input/MathML/entities/b.js',
        'unpacked/jax/input/MathML/entities/i.js',
        'unpacked/jax/input/MathML/entities/l.js',
        'unpacked/jax/input/MathML/entities/y.js',
        'unpacked/jax/input/MathML/entities/fr.js',
        'unpacked/jax/input/MathML/entities/o.js',
        'unpacked/jax/input/MathML/entities/s.js',
        'unpacked/jax/input/MathML/entities/d.js',
        'unpacked/jax/input/MathML/entities/h.js',
        'unpacked/jax/element/mml/optable/Arrows.js',
        'unpacked/jax/element/mml/optable/MiscMathSymbolsA.js',
        'unpacked/jax/element/mml/optable/Dingbats.js',
        'unpacked/jax/element/mml/optable/GeneralPunctuation.js',
        'unpacked/jax/element/mml/optable/SpacingModLetters.js',
        'unpacked/jax/element/mml/optable/MiscTechnical.js',
        'unpacked/jax/element/mml/optable/SupplementalArrowsA.js',
        'unpacked/jax/element/mml/optable/GreekAndCoptic.js',
        'unpacked/jax/element/mml/optable/LetterlikeSymbols.js',
        'unpacked/jax/element/mml/optable/SupplementalArrowsB.js',
        'unpacked/jax/element/mml/optable/BasicLatin.js',
        'unpacked/jax/element/mml/optable/MiscSymbolsAndArrows.js',
        'unpacked/jax/element/mml/optable/CombDiacritMarks.js',
        'unpacked/jax/element/mml/optable/GeometricShapes.js',
        'unpacked/jax/element/mml/optable/MathOperators.js',
        'unpacked/jax/element/mml/optable/MiscMathSymbolsB.js',
        'unpacked/jax/element/mml/optable/SuppMathOperators.js',
        'unpacked/jax/element/mml/optable/CombDiactForSymbols.js',
        'unpacked/jax/element/mml/optable/Latin1Supplement.js',
        'unpacked/extensions/MatchWebFonts.js',
        'unpacked/extensions/HelpDialog.js',
        'svg-helper1.js', // TODO yet another hack, but less problematic since it's always the same
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/MiscSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/SpacingModLetters.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/GreekAndCoptic.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/LetterlikeSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedB.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/GeometricShapes.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/MathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/SuppMathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/Arrows.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/PUA.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/Dingbats.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/LatinExtendedA.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/GeneralPunctuation.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/MiscSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/SpacingModLetters.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/MiscTechnical.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/GreekAndCoptic.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/LetterlikeSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/BoxDrawing.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/GeometricShapes.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/MathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/MiscMathSymbolsB.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/SuppMathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/Latin1Supplement.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/EnclosedAlphanum.js',
        'unpacked/jax/output/SVG/fonts/TeX/Typewriter/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Typewriter/Regular/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/Typewriter/Regular/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Typewriter/Regular/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Regular/PUA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Regular/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Regular/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Bold/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Bold/PUA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Bold/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Bold/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Math/BoldItalic/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Caligraphic/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Caligraphic/Bold/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/GeneralPunctuation.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/GreekAndCoptic.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/LetterlikeSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedB.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/MathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/Arrows.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/MiscMathSymbolsA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/LatinExtendedA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/GeneralPunctuation.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/MiscSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/SpacingModLetters.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/MiscTechnical.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/SupplementalArrowsA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/GreekAndCoptic.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/LetterlikeSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/LatinExtendedB.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/GeometricShapes.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/MathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/SuppMathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/CombDiactForSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/Latin1Supplement.js',
        'unpacked/jax/output/SVG/fonts/TeX/Size3/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Size2/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Script/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Script/Regular/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Size1/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Italic/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Italic/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Italic/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Italic/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Regular/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Regular/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Regular/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Bold/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Bold/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Bold/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Bold/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/Size4/Regular/Main.js',
        'svg-helper2.js', // see svg-helper1.js
        'MathJax_part2' // see MathJax_part1
        ],
        dest: 'dist/MMLSVG/MathJax-MMLSVG.js'
      },
      TeXSVG: {
        src: [
        'MathJax_part1', // TODO see above
        'TeXSVG-preload.js',
        'unpacked/jax/input/TeX/config.js',
        'unpacked/jax/output/SVG/config.js',
        'unpacked/extensions/tex2jax.js',
        'unpacked/extensions/MathEvents.js',
        'unpacked/extensions/MathZoom.js',
        'unpacked/extensions/MathMenu.js',
        'unpacked/jax/element/mml/jax.js',
        'unpacked/extensions/toMathML.js',
        'unpacked/jax/output/SVG/jax.js',
        'unpacked/jax/output/SVG/fonts/TeX/fontdata.js',
        'unpacked/jax/output/SVG/fonts/TeX/fontdata-extra.js',
        'unpacked/jax/output/SVG/autoload/mtable.js',
        'unpacked/jax/output/SVG/autoload/mglyph.js',
        'unpacked/jax/output/SVG/autoload/mmultiscripts.js',
        'unpacked/jax/output/SVG/autoload/annotation-xml.js',
        'unpacked/jax/output/SVG/autoload/maction.js',
        'unpacked/jax/output/SVG/autoload/multiline.js',
        'unpacked/jax/output/SVG/autoload/menclose.js',
        'unpacked/jax/output/SVG/autoload/ms.js',
        'unpacked/extensions/TeX/AMScd.js',
        'unpacked/extensions/TeX/AMSmath.js',
        'unpacked/extensions/TeX/AMSsymbols.js',
        'unpacked/extensions/TeX/HTML.js',
        'unpacked/extensions/TeX/action.js',
        'unpacked/extensions/TeX/autobold.js',
        // 'unpacked/extensions/TeX/autoload-all.js',
        'unpacked/extensions/TeX/bbox.js',
        // 'unpacked/extensions/TeX/begingroup.js',
        'unpacked/extensions/TeX/boldsymbol.js',
        'unpacked/extensions/TeX/cancel.js',
        'unpacked/extensions/TeX/color.js',
        'unpacked/extensions/TeX/enclose.js',
        'unpacked/extensions/TeX/extpfeil.js',
        'unpacked/extensions/TeX/mathchoice.js',
        'unpacked/extensions/TeX/mediwiki-texvc.js',
        'unpacked/extensions/TeX/mhchem.js',
        'unpacked/extensions/TeX/newcommand.js',
        // 'unpacked/extensions/TeX/noErrors.js',
        // 'unpacked/extensions/TeX/noUndefined.js',
        'unpacked/extensions/TeX/unicode.js',
        'unpacked/extensions/TeX/verb.js',
        'unpacked/jax/input/TeX/jax.js',
        'unpacked/extensions/AssistiveMML.js',
        'unpacked/jax/element/mml/optable/Arrows.js',
        'unpacked/jax/element/mml/optable/MiscMathSymbolsA.js',
        'unpacked/jax/element/mml/optable/Dingbats.js',
        'unpacked/jax/element/mml/optable/GeneralPunctuation.js',
        'unpacked/jax/element/mml/optable/SpacingModLetters.js',
        'unpacked/jax/element/mml/optable/MiscTechnical.js',
        'unpacked/jax/element/mml/optable/SupplementalArrowsA.js',
        'unpacked/jax/element/mml/optable/GreekAndCoptic.js',
        'unpacked/jax/element/mml/optable/LetterlikeSymbols.js',
        'unpacked/jax/element/mml/optable/SupplementalArrowsB.js',
        'unpacked/jax/element/mml/optable/BasicLatin.js',
        'unpacked/jax/element/mml/optable/MiscSymbolsAndArrows.js',
        'unpacked/jax/element/mml/optable/CombDiacritMarks.js',
        'unpacked/jax/element/mml/optable/GeometricShapes.js',
        'unpacked/jax/element/mml/optable/MathOperators.js',
        'unpacked/jax/element/mml/optable/MiscMathSymbolsB.js',
        'unpacked/jax/element/mml/optable/SuppMathOperators.js',
        'unpacked/jax/element/mml/optable/CombDiactForSymbols.js',
        'unpacked/jax/element/mml/optable/Latin1Supplement.js',
        'unpacked/extensions/MatchWebFonts.js',
        'unpacked/extensions/HelpDialog.js',
        'svg-helper1.js', // TODO yet another hack, but less problematic since it's always the same
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/MiscSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/SpacingModLetters.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/GreekAndCoptic.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/LetterlikeSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedB.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/GeometricShapes.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/MathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Regular/SuppMathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/Arrows.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/PUA.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/Dingbats.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/LatinExtendedA.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/GeneralPunctuation.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/MiscSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/SpacingModLetters.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/MiscTechnical.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/GreekAndCoptic.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/LetterlikeSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/BoxDrawing.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/GeometricShapes.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/MathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/MiscMathSymbolsB.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/SuppMathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/Latin1Supplement.js',
        'unpacked/jax/output/SVG/fonts/TeX/AMS/Regular/EnclosedAlphanum.js',
        'unpacked/jax/output/SVG/fonts/TeX/Typewriter/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Typewriter/Regular/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/Typewriter/Regular/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Typewriter/Regular/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Regular/PUA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Regular/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Regular/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Bold/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Bold/PUA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Bold/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/Fraktur/Bold/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Math/BoldItalic/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Caligraphic/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Caligraphic/Bold/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/GeneralPunctuation.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/GreekAndCoptic.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/LetterlikeSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedB.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Italic/MathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/Arrows.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/MiscMathSymbolsA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/LatinExtendedA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/GeneralPunctuation.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/MiscSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/SpacingModLetters.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/MiscTechnical.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/SupplementalArrowsA.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/GreekAndCoptic.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/LetterlikeSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/LatinExtendedB.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/GeometricShapes.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/MathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/SuppMathOperators.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/CombDiactForSymbols.js',
        'unpacked/jax/output/SVG/fonts/TeX/Main/Bold/Latin1Supplement.js',
        'unpacked/jax/output/SVG/fonts/TeX/Size3/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Size2/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Script/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/Script/Regular/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/Size1/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Italic/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Italic/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Italic/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Italic/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Regular/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Regular/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Regular/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Regular/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Bold/Main.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Bold/Other.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Bold/BasicLatin.js',
        'unpacked/jax/output/SVG/fonts/TeX/SansSerif/Bold/CombDiacritMarks.js',
        'unpacked/jax/output/SVG/fonts/TeX/Size4/Regular/Main.js',
        'svg-helper2.js', // see svg-helper1.js
        'MathJax_part2' // see MathJax_part1
        ],
        dest: 'dist/TeXSVG/MathJax-TeXSVG.js'
      }
    },
    uglify: {
      options: {
        banner: '\/* \n *  MathJax single file build "<%= grunt.cli.tasks %>" \n *\n *  created with MathJax-grunt-concatenator \n *\n *  Copyright (c) 2015 The MathJax Consortium\n *\n *  Licensed under the Apache License, Version 2.0 (the "License");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an "AS IS" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\/\n\n'
      },
      MMLSVG: {
        files: {
          'dist/MMLSVG/MathJax.js': ['<%= concat.MMLSVG.dest %>'] //TODO Don't hardcode that...
        }
      },
      TeXSVG: {
        files: {
          'dist/TeXSVG/MathJax.js': ['<%= concat.TeXSVG.dest %>'] //TODO Don't hardcode that...
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-file-creator'); // to replace grunt-shell hacks

  grunt.registerTask('MMLSVG', ['shell:prepTempHelpers','file-creator:prepTempHelpers', 'concat:MMLSVG', 'uglify:MMLSVG', 'clean:prepTempHelpers']);
  grunt.registerTask('TeXSVG', ['shell:prepTempHelpers','file-creator:prepTempHelpers', 'concat:TeXSVG', 'uglify:TeXSVG', 'clean:prepTempHelpers']);
};
