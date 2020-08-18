const presetEnv = require.resolve("@babel/preset-env");
const presetReact = require.resolve("@babel/preset-react");
const classPropPlugin = require.resolve("@babel/plugin-proposal-class-properties");
const tsPreset = require.resolve("@babel/preset-typescript");
const propDecorators = require.resolve("@babel/plugin-proposal-decorators");
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = settings => ({
    target: 'web',
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        filename: '[name].bundle.js',
        path: '/',
        publicPath: `/api/webapp/${settings.appId}/preview`
    },
    resolve: {
        symlinks: false,
        extensions: [".ts", ".tsx", ".js", ".d.ts"]
    },
    module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx|d.ts)$/,
				exclude: /node_modules/,
				use: [{
					loader: "babel-loader",
					options: {
						presets: [presetEnv, tsPreset, presetReact],
						plugins: [[propDecorators, {legacy: true}], [classPropPlugin, {loose: true}]]
					}
				}]
			},
            {
            	test: /\.css$/,
              	use: ["style-loader", "css-loader"],
            },
			{
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(resourcePath) {
                                return resourcePath;
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BASENAME: JSON.stringify(`/api/webapp/${settings.appId}/preview`)
        }),
        new htmlWebpackPlugin({
            templateContent: settings.htmlTemplate
        })
    ]
});
