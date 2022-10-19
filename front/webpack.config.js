const path = require('path'); // Задает константу путей
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // плагин для очистки итоговой папки
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Плагин для загрузки html в проект
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подгрузка стилей в проект
const CopyPlugin = require("copy-webpack-plugin"); // копирование остальных файлов проекта

// Задает переменные режимов билда
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
// Имя файла в зависимости от режима билда, обычные названия или с хешем
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname,'src'),     // Задаем папку с файлами проекта
    mode: 'development',                        // Режим сборки
    entry: path.resolve(__dirname,'src/index.js'),  // Входной файл для сборки проекта (https://webpack.js.org/concepts/entry-points/)
    output: {                                   // Папка выгрузки проекта (https://webpack.js.org/configuration/output/)
        filename: `./js/${filename('js')}`,     // Подключаем основной js файл
        path: path.resolve(__dirname, '../server/static'),   // Создаем директорию и помещаем туда проект
        assetModuleFilename: isProd === true ? 'assets/[hash][ext][query]' : 'assets/[name][ext]', // Интегрирования изображений
        clean: true // очистка лишнего
    },
    devServer: {                                // Сервер для активовной разработки
        static: {
            directory: path.join(__dirname, 'src'), // дериктория с файлами для сервера
        },
        hot: true, // live-reload
        port: 3000, // для точного порта
    },
    plugins: [
        new CleanWebpackPlugin(), 
        new HtmlWebpackPlugin({ 
            favicon: './assets/icons/header/logotype.png', // иконка проекта
            template: './index.html', // указание основного html документа
            filename: 'index.html', // Назване основного html файла
            minify: { // Минифицирование html
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({filename: `./styles/${filename('css')}`}), // Формат имени файла css file
        // new CopyPlugin([{from: './assets', to: './assets'}])
          
    ],
    devtool: isProd ? false : 'source-map', // карта при нажатии на f12
    module: {
        rules: [
            {test: /\.(html)$/, use: ['html-loader'] }, // правила для html
            {test: /\.css$/i,use: [MiniCssExtractPlugin.loader, 'css-loader']}, // правила для css
            {test: /\.s[ac]ss$/i,use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']}, // правила для scss
            {test: /\.(png|jpe?g|gif|svg|webp|ico)$/i, type: 'asset/inline'}, // правила для изображений
            {test: /\.(woff2?|eot|ttf|otf)$/i, type: 'asset/resource',}, // правила для шрифтов
            {test: /.js|jsx$/,exclude: /node_modules/,use:{loader: 'babel-loader',options: {presets: ["@babel/preset-env","@babel/preset-react"]}}}
        ]
    },
    performance: {
        maxEntrypointSize: 2000000,
        maxAssetSize: 2000000
    },
}