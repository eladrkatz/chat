const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV;

module.exports = {
    entry: "./src/main.tsx",
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    devtool: mode === 'production' ? false : 'source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.(svg)$/,
                exclude: /fonts/, /* dont want svg fonts from fonts folder to be included */
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            noquotes: true,
                        },
                    },
                ],
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // {
            //     enforce: "pre",
            //     test: /\.js$/,
            //     loader: "source-map-loader"
            // }
        ]
    },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    plugins: [
        new CopyPlugin([
            { from: './public' },
        ])],
    watchOptions: {
        poll: true,
        ignored: /node_modules/
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 5000
      }
};