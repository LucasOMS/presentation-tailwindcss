window.getIframeContent = (content) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Playwright - TP Riviera Dev</title>
    <script src="public/tailwind-cdn.js"></script>
</head>
<body>
${content}
</body>
</html>
`
}
