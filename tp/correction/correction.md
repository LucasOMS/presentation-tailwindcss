# Exercice 1

Ici, rien de bien compliqué, je défini chaque variable dans le bloc `@theme`.
Les couleurs sont préfixées par `--color`, les polices par `--font`, les tailles de police par `--text`, les breakpoints
par `--breakpoint`, et j'utilise `--spacing` pour définir l'espacement.

Si j'avais eu une font perso, j'aurais pu utiliser `@font-face` pour la définir et la variable `--font-description`
aurait référencé son nom avant les valeurs de fallback.

# Exercice 2

## Utilitaire seulement

Dans cette solution, on voit que je répète beaucoup de chose, et si j'ai besoin de flexibilité, par exemple pour
l'opacité d'une couleur, et bien je dois créer un nouvel utilitaire.

## Solution personnelle

Dans ma solution personnelle, j'essai de définir ce qui est de l'ordre du design global et ce qui est spécifique.

Les couleurs `primary` et `soft` sont probablements inclus dans le design global, c'est pourquoi je le défini dans le
thème.
Pour l'arrondi de la `card` et son ombre, je le défini dans le thème car même si c'est un composant, je me suis souvent
retrouvé dans mes projets à devoir "reproduire" une `card`, notamment avec ces deux propriétés. Ici c'est donc un choix
de
ma part.

Pour le `padding` des boutons, je les définit une seule fois, idem pour celui d'une section. Je ne peux de toute facon
pas
créer un espacement précis qui correspondrait à ces valeurs. J'aurais pu en v3 mais pas en v4. De toute facon, un tel
espacement créerait des incohérences puisqu'il deviendrait possible d'appliquer une largeur `section`, alors que cette
taille était définie pour un padding.

# Exercice 3

Mon approche dans ce genre d'exercice, en plus de réfléchir en priorité aux petits écrans, c'est de définir la grille
qui est la plus cohérente possible. Moins j'ai de colonne ou de ligne définies, mieux je me porte.

Ici j'ai une seule colonne, puis 2, puis 4, puisque le résultat indique clairement que le centre occupe `50%` de
l'espace,
on ne peut donc pas faire moins que 4 colonnes.

Pour la ligne du bas qui occupe toujours toute la largeur, j'ai simplement appliqué `col-span-full` ce qui me permet de
ne pas avoir à m'en préoccuper par la suite, plutôt que définir plusieurs fois qu'elle doit s'étendre sur 2 puis 4
colonnes.

Vous vouyez que j'ai utilisé un combo de variant en préicisant "à partir de `sm` et jusqu'à `md`", j'ai utilisé cette
approche car elle me permet de désactiver ce qui me gène plutôt que devoir le surcharger par la suite.

# Exercice 4

_**Montrer la structure HTML rapidement**_

Comme dans l'exercice 2, j'ai défini le `radius` de la `card` dans les variables de thème par habitude.

Ici j'ai créé des utilitaires pour hériter les arrondis du parents, c'est un utilitaire que tailwind ne fournit pas,
mais que je trouve très pratique.

Ensuite je me place dans le layer `@component` pour définir `offer-list-item`, il a pour objectif de factoriser le code
que j'aurais sinon dû répéter. Si j'avais eu un framework, la liste ainsi que ses enfants auraient probablement étaient
des composants isolés.

Maintenant que le code est factorisé, cela a du sens d'appliquer du design en fonction de la position dans la liste, ici
j'ajoute une bordure sur les éléments pour les séparer entre eux. Je fais un peu de math pour que le séparateur arrive à
`50%` de ce qu'aurait été le `padding` de la `card`.

Dans cet exercice, je me suis probablement compliqué la vie en considérant que la `card` avait un `padding`, je l'ai
traité
comme si c"était un composant indépendant, et c'est pour ca que j'ai de nombreuses `margin` négatives, elles sont ici
pour
compenser le `padding` de la `card`.

En _light mode_, le bloc d'en haut a un `background gradient`, en _dark mode_, je le confine au texte et je rend le
texte
transparent. Pour obtenir le fond foncé en plus du texte gradient c'est la `card` entière qui a la couleur la plus
foncée,
et le bloc du dessous a une couleur plus claire.

# Exercice 5

Passage rapide des différentes approches :

- Avec un `flex`, et les enfants prenant 1 fraction chacun
- Avec une `grid`, chaque colonne prenant 1 fraction
- Avec un seul enfant, on peut mettre la couleur de droite en `background` et l'enfant prend `50%` de la largeur avec la
  couleur de gauche
- Avec deux enfants sans `flex` ni `grid` on peut utiliser les blocks inline pour les placer l'un à côté de l'autre,
  avec
  une petite marge négative pour compenser l'espacement des deux
- On peut aussi utiliser `float`
- Avec un seul élément :
  - on peut utiliser un background linéaire qui commence et fini à `50%`
  - on peut utiliser `before`, `after` ou les deux en s'inspirant de ce qui a été fait avant

Bravo à ceux qui ont tout trouvé !

# Exercice 6

Pour aligner le petit cube on peut le faire différemments :

- Via le parents avec un `flex` qui centre tous ses enfants
- Avec un `flex` sur le parent et des marges `auto` sur l'enfant
- Avec une `grid` on doit définir 3 colonnes et 3 lignes. La première et la dernière prenne une fraction de ce qui
  reste,
  et celle du centre prend une largeur `auto`.
- Avec la position `absolute` on peut utiliser l'astuce du positionnement à `50%` avec un `transform` à `-50%`. Vu que
  l'un
  considère la taille du parent et l'autre la taille de l'enfant, cela a pour effet de centrer parfaitement l'élément.

