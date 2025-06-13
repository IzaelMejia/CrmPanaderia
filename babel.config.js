module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // otros plugins que puedas tener,
      'react-native-reanimated/plugin',
      
    ],
  };
};
