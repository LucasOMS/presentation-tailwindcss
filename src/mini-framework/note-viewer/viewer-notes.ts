import { noteViewerTemplate } from './template.js';
import { slideEventsFromKey } from '../slide-events-from-key.js';
import { getCodeSizeFromUrl, getDarkModeFromUrl, getSlideAndStepFromUrl, getTailwindVersionFromUrl } from '../slides/utils.js';

let noteWindow: WindowProxy | null = null;
let currentNote: string | null = null;

// Fonction pour ouvrir la fenêtre des notes
export async function openNoteViewer(currentPosition: { slide: number; step: number }) {
    if (noteWindow && !noteWindow.closed) {
        // Si la fenêtre existe déjà, la mettre au premier plan
        noteWindow.focus();
    } else {
        const width = window.innerWidth;
        const height = window.innerHeight;
        // Sinon, ouvrir une nouvelle fenêtre
        noteWindow = window.open('', 'noteViewer', `width=${width},height=${height}`); // Taille de la fenêtre et autres options
        if (!noteWindow) {
            console.error("La fenêtre n'a pas pu être ouverte.");
            return;
        }
        noteWindow.document.write(noteViewerTemplate);

        await awaitNoteWindowIsReady();

        await adaptIframeSizeToWindow();
        updateTailwindVersionIndicator();
        await displayPreviewSlide(currentPosition.slide, currentPosition.step);

        if (currentNote) {
            // Force injection of the last loaded note
            displayNote(currentNote);
        }

        // Binds on keydown event because arrow keys are not always detected with keypress event
        noteWindow.addEventListener('keydown', (event) => {
            if (event.key === 'q' || event.key === 'Escape') {
                noteWindow?.close();
            }
            slideEventsFromKey(event);
        });

        // On this window close or refresh, close the note window
        window.addEventListener('beforeunload', () => {
            noteWindow?.close();
        });

        // DOM Events will only trigger when the url changes
        window.addEventListener('popstate', async () => {
            if (!noteWindow || noteWindow.closed) {
                return;
            }
            const position = getSlideAndStepFromUrl();
            await displayPreviewSlide(position.slide, position.step);
            updateTailwindVersionIndicator();
        });

        window.addEventListener('resize', adaptIframeSizeToWindow);
        noteWindow.addEventListener('resize', adaptIframeSizeToWindow);
    }
}

export function displayNote(notes: string) {
    currentNote = notes;
    if (noteWindow && !noteWindow.closed) {
        const noteContent = noteWindow.document.getElementById('js-note-content');
        if (!noteContent) {
            throw new Error('Cant find noteContent element in note window.');
        }
        noteContent.innerHTML = currentNote;
    }
}

function updateTailwindVersionIndicator(): void {
    if (!noteWindow || noteWindow.closed) {
        throw new Error('Note window is undefined or closed.');
    }

    const tailwindVersionElement = noteWindow.document.getElementById('js-tailwind-version');
    if (!tailwindVersionElement) {
        throw new Error('Cant find tailwind version element in note window.');
    }
    const version = getTailwindVersionFromUrl();
    tailwindVersionElement.innerHTML = `v${version}`;
}

async function displayPreviewSlide(slide: number, step: number): Promise<void> {
    return new Promise<void>(async (resolve) => {
        const iframe = getPreviewIframe();
        const tailwindVersion = getTailwindVersionFromUrl();
        const darkMode = getDarkModeFromUrl();
        const codeSize = getCodeSizeFromUrl();

        let src = `http://localhost:8000/#slide=${slide}&step=${step}&version=${tailwindVersion}`;
        if (darkMode) {
            src += '&dark=true';
        }
        if (codeSize) {
            src += `&code-size=${codeSize}`;
        }
        iframe.src = src;

        const slideNumberDiv = getSlideNumberDiv();
        slideNumberDiv.innerHTML = `${slide} - ${step === -1 ? '?' : step}`;

        setTimeout(() => {
            resolve();
        });
    });
}

async function awaitNoteWindowIsReady(): Promise<void> {
    return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
            if (noteWindow && !noteWindow.closed) {
                const templateRoot = noteWindow.document.getElementById('note-viewer');
                if (templateRoot) {
                    clearInterval(interval);
                    resolve();
                }
            }
        }, 100);
    });
}

function adaptIframeSizeToWindow(): Promise<void> {
    return new Promise<void>((resolve) => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const iframe = getPreviewIframe();
        iframe.height = `${height}px`;
        iframe.width = `${width}px`;

        if (!noteWindow || noteWindow.closed) {
            throw new Error('Note window is undefined or closed.');
        }

        const gap = 16; // Gap from the grip (between iframes and notes)
        const noteWindowWidth = noteWindow.innerWidth / 2 - gap;
        const noteWindowHeight = noteWindow.innerHeight / 2 - gap;

        // Set scale of the iframe to fit maximum 50% height and 50% width of the note window
        const scaleX = noteWindowWidth / width;
        const scaleY = noteWindowHeight / height;

        // Take minimum of the two scales and align with transform origin
        iframe.style.scale = `${Math.min(scaleX, scaleY)}`;

        setTimeout(() => {
            resolve();
        });
    });
}

function getPreviewIframe(): HTMLIFrameElement {
    if (!noteWindow || noteWindow.closed) {
        throw new Error('Cant find preview element in note window.');
    }

    return noteWindow.document.querySelector('iframe#js-preview') as HTMLIFrameElement;
}

function getSlideNumberDiv(): HTMLDivElement {
    if (!noteWindow || noteWindow.closed) {
        throw new Error('Cant find preview element in note window.');
    }

    return noteWindow.document.querySelector('div#js-slide-number') as HTMLDivElement;
}
