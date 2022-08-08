module.exports = {
  apps: [
    {
      name: "backend",
      namespace: "pauska",
      script: "./app.js",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
