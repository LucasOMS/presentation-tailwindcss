import * as fs from 'node:fs';

const FILE = 'C:\\Users\\lucas\\Developpement\\presentation-tailwindcss\\src\\slides\\014.html';

function removeStep(step: number) {
    const content = getFileContent(FILE);

    // Increment data-step attribute
    const dataSteps = content.match(/data-steps="(\d+)"/g);
    if (dataSteps === null) {
        throw new Error(`Could not find data-steps for ${FILE}`);
    }
    const dataStepsStringValue = dataSteps[0].match(/(\d+)/g);
    if (dataStepsStringValue === null) {
        throw new Error(`Could not find data-steps value for ${FILE}`);
    }
    const dataStepsValue = parseInt(dataStepsStringValue[0], 10);

    const newStepValue = dataStepsValue - 1;

    let newContent = content.replace(/data-steps="(\d+)"/g, `data-steps="${newStepValue}"`);

    // Remove classes with step we want to delete
    newContent = newContent
        .split(' ') // Get words in class attribute (dont need to break with \t because attribute wont contain it)
        .filter((word) => !word.includes(`step-${step}`)) // Remove all classes containing current step
        .filter((w) => !!w) // Remove deleted words (will prevent having multiple spaces)
        .join(' '); // Rebuild content with removed spaces

    // Move all step after the removal are now n - 1
    for (let i = step; i < dataStepsValue + 1; ++i) {
        newContent = newContent.replace(new RegExp(`step-${i}`, 'g'), `step-${i - 1}`);
    }

    if (newContent.includes('before-step-1')) {
        console.warn('The result generated before-step-1 class, replace it with starting modifier, check if it is correct');
        newContent = newContent.replace(/before-step-1:/g, 'starting:');
    }

    fs.writeFileSync(FILE, newContent, 'utf8');
}

function getFileContent(file: string): string {
    if (!file) {
        throw new Error('No file provided');
    }
    return fs.readFileSync(file, 'utf8');
}

removeStep(1);
console.log('Step removed');
