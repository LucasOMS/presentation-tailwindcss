import { askCodeSizeIncrease, askCodeSizeReduction, askCodeSizeReset, askNextSlide, askNextStep, askPreviousSlide, askPreviousStep, changeTailwindVersion, toggleDarkMode } from './slides/events.js';

export function slideEventsFromKey(event: KeyboardEvent) {
    if (event.altKey) {
        return;
    }
    let prevent = true;
    switch (event.code) {
        case 'ArrowLeft':
            if (event.ctrlKey || event.shiftKey) {
                askPreviousSlide();
            } else {
                askPreviousStep();
            }
            break;
        case 'ArrowRight':
            if (event.ctrlKey || event.shiftKey) {
                askNextSlide();
            } else {
                askNextStep();
            }
            break;
        case 'Space':
            askNextStep();
            break;
        case 'KeyD':
            toggleDarkMode();
            break;
        case 'KeyV':
            changeTailwindVersion();
            break;
        case 'NumpadSubtract':
            askCodeSizeReduction();
            break;
        case 'NumpadAdd':
            askCodeSizeIncrease();
            break;
        case 'KeyR':
            askCodeSizeReset();
            break;
        default:
            prevent = false;
    }
    if (prevent) {
        event.preventDefault();
    }
}
