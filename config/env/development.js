module.exports = {
    // ...
    hooks: {
        // Load the hook
        autoreload: {
            enabled: true,
            overrideMigrateSetting: false,
            dirs: [
                "api",
                "assets",
                "config",
                "views",
            ]
        }
    },
    // ...
};
