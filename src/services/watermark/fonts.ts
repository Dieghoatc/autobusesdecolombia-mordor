import * as path from 'path';

// librsvg (used by sharp to render the watermark text) ignores @font-face and only uses
// fonts found by fontconfig. Point fontconfig at the fonts bundled in assets/ so the text
// renders the same on any server; on a server without system fonts every character
// would otherwise be drawn as a box. Must run before sharp renders any text.
process.env.FONTCONFIG_FILE = path.join(process.cwd(), 'assets', 'fonts.conf');
