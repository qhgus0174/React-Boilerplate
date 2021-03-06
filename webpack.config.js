const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 개발환경 mode : "development|production" 개발 환경과 배포 환경을 정할 수 있음
  mode: "development",

  // entry: 모듈의 의존성이 시작되는 부분. 빌드 작업을 시작할 부분을 명시한다.
  entry: "./src/index.js",

  //entry에서부터 시작하여 번들링된 파일을 어디에 저장할지(path), 어떤 파일이름으로 저장할지(filename) 명시
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },

  //module : 어떤 모듈을 사용할지 명시한다.  test 는 어떤 파일에 적용될지 그 확장자를 명시한 것이다. 로더가 1개라면 loader 로, 2개 이상이라면 use 배열로 설정할 수 있다. exclude 로 로더를 제외할 대상을 적용할 수도 있다.
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.jfif$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
      // html관련 plugin
      //minimize: true를 통해 html 코드를 최적화
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },

  //plugins : 확장 기능을 넣을 수 있다.
  //  html-webpack-plugin : 번들이 완료된 파일을 <script/>를 이용해 로드한 html파일을 자동으로 생성해주는 플러그인
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  // webpack-dev-server의 개발 서버 설정
  devServer: {
    host: "localhost",
    port: 9000,
    open: true, //개발 서버 실행 시 브라우저 오픈
  },
};
