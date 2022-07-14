'use strict'

module.exports = ctx => {
  return {
    map: {
        inline: false,
        annotation: true,
        sourcesContent: true
    },
    plugins: {
      autoprefixer: {
        cascade: false
      },
	  "postcss-understrap-palette-generator" : {
		colors: [
			"--elixir-primary",
			"--elixir-secondary",
			"--elixir-e1",
			"--elixir-e2",
			"--elixir-e3",
      "--elixir-white",
      "--elixir-lgrey",
      "--elixir-light"
		]
	  }
    }
  }
}
