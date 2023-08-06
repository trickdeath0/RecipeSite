module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    // host: "132.72.65.211"
    // host: "oran-shay.cs.bgu.ac.il"
    host: "localhost"
    // host: "127.0.0.1"
    // port: 80
  }

  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
