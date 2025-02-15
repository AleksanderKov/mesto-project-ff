const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/index.js' // Точка входа для JavaScript
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // Папка для собранных файлов
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'), // Запуск сервера с папкой dist
    open: true, // Автоматическое открытие браузера
    compress: true, // Включение gzip-сжатия
    port: 8080 // Используем порт 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader', // Добавлена транспиляция JavaScript через Babel
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource', // Обработка изображений и шрифтов
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Извлечение CSS в отдельные файлы
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // Указано, чтобы postcss-loader обрабатывал импорты
            }
          },
          'postcss-loader' // Добавлена обработка CSS через PostCSS (вендорные префиксы)
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // Указан шаблон HTML, в который Webpack добавит собранный JS
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // Обычный путь
    }),
    
    new CleanWebpackPlugin(), // Очищает папку dist перед сборкой
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // Указывает имя выходного CSS-файла
    }), // Выносит CSS в отдельные файлы
  ]
};