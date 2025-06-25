import { askSlide, SlideEventType } from './slides/events.js';
import { displaySlide } from './slides/display.js';
import { slideEventsFromKey } from './slide-events-from-key.js';
import { openNoteViewer } from './note-viewer/viewer-notes.js';
import { getCurrentSlideStepCount, getDarkModeFromUrl, getSlideAndStepFromUrl, getTailwindVersionFromUrl, setDarkModeInUrl, setSlideAndStepInUrl, setTailwindVersionInUrl } from './slides/utils.js';

const TOTAL_SLIDE = 100;

function displayDarkmode(enabled: boolean) {
    if (enabled) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
}

function displayTailwindVersion(version: 3 | 4) {
    document.body.classList.remove('tailwind-v4');
    document.body.classList.remove('tailwind-v3');
    document.body.classList.add('tailwind-v' + version);
}

function getCurrentPosition() {
    const fromUrl = getSlideAndStepFromUrl();
    if (fromUrl.step !== -1) {
        return fromUrl;
    }
    return {
        slide: fromUrl.slide,
        step: getCurrentSlideStepCount()
    };
}

async function setup() {
    console.log('Framework setup, use arrows to navigate slides, d to open notes viewer');

    window.addEventListener('keydown', (event) => {
        slideEventsFromKey(event);
        if (event.code === 'KeyN') {
            openNoteViewer(getCurrentPosition());
            event.preventDefault();
        }
    });

    await displaySlide(getCurrentPosition().slide, getCurrentPosition().step ?? 1);
    displayTailwindVersion(4);

    // DOM Events will only trigger when the url changes
    window.addEventListener('popstate', () => {
        const position = getSlideAndStepFromUrl();
        const tailwindVersion = getTailwindVersionFromUrl();
        const darkMode = getDarkModeFromUrl();
        displaySlide(position.slide, position.step);
        displayTailwindVersion(tailwindVersion);
        displayDarkmode(darkMode);
    });

    // Next events
    window.addEventListener(SlideEventType.NEXT_STEP, async () => {
        const currentPosition = getCurrentPosition();
        const currentSlideStepCount = getCurrentSlideStepCount();
        if (currentSlideStepCount > currentPosition.step) {
            setSlideAndStepInUrl({ step: currentPosition.step + 1 });
        } else {
            const nextSlide = currentPosition.slide + 1 > TOTAL_SLIDE ? 1 : currentPosition.slide + 1;
            setSlideAndStepInUrl({ slide: nextSlide, step: 1 });
        }
    });
    window.addEventListener(SlideEventType.NEXT_SLIDE, async () => {
        const currentPosition = getCurrentPosition();
        const nextSlide = currentPosition.slide + 1 > TOTAL_SLIDE ? TOTAL_SLIDE : currentPosition.slide + 1;
        setSlideAndStepInUrl({ slide: nextSlide, step: 1 });
    });

    // Previous events
    window.addEventListener(SlideEventType.PREVIOUS_STEP, async () => {
        const currentPosition = getCurrentPosition();
        if (currentPosition.step > 1) {
            setSlideAndStepInUrl({ step: currentPosition.step - 1 });
        } else if (currentPosition.slide > 1 && currentPosition.slide > 1) {
            // Ask previous slide
            askSlide(currentPosition.slide - 1, -1);
        }
    });
    window.addEventListener(SlideEventType.PREVIOUS_SLIDE, async (event) => {
        const currentPosition = getCurrentPosition();
        const previousSlide = Math.max(0, currentPosition.slide - 1);
        askSlide(previousSlide, 1);
    });

    window.addEventListener(SlideEventType.DISPLAY_SLIDE, async (event) => {
        const { slide, step } = (event as CustomEvent).detail;
        setSlideAndStepInUrl({ slide, step });
    });

    let darkMode = false;
    window.addEventListener(SlideEventType.TOGGLE_DARK_MODE, async () => {
        darkMode = !darkMode;
        setDarkModeInUrl(darkMode);
    });

    window.addEventListener(SlideEventType.CHANGE_TAILWIND_VERSION, async () => {
        const currentVersion = getTailwindVersionFromUrl();
        const newVersion = currentVersion === 3 ? 4 : 3;
        setTailwindVersionInUrl(newVersion);
    });
}

setup();
