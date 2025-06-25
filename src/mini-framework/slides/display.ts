import { isLoadedSlide, loadSlide } from './loading-functions.js';
import { getCurrentSlideStepCount, getSlideAndStepFromUrl, highlightCode } from './utils.js';
import { displayNote } from '../note-viewer/viewer-notes.js';

/**
 * @param {number} slide
 * @param {number | -1} step use -1 to display the last step
 * @returns {Promise<void>}
 */
export async function displaySlide(slide: number, step: number | -1): Promise<void> {
    const currentPosition = getSlideAndStepFromUrl();
    if (slide === currentPosition.slide && isLoadedSlide(slide)) {
        // If the slide is the same, we just need to update the step
        if (step === -1) {
            step = getCurrentSlideStepCount();
        }
        document.querySelector('section')?.setAttribute('data-step', step.toString());

        return;
    }

    console.log('Display slide', slide);
    const { content, stepCount } = await loadSlide(slide);

    const slideContainer = document.getElementById('slides');
    if (!slideContainer) {
        throw new Error('Cant find slides element.');
    }

    let contentWithStep = content;
    let stepToUse = Math.max(step, 1);
    if (step === -1) {
        stepToUse = stepCount;
    }
    contentWithStep = contentWithStep.replace(/^<section/m, `<section data-step="${stepToUse}"`);

    slideContainer.innerHTML = contentWithStep;

    setTimeout(() => {
        // Once the slide is displayed, check if there are notes to display
        const notes = slideContainer.querySelectorAll('aside pre');
        if (notes.length > 0) {
            let noteContent = Array.from(notes)
                .map((n) => n.innerHTML)
                .join('\n\n');

            // Remove first line if it's empty
            while (noteContent.startsWith('\n')) {
                noteContent = noteContent.substring(1);
            }

            displayNote(noteContent);
        } else {
            displayNote('');
        }
    });

    highlightCode();
}
