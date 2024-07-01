module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.js"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx"],
  testMatch: ["<rootDir>/src/tests/**/*.test.{js,jsx}"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
