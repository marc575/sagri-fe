module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
      extend: {},
    },
    plugins: [
      require("@tailwindcss/forms"),
      require("daisyui")
    ],
    daisyui: {
      themes: [
        "light", "dark"
      ],
      darkTheme: "dark",
    },
  }