module.exports = {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
        [
            "module:react-native-dotenv",
            {
                envName: "APP_ENV",
                moduleName: "react-native-dotenv"
            }
        ],
        ["module-resolver", { alias: { "@": "./src" } }]
    ]
};
