module.exports = {
    server: {
        baseDir: "src",
        index: "discography.html",
        middleware: [
            function(req, res, next) {
                // If the URL doesn't have an extension and doesn't end with a slash
                if (!req.url.match(/\.[0-9a-z]+$/i) && !req.url.endsWith('/')) {
                    // Internally rewrite to .html
                    req.url = req.url + '.html';
                }
                next();
            }
        ]
    },
    files: ["src/**/*.html", "src/**/*.css"],
    port: 3000,
    notify: false,
    open: false
};
