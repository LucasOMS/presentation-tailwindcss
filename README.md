# Lancer la présentation

Installer les dépendances nécessaires avec `npm install` et lancer la présentation avec `npm run presentation`.

La présentation s'ouvrira dans votre navigateur à l'adresse `http://localhost:8000`.

## Navigation

- `→` pour passer à l'étape suivante
- `←` pour passer à l'étape précédente
- `Ctrl` + `→` pour passer à la diapositive suivante
- `Ctrl` + `←` pour passer à la diapositive précédente (dernière étape)
- `n` pour ouvrir la vue présentateur avec les notes de la diapositive
- `v` pour changer la version de Tailwind affichée (persiste entre les étapes/diapositives)
- `d` pour alterner entre light mode et dark mode (persiste entre les étapes/diapositives)

# Faire les exercices

## Lancer le serveur

Installer les dépendances avec `npm install` et lancer le tp avec `npm run tp`.

Cela ouvrira le fichier `index.html` dans votre navigateur et réactualisera automatiquement la page à chaque
modification d'un fichier de réponse.

Par défaut, le port utilisé est `8001`, vous pouvez donc ouvrir la présentation en même temps que le TP.

## Proposer une réponse à un exercice

Pour chaque exercice, vous aurez une description ainsi que ce qui est attendu à côté de votre réponse. Si l'exercice
comprend plusieurs tailles cibles, vous aurez une section pour chaque taille attendue.

_Note: Même si votre réponse s'affiche dans la page, celle-ci est indépendante puisqu'il s'agit d'une `iframe` (pour que
les media queries y fonctionnent correctement)._

Pour proposer une réponse à un exercice, il vous suffit de modifier le fichier `tp/answers/<exercice>.html`.
