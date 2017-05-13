const fs = require('fs');
const Concat = require('concat-with-sourcemaps');
const writeFile = require('write');
const uglify = require('uglify-js');

//
// CORE JAX
//
const core = [
    '/jax/element/mml/jax.js',
    '/jax/element/mml/optable/Arrows.js',
    '/jax/element/mml/optable/MiscMathSymbolsA.js',
    '/jax/element/mml/optable/Dingbats.js',
    '/jax/element/mml/optable/GeneralPunctuation.js',
    '/jax/element/mml/optable/SpacingModLetters.js',
    '/jax/element/mml/optable/MiscTechnical.js',
    '/jax/element/mml/optable/SupplementalArrowsA.js',
    '/jax/element/mml/optable/GreekAndCoptic.js',
    '/jax/element/mml/optable/LetterlikeSymbols.js',
    '/jax/element/mml/optable/SupplementalArrowsB.js',
    '/jax/element/mml/optable/BasicLatin.js',
    '/jax/element/mml/optable/MiscSymbolsAndArrows.js',
    '/jax/element/mml/optable/CombDiacritMarks.js',
    '/jax/element/mml/optable/GeometricShapes.js',
    '/jax/element/mml/optable/MathOperators.js',
    '/jax/element/mml/optable/MiscMathSymbolsB.js',
    '/jax/element/mml/optable/SuppMathOperators.js',
    '/jax/element/mml/optable/CombDiactForSymbols.js',
    '/jax/element/mml/optable/Latin1Supplement.js'
];

//
// INPUT JAXs
//

const input = {
    TeX: [
        '/jax/input/TeX/config.js',
        '/jax/input/TeX/jax.js'
    ],
    AsciiMath: [
        '/jax/input/AsciiMath/config.js',
        '/jax/input/AsciiMath/jax.js'
    ],
    MathML: [
        '/jax/input/MathML/config.js',
        '/jax/input/MathML/jax.js',
        '/jax/input/MathML/entities/scr.js',
        '/jax/input/MathML/entities/opf.js',
        '/jax/input/MathML/entities/z.js',
        '/jax/input/MathML/entities/g.js',
        '/jax/input/MathML/entities/r.js',
        '/jax/input/MathML/entities/p.js',
        '/jax/input/MathML/entities/m.js',
        '/jax/input/MathML/entities/q.js',
        '/jax/input/MathML/entities/t.js',
        '/jax/input/MathML/entities/w.js',
        '/jax/input/MathML/entities/f.js',
        '/jax/input/MathML/entities/v.js',
        '/jax/input/MathML/entities/e.js',
        '/jax/input/MathML/entities/k.js',
        '/jax/input/MathML/entities/x.js',
        '/jax/input/MathML/entities/c.js',
        '/jax/input/MathML/entities/n.js',
        '/jax/input/MathML/entities/a.js',
        '/jax/input/MathML/entities/j.js',
        '/jax/input/MathML/entities/u.js',
        '/jax/input/MathML/entities/b.js',
        '/jax/input/MathML/entities/i.js',
        '/jax/input/MathML/entities/l.js',
        '/jax/input/MathML/entities/y.js',
        '/jax/input/MathML/entities/fr.js',
        '/jax/input/MathML/entities/o.js',
        '/jax/input/MathML/entities/s.js',
        '/jax/input/MathML/entities/d.js',
        '/jax/input/MathML/entities/h.js',
    ]
}
//
// OUTPUT JAXs
//

const output = {
    // SVG output processor
    SVG: [
        '/jax/output/SVG/config.js',
        '/jax/output/SVG/jax.js',
        '/jax/output/SVG/autoload/mtable.js',
        '/jax/output/SVG/autoload/mglyph.js',
        '/jax/output/SVG/autoload/mmultiscripts.js',
        '/jax/output/SVG/autoload/annotation-xml.js',
        '/jax/output/SVG/autoload/maction.js',
        '/jax/output/SVG/autoload/multiline.js',
        '/jax/output/SVG/autoload/menclose.js',
        '/jax/output/SVG/autoload/ms.js',
    ],
    // CommonHTML output processor
    CommonHTML: [
        '/jax/output/CommonHTML/config.js',
        '/jax/output/CommonHTML/jax.js',
        '/jax/output/CommonHTML/autoload/annotation-xml.js',
        '/jax/output/CommonHTML/autoload/maction.js',
        '/jax/output/CommonHTML/autoload/menclose.js',
        '/jax/output/CommonHTML/autoload/mglyph.js',
        '/jax/output/CommonHTML/autoload/mmultiscripts.js',
        '/jax/output/CommonHTML/autoload/ms.js',
        '/jax/output/CommonHTML/autoload/mtable.js',
        '/jax/output/CommonHTML/autoload/multiline.js',
    ],

    // Preview output processor
    PreviewHTML: [
        '/jax/output/PreviewHTML/config.js',
        '/jax/output/PreviewHTML/jax.js'
    ],
}
//
// EXTENSIONS
//


