import * as fs from 'node:fs';

const FILE = 'C:\\Users\\lucas\\Developpement\\presentation-tailwindcss\\src\\slides\\005.html';

function addStep(step: number) {
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

    const newStepValue = dataStepsValue + 1;

    let newContent = content.replace(/data-steps="(\d+)"/g, `data-steps="${newStepValue}"`);

    // Move all step after the addition
    for (let i = dataStepsValue; i >= step; --i) {
        newContent = newContent.replace(new RegExp(`step-${i}`, 'g'), `step-${i + 1}`);
    }

    fs.writeFileSync(FILE, newContent, 'utf8');
}

function getFileContent(file: string): string {
    if (!file) {
        throw new Error('No file provided');
    }
    return fs.readFileSync(file, 'utf8');
}

addStep(1);
