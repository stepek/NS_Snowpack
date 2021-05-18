// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: "/",
    src: "/dist/",
  },
  plugins: [
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
  ],
  packageOptions: {},
  devOptions: {},
  buildOptions: {
    baseUrl: "src/",
    out: "dist/",
  },
}
