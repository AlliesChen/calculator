# Simple Calculator

Live preview: https://allieschen.github.io/calculator/

Practices from [The Odin Project](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator)

## Assignments

1. Contain functions for all of the basic math operators:
   - add
   - subtract
   - multiply
   - divide
2. Add a “clear” button, should wipe out any existing data when pressing it.
3. Display when you click the number buttons
4. Test with "12 + 7 - 5 * 3 =", should yield "42"
5. The calculator should not evaluate more than a single pair of numbers at a time. If entering a number then an operator and another number that calculation should be displayed if the next input is an operator. The result of the calculation should be used as the first number in the new calculation.
6. Round answers with long decimals so that they don’t overflow the screen
7. Display a snarky error message if the user tries to divide by "0"
8. EXTRA CREDIT: Add a "." button and let users input decimals. Make sure not let the user type more than one though: 12.3.56.5.
9. EXTRA CREDIT: Make it look nice
10. EXTRA CREDIT: Add a “backspace” button, so the user can undo if they click the wrong number.
11. EXTRA CREDIT: Add keyboard support

## Reference

### CSS

[Letter-spacing - 金魚都能懂的CSS必學屬性](https://ithelp.ithome.com.tw/articles/10244794) on iT邦幫忙

[深入 CSS 之 line-height 應用](https://muki.tw/tech/css-line-height/) on MUKI space

[How to HIDE text with CSS](https://stackoverflow.com/questions/48591950/how-to-hide-text-with-css) on Stackoverflow

[The color pattern](https://coolors.co/0081a7-00afb9-fdfcdc-fed9b7-f07167) on Coolors

### JavaScript

For checking if a number with floating point, appreciate [this article](https://stackoverflow.com/questions/3885817/how-do-i-check-that-a-number-is-float-or-integer/20779354#20779354) on Stackoverflow. Also, from the comment by paperstreet7 and Omn, the application of `Number.MAX_SAFE_INTEGER`[^defMaxSafeInter].

[^defMaxSafeInter]: [Number.MAX_SAFE_INTEGER | MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)

For dealing with float numbers, the way I am using is from the comment by Dennis Yarmosh on ["How to round float numbers in javascript? | Stackoverflow"](https://stackoverflow.com/questions/9453421/how-to-round-float-numbers-in-javascript)

For dealing with numbers that are larget than 12-degit, appreciate [this article](https://stackoverflow.com/questions/11124451/how-can-i-convert-numbers-into-scientific-notation/11124522) on Stackoverflow.

The practices of keyboard support are benefited from these articles on Stackoverflow: [Switch statement for string matching in JavaScript](https://stackoverflow.com/questions/2896626/switch-statement-for-string-matching-in-javascript) and [Javascript + Regex = Nothing to repeat error?](https://stackoverflow.com/questions/6288181/javascript-regex-nothing-to-repeat-error).

[EventTarget.addEventListener() | MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

[JavaScript RegExp Reference | W3C school](https://www.w3schools.com/jsref/jsref_obj_regexp.asp)

### Fonts

**Google fonts:**

Screen display: [ZCOOL QingKe HuangYou](https://fonts.google.com/share?selection.family=Comfortaa%7CZCOOL%20QingKe%20HuangYou)  Designed by ZCOOL, Zheng Qingke

Keyboard: [Comfortaa](https://fonts.google.com/share?selection.family=Comfortaa%7CZCOOL%20QingKe%20HuangYou) Designed by Johan Aakerlund 