const extensions = {
    // default extensions
    // WARNING: if you don't include them, you will need to configure MathJax to NOT load them
    defaults: [
        '/extensions/MathEvents.js',
        '/extensions/MathZoom.js',
        '/extensions/MathMenu.js',
        '/extensions/toMathML.js',
        '/extensions/HelpDialog.js',
    ],

    // extensions for the TeX input
    TeX: [
        '/extensions/tex2jax.js',
        '/extensions/TeX/AMScd.js',
        '/extensions/TeX/AMSmath.js',
        '/extensions/TeX/AMSsymbols.js',
        '/extensions/TeX/HTML.js',
        '/extensions/TeX/action.js',
        '/extensions/TeX/autobold.js',
        '/extensions/TeX/bbox.js',
        '/extensions/TeX/boldsymbol.js',
        '/extensions/TeX/cancel.js',
        '/extensions/TeX/color.js',
        '/extensions/TeX/enclose.js',
        '/extensions/TeX/extpfeil.js',
        '/extensions/TeX/mathchoice.js',
        '/extensions/TeX/mediawiki-texvc.js',
        '/extensions/TeX/mhchem.js',
        '/extensions/TeX/newcommand.js',
        '/extensions/TeX/unicode.js',
        // '/extensions/TeX/autoload-all.js',
        // '/extensions/TeX/begingroup.js',
        // '/extensions/TeX/noErrors.js',
        // '/extensions/TeX/noUndefined.js',
        '/extensions/TeX/verb.js',
    ],

    // extensions for the MathML input
    MathML: [
        '/extensions/mml2jax.js',
        '/extensions/MathML/content-mathml.js.js',
        '/extensions/MathML/mml3.js'
    ],

    // the accessibility extensions
    a11y: [
        // TODO What to do with the two audio files?
        // 'extensions/a11y/invalid_keypress.mp3',
        // 'extensions/a11y/invalid_keypress.ogg',
        'extensions/a11y/accessibility-menu.js',
        'extensions/a11y/auto-collapse.js',
        'extensions/a11y/collapsible.js',
        'extensions/a11y/explorer.js',
        'extensions/a11y/mathjax-sre.js',
        'extensions/a11y/mathmaps/functions/algebra.json',
        'extensions/a11y/mathmaps/functions/elementary.json',
        'extensions/a11y/mathmaps/functions/hyperbolic.json',
        'extensions/a11y/mathmaps/functions/trigonometry.json',
        'extensions/a11y/mathmaps/mathmaps_ie.js',
        'extensions/a11y/mathmaps/symbols/greek-capital.json',
        'extensions/a11y/mathmaps/symbols/greek-mathfonts.json',
        'extensions/a11y/mathmaps/symbols/greek-scripts.json',
        'extensions/a11y/mathmaps/symbols/greek-small.json',
        'extensions/a11y/mathmaps/symbols/greek-symbols.json',
        'extensions/a11y/mathmaps/symbols/hebrew_letters.json',
        'extensions/a11y/mathmaps/symbols/latin-lower-double-accent.json',
        'extensions/a11y/mathmaps/symbols/latin-lower-normal.json',
        'extensions/a11y/mathmaps/symbols/latin-lower-phonetic.json',
        'extensions/a11y/mathmaps/symbols/latin-lower-single-accent.json',
        'extensions/a11y/mathmaps/symbols/latin-mathfonts.json',
        'extensions/a11y/mathmaps/symbols/latin-rest.json',
        'extensions/a11y/mathmaps/symbols/latin-upper-double-accent.json',
        'extensions/a11y/mathmaps/symbols/latin-upper-normal.json',
        'extensions/a11y/mathmaps/symbols/latin-upper-single-accent.json',
        'extensions/a11y/mathmaps/symbols/math_angles.json',
        'extensions/a11y/mathmaps/symbols/math_arrows.json',
        'extensions/a11y/mathmaps/symbols/math_characters.json',
        'extensions/a11y/mathmaps/symbols/math_delimiters.json',
        'extensions/a11y/mathmaps/symbols/math_digits.json',
        'extensions/a11y/mathmaps/symbols/math_geometry.json',
        'extensions/a11y/mathmaps/symbols/math_harpoons.json',
        'extensions/a11y/mathmaps/symbols/math_non_characters.json',
        'extensions/a11y/mathmaps/symbols/math_symbols.json',
        'extensions/a11y/mathmaps/symbols/math_whitespace.json',
        'extensions/a11y/mathmaps/symbols/other_stars.json',
        'extensions/a11y/mathmaps/units/energy.json',
        'extensions/a11y/mathmaps/units/length.json',
        'extensions/a11y/mathmaps/units/memory.json',
        'extensions/a11y/mathmaps/units/other.json',
        'extensions/a11y/mathmaps/units/speed.json',
        'extensions/a11y/mathmaps/units/temperature.json',
        'extensions/a11y/mathmaps/units/time.json',
        'extensions/a11y/mathmaps/units/volume.json',
        'extensions/a11y/mathmaps/units/weight.json',
        'extensions/a11y/semantic-enrich.js',
        'extensions/a11y/wgxpath.install.js'
    ],

    // extensions for the HTML-CSS output
    "HTML-CSS": [
        'extensions/HTML-CSS/floats.js'
    ],

    // other (less common) extensions
    misc: [
        '/extensions/MatchWebFonts.js',
        '/extensions/AssistiveMML.js',
        '/extensions/FontWarnings.js',
        '/extensions/jsMath2jax.js',
        '/extensions/fast-preview.js',
        '/extensions/Safe.js'
    ]
}
// NOTE:
// NEVER needed:
// extensions/CHTML-preview.js

