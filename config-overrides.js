const { override, overrideDevServer } = require("customize-cra");
// compression-webpack-plugin 压缩js为gzip
const CompressionWebpackPlugin = require("compression-webpack-plugin");
//打包配置
const addCutomize = () => (config) => {
  const oneOf_loc = config.module.rules.findIndex((n) => n.oneOf);
  config.module.rules[oneOf_loc].oneOf = [
    {
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    },

    ...config.module.rules[oneOf_loc].oneOf,
  ];
  if (process.env.NODE_ENV === "production") {
    //关闭sourceMap
    config.devtool = false;
    //添加js打包gzip配置
    config.plugins.push(
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        threadId: 1024,
      })
    );
  }
  return config;
};
//跨域配置
const addProxy = () => (config) => {
  config.proxy = {
    "/api": {
      //待配置
      target: "xxx",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    },
  };
  return config;
};
module.exports = {
  webpack: override(addCutomize()),
  devServer: overrideDevServer(addProxy()),
};
