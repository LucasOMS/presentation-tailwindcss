/**
 * @fileoverview This file generates utilities that use a value inside a selector and therefore cannot use --value().
 *
 * @note This should not be taken as an example for a real project, it's just a handy way to generate utilities without repetitive work.
 *
 * @warning Consider using higher level tools such as UnoCSS to perform such tasks.
 * This solution is used to generate selectors that Dart SASS would consider invalid because it doesn't understand
 * that @utility creates a level and therefore throws an error when using & in it.
 *
 * @description This file is watched by the gulp task 'serve' and will regenerate the tailwind.css file on change. The task tailwind-utils only do the generation of the utilities step.
 * Then the change on tailwind.css will trigger a reload of the browser.
 */

const fs = require('fs');

const TAILWIND_FILE = 'src/tailwind.css';
const UTILS_SEPARATOR = '/* ---- COMPLEX UTILITIES ---- */';

// Configuration for utilities with N generation
const MAX_STEPS = 7;
const MAX_HIGHLIGHT_LINES = 20;

let utils = [];

// Create variants for steps
for (let i = 1; i <= MAX_STEPS; i++) {
    utils.push(`@custom-variant step-${i} (&:where([data-step="${i}"], [data-step="${i}"] *));`);
}

// Create variants for before-step
for (let i = 2; i <= MAX_STEPS; i++) {
    // Create a string for data-step with steps up to the current iteration
    let steps = Array.from({ length: i - 1 }, (_, index) => `[data-step="${index + 1}"]`).join(', ');

    // Create the variant line
    let variant = `@custom-variant before-step-${i} (&:where(
:is(${steps}),
:is(${steps}) *
));`;

    // Add the variant to the array
    utils.push(variant);
}

// Create variants for highlight code
for (let i = 1; i <= MAX_HIGHLIGHT_LINES; i++) {
    // The utility will force every line to be at .5 opacity
    // The line to be highlighted will be at 1 opacity
    // The !important part is mandatory to allow highlighting multiple lines, because highlighting will always be prior to the default
    utils.push(`@utility highlight-code-line-${i} {
    > span:not(.code-line-${i}) {
        @apply opacity-30
    }
    > span.code-line-${i} {
        @apply opacity-100!
    }
}`);
}

removePreviousUtils();
writeUtils(utils.join('\n\n'));

/**
 * Delete all content of a file after the UTILS_SEPARATOR
 */
function removePreviousUtils() {
    const content = fs.readFileSync(TAILWIND_FILE, 'utf8');
    const index = content.indexOf(UTILS_SEPARATOR);
    if (index !== -1) {
        fs.writeFileSync(TAILWIND_FILE, content.slice(0, index));
    }
}

/**
 * Write content after the separator in TAILWIND_FILE
 * @param utils
 */
function writeUtils(utils) {
    fs.appendFileSync(TAILWIND_FILE, `${UTILS_SEPARATOR}\n/* Everything after this line has been generated from tailwind-utils.js and will be regenerated from gulp task tailwind-complex-util */\n\n${utils}\n`);
}
