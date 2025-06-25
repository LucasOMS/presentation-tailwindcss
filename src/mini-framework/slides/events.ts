export enum SlideEventType {
    PREVIOUS_SLIDE = 'previous-slide',
    NEXT_SLIDE = 'next-slide',
    PREVIOUS_STEP = 'previous-step',
    NEXT_STEP = 'next-step',

    TOGGLE_DARK_MODE = 'toggle-dark-mode',
    CHANGE_TAILWIND_VERSION = 'change-tailwind-version',

    DISPLAY_SLIDE = 'display-slide',
    DISPLAY_STEP = 'display-step'
}

export function askPreviousSlide() {
    window.dispatchEvent(new CustomEvent(SlideEventType.PREVIOUS_SLIDE));
}

export function askNextSlide() {
    window.dispatchEvent(new CustomEvent(SlideEventType.NEXT_SLIDE));
}

export function askPreviousStep() {
    window.dispatchEvent(new CustomEvent(SlideEventType.PREVIOUS_STEP));
}

export function askNextStep() {
    window.dispatchEvent(new CustomEvent(SlideEventType.NEXT_STEP));
}

export function toggleDarkMode() {
    window.dispatchEvent(new CustomEvent(SlideEventType.TOGGLE_DARK_MODE));
}

export function changeTailwindVersion() {
    window.dispatchEvent(new CustomEvent(SlideEventType.CHANGE_TAILWIND_VERSION));
}

export interface DisplaySlideEventDetail {
    slide: number;
    step?: number;
}

export function askSlide(slide: number, step?: number) {
    window.dispatchEvent(
        new CustomEvent<DisplaySlideEventDetail>(SlideEventType.DISPLAY_SLIDE, {
            detail: {
                slide,
                step: step ?? 1
            }
        })
    );
}

export interface DisplayStepEventDetail {
    step: number;
}

export function askStep(step: number) {
    window.dispatchEvent(new CustomEvent<DisplayStepEventDetail>(SlideEventType.DISPLAY_STEP, { detail: { step } }));
}
