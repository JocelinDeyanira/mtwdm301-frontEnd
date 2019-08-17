const webpack = require('webpack')

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            $ENV: {
                SERVER_IP: JSON.stringify(process.env.SERVER_IP),
                apiKey: JSON.stringify(process.env.SETTINGS_FIREBASE_APIKEY),
                authDomain: JSON.stringify(process.env.SETTINGS_FIREBASE_AUTHDOMAIN),
                databaseURL: JSON.stringify(process.env.SETTINGS_FIREBASE_DATABASEURL),
                projectId: JSON.stringify(process.env.SETTINGS_FIREBASE_PROJECTID),
                storageBucket: JSON.stringify(process.env.SETTINGS_FIREBASE_STORAGEBUCKET),
                messagingSenderId: JSON.stringify(process.env.SETTINGS_FIREBASE_MESSAGINGSENDERID),
                appId: JSON.stringify(process.env.SETTINGS_FIREBASE_APPID)
            }
        })
    ]
}