# Exercice 7

Ici je défini un utilitaire pour l'`interpolate-size`, et ensuite je l'applique à un de mes composants. C'était pas
forcément obligatoire d'en faire un utilitaire ici, mais ca semble logique. Ensuite je défini que le texte peut
effectuer une transition, je défini que par défaut il n'a pas de hauteur et qu'il ne s'affiche pas si il dépasse.

Une fois survolé, je rétablie la hauteur automatique et `interpolate-size` permet à l'élément d'animer de `0` à `auto`

# Exercice 8

Alors ici c'est un peu de manipulation 3D. D'abord on définit un `wrapper` qui contiendra toutes les faces de notre
élément. Ensuite on tourne la face arrière à 180 degrés. Si on fait ça, on a bien le dos dans le bon sens, mais on le
voit de devant ! Pour corriger ca, j'applique `backface-hidden` pour qu'on ne voit l'élément que quand il est de face.
Ensuite je définit sur le `wrapper` qu'il doit préserver la 3D quand il applique une tranformation. Quand je survole la
card, j'applique une rotation de 180 degrés, avec une durée réglée à `700ms` et précisant qu'une évolution du transform
doit être animée via `transition-transform`.

# Exercice 9

Ici je vais présenter la solution finale, avec tous les bonus. Je commence par définir toutes les propriétés que je vais
utiliser. Ca me permet d'abord d'avoir un plan en tête, mais également de définir des valeurs par défaut, ce qui
m'évitera de définir les valeurs de _fallback_ plus tard.

Toutes mes variables sont préfixés par `border-gradient` pour les différencier des variables `background-gradient` de
tailwind.

Je définit la direction du gradient, ensuite je défini les 3 couleurs configurables : départ, arrivé, médiane.
Pour ces trois couleurs je défini aussi la position qu'elles doivent prendre en pourcentage.

Ensuite je défini les variables qui `vont définir le gradient à proprement parlé, c'est à dire l'enchainement des
couleurs.
Je vais définir d'abord le gradient lorsque j'ai deux couleurs, et ensuite celui quand j'ai 3 couleurs.

On va d'abord voir les utilitaires sans la 3e couleurs.

Au début on a l'utilitaire que je vous ai fourni, il permet de définir sur le `:before` de l'élément un bloc qui se
superpose et qui n'a de rendu qui correspond qu'à la bordure qu'aurait le bloc.

Pour expliquer comment ca fonctionne rapidement :

- On définit deux `mask`
    - L'un qui prend tout le bloc jusqu'au bordures
    - L'un qui prend tout le bloc jusqu'au contenu
    - Les deux sont définit avec un `linear-gradient` noir. Dans un masque, si c'est noir alors ca existe, si c'est
      blanc
      ca n'existe pas. Ici nos deux masques sont donc des rectanges pleins.
- On définit que la composition des masques doit utiliser une soustractions, c'est à dire que si j'ai un masque
  superposé à un autre, alors l'intersection des deux est retirée.
- Donc si on reprend nos rectangles et qu'on soustrait ce qui se superprose, et bien on ne garde que la bordure.

J'ai défini l'utilitaire comme `border-image` car il permettrait d'appliquer à la bordure n'importe quel background qui
se comporte comme une image.

La partie variable de l'utilitaire sert à définir la largeur de la bordure en pixel. Je récupère la valeur (un entier)
avec `--value` et je la transforme en pixel avec un calcul CSS.

Le premier utilitaire à créer, c'est celui qui va appliquer le `linear-background` au psuedo élément `:before`. Cet
utilitaire va
définir la variables qu'on a définit plus haut en listant les couleurs avec leur position. Il définit également le
`background` en indiquant qu'il doit aller jusqu'aux bordures.

Ici le `background` il prend d'abord le `background` à 3 couleurs, et si il n'est pas défini il utilise celui à 2. Cela
veut
dire qu'il se comporte comme on voulait en fonction de si une 3e couleur a été définie ou non.
Ici la variable pour le background à 2 couleurs est superflux, on aurait pu mettre la valeur directement en valeur par
défaut, mais ca permet d'ajouter de la lisibilité à ce qu'on fait

Ensuite je crée l'utilitaire pour la oculeur de base, qui sera quasi identique à celui pour la couleur d'arrivé.

Je cible deux valeurs différentes :

- Si j'ai un pourcentage, ca veut dire que je suis en train d'indiquer la position et je met à jour la variable dédiée
- Sinon j'accepte toute valeur qui correspondrait à une variable `--color` du thème. Ca va permettre à l'utilitaire d'
  accepter n'importe quelle couleur configurée
- Enfin, et si le navigateur le supporte, je récupère le modifier de l'utilitaire, c'est à dire la partie après le `/`
  pour transformer la couleur. Ici j'utilise color-mix pour décomposer la valeur initiale et lui appliquer la
  transparence. La fonction `--modifier` accepte un integer et non un pourcentage parce qu'on veut écrire `color/50` et
  non pas `color/50%`, comme ce que fait tailwind. Puisque j'ai un entier, je dois utiliser `calc` pour le retransformer
  en pourcentage.

Maintenant je peux définir les utilitaires pour la 3e couleurs. Ils sont quasi identique aux autres, mais il rajoute la
définition de `--border-gradient-via-stops`. Ca veut dire que dès lors que j'utilise la oculeur médiane, le gradient à 3
couleurs devient définit, et l'utilitaire initiale peut donc l'utiliser.

Enfin, je définit les différentes orientations du `background`. Ici je suis obligé de cibler le `:before` car j'ai
définit
que la variable n'avait pas d'héritage, sinon j'aurais pu l'appliquer directement à l'élément. 
