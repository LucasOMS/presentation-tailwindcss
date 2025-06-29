window.exercises = [
    {
        description: `<h1>Configurer Tailwind CSS</h1>

<p>Dans cet exercice, je vais vous fournir un code HTML que vous ne devrez pas modifer.<br>Il faudra configurer tailwind de sorte à ce qu'il corresponde à ce qui est attendu.<br>Vous ne devriez avoir à configurer que ce qui est le plus commun sur Tailwind.</p><br><br><i>Note : le titre doit être <code>red</code> et la note doit être <code>gray</code>. Le titre devrait faire <code>20px</code> de même que l'arrondi de la carte. L'ombre de la carte exacte est <code>rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px -1px</code>. Le titre utilise la police par défaut <code>cursive</code></i>`,
        expected: [
            { size: '350x525', file: '1 - 350x525.png' },
            { size: '525x400', file: '1 - 525x400.png' }
        ]
    },
    {
        description: "<h1>Utiliser les utilitaires tailwind</h1><p>L'objectif de cet exercice est de considérer ce qui doit être fait dans les variables de thème et ce qui devrait être considéré comme un utilitaire à part. Vous pouvez répondre à l'exercice en faisant d'abord tout ce qui est personnalisé comme un utilitaire, puis en répondant au maximum par les variables de thème, et ensuite décider ce qui est le plus pertinent.<br><i>Note : les différentes couleurs et valeurs à utiliser pour correspondre à ce qui est attendu est directement en commentaire dans le code</i>\n</p>",
        expected: [{ size: '400x400', file: '2 - 400x400.png' }]
    },
    {
        description: "<h1>Utiliser la grille CSS avec Tailwind</h1><p>Dans cet exercice, vous allez devoir utiliser les utilitaires de grilles pour adapter le résultat à chaque écran. Le but est de vous familiariser avec un exemple visuel, vous aurez l'occasion de le faire sur un cas concret après. <br><i>Note : vous pouvez utiliser <code>--breakpoint-sm</code> pour cibler la 2e taille et <code>--breakpoint-md</code> pour cibler la plus grande taille attendue.</i> </p>",
        expected: [
            { size: '150x150', file: '3 - 150x150.png' },
            { size: '225x225', file: '3 - 225x225.png' },
            { size: '300x300', file: '3 - 300x300.png' }
        ]
    },
    {
        description: `<h1>Mise en pratique concrète</h1>
<p>
    Vous devez réaliser une carte pour une offre d'un SaaS. La première étape consiste à réalisé le design attendue.
    <br>
    Ensuite, vous pouvez ajouter l'effet de hover lorsqu'on survole la carte.
    <br>
    <i>Note : quand la carte est survolée, le bouton ajoute également une ombre portée</i>
    <br>
    Une fois cela fait, vous allez devoir créer le dark mode pour cette carte !
</p>`,
        expected: [
            { size: '400x400', file: '4 - 400x400.png' },
            { size: '400x400', file: '4 - 400x400 - hover.gif', title: 'Survol' },
            { size: '400x400', file: '4 - 400x400 - dark.png', title: 'Mode sombre', darkMode: true }
        ]
    },
    {
        description: `<h1>Défi technique #1</h1><p>Dans cet exercice, vous allez devoir reproduire ce qui est attendu en répondants à plusieurs contrainte. Quand vous    avez fini une partie, commentez votre code et passer à la consigne suivante.</p><h2>En utilisant <code>flex</code></h2><p> Reproduisez l’attendu en utilisant un <code>flexbox</code></p><h2>En utilisant <code>grid</code></h2><p> Reproduisez l’attendu en utilisant une <code>grid</code></p><h2>Avec une structure imposée</h2><h3>Un seul enfant</h3><p>Utilisez la structure suivante :<br><code>&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;</code></p><h3>Deux enfants, SANS <code>flex</code> ni <code>grid</code></h3><p>Utilisez la structure suivante :<br><code>&lt;div&gt;&lt;div&gt;&lt;/div&gt;&lt;div&gt;&lt;/div&gt;&lt;/div&gt;</code>    <b>Dans cette partie, vous ne devez utiliser ni flexbox ni grid.</b> <br><i>Note : j’ai trouvé deux facons        différentes de répondre avec ces contraintes</i><h3>Utiliser un seul élémént</h3><p>Reproduisez ce qui est attendu en utilisant seulement une div<br>    <i>Note : il y a deux facons de répondre à cette contrainte, on peut facilement considérer que les deux sont        immondes        \uD83D\uDE0A</i></p>`,
        expected: [{ size: '150x150', file: '5 - 150x150.png' }]
    },
    {
        description: `<h1>Défi technique #2</h1>
<p>Centrez l'élément rouge horizontalement et verticalement.</p>
<h2>Via le parent</h2>
<p>
    N'ajoutez des classes que sur l'élément
    <code>.root</code>
</p>
<h2>Sans les alignements de flex</h2>
<p>N'utilisez pas les propriétés <code>justify-content</code> et <code>align-items</code> de flexbox.</p>
<h2>Avec grid</h2>
<p>Utilisez une grille sur l'élément root</p>
<h2>Avec position absolute</h2>
<p>
    Placez l'élément via un position
    <code>absolute</code>
</p>`,
        expected: [
            { size: '150x150', file: '6 - 150x150.png' },
            { size: '200x200', file: '6 - 200x200.png' }
        ]
    },
    {
        description: `<h1>Défi technique #3</h1>
<p>Dans cet exercice, vous allez devoir créer un composant spoiler-box. Vous ne devez pas modifier la structure fournie. Utilisez au maximum les <code>@apply</code> de tailwind.
<br>
Créez l'utilitaire <code>interpolate-size-keywords</code> qui définit la propriété <code>interpolate-size: allow-keywords</code>, cela permet d'animer la taille d'un bloc jusqu'à une taille "automatique".
<br>
<i>Note : cette fonctionnalité a un support aux alentours des 70%, je vous la présente ici pour travailler avec des nouvelles fonctionnalités et voir comment tailwind peut être adapté lorsqu'il manque de support. Vous ne devriez pas utiliser cela en prod pour le moment. Ce n'est pour l'instant supporté que sur les navigateurs basés sur Chromium. Si vous utilisez un autre navigateur, il faudra faire autrement !</i>
</p>`,
        expected: [{ size: '400x500', file: '7 - 400x500.gif' }]
    },
    {
        description: `<h1>Défi technique #4</h1>
<p>Dans cet exercice, vous allez devoir faire en sorte que la carte se retourne lorsqu'on la survole.
<br>
<i>Note : j'ai laissé la structure essentielle à la solution</i>
</p>
<spoiler-box title="Faire en sorte que 'au revoir' soit au dos">
<p>Pour créer le "dos" de la carte, vous allez devoir tourner la face arrière de <code>180deg</code></p>
</spoiler-box>
<spoiler-box title="Faire en sorte que 'au revoir' ne soit pas visible">
<p>Pour masquer le dos de la carte quand elle n'est pas censée être visible, vous pouvez utiliser la propriété <code>backface-visibility</code></p>
</spoiler-box>
<spoiler-box title="Tourner la carte">
<p>Pour tourner la carte, vous allez devoir définir une <code>perspective</code>, indiquer qu'il est nécessaire que le transform conserve la 3d (<code>transform-style: preserve-3d</code>) et faire tourner l'ensemble de la carte en <code>:hover</code></p>
</spoiler-box>
`,
        expected: [{ size: '300x200', file: '8 - 300x200.gif' }]
    },
    {
        description: `<h1>Défi technique #5</h1>
<p>Dans cet exercice, vous allez devoir reproduire ce qui est fait pour les <code>background gradient</code> mais cette fois pour les bordures.
<br>
Pour cela, je vous fourni le CSS de base permettant d'appliquer un background qui agira comme une bordure. L'utilitaire se nomme <code>border-image-*</code> car il permet d'accepter n'importe quel background qui se comporte comme une image.
L'utilitaire est suffixé par un integer qui correspond à la largeur de la bordure.
<br>
Je vous ai indiqué tous les utilitaires que vous allez devoir implémenter pour avoir des utilitaires aussi flexibles que ceux pour les <code>background</code>.
<br>
<i>Conseil : regardez comment Tailwind implémente ses utilitaires de <code>background</code></i>
<br>
</p>
<h2>Bonus 1 : Faire en sorte de pouvoir régler l'opacité sur les utilitaires de couleurs</h2>
<p>Vous devez pouvoir utiliser l'utilitaire <code>border-via-pink-500/10</code> qui devra appliqué 10% d'opacité à la couleur <code>--color-pink-500</code>
<br>
Vous pouvez utiliser <code>--modifier()</code> pour obtenir l'opacité attendue, son utilisation est similaire à <code>--value()</code>.
<br>
<i>Note : vous allez devoir utiliser le modifieur d'opacité vous même sur le rendu, ils n'y sont pas par défaut pour permettre la résolution "simple" avant</i></p>
<h2>Bonus 2 : ajouter les utilitaires de position des couleurs</h2>
<p>Ajouter les utilitaires comme <code>border-via-20%</code> qui indique où les couleurs se positionnent dans le gradient</p>
<h2>Bonus 3 : ajouter les utilitaires de direction du gradient</h2>
<p>Ajouter les utilitaires comme <code>border-gradient-to-tr</code> qui indique la direction du gradient</p>

<h1>Aide à la réalisation sans regarder l'implémentation de tailwind</h1>
<spoiler-box title="Variables CSS">
<p>
    Vous allez devoir utiliser de nombreuses variables CSS pour que les utilitaires puissent partager les valeurs.
    Vous pouvez utiliser <code>@property --nom-variable</code> pour définir la variable CSS et sa valeur par défaut. Cela rendra votre code plus facile à lire et à maintenir.
</p>
</spoiler-box>

<spoiler-box title="Quelles variables CSS utiliser ?">
<p>
    Voici la liste des variables CSS que j'ai utilisé dans ma solution :
</p>
    <pre>@property --border-gradient-direction {
    syntax: '*';
    inherits: false;
    initial-value: to top right in oklab;
}

@property --border-gradient-from-color {
    syntax: '<color>';
    inherits: false;
    initial-value: #fff;
}

@property --border-gradient-via-color {
    syntax: '<color>';
    inherits: false;
    initial-value: #fff;
}

@property --border-gradient-to-color {
    syntax: '<color>';
    inherits: false;
    initial-value: #fff;
}

@property --border-gradient-from-position {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
}

@property --border-gradient-via-position {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 50%;
}

@property --border-gradient-to-position {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 100%;
}

@property --border-gradient-stops {
    syntax: "*";
    inherits: false;
}
    
@property --border-gradient-via-stops {
    syntax: "*";
    inherits: false;
}
</pre>
</spoiler-box>

<spoiler-box title="Comment utiliser les variables CSS ?">
<p>
    En fonction de si vous avez 2 ou 3 couleurs, le gradient ne sera pas définit de la même couleur, vous allez devoir faire en sorte d'utiliser celui qui est valide.
</p>
</spoiler-box>
`,
        expected: [
            { size: '150x150', file: '9 - Sans bonus.png', title: 'Sans bonus' },
            { size: '150x150', file: '9 - Avec opacité.png', title: 'Avec opacité' },
            { size: '150x150', file: '9 - Avec position des couleurs.png', title: 'Avec position des couleurs' },
            { size: '150x150', file: '9 - Avec direction.png', title: 'Avec direction' }
        ]
    }
];
