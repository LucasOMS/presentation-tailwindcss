interface SlideMetadata {
    content: string;
    stepCount: number;
}

let loadedSlide = -1;

export async function loadSlide(slideNumber: number): Promise<SlideMetadata> {
    const threeDigitSlideNumber = slideNumber.toString().padStart(3, '0');
    const response = await fetch(`slides/${threeDigitSlideNumber}.html`);
    if (!response.ok) {
        throw new Error(`Impossible de charger la slide #${slideNumber}, vérifiez que le fichier existe.`);
    }
    const content = await response.text();
    const stepCount = content.match(/data-steps="(\d+)"/);
    const stepCountValue = stepCount ? parseInt(stepCount[1]) : 1;

    loadedSlide = slideNumber;

    return {
        content,
        stepCount: stepCountValue
    };
}

export function isLoadedSlide(slide: number): boolean {
    return loadedSlide === slide;
}