//
// FONTS
//

const fonts = {
    // NOTE
    // fontdata.js and fontdata-extra.js will be handled programatically later

    // fonts for the CommonHTML output
    // Note. Only the TeX fonts are currently supported
    CommonHTML: {

        TeX: [
            '/jax/output/CommonHTML/fonts/TeX/AMS-Regular.js',
            '/jax/output/CommonHTML/fonts/TeX/Caligraphic-Bold.js',
            '/jax/output/CommonHTML/fonts/TeX/Fraktur-Bold.js',
            '/jax/output/CommonHTML/fonts/TeX/Fraktur-Regular.js',
            '/jax/output/CommonHTML/fonts/TeX/Main-Bold.js',
            '/jax/output/CommonHTML/fonts/TeX/Math-BoldItalic.js',
            '/jax/output/CommonHTML/fonts/TeX/SansSerif-Bold.js',
            '/jax/output/CommonHTML/fonts/TeX/SansSerif-Italic.js',
            '/jax/output/CommonHTML/fonts/TeX/SansSerif-Regular.js',
            '/jax/output/CommonHTML/fonts/TeX/Script-Regular.js',
            '/jax/output/CommonHTML/fonts/TeX/Typewriter-Regular.js',
        ]
    },

    // fonts for the SVG output

    SVG: {
        TeX: [
            '/jax/output/SVG/fonts/TeX/AMS/Regular/Arrows.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/BoxDrawing.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/Dingbats.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/EnclosedAlphanum.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/GeneralPunctuation.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/GeometricShapes.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/GreekAndCoptic.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/Latin1Supplement.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/LatinExtendedA.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/LetterlikeSymbols.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/MathOperators.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/MiscMathSymbolsB.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/MiscSymbols.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/MiscTechnical.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/PUA.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/SpacingModLetters.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/SuppMathOperators.js',
            '/jax/output/SVG/fonts/TeX/Caligraphic/Bold/Main.js',
            '/jax/output/SVG/fonts/TeX/Caligraphic/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Bold/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Bold/Main.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Bold/Other.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Bold/PUA.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Regular/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Regular/Other.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Regular/PUA.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/Arrows.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/CombDiactForSymbols.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/GeneralPunctuation.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/GeometricShapes.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/GreekAndCoptic.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/Latin1Supplement.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/LatinExtendedA.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/LatinExtendedB.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/LetterlikeSymbols.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/Main.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/MathOperators.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/MiscMathSymbolsA.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/MiscSymbols.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/MiscTechnical.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/SpacingModLetters.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/SupplementalArrowsA.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/SuppMathOperators.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/GeneralPunctuation.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/GreekAndCoptic.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedA.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedB.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/LetterlikeSymbols.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/Main.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/GeometricShapes.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/GreekAndCoptic.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedA.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedB.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/LetterlikeSymbols.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/MiscSymbols.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/SpacingModLetters.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/SuppMathOperators.js',
            '/jax/output/SVG/fonts/TeX/Math/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/TeX/Math/Italic/Main.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Bold/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Bold/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Bold/Main.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Bold/Other.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Italic/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Italic/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Italic/Main.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Italic/Other.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Regular/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Regular/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Regular/Other.js',
            '/jax/output/SVG/fonts/TeX/Script/Regular/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Script/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Size1/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Size2/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Size3/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Size4/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Typewriter/Regular/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Typewriter/Regular/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/Typewriter/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Typewriter/Regular/Other.js'
        ],
        "STIX-Web": [
            '/jax/output/SVG/fonts/STIX-Web/Alphabets/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Alphabets/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Alphabets/Italic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Alphabets/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Arrows/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Arrows/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/DoubleStruck/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/DoubleStruck/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/DoubleStruck/Italic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/DoubleStruck/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Fraktur/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Fraktur/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Latin/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Latin/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Latin/Italic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Latin/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Main/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Main/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Main/Italic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Main/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Marks/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Marks/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Marks/Italic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Marks/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Misc/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Misc/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Misc/Italic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Misc/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Monospace/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Normal/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Normal/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Normal/Italic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Operators/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Operators/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/SansSerif/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/SansSerif/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/SansSerif/Italic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/SansSerif/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Script/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Script/Italic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Script/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Shapes/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Shapes/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Shapes/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Size1/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Size2/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Size3/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Size4/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Size5/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Symbols/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Symbols/Regular/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Variants/BoldItalic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Variants/Bold/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Variants/Italic/Main.js',
            '/jax/output/SVG/fonts/STIX-Web/Variants/Regular/Main.js'
        ],
        "Latin-Modern": [
            '/jax/output/SVG/fonts/Latin-Modern/Alphabets/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Arrows/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/DoubleStruck/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Fraktur/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Latin/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Main/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Marks/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Misc/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Monospace/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/NonUnicode/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Normal/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Operators/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/SansSerif/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Script/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Shapes/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Size1/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Size2/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Size3/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Size4/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Size5/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Size6/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Size7/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Symbols/Regular/Main.js',
            '/jax/output/SVG/fonts/Latin-Modern/Variants/Regular/Main.js'
        ],
        "Asana-Math": [
            '/jax/output/SVG/fonts/Asana-Math/Alphabets/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Arrows/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/DoubleStruck/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Fraktur/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Latin/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Main/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Marks/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Misc/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Monospace/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/NonUnicode/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Normal/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Operators/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/SansSerif/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Script/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Shapes/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Size1/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Size2/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Size3/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Size4/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Size5/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Size6/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Symbols/Regular/Main.js',
            '/jax/output/SVG/fonts/Asana-Math/Variants/Regular/Main.js'
        ],
        "Gyre-Pagella": [
            '/jax/output/SVG/fonts/Gyre-Pagella/Alphabets/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Arrows/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/DoubleStruck/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Fraktur/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Latin/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Main/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Marks/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Misc/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Monospace/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/NonUnicode/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Normal/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Operators/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/SansSerif/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Script/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Shapes/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Size1/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Size2/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Size3/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Size4/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Size5/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Size6/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Symbols/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Pagella/Variants/Regular/Main.js'
        ],
        "Gyre-Termes": [
            '/jax/output/SVG/fonts/Gyre-Termes/Alphabets/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Arrows/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/DoubleStruck/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Fraktur/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Latin/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Main/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Marks/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Misc/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Monospace/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/NonUnicode/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Normal/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Operators/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/SansSerif/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Script/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Shapes/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Size1/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Size2/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Size3/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Size4/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Size5/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Size6/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Symbols/Regular/Main.js',
            '/jax/output/SVG/fonts/Gyre-Termes/Variants/Regular/Main.js'
        ],
        "Neo-Euler": [
            '/jax/output/SVG/fonts/Neo-Euler/Alphabets/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Arrows/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Fraktur/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Main/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Marks/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/NonUnicode/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Normal/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Operators/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Script/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Shapes/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Size1/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Size2/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Size3/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Size4/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Size5/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Symbols/Regular/Main.js',
            '/jax/output/SVG/fonts/Neo-Euler/Variants/Regular/Main.js'
        ]
    }
}

