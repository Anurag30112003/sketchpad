// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3 https://www.gnu.org/licenses/agpl-3.0-standalone.html
/**
 * @source: http://developers.sketchpad.pro/dist/src/NSSketchpad-agpl.js
 *
 * Sketchpad.pro
 * {@link http://sketchpad.pro|Sketchpad.pro - drawing board sketch free}
 *
 * @copyright 2016-2017 positivestudio.co
 * @version 0.5.1
 * @author positivestudio.co
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2016  positivestudio.co
 *
 *  Sketchpad.pro - drawing board sketch pad
 *  Copyright (C) 2016  positivestudio.co
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 * @file Inputs stack
 *
 * Date: 2016-08-11T14:00Z
 */

/*global window*/

var NSSketchpad = {
    avaliableTools: [],
    defaultTool: "pen",
    // watermarkImageSrc: "data:image/png;base64,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"
    //please keep Appropriate Legal Notices
    watermarkTitle: "sketchpad.pro library is available under AGPL-3 license, visit http://developers.sketchpad.pro for source code. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY.",
    watermarkImageSrc: "data:image/svg+xml;utf8," + '<?xml version="1.0" encoding="UTF-8" standalone="no"?> <svg    xmlns:dc="http://purl.org/dc/elements/1.1/"    xmlns:cc="http://creativecommons.org/ns#"    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"    xmlns:svg="http://www.w3.org/2000/svg"    xmlns="http://www.w3.org/2000/svg"    xmlns:xlink="http://www.w3.org/1999/xlink"    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"    width="128"    height="18"    viewBox="0 0 294.79549 53.369998"    id="svg2"    version="1.1"    inkscape:version="0.91 r13725"    sodipodi:docname="sketchpad-logo-clean.svg">   <sodipodi:namedview      pagecolor="#ffffff"      bordercolor="#666666"      borderopacity="1"      objecttolerance="10"      gridtolerance="10"      guidetolerance="10"      inkscape:pageopacity="0"      inkscape:pageshadow="2"      inkscape:window-width="1296"      inkscape:window-height="719"      id="namedview51"      showgrid="true"      inkscape:zoom="6.416994"      inkscape:cx="72.420486"      inkscape:cy="4.2725026"      inkscape:window-x="99"      inkscape:window-y="0"      inkscape:window-maximized="0"      inkscape:current-layer="layer1">     <inkscape:grid        type="xygrid"        id="grid3441" />   </sodipodi:namedview>   <defs      id="defs4">     <linearGradient        id="rainbow"        inkscape:collect="always">       <stop          offset="0"          style="stop-color:#ff0101;stop-opacity:1"          id="stop6" />       <stop          offset="0.04"          style="stop-color:#ff7901;stop-opacity:1"          id="stop8" />       <stop          offset="0.12"          style="stop-color:#fff001;stop-opacity:1"          id="stop10" />       <stop          offset="0.20"          style="stop-color:#96ff01;stop-opacity:1"          id="stop12" />       <stop          offset="0.27"          style="stop-color:#1fff01;stop-opacity:1"          id="stop14" />       <stop          offset="0.34"          style="stop-color:#01ff5b;stop-opacity:1"          id="stop16" />       <stop          offset="0.41"          style="stop-color:#01ffd2;stop-opacity:1"          id="stop18" />       <stop          offset="0.51"          style="stop-color:#01b4ff;stop-opacity:1"          id="stop20" />       <stop          offset="0.56"          style="stop-color:#013dff;stop-opacity:1"          id="stop22" />       <stop          offset="0.67"          style="stop-color:#3d01ff;stop-opacity:1"          id="stop24" />       <stop          offset="0.78"          style="stop-color:#b401ff;stop-opacity:1"          id="stop26" />       <stop          offset="0.87"          style="stop-color:#ff01d2;stop-opacity:1"          id="stop28" />       <stop          offset="0.95"          style="stop-color:#ff015b;stop-opacity:1"          id="stop30" />       <stop          offset="1"          style="stop-color:#ff0101;stop-opacity:1"          id="stop32" />     </linearGradient>     <linearGradient        xlink:href="#rainbow"        id="linearGradientRainbow"        gradientUnits="userSpaceOnUse"        x1="45"        y1="143"        x2="413"        y2="143"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3379"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3381"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3383"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3385"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3387"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3389"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3391"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3393"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3395"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3397"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3399"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />     <linearGradient        inkscape:collect="always"        xlink:href="#rainbow"        id="linearGradient3401"        gradientUnits="userSpaceOnUse"        gradientTransform="matrix(0.98959455,0,0,1.1096972,279.05272,-122.63917)"        x1="45"        y1="143"        x2="413"        y2="143" />   </defs>   <metadata      id="metadata35">     <rdf:RDF>       <cc:Work          rdf:about="">         <dc:format>image/svg+xml</dc:format>         <dc:type            rdf:resource="http://purl.org/dc/dcmitype/StillImage" />         <dc:title></dc:title>         <dc:publisher>           <cc:Agent>             <dc:title></dc:title>           </cc:Agent>         </dc:publisher>         <dc:rights>           <cc:Agent>             <dc:title>AGPL</dc:title>           </cc:Agent>         </dc:rights>         <dc:creator>           <cc:Agent>             <dc:title>positivestuido.co</dc:title>           </cc:Agent>         </dc:creator>         <dc:date>2017</dc:date>         <dc:subject>           <rdf:Bag>             <rdf:li>sketch drawing board real-time canvas surface</rdf:li>           </rdf:Bag>         </dc:subject>       </cc:Work>     </rdf:RDF>   </metadata>   <g      inkscape:label="Layer 1"      inkscape:groupmode="layer"      id="layer1"      transform="translate(-359.92474,-9.2357351)">     <path        inkscape:connector-curvature="0"        id="path4215"        style="fill:url(#linearGradientRainbow);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 348.50715,25.511773 0,5.415323 -1.78128,0 0,-3.417866 -16.30852,0 0,7.412776 18.0898,0 0,11.407687 -24.70029,0 0,-5.415322 1.78127,0 0,3.417866 16.30852,0 0,-7.412776 -18.08979,0 0,-11.407688 24.70029,0 z" />     <path        inkscape:connector-curvature="0"        id="path4217"        style="fill:url(#linearGradient3401);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 380.66401,44.332237 0,1.997456 -9.65843,0 0,-1.997456 3.04795,0 -4.71047,-7.412776 -7.32301,0 0,7.412776 3.95839,0 0,1.997456 -14.48766,0 0,-1.997456 3.91879,0 0,-26.854671 -3.91879,0 0,-1.997453 10.52927,0 0,19.441893 7.28343,0 4.39379,-7.412776 -3.20628,0 0,-1.997457 9.65844,0 0,1.997457 -4.31462,0 -4.94798,8.344922 5.3834,8.478085 4.39378,0 z" />     <path        inkscape:connector-curvature="0"        id="path4219"        style="fill:url(#linearGradient3399);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 384.07627,25.511773 24.70027,0 0,11.407688 -18.08978,0 0,7.412776 16.30851,0 0,-3.417866 1.78127,0 0,5.415322 -24.70027,0 0,-20.81792 z m 6.61049,1.997457 0,7.412776 16.30851,0 0,-7.412776 -16.30851,0 z" />     <path        inkscape:connector-curvature="0"        id="path4221"        style="fill:url(#linearGradient3397);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 429.88582,44.332237 0,1.997456 -14.25015,0 0,-18.820463 -3.91879,0 0,-1.997457 3.91879,0 0,-10.03166 6.61049,0 0,10.03166 7.63966,0 0,1.997457 -7.63966,0 0,16.823007 7.63966,0 z" />     <path        inkscape:connector-curvature="0"        id="path4223"        style="fill:url(#linearGradient3395);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 456.01112,40.914371 1.78128,0 0,5.415322 -24.70029,0 0,-20.81792 24.70029,0 0,5.415323 -1.78128,0 0,-3.417866 -16.30851,0 0,16.823007 16.30851,0 0,-3.417866 z" />     <path        inkscape:connector-curvature="0"        id="path4225"        style="fill:url(#linearGradient3393);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 493.35532,44.332237 0,1.997456 -10.25221,0 0,-1.997456 4.23547,0 0,-16.823007 -16.3085,0 0,16.823007 3.91879,0 0,1.997456 -14.44809,0 0,-1.997456 3.91879,0 0,-26.854671 -3.91879,0 0,-1.997453 10.5293,0 0,10.03166 18.08978,0 0,18.820464 4.23546,0 z" />     <path        inkscape:connector-curvature="0"        id="path4227"        style="fill:url(#linearGradient3391);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 494.28615,54.3639 3.9188,0 0,-26.85467 -3.9188,0 0,-1.997457 29.17326,0 0,20.81792 -18.64395,0 0,8.034207 3.91879,0 0,1.997454 -14.4481,0 0,-1.997454 z m 27.39199,-26.85467 -16.86268,0 0,16.823007 16.86268,0 0,-16.823007 z" />     <path        inkscape:connector-curvature="0"        id="path4229"        style="fill:url(#linearGradient3389);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 552.68831,44.332237 3.91882,0 0,1.997456 -28.61909,0 0,-11.407687 18.08978,0 0,-7.412776 -16.30851,0 0,3.417866 -1.78127,0 0,-5.415323 24.70027,0 0,18.820464 z m -6.61049,0 0,-7.412776 -16.30851,0 0,7.412776 16.30851,0 z" />     <path        inkscape:connector-curvature="0"        id="path4231"        style="fill:url(#linearGradient3387);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 577.98669,25.511773 0,-8.034207 -3.91879,0 0,-1.997453 10.52928,0 0,28.852124 3.91879,0 0,1.997456 -29.17325,0 0,-20.81792 18.64397,0 z m -16.86269,18.820464 16.86269,0 0,-16.823007 -16.86269,0 0,16.823007 z" />     <path        inkscape:connector-curvature="0"        id="path4233"        style="fill:url(#linearGradient3385);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 599.21968,46.329693 -7.60009,0 0,-6.791347 7.60009,0 0,6.791347 z" />     <path        inkscape:connector-curvature="0"        id="path4235"        style="fill:url(#linearGradient3383);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 601.71129,54.3639 3.91879,0 0,-26.85467 -3.91879,0 0,-1.997457 29.17325,0 0,20.81792 -18.64396,0 0,8.034207 3.91878,0 0,1.997454 -14.44807,0 0,-1.997454 z m 27.39197,-26.85467 -16.86268,0 0,16.823007 16.86268,0 0,-16.823007 z" />     <path        inkscape:connector-curvature="0"        id="path4237"        style="fill:url(#linearGradient3381);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 659.83544,25.511773 0,5.370936 -1.78128,0 0,-3.373479 -12.86473,0 0,16.823007 3.91879,0 0,1.997456 -14.44807,0 0,-1.997456 3.91879,0 0,-16.823007 -3.91879,0 0,-1.997457 25.17529,0 z" />     <path        inkscape:connector-curvature="0"        id="path4239"        style="fill:url(#linearGradient3379);fill-opacity:1;stroke:#000000;stroke-width:0.62875605;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"        d="m 687.87312,46.329693 -24.70028,0 0,-20.81792 24.70028,0 0,20.81792 z m -1.78128,-18.820463 -16.3085,0 0,16.823007 16.3085,0 0,-16.823007 z" />   </g> </svg> '
};

window.NSSketchpad = NSSketchpad;