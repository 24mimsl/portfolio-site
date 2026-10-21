/* Animated project covers. A project uses one by setting  cover: "<name>"  in content.js.
   The animation plays when the card scrolls into view and replays on hover. */
window.SITE_COVERS = {

  /* Edify: the blue and green shapes roll into place, then the letters slide out
     from behind them, starting with "Y". Timing lives in css/style.css (.cover-edify). */
  edify:
    '<svg class="cover-edify" viewBox="-50 -556 1185 1481" role="img" aria-label="Edify logo">' +
      '<g class="ed-letters" fill="none" stroke="#301f1f" stroke-width="52" stroke-linecap="round" stroke-linejoin="round">' +
        '<path class="ed-l" style="--dx:-260px;--d:1.95s" d="M496 69H408V213H496M408 142H486"/>' +
        '<path class="ed-l" style="--dx:-410px;--d:1.83s" d="M570 69H595A72 72 0 0 1 595 213H570Z"/>' +
        '<path class="ed-l" style="--dx:-540px;--d:1.71s" d="M737.5 68V214"/>' +
        '<path class="ed-l" style="--dx:-650px;--d:1.59s" d="M900 69H812V213M812 142H890"/>' +
        '<path class="ed-l" style="--dx:-800px;--d:1.47s" d="M960 68L1006 150L1052 68M1006 150V214"/>' +
      '</g>' +
      '<g class="ed-mark">' +
        '<path class="ed-dark" fill="#301f1f" d="M90 6C130 4 190 22 232 34C246 38 246 50 242 60L226 112C214 160 200 230 110 266C92 272 70 258 50 238C20 210 6 170 6 120C6 60 30 8 90 6Z"/>' +
        '<path class="ed-blue" fill="#433de1" d="M192 115C240 116 300 135 318 155C330 170 324 190 302 207C282 222 258 234 242 240C200 222 150 214 135 200C122 188 124 160 140 140C155 122 170 115 192 115Z"/>' +
        '<path class="ed-green" fill="#b7e399" d="M155 190C180 190 200 202 222 221C260 258 300 310 306 338C310 356 296 364 272 363C230 360 160 335 118 306C95 290 88 260 92 238C98 205 130 190 155 190Z"/>' +
      '</g>' +
    '</svg>'

};
