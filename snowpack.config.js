// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/src/',
  },
  plugins: [
    "@snowpack/plugin-babel",
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-react-refresh"
  ],
  packageOptions: {
  },
  devOptions: {
  },
  buildOptions: {
    baseUrl: 'src/',
    out: 'dist/'
  },
};
