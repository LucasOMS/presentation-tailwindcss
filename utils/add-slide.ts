import * as fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:\\Users\\lucas\\Developpement\\presentation-tailwindcss\\src\\slides';

function addSlide(slideNumber: number) {
    if (!fs.existsSync(ROOT)) {
        throw new Error(`File ${ROOT} does not exist.`);
    }

    // Store renaming operations because they need to be perform in reverse order
    const toRename: { oldPath: string; newPath: string }[] = [];

    // Foreach file in the directory
    fs.readdirSync(ROOT).forEach((file) => {
        const slideName = path.basename(file, '.html');
        const currentSlideNumber = parseInt(slideName, 10);
        if (currentSlideNumber >= slideNumber) {
            toRename.push({
                oldPath: path.join(ROOT, file),
                newPath: path.join(ROOT, `${('' + (currentSlideNumber + 1)).padStart(3, '0')}.html`)
            });
        }
    });

    // Rename files in reverse order
    for (const fileRename of toRename.sort((a, b) => b.oldPath.localeCompare(a.oldPath))) {
        console.log('Rename', fileRename.oldPath, 'to', fileRename.newPath);
        fs.renameSync(fileRename.oldPath, fileRename.newPath);
    }

    // Create the new slide file
    const newSlidePath = path.join(ROOT, `${('' + slideNumber).padStart(3, '0')}.html`);
    if (fs.existsSync(newSlidePath)) {
        throw new Error(`File ${newSlidePath} already exists.`);
    }
    fs.writeFileSync(newSlidePath, '');
}

addSlide(29);
