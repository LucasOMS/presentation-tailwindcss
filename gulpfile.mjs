import gulp from 'gulp';
import typescript from 'gulp-typescript';
import connect from 'gulp-connect';
import del from 'del';
import postcss from 'gulp-postcss';
import tailwindcss from '@tailwindcss/postcss';
import prettier from 'gulp-prettier';
import changedInPlace from 'gulp-changed-in-place';
import shell from 'gulp-shell';

const tsProject = typescript.createProject('tsconfig.json');

const root = 'dist';
const port = 8000;
const host = 'localhost';

gulp.task('clean', () => {
    return del(['dist']);
});

// Tâche pour compiler TypeScript
gulp.task('typescript', () => {
    return gulp
        .src('src/**/*.ts') // Fichiers sources TypeScript
        .pipe(tsProject()) // Compile le TypeScript
        .pipe(gulp.dest('dist')); // Sauvegarde dans le dossier dist
});

gulp.task('tailwind-utils', shell.task('node src/tailwind-utils.js'));

// Tâche pour compiler Tailwind CSS
gulp.task('tailwindcss', () => {
    return gulp
        .src('src/tailwind.css')
        .pipe(postcss([tailwindcss('src/tailwind.css')]))
        .pipe(gulp.dest('dist'));
});

// Tâche pour copier les assets dans dist
gulp.task('assets', () => {
    return gulp.src('assets/**/*', { encoding: false }).pipe(gulp.dest('dist/assets'));
});
// Tâche pour copier les fichiers HTML dans dist
gulp.task('html', () => {
    return gulp
        .src('src/**/*.html') // Tous les fichiers HTML dans le projet
        .pipe(gulp.dest('dist')); // Copie-les dans dist
});

// Tâche pour copier les web components
gulp.task('components', () => {
    return gulp.src('src/components/**/*.js').pipe(gulp.dest('dist/components'));
});

// Tâche pour copier les dépendances externes dans dist
gulp.task('deps', () => {
    return gulp.src('src/deps/**/*').pipe(gulp.dest('dist')); // Copie-les dans dist
});

// Tâche pour recharger la page lors d'un changement de fichier
gulp.task('reload', () => {
    return gulp.src(['dist/**/*']).pipe(connect.reload()); // Recharge le navigateur
});

// Tâche pour recharger la page lors d'un changement de fichier dans les réponses du TP
gulp.task('tp-reload', () => {
    return gulp.src(['tp/answers/*.html']).pipe(connect.reload()); // Recharge le navigateur
});

// Prettify HTML to order tailwindcss classes
gulp.task('prettier-html', () => {
    return gulp
        .src('src/**/*.html')
        .pipe(changedInPlace()) // Prevents watchers from running loop after prettifying
        .pipe(prettier()) // Apply prettier using .prettierrc
        .pipe(gulp.dest('src'));
});

// Tâche par défaut
gulp.task('default', gulp.series('clean', 'typescript', 'html', gulp.series('tailwind-utils', 'tailwindcss')));

// Build project into dist folder
gulp.task('build', gulp.series('clean', gulp.parallel('typescript', 'html', 'assets', 'deps', 'components', gulp.series('tailwind-utils', 'tailwindcss'))));

// Dev server with livereload
gulp.task(
    'presentation',
    gulp.series('clean', 'build', () => {
        connect.server({ root, port, host, livereload: true });

        // Reload typeScript files
        gulp.watch(['src/**/*.ts'], gulp.series('typescript', 'reload'));

        // Tailwind generation
        gulp.watch(['src/tailwind-utils.js'], gulp.task('tailwind-utils'));
        // Reload on tailwdind config change
        gulp.watch(['src/tailwind.css'], gulp.series('tailwindcss', 'reload'));

        // Import new assets
        gulp.watch(['assets/**/*'], gulp.series('assets', 'reload'));

        // Import new JS components
        gulp.watch(['src/components/**/*.js'], gulp.series('components', 'reload'));

        // On html change, recompile tailwindcss, export html and reload browser
        gulp.watch(
            [
                'src/tailwind.css', // In case tailwindcss config changes
                'src/**/*.html', // If new utility classes are used
                'src/index.html', // If new utility classes are used
                'src/mini-framework/note-viewer/template.ts' // Scan this file because it's mainly HTML
            ],
            gulp.series(gulp.parallel('html', 'tailwindcss'), 'reload')
        );
    })
);

gulp.task('tp', () => {
    connect.server({ root: 'tp', port: port + 1, host, livereload: true });

    gulp.watch(['tp/answers/**.html'], gulp.task('tp-reload'));
});
