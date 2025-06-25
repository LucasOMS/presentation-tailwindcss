export const noteViewerTemplate = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue des Notes</title>
    <link href="tailwind.css" rel="stylesheet" />
    
    <style>
        /* Resets && full screen behavior */
        html {
            min-height: 100vh;
            min-width: 100vw;
        }
        
        body {
            font-family: Arial, sans-serif;
        }
        
        
        /* Custom styles */
        .container {
            min-height: calc(100vh - 2 * 16px);
        }
        
        .iframe-wrapper {
            width: 100%;
            height: 100%; /* ou 100% si parent flexible */
            overflow: clip;
            position: relative;
            
            iframe {
                transform-origin: top left;
                border: none;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
        #js-note-content {
            code {
                background: lightgrey;
                font-family: "Courier New", monospace;
                padding: .25em;       
                border-radius: 4px;
                font-size: 12px;
            }
        }
    </style>
</head>
<body class="relative min-w-screen min-h-screen p-0 m-0" id="note-viewer">
    <div id="js-slide-number" class="absolute top-0 right-0 bg-red-400 text-white rounded-bl-lg pl-1 pb-0.5 pr-0.5 z-10"></div>
    <div class="h-screen w-screen grid grid-cols-2 bg-black gap-1">
        <div class="bg-white p-2 flex flex-col gap-2 max-h-screen overflow-auto">
            <div class="flex-1 relative border-solid border-1 border-gray-400 rounded-lg p-1">
                <h1 class="absolute top-[-0.5lh] text-xs bg-white text-gray-400 px-[2px] -ml-[2px]">Notes</h1>
                <span id="js-tailwind-version" class="absolute top-[-12px] right-[10px] text-xs bg-cyan-950 text-white px-1 py-0.5 rounded-full"></span>
                <div id="js-note-content" class="m-0 text-sm whitespace-pre-line">Aucune note à afficher pour l'instant.</div>
            </div>
        
            <button class="self-end bg-red-500 text-white border-none py-1 px-1.5 rounded-md cursor-pointer" onclick="window.close()">Fermer la fenêtre</button>
        </div>
        
        <!-- Because tailwind style is based on vw/vh we MUST use an iframe to simulate screen size -->
        <div class="iframe-wrapper">
            <iframe id="js-preview" class="overflow-clip"></iframe>
        </div>
        <!--<div id="preview-next"></div>-->
    </div>
</body>
</html>
`;
