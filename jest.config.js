/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: [`node_modules/(?!nanoid/)`],
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  setupFiles: ["./jest.setup.js"],
};

// module.exports = {
//   testEnvironmentOptions: {
//     customExportConditions: [''],
//   },
// }
