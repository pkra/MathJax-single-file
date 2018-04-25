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
    // TODO support HTML-CSS
    "HTML-CSS": [
        '/jax/output/HTML-CSS/jax.js',
        '/jax/output/HTML-CSS/config.js',
        '/jax/output/HTML-CSS/autoload/annotation-xml.js',
        '/jax/output/HTML-CSS/autoload/maction.js',
        '/jax/output/HTML-CSS/autoload/menclose.js',
        '/jax/output/HTML-CSS/autoload/mglyph.js',
        '/jax/output/HTML-CSS/autoload/mmultiscripts.js',
        '/jax/output/HTML-CSS/autoload/ms.js',
        '/jax/output/HTML-CSS/autoload/mtable.js',
        '/jax/output/HTML-CSS/autoload/multiline.js'
        // NOTE not planning to support: imageFonts (which requires ~30,000 pngs)
        // '/jax/output/HTML-CSS/imageFonts.js'
        // '/jax/output/HTML-CSS/blank.gif' // (dependency of imageFonts.js)
    ]

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
    // NOTE upstream bug when using content-mathml and mml3 simultaneously https://github.com/mathjax/MathJax/issues/1755
    MathML: [
        '/extensions/mml2jax.js',
        '/extensions/MathML/content-mathml.js',
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
    // for each font, the files `fontdata.js` and `fontdata-extra.js` must be handled separately

    // fonts for the CommonHTML output

    // NOTE. the CommonHTML output currently only supports the default "TeX"" fonts
    CommonHTML: {
        TeX: [
            '/jax/output/CommonHTML/fonts/TeX/AMS-Regular.js',
            '/jax/output/CommonHTML/fonts/TeX/Caligraphic-Bold.js',
            '/jax/output/CommonHTML/fonts/TeX/Fraktur-Bold.js',
            '/jax/output/CommonHTML/fonts/TeX/Fraktur-Regular.js',
            // NOTE included in fontdata.js https://github.com/pkra/MathJax-single-file/pull/19#issuecomment-304392838
            // '/jax/output/CommonHTML/fonts/TeX/Main-Bold.js',
            '/jax/output/CommonHTML/fonts/TeX/Math-BoldItalic.js',
            '/jax/output/CommonHTML/fonts/TeX/SansSerif-Bold.js',
            '/jax/output/CommonHTML/fonts/TeX/SansSerif-Italic.js',
            '/jax/output/CommonHTML/fonts/TeX/SansSerif-Regular.js',
            '/jax/output/CommonHTML/fonts/TeX/Script-Regular.js',
            '/jax/output/CommonHTML/fonts/TeX/Typewriter-Regular.js'
        ]
    },

    // fonts for the SVG output

    SVG: {
        TeX: [
            '/jax/output/SVG/fonts/TeX/AMS/Regular/Main.js',
            // NOTE: Main.js needs to come in front of all other fonts of a family
            // Cf. https://github.com/pkra/MathJax-single-file/pull/19#issuecomment-304319246
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
            '/jax/output/SVG/fonts/TeX/AMS/Regular/MathOperators.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/MiscMathSymbolsB.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/MiscSymbols.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/MiscTechnical.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/PUA.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/SpacingModLetters.js',
            '/jax/output/SVG/fonts/TeX/AMS/Regular/SuppMathOperators.js',
            '/jax/output/SVG/fonts/TeX/Caligraphic/Bold/Main.js',
            '/jax/output/SVG/fonts/TeX/Caligraphic/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Bold/Main.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Bold/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Bold/Other.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Bold/PUA.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Regular/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Regular/Other.js',
            '/jax/output/SVG/fonts/TeX/Fraktur/Regular/PUA.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/Main.js',
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
            '/jax/output/SVG/fonts/TeX/Main/Bold/MathOperators.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/MiscMathSymbolsA.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/MiscSymbols.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/MiscTechnical.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/SpacingModLetters.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/SupplementalArrowsA.js',
            '/jax/output/SVG/fonts/TeX/Main/Bold/SuppMathOperators.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/Main.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/GeneralPunctuation.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/GreekAndCoptic.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedA.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/LatinExtendedB.js',
            '/jax/output/SVG/fonts/TeX/Main/Italic/LetterlikeSymbols.js',
            // NOTE Handled by fontdata.js, cf. https://github.com/pkra/MathJax-single-file/pull/19#issuecomment-304319246
            // '/jax/output/SVG/fonts/TeX/Main/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/GeometricShapes.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/GreekAndCoptic.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedA.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/LatinExtendedB.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/LetterlikeSymbols.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/MiscSymbols.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/SpacingModLetters.js',
            '/jax/output/SVG/fonts/TeX/Main/Regular/SuppMathOperators.js',
            '/jax/output/SVG/fonts/TeX/Math/BoldItalic/Main.js',
            // NOTE Handled by fontdata.js, cf. https://github.com/pkra/MathJax-single-file/pull/19#issuecomment-304319246
            // '/jax/output/SVG/fonts/TeX/Math/Italic/Main.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Bold/Main.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Bold/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Bold/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Bold/Other.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Italic/Main.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Italic/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Italic/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Italic/Other.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Regular/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Regular/CombDiacritMarks.js',
            '/jax/output/SVG/fonts/TeX/SansSerif/Regular/Other.js',
            '/jax/output/SVG/fonts/TeX/Script/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Script/Regular/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Size1/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Size2/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Size3/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Size4/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Typewriter/Regular/Main.js',
            '/jax/output/SVG/fonts/TeX/Typewriter/Regular/BasicLatin.js',
            '/jax/output/SVG/fonts/TeX/Typewriter/Regular/CombDiacritMarks.js',
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
    },
    "HTML-CSS": {
        "Asana-Math": [
            '/jax/output/HTML-CSS/fonts/Asana-Math/Alphabets/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Arrows/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/DoubleStruck/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Fraktur/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Latin/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Main/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Marks/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Misc/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Monospace/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/NonUnicode/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Normal/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Operators/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/SansSerif/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Script/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Shapes/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Size1/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Size2/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Size3/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Size4/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Size5/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Size6/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Symbols/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Asana-Math/Variants/Regular/Main.js'
        ],
        "Gyre-Pagella": [
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Alphabets/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Arrows/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/DoubleStruck/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Fraktur/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Latin/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Main/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Marks/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Misc/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Monospace/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/NonUnicode/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Normal/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Operators/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/SansSerif/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Script/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Shapes/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Size1/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Size2/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Size3/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Size4/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Size5/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Size6/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Symbols/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Pagella/Variants/Regular/Main.js'
        ],
        "Gyre-Termes": [
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Alphabets/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Arrows/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/DoubleStruck/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Fraktur/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Latin/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Main/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Marks/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Misc/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Monospace/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/NonUnicode/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Normal/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Operators/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/SansSerif/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Script/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Shapes/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Size1/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Size2/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Size3/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Size4/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Size5/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Size6/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Symbols/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Gyre-Termes/Variants/Regular/Main.js'
        ],
        "Latin-Modern": [
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Alphabets/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Arrows/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/DoubleStruck/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Fraktur/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Latin/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Main/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Marks/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Misc/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Monospace/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/NonUnicode/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Normal/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Operators/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/SansSerif/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Script/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Shapes/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Size1/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Size2/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Size3/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Size4/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Size5/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Size6/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Size7/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Symbols/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Latin-Modern/Variants/Regular/Main.js'
        ],
        "Neo-Euler": [
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Alphabets/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Arrows/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Fraktur/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Main/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Marks/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/NonUnicode/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Normal/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Operators/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Script/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Shapes/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Size1/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Size2/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Size3/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Size4/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Size5/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Symbols/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/Neo-Euler/Variants/Regular/Main.js'
        ],
        // NOTE "STIX" means locally installed STIX fonts; you probably shouldn't use them -- see "STIX-Web" for webfonts
        "STIX": [
            // TODO check if these are needed in real life
            // '/jax/output/HTML-CSS/fonts/STIX/fontdata-1.0.js',
            // '/jax/output/HTML-CSS/fonts/STIX/fontdata-beta.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/AlphaPresentForms.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/Arrows.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/BBBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/BoldFraktur.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/BoxDrawing.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/CombDiacritMarks.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/CombDiactForSymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/ControlPictures.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/CurrencySymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/Cyrillic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/EnclosedAlphanum.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/GeneralPunctuation.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/GeometricShapes.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/GreekAndCoptic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/GreekBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/GreekSSBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/IPAExtensions.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/AlphaPresentForms.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/BasicLatin.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/BoxDrawing.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/CombDiactForSymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/ControlPictures.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/CurrencySymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/Cyrillic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/EnclosedAlphanum.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/GeneralPunctuation.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/GreekAndCoptic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/GreekBoldItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/GreekSSBoldItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/IPAExtensions.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/Latin1Supplement.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/LatinExtendedAdditional.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/LatinExtendedA.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/LatinExtendedB.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/LetterlikeSymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/MathBoldItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/MathBoldScript.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/MathOperators.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/MathSSItalicBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/BoldItalic/SpacingModLetters.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/Latin1Supplement.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/LatinExtendedAdditional.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/LatinExtendedA.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/LatinExtendedB.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/LatinExtendedD.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/LetterlikeSymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/MathBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/MathOperators.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/MathSSBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/MiscMathSymbolsA.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/MiscMathSymbolsB.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/MiscSymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/MiscTechnical.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/NumberForms.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/PhoneticExtensions.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/SpacingModLetters.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/SuperAndSubscripts.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Bold/SuppMathOperators.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/AlphaPresentForms.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/BoxDrawing.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/CombDiactForSymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/ControlPictures.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/CurrencySymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/Cyrillic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/EnclosedAlphanum.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/GeneralPunctuation.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/GreekAndCoptic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/GreekItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/ij.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/IPAExtensions.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/Latin1Supplement.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/LatinExtendedAdditional.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/LatinExtendedA.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/LatinExtendedB.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/LetterlikeSymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/MathItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/MathOperators.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/MathScript.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/MathSSItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Italic/SpacingModLetters.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/AlphaPresentForms.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/Arrows.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/BBBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/BlockElements.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/BoldFraktur.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/BoxDrawing.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/CJK.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/CombDiacritMarks.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/CombDiactForSymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/ControlPictures.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/CurrencySymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/Cyrillic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/Dingbats.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/EnclosedAlphanum.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/Fraktur.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/GeneralPunctuation.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/GeometricShapes.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/GreekAndCoptic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/GreekBoldItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/GreekBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/GreekItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/GreekSSBoldItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/GreekSSBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/Hiragana.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/ij.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/IPAExtensions.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/Latin1Supplement.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/LatinExtendedAdditional.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/LatinExtendedA.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/LatinExtendedB.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/LatinExtendedD.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/LetterlikeSymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathBoldItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathBoldScript.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathOperators.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathScript.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathSSBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathSSItalicBold.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathSSItalic.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathSS.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MathTT.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MiscMathSymbolsA.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MiscMathSymbolsB.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MiscSymbolsAndArrows.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MiscSymbols.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/MiscTechnical.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/NumberForms.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/PhoneticExtensions.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/SpacingModLetters.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/Specials.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/SuperAndSubscripts.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/SupplementalArrowsA.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/SupplementalArrowsB.js',
            '/jax/output/HTML-CSS/fonts/STIX/General/Regular/SuppMathOperators.js',
            '/jax/output/HTML-CSS/fonts/STIX/IntegralsD/Bold/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/IntegralsD/Regular/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/IntegralsD/Regular/Main.js',
            // NOTE not needed, cf. https://github.com/pkra/MathJax-single-file/pull/19#issuecomment-304319246
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsSm/Bold/All.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsSm/Regular/All.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsSm/Regular/Main.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsUp/Bold/All.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsUpD/Bold/All.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsUpD/Regular/All.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsUpD/Regular/Main.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsUp/Regular/All.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsUp/Regular/Main.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsUpSm/Bold/All.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsUpSm/Regular/All.js',
            // '/jax/output/HTML-CSS/fonts/STIX/IntegralsUpSm/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Bold/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/BoldItalic/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/BoldItalic/PrivateUse.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Bold/PrivateUse.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Italic/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Italic/PrivateUse.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Regular/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/NonUnicode/Regular/PrivateUse.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeFiveSym/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeFiveSym/Regular/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeFourSym/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeFourSym/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeFourSym/Regular/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeOneSym/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeOneSym/Bold/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeOneSym/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeOneSym/Regular/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeThreeSym/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeThreeSym/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeThreeSym/Regular/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeTwoSym/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeTwoSym/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/SizeTwoSym/Regular/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/Variants/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/Variants/Bold/All.js',
            '/jax/output/HTML-CSS/fonts/STIX/Variants/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX/Variants/Regular/All.js'
        ],
        "STIX-Web": [
            '/jax/output/HTML-CSS/fonts/STIX-Web/Alphabets/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Alphabets/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Alphabets/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Alphabets/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Arrows/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Arrows/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/DoubleStruck/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/DoubleStruck/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/DoubleStruck/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/DoubleStruck/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Fraktur/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Fraktur/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Latin/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Latin/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Latin/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Latin/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Main/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Main/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Main/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Main/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Marks/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Marks/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Marks/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Marks/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Misc/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Misc/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Misc/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Misc/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Monospace/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Normal/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Normal/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Normal/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Operators/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Operators/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/SansSerif/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/SansSerif/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/SansSerif/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/SansSerif/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Script/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Script/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Script/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Shapes/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Shapes/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Shapes/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Size1/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Size2/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Size3/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Size4/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Size5/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Symbols/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Symbols/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Variants/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Variants/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Variants/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/STIX-Web/Variants/Regular/Main.js'
        ],
        "TeX": ['/jax/output/HTML-CSS/fonts/TeX/fontdata.js',
            '/jax/output/HTML-CSS/fonts/TeX/fontdata-extra.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/Arrows.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/BBBold.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/BoxDrawing.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/CombDiacritMarks.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/Dingbats.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/EnclosedAlphanum.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/GeneralPunctuation.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/GeometricShapes.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/GreekAndCoptic.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/Latin1Supplement.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/LatinExtendedA.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/LetterlikeSymbols.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/MathOperators.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/MiscMathSymbolsB.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/MiscSymbols.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/MiscTechnical.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/PUA.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/SpacingModLetters.js',
            '/jax/output/HTML-CSS/fonts/TeX/AMS/Regular/SuppMathOperators.js',
            '/jax/output/HTML-CSS/fonts/TeX/Caligraphic/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Caligraphic/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Fraktur/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Fraktur/Bold/BasicLatin.js',
            '/jax/output/HTML-CSS/fonts/TeX/Fraktur/Bold/Other.js',
            '/jax/output/HTML-CSS/fonts/TeX/Fraktur/Bold/PUA.js',
            '/jax/output/HTML-CSS/fonts/TeX/Fraktur/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Fraktur/Regular/BasicLatin.js',
            '/jax/output/HTML-CSS/fonts/TeX/Fraktur/Regular/Other.js',
            '/jax/output/HTML-CSS/fonts/TeX/Fraktur/Regular/PUA.js',
            '/jax/output/HTML-CSS/fonts/TeX/Greek/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Greek/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Greek/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Greek/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/Arrows.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/CombDiacritMarks.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/CombDiactForSymbols.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/GeneralPunctuation.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/GeometricShapes.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/Latin1Supplement.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/LatinExtendedA.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/LatinExtendedB.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/LetterlikeSymbols.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/MathOperators.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/MiscMathSymbolsA.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/MiscSymbols.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/MiscTechnical.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/SpacingModLetters.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/SupplementalArrowsA.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Bold/SuppMathOperators.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Italic/CombDiacritMarks.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Italic/GeneralPunctuation.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Italic/Latin1Supplement.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Italic/LetterlikeSymbols.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Regular/CombDiacritMarks.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Regular/GeometricShapes.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Regular/MiscSymbols.js',
            '/jax/output/HTML-CSS/fonts/TeX/Main/Regular/SpacingModLetters.js',
            '/jax/output/HTML-CSS/fonts/TeX/Math/BoldItalic/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Math/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Bold/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Bold/BasicLatin.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Bold/CombDiacritMarks.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Bold/Other.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Italic/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Italic/BasicLatin.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Italic/CombDiacritMarks.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Italic/Other.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Regular/BasicLatin.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Regular/CombDiacritMarks.js',
            '/jax/output/HTML-CSS/fonts/TeX/SansSerif/Regular/Other.js',
            '/jax/output/HTML-CSS/fonts/TeX/Script/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Script/Regular/BasicLatin.js',
            '/jax/output/HTML-CSS/fonts/TeX/Script/Regular/Other.js',
            '/jax/output/HTML-CSS/fonts/TeX/Size1/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Size2/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Size3/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Size4/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Typewriter/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Typewriter/Regular/BasicLatin.js',
            '/jax/output/HTML-CSS/fonts/TeX/Typewriter/Regular/CombDiacritMarks.js',
            '/jax/output/HTML-CSS/fonts/TeX/WinChrome/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/Typewriter/Regular/Other.js',
            '/jax/output/HTML-CSS/fonts/TeX/WinIE6/Regular/Main.js',
            '/jax/output/HTML-CSS/fonts/TeX/WinIE6/Regular/AMS.js',
            '/jax/output/HTML-CSS/fonts/TeX/WinIE6/Regular/Bold.js'
        ]
    }
}

// Complication 1
// SETUP MathJax.js
// to generate a single-file build, we need to insert MathJax's components at the correct position in MathJax.js

const splitter = 'HUB.Browser.Select(MathJax.Message.browsers);';
const array = fs.readFileSync(require.resolve('mathjax')).toString().split(splitter)
const mathjaxStart = array[0];
const mathjaxEnd = splitter + array[1];

// SETUP file path
const unpackedPath = require.resolve('mathjax').replace(/\/MathJax.js$/, '');

// helper function to generate configuration information
const preConfig = function (array) {
    let result = 'MathJax.Ajax.Preloading(\n';
    const prefixedArray = array.map(i => '"[MathJax]' + i);
    result += prefixedArray.join('",\n');
    result +=
        '");\n' +
        'MathJax.Hub.Config({"v1.0-compatible":false});\n'
    return result;
};

let defaultOptions = {
    toFile: false,
    compress: false,
    customExtensions: [],
    webfontURL: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/fonts/HTML-CSS',
    folder: ''
};
// the build process
exports.build = function (font, inputJax, outputJax, options = defaultOptions) {

    // ensure webfontURL is set
    if (!options.webfontURL) options.webfontURL = defaultOptions.webfontURL;

    // check parameters
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
    if (!Array.isArray(options.customExtensions)) options.customExtensions = extensions[inputJax];
    if (!options.folder) options.folder = inputJax + outputJax + font;

    // the big array of file names
    const fileNames = [
        ...core,
        ...extensions.defaults,
        ...input[inputJax],
        ...output[outputJax],
        ...options.customExtensions
    ];

    // Complication 2
    // Helper for top-level fontdata files
    // (need to be loaded before other font resources)
    const fontdataName = '/jax/output/' + outputJax + '/fonts/' + font + '/fontdata.js';
    const fontdataExtraName = '/jax/output/' + outputJax + '/fonts/' + font + '/fontdata-extra.js'

    // set-up concatenation
    const concat = new Concat(true, 'MathJax.js', '\n');

    // begin adding content
    concat.add(null, '// MathJax single file build. Licenses of its components apply');

    //TODO SVG output + non-default font will log an (unproblematic) error because it will be trying to load TeX font's fontdata.js
    // e.g.
    // doing the following here
    // if (outputJax === "SVG" && font !== "TeX") {
    //     concat.add(null, 'window.MathJax = { SVG: {font: "' + font + '"} };');
    // }
    // breaks the build -- even though `MathJax.OutputJax.SVG.config.font` gives "STIX-Web"

    // add initial piece of MathJax.js
    concat.add(null, mathjaxStart);
    // add configuration information
    concat.add(null, preConfig(
        [
            ...fileNames,
            fontdataName,
            fontdataExtraName,
            ...fonts[outputJax][font]
        ]
    ));

    // add main bulk of files
    for (let item of fileNames) concat.add(item, fs.readFileSync(unpackedPath + item));

    // if CommonHTML or HTML-CSS is used, update webfont location
    if (outputJax === "CommonHTML" || outputJax === "HTML-CSS") {
        concat.add(null, 'MathJax.OutputJax["' + outputJax + '"].webfontDir =  "' + options.webfontURL + '";\n ');
    }

    // add top-level fontdata
    concat.add('fontdata.js', fs.readFileSync(unpackedPath + fontdataName));
    concat.add('fontdata-extra.js', fs.readFileSync(unpackedPath + fontdataExtraName));

    // Complication 3, part 1
    // remaining font-data needs wrapper to get signal from outputJax
    concat.add(null, 'MathJax.Hub.Register.StartupHook("' + outputJax + ' Jax Ready",function () {\n');

    // add remaining fontdata
    // NOTE for SVG output, this includes the actual 'fonts' (js files with SVG path data for each glyph)
    for (let item of fonts[outputJax][font]) concat.add(item, fs.readFileSync(unpackedPath + item));

    // Complication 3, part 2
    concat.add(null, ' });\n');

    // Add remaining piece of MathJax.js
    concat.add(null, mathjaxEnd);

    let result = concat.content;
    if (options.toFile) {
        writeFile('dist/' + options.folder + '/MathJax.js', result, function (err) {
            if (err) console.log(err);
            console.log('dist/' + options.folder + '/MathJax.js')
        });
    }
    if (options.compress) result = uglify.minify(result.toString()).code;
    if (options.toFile && options.compress) {
        writeFile('dist/' + options.folder + '/MathJax.min.js', result, function (err) {
            if (err) console.log(err);
            console.log('dist/' + options.folder + '/MathJax.min.js')
        })
    }
    return result;
}
