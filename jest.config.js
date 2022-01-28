const esModules = ['d3', 'd3-array', 'other-d3-module-if-needed', 'internmap', 'delaunator', 'robust-predicates'].join('|');

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})`,
  ],
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^vuetify/lib$": "vuetify",
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|gif)$": "jest-transform-stub",
  },
  modulePaths: [
    "<rootDir>/src",
    "<rootDir>/node_modules"
  ],
  transform: {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.ts?$": "ts-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  setupFiles: ['<rootDir>/tests/unit/index.js'],
}
