async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadExercise(exerciseNumber) {
    const hash = new URLSearchParams(window.location.hash.substring(1));
    hash.set('exercise', exerciseNumber);
    window.location.hash = hash.toString();
}

let currentExercise;

async function displayExerciseFromHash() {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const exerciseNumber = hashParams.get('exercise') ?? '1';

    currentExercise = parseInt(exerciseNumber, 10);

    console.log('Display exercise', currentExercise);

    const exercice = exercises[exerciseNumber - 1];
    if (!exercice) {
        throw new Error(`Exercise ${exerciseNumber} does not exist.`);
    }
    const descriptionElement = document.getElementById('js-description');
    const expectedAndAnswerElement = document.getElementById('js-expected-and-answer');

    const answer = await fetch('answers/' + exerciseNumber + '.html');
    if (!answer.ok) {
        throw new Error(`Failed to load answer for exercise ${exerciseNumber}.`);
    }
    const answerText = await answer.text();

    expectedAndAnswerElement.innerHTML = '';

    // Foreach expected size, we create a div in the answerElement and display the expected image
    for (const expected of exercice.expected) {
        const width = expected.size.split('x')[0];
        const height = expected.size.split('x')[1];

        const title = `Size : ${width}×${height}`;
        const h2 = document.createElement('h2');
        h2.textContent = title;
        expectedAndAnswerElement.appendChild(h2);

        // Create to have expected and answer side by side
        const expectedAndAnswer = document.createElement('div');
        expectedAndAnswer.style.display = 'flex';
        expectedAndAnswer.style.flexWrap = 'wrap';
        expectedAndAnswer.style.gap = '8px';

        const img = document.createElement('img');
        img.style.border = 'solid 2px black';
        img.style.boxSizing = 'content-box';
        img.src = `expected/${expected.file}`;
        img.style.width = `${width}px`;
        img.style.height = `${height}px`;
        expectedAndAnswer.appendChild(wrapWithTitle(img, 'Attendu'));

        const answerIframe = document.createElement('iframe');
        answerIframe.style.border = 'solid 2px black';
        answerIframe.style.boxSizing = 'content-box';
        answerIframe.width = width;
        answerIframe.height = height;

        // Pour éviter tout comportement par défaut gênant
        answerIframe.setAttribute('frameborder', '0');
        answerIframe.setAttribute('scrolling', 'no');

        expectedAndAnswer.appendChild(wrapWithTitle(answerIframe, 'Réponse'));

        // Attends que l'iframe soit prête
        answerIframe.onload = () => {
            const doc = answerIframe.contentDocument || answerIframe.contentWindow.document;
            doc.open();
            doc.write(getIframeContent(answerText));
            doc.close();
        };

        expectedAndAnswerElement.appendChild(expectedAndAnswer);
    }

    descriptionElement.innerHTML = exercice.description;

    const previousButton = document.getElementById('js-previous');
    if (currentExercise === 1) {
        previousButton.style.display = 'none';
    } else {
        previousButton.style.display = 'block';
    }
    const nextButton = document.getElementById('js-next');
    if (currentExercise >= exercises.length) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }

    function wrapWithTitle(element, title) {
        const wrapper = document.createElement('div');
        const h2 = document.createElement('h2');
        h2.textContent = title;
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.gap = '8px';
        wrapper.appendChild(h2);
        wrapper.appendChild(element);
        return wrapper;
    }
}

function displayPreviousExercise() {
    if (currentExercise === 1) return;
    loadExercise(--currentExercise);
}

function displayNextExercise() {
    if (currentExercise >= exercises.length) return;
    loadExercise(++currentExercise);
}

async function main() {
    displayExerciseFromHash();
    window.addEventListener('popstate', async () => {
        await displayExerciseFromHash();
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Init');
    main();
});
