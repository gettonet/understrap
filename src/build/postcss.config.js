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
      "--elixir-deep-blue",
      "--elixir-blue",
      "--elixir-light-blue",
      "--elixir-dark-blue",
      "--elixir-purple",
      "--elixir-black",
      "--elixir-white",
      "--elixir-lgrey",
      "--elixir-light",
      "--elixir-fluor"
		]
	  }
    }
  }
}