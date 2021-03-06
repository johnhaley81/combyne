define(function(require, exports, module) {
  "use strict";

  var combyne = require("../../lib/index");

  describe("Token parsing", function() {
    it("parses properties containing reserved words", function() {
      var template = combyne("{{ hasStuff }}");
      var output = template.render({ hasStuff: "hello" });

      assert.equal(output, "hello");
    });

    it("parses properties starting with reserved words", function() {
      var template = combyne("{{ assignment }}");
      var output = template.render({ assignment: "hello" });

      assert.equal(output, "hello");
    });
  });
});
