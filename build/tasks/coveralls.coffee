module.exports = ->
  @loadNpmTasks "grunt-karma-coveralls"

  @config "coveralls",
    options:
      coverage_dir: "dist/coverage/"
