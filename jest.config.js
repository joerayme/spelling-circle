module.exports = {
  preset: "jest-preset-preact",
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  setupFilesAfterEnv: ["./tests/setupTests.ts"],
};
