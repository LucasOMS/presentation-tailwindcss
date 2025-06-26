import { askSlide, SlideEventType } from './slides/events.js';
import { displaySlide } from './slides/display.js';
import { slideEventsFromKey } from './slide-events-from-key.js';
import { openNoteViewer } from './note-viewer/viewer-notes.js';
import { getAnimationIsEnabledFromUrl, getCodeSizeFromUrl, getCurrentSlideStepCount, getDarkModeFromUrl, getSlideAndStepFromUrl, getTailwindVersionFromUrl, setAnimationInUrl, setCodeSizeInUrl, setDarkModeInUrl, setSlideAndStepInUrl, setTailwindVersionInUrl } from './slides/utils.js';

const TOTAL_SLIDE = 57;
const DEFAULT_CODE_SIZE = 16; // Default code size in pixels

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

function defineCodeSize(size: number | undefined) {
    if (size) {
        document.documentElement.style.setProperty('--code-size', `${size}px`);
    } else {
        document.documentElement.style.removeProperty('--code-size');
    }
}

function setAnimationState(enabled: boolean) {
    if (enabled) {
        document.body.classList.remove('no-anim');
    } else {
        document.body.classList.add('no-anim');
    }
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
    console.log('Framework setup, use arrows to navigate slides, n to open notes viewer');

    window.addEventListener('keydown', (event) => {
        slideEventsFromKey(event);
        if (event.code === 'KeyN') {
            openNoteViewer(getCurrentPosition());
            event.preventDefault();
        }
    });

    await displaySlide(getCurrentPosition().slide, getCurrentPosition().step ?? 1);
    displayTailwindVersion(4);
    defineCodeSize(getCodeSizeFromUrl());

    // DOM Events will only trigger when the url changes
    window.addEventListener('popstate', () => {
        const position = getSlideAndStepFromUrl();
        const tailwindVersion = getTailwindVersionFromUrl();
        const darkMode = getDarkModeFromUrl();
        const codeSize = getCodeSizeFromUrl();
        const animationIsEnabled = getAnimationIsEnabledFromUrl();
        displaySlide(position.slide, position.step);
        displayTailwindVersion(tailwindVersion);
        displayDarkmode(darkMode);
        defineCodeSize(codeSize);
        setAnimationState(animationIsEnabled);
    });

    // Next events
    window.addEventListener(SlideEventType.NEXT_STEP, async () => {
        const currentPosition = getCurrentPosition();
        const currentSlideStepCount = getCurrentSlideStepCount();
        if (currentSlideStepCount > currentPosition.step) {
            setSlideAndStepInUrl({ step: currentPosition.step + 1 });
        } else {
            const nextSlide = currentPosition.slide + 1 > TOTAL_SLIDE ? TOTAL_SLIDE : currentPosition.slide + 1;
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

    let darkMode = getDarkModeFromUrl();
    displayDarkmode(darkMode);
    window.addEventListener(SlideEventType.TOGGLE_DARK_MODE, async () => {
        darkMode = !darkMode;
        setDarkModeInUrl(darkMode);
    });

    window.addEventListener(SlideEventType.CHANGE_TAILWIND_VERSION, async () => {
        const currentVersion = getTailwindVersionFromUrl();
        const newVersion = currentVersion === 3 ? 4 : 3;
        setTailwindVersionInUrl(newVersion);
    });

    // Code size events
    window.addEventListener(SlideEventType.CODE_SIZE_REDUCTION, async () => {
        const currentSize = getCodeSizeFromUrl() ?? DEFAULT_CODE_SIZE;
        setCodeSizeInUrl(currentSize - 1);
    });
    window.addEventListener(SlideEventType.CODE_SIZE_INCREASE, async () => {
        const currentSize = getCodeSizeFromUrl() ?? DEFAULT_CODE_SIZE;
        setCodeSizeInUrl(currentSize + 1);
    });
    window.addEventListener(SlideEventType.CODE_SIZE_RESET, async () => {
        setCodeSizeInUrl(DEFAULT_CODE_SIZE);
    });

    let isAnimationEnabled = getAnimationIsEnabledFromUrl();
    setAnimationState(isAnimationEnabled);
    window.addEventListener(SlideEventType.TOGGLE_ANIMATION, async () => {
        isAnimationEnabled = !isAnimationEnabled;
        setAnimationInUrl(isAnimationEnabled);
    });
}

setup();
