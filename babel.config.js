module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Este plugin deve ser o último da lista.
      "react-native-reanimated/plugin",
    ],
  };
};