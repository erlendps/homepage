module.exports = {
  apps: [
    {
      name: "backend",
      namespace: "pauska",
      script: "./app.js",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
