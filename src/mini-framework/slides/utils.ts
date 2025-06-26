export function getParamFromHash(param: string): string | undefined {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get(param) ?? undefined;
}

export function setParamInHash(param: string, value: string | number) {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    params.set(param, value.toString());
    window.location.hash = params.toString();
}

export function removeParamFromHash(param: string) {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    params.delete(param);
    window.location.hash = params.toString();
}

export function getCurrentSlideStepCount(): number {
    const slide = document.querySelector('section');
    if (!slide) {
        return 1;
    }
    const stepCount = slide.getAttribute('data-steps');
    if (!stepCount) {
        return 1;
    }
    return parseInt(stepCount, 10);
}

export function getSlideAndStepFromUrl(): { slide: number; step: number } {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const slide = getParamFromHash('slide');
    const step = getParamFromHash('step');

    return {
        slide: slide ? parseInt(slide, 10) : 1,
        step: step ? parseInt(step, 10) : 1
    };
}

export function getTailwindVersionFromUrl(): 3 | 4 {
    const version = getParamFromHash('version');
    if (version === '4') {
        return 4;
    } else if (version === '3') {
        return 3;
    }
    return 4; // Default to version 4 if not specified
}

export function getDarkModeFromUrl(): boolean {
    const darkMode = getParamFromHash('dark');
    return darkMode === 'true';
}

export function getCodeSizeFromUrl(): number | undefined {
    const fromUrl = getParamFromHash('code-size');
    if (fromUrl) {
        return parseInt(fromUrl, 10);
    }
    return undefined;
}

export function setSlideAndStepInUrl(position: { slide?: number; step?: number }) {
    const currentPosition = getSlideAndStepFromUrl();
    setParamInHash('slide', position.slide ?? currentPosition.slide);
    const step = position.step ?? currentPosition.step;
    if (step > 1 || step === -1) {
        setParamInHash('step', step);
    } else {
        removeParamFromHash('step');
    }
}

export function setTailwindVersionInUrl(version: 3 | 4) {
    setParamInHash('version', version);
}

export function setDarkModeInUrl(darkMode: boolean) {
    if (darkMode) {
        setParamInHash('dark', 'true');
    } else {
        removeParamFromHash('dark');
    }
}

export function setCodeSizeInUrl(size: number) {
    setParamInHash('code-size', size);
}

declare var hljs: any;

export function highlightCode() {
    const code = document.querySelectorAll('pre > code');
    if (code.length === 0) {
        return;
    }

    hljs.highlightAll();

    // Index each line of code with .code-line and .code-line-<n> (n starting at 1) to target them from TailwindCSS
    setTimeout(() => {
        const codeBlocks = document.querySelectorAll('pre > code');
        for (const codeBlock of codeBlocks) {
            const codeLines = codeBlock.innerHTML.split('\n');
            codeBlock.innerHTML = codeLines.map((line, i) => `<span class="code-line code-line-${i + 1}">${line}</span>`).join('\n');
        }
    }, 0);
}