// SETUP MathJax.js

const splitter = 'HUB.Browser.Select(MathJax.Message.browsers);';
const array = fs.readFileSync(require.resolve('mathjax')).toString().split(splitter)
const mathjaxStart = array[0];
const mathjaxEnd = splitter + array[1];

// SETUP file path
const unpackedPath = require.resolve('mathjax').replace(/\/MathJax.js$/, '');

const preConfig = function (array) {
    let result = 'MathJax.Ajax.Preloading(\n';
    for (let item of array) result += '"[MathJax]' + item + '",\n';
    result +=
        ');\n' +
        'MathJax.Hub.Config({"v1.0-compatible":false});\n'
    return result;
};


const packitup = function (inputJax, outputJax, font) {
    // check input
    const inputJaxs = ['TeX', 'MathML', 'AsciiMath'];
    const outputJaxs = ['CommonHTML', 'SVG', 'PreviewHTML', 'HTML-CSS'];
    const fontNames = ['TeX', 'STIX-Web', 'Asana Math', 'Gyre Pagella', 'Gyre Termes', 'Neo Euler'];
    if (inputJaxs.indexOf(inputJax) === -1) {
        console.log('Unknown input: ' + inputJax);
        return new Error('Unknown input: ' + inputJax);
    }
    if (outputJaxs.indexOf(outputJax) === -1) {
        console.log('Unknown output: ' + outputJax);
        return new Error('Unknown output: ' + outputJax);
    }
    if (!font && outputJax !== 'PreviewHTML') {
        console.log(('Ouput ' + outputJax + ' needs to specify a font'));
        return new Error('Ouput ' + outputJax + ' needs to specify a font');
    } else if (!font && output === 'PreviewHTML') {
        font = [];
    } else if (fontNames.indexOf(font) === -1) {
        console.log('Unknown font: ' + font);
        return new Error('Unknown font: ' + font);
    }

    const array = [
        ...core,
        ...extensions.defaults,
        ...input[inputJax],
        ...output[outputJax],
        ...extensions[inputJax]
    ];
    const fontdataName = '/jax/output/' + outputJax + '/fonts/' + font + '/fontdata.js';
    const fontdataExtraName = '/jax/output/' + outputJax + '/fonts/' + font + '/fontdata-extra.js'

    const concat = new Concat(true, 'MathJax.js', '\n');

    concat.add(null, '// MathJax single file build');
    // if (outputJax === "SVG") {
    //     concat.add(null, 'window.MathJax = { STIX: {font: "' + font + '"} };');
    // }
    concat.add(null, mathjaxStart);
    concat.add(null, preConfig(
        [
            ...array,
            fontdataName,
            fontdataExtraName,
            ...fonts[outputJax][font]
        ]
    ));

    for (let item of array) concat.add(item, fs.readFileSync(unpackedPath + item));

    concat.add('fontdata.js', fs.readFileSync(unpackedPath + fontdataName));
    concat.add('fontdata-extra.js', fs.readFileSync(unpackedPath + fontdataExtraName));

    if (outputJax === "CommonHTML") {
        concat.add(null, 'MathJax.OutputJax.CommonHTML.webfontDir =  "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/fonts/HTML-CSS";\n ');
    }

    concat.add(null, 'MathJax.Hub.Register.StartupHook("' + outputJax + ' Jax Ready",function () {\n');

    for (let item of fonts[outputJax][font]) concat.add(item, fs.readFileSync(unpackedPath + item));
    concat.add(null, ' });\n');
    concat.add(null, mathjaxEnd);
    const final = concat.content;
    //TODO SVG output + not TeX font will log an unproblematic error (trying to load TeX font's fontdata.js)
    // but e.g., `final.toString().replace(/font: "TeX"/,'font: "'+ font + '"');` does not help (breaks build)
    writeFile('dist/' + inputJax + outputJax + font + '/MathJax-' + inputJax + outputJax + font + '.js', final, function (err) {
        // if (err) console.log(err);
        console.log('dist/' + inputJax + outputJax + font + '/MathJax-' + inputJax + outputJax + '.js')
    });
    writeFile('dist/' + inputJax + outputJax + font + '/MathJax.js', uglify.minify(concat.content), function (err) {
        // if (err) console.log(err);
        console.log('dist/' + inputJax + outputJax + font + '/MathJax.js')
    })
}

packitup(
    'TeX',
    'CommonHTML',
    'TeX');
packitup(
    'TeX',
    'SVG',
    'TeX');
packitup(
    'TeX',
    'SVG',
    'STIX-Web');
