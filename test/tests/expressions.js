define(function(require, exports, module) {
  "use strict";

  var combyne = require("lib/index");

  describe("Expressions", function() {
    describe("Conditionals", function() {
      it("can evaluate basic truthy", function() {
        var tmpl = combyne("{%if test%}hello world{%endif%}");
        var output = tmpl.render({ test: true })

        expect(output).to.equal("hello world");
      });

      it("can evaluate basic falsy", function() {
        var tmpl = combyne("{%if test%}hello world{%endif%}");
        var output = tmpl.render({ test: false });

        expect(output).to.equal("");
      });

      it("can evaluate missing properties", function() {
        var tmpl = combyne("{%if test%}hello world{%endif%}");
        var output = tmpl.render({});

        expect(output).to.equal("");
      });

      it("can evaluate nested truthy conditionals", function() {
        var tmpl = combyne("{%if test%}{%if hi%}hello{%endif%}{%endif%}");
        var output = tmpl.render({ test: true, hi: true });

        expect(output).to.equal("hello");
      });

      it("can evaluate nested conditionals with falsy root value", function() {
        var tmpl = combyne("{%if test%}{%if hi%}hello{%endif%}{%endif%}");
        var output = tmpl.render({ test: false, hi: true });

        expect(output).to.equal("");
      });

      it("can evaluate nested if statement with falsy values", function() {
        var tmpl = combyne("{%if test%}{%if hi%}hello{%endif%}{%endif%}");
        var output = tmpl.render({ test: false, hi: false });

        expect(output).to.equal("");
      });

      it("can evaluate truthy dot notation", function() {
        var tmpl = combyne("{%if test.prop%}hello{%endif%}");
        var output = tmpl.render({ test: { prop: true } });

        expect(output).to.equal("hello");
      });

      it("can evaluate falsy dot notation", function() {
        var tmpl = combyne("{%if test.prop%}hello{%endif%}");
        var output = tmpl.render({ test: { prop: false } });

        expect(output).to.equal("");
      });

      it("can evaluate truthy deep dot notation", function() {
        var tmpl = combyne("{%if test.prop.hi%}hello{%endif%}");
        var output = tmpl.render({ test: { prop: { hi: true } } });

        expect(output).to.equal("hello");
      });

      it("can evaluate falsy deep dot notation", function() {
        var tmpl = combyne("{%if test.prop.hi%}hello{%endif%}");
        var output = tmpl.render({ test: { prop: { hi: false } } });

        expect(output).to.equal("");
      });

      it("can evaluate not conditional with falsy value", function() {
        var tmpl = combyne("{%if not test%}hello{%endif%}");
        var output = tmpl.render({ test: false });

        expect(output).to.equal("hello");
      });

      it("can evaluate not conditional with truthy value", function() {
        var tmpl = combyne("{%if not test%}hello{%endif%}");
        var output = tmpl.render({ test: true });

        expect(output).to.equal("");
      });

      it("can evaluate conditional truthy string values", function() {
        var tmpl = combyne("{%if 'test' == 'test'%}hello{%endif%}");
        var output = tmpl.render();

        expect(output).to.equal("hello");
      });

      it("can evaluate conditional falsy string values", function() {
        var tmpl = combyne("{%if 'test' != 'test'%}hello{%endif%}");
        var output = tmpl.render();

        expect(output).to.equal("");
      });

      it("can evaluate numerical greater than", function() {
        var tmpl = combyne("{%if 5 > 4%}hello{%endif%}");
        var output = tmpl.render();

        expect(output).to.equal("hello");
      });

      it("can evaluate numerical greater than or equal", function() {
        var tmpl = combyne("{%if 5 >= 4%}hello{%endif%}");
        var output = tmpl.render();

        expect(output).to.equal("hello");
      });

      it("can evaluate numerical less than", function() {
        var tmpl = combyne("{%if 4 < 5%}hello{%endif%}");
        var output = tmpl.render();

        expect(output).to.equal("hello");
      });

      it("can evaluate numerical less than or equal", function() {
        var tmpl = combyne("{%if 4 <= 5%}hello{%endif%}");
        var output = tmpl.render();

        expect(output).to.equal("hello");
      });
    });

    describe("Loops", function() {

    });
  });
});

/*
exports.elseIfStatements = function( test ) {
  test.expect(1);

  // Truthy else-if
  var tmpl = combyne('{%if test == "hello"%}hello{%elsif test == "goodbye"%}world{%else%}lol{{%endif%}', { test: "goodbye" });
  test.equals( tmpl.render(), 'world', 'Truthy else-if' );

  test.done();
};

exports.nestedIfStatements = function( test ) {
  test.expect(3);

  // Nested not if, falsly value
  var tmpl = combyne('{%if not test%}hello{%if test%}goodbye{%endif%}{%endif%}', { test: false });
  test.equals( tmpl.render(), 'hello', 'Testing nested not conditional with falsy value' );

  // Nested not if, truthy value
  var tmpl2 = combyne('{%if not test%}hello{%if test%}goodbye{%endif%}{%endif%}', { test: true });
  test.equals( tmpl2.render(), '', 'Testing nested not conditional with truthy value' );

  // Testing two truthy nested values
  var tmpl3 = combyne('{%if test%}hello{%if hi%}goodbye{%endif%}{%endif%}', { test: true, hi: true });
  test.equals( tmpl3.render(), 'hellogoodbye', 'Testing truthy nested conditionals' );

  test.done();
};

exports.elseStatements = function( test ) {
  test.expect(5);

  // Else statement
  var tmpl = combyne('{%if test%}hello world{%else%}goodbye world{%endif%}', { test: false });
  test.equals( tmpl.render(), 'goodbye world', 'Testing else statements' );

  // Nested else statement with truthy values
  var tmpl2 = combyne('{%if test%}{%if hello%}hello world{%else%}goodbye world{%endif%}{%endif%}', { test: true, hello: true });
  test.equals( tmpl2.render(), 'hello world', 'Testing nested else statements with truthy values' );

  // Nested else statement with false root value
  var tmpl3 = combyne('{%if test%}{%if hello%}hello world{%else%}goodbye world{%endif%}{%endif%}', { test: false, hello: true });
  test.equals( tmpl3.render(), '', 'Testing nested else statements with false root value' );

  // Nested else statement with false nested value
  var tmpl4 = combyne('{%if test%}{%if hello%}hello world{%else%}goodbye world{%endif%}{%endif%}', { test: true, hello: false });
  test.equals( tmpl4.render(), 'goodbye world', 'Testing nested else statements with false nested value' );

  // Nested if with an else
  var tmpl5 = combyne('{%if test%}{%if hello%}hello world{%endif%} {%else%}goodbye world{%endif%}', { test: true, hello: true });
  test.equals( tmpl5.render(), 'hello world ', 'Testing nested else statements with truthy nested value' );

  test.done();
};

exports.eachLoopArray = function( test ) {
  test.expect(6);

  // Basic each loop over array
  var tmpl = combyne('{%each test%}hello{%endeach%}', { test: new Array(5) });
  test.equals( tmpl.render(), 'hellohellohellohellohello', 'Display hello 5 times' );

  // Moderately complicated each loop with filter
  var tmpl2 = combyne('{%each lol%}{{i|toString}} {{.}}{%endeach%}', { lol: ["1", "true", 31, function() { return "fart"; }, 5] });
  tmpl2.filters.add('toString', function(val) {
    return "Index at: " + val.toString() + ", ";
  });
  test.equals( tmpl2.render(), 'Index at: 1,  1Index at: 2,  trueIndex at: 3,  31Index at: 4,  fartIndex at: 5,  5', 'Display various values and indices' );

  // Ensure content can exist before each (was a bug before where mode wasn't reset properly)
  var tmpl3 = combyne('test {%each lol%}{{.}}{%endeach%}', { lol: [5] });
  test.equals( tmpl3.render(), 'test 5', 'Ensure content can exist before each loop' );

  //// More complicated, test loop within a loop
  var tmpl4 = combyne('{%each lol%}{%each lol2%}{{.}}{%endeach%}{%endeach%}', { lol: [1,2,3], lol2: [3,2,1] });
  test.equals( tmpl4.render(), '321321321', 'Nested each loops' );

  // Each loop an array full of objects
  var tmpl5 = combyne('{%each lol%}{{key}}{%endeach%}', { lol: [{key:"value"}] });
  test.equals( tmpl5.render(), 'value', 'Ensure arrays full of objects will work' );

  // Change delimiter
  var tmpl6 = combyne('{%each lol as _%}{{_}}{%endeach%}', { lol: [1,2,3] });
  test.equals( tmpl6.render(), '123', 'Change the delimiter' );

  test.done();
};

exports.eachLoopObject = function( test ) {
  test.expect(6);

  // Each loop over object
  var tmpl = combyne('{%each demo as key val%}{{key}}:{{val}} {%endeach%}', { demo: { lol: 'hi', you: 'me?', what: 'test' } });
  test.equals( tmpl.render(), 'lol:hi you:me? what:test ', 'Loop over the keys and values in an object' );

  // Each loop over object, just keys
  var tmpl2 = combyne('{%each demo as key%}{{key}}{%endeach%}', { demo: { lol: 'hi', you: 'me?', what: 'test' } });
  test.equals( tmpl2.render(), 'lolyouwhat', 'Loop over the keys in an object' );

  // Each loop over object do nothing, should not do anything
  var tmpl3 = combyne('{%each demo%}key{%endeach%}', { demo: { lol: 'hi', you: 'me?', what: 'test' } });
  test.equals( tmpl3.render(), 'keykeykey', 'Loop over an object' );

  // Each loop over object repeat property, 
  var tmpl4 = combyne('{%each demo%}{{demo.lol}}{%endeach%}', { demo: { lol: 'hi', you: 'me?', what: 'test' } });
  test.equals( tmpl4.render(), 'hihihi', 'Loop over an object' );

  // Each loop over object repeat property function
  var tmpl5 = combyne('{%each demo%}{{demo.lol}}{%endeach%}', { demo: { lol: function() {
    return 'hi'; 
  }, you: 'me?', what: 'test' } });
  test.equals( tmpl5.render(), 'hihihi', 'Loop over an object property function' );

  // Each loop over object repeat property function with filter
  var tmpl6 = combyne('{%each demo%}{{demo.lol|reverse}}{%endeach%}', { demo: { lol: function() {
    return 'hi'; 
  }, you: 'me?', what: 'test' } });
  tmpl6.filters.add('reverse', function( val ) {
    return Array.prototype.slice.call(val).reverse().join('');
  });
  test.equals( tmpl6.render(), 'ihihih', 'Loop over an object property function and apply reverse filter' );

  test.done();
};

exports.eachLoopConditional = function( test ) {
  test.expect(3);

  // Conditional in each loop using no context
  var tmpl = combyne('{%each demo%}{%if "lol" == "lol"%}test{%endif%}{%endeach%}', { demo: [ 1, 2, 3 ] });
  test.equals( tmpl.render(), 'testtesttest', 'Conditional in each loop using no context' );

  // Conditional in each loop using original context
  var tmpl2 = combyne('{%each demo%}{%if test == "lol"%}{{val}}{%endif%}{%endeach%}', { test: 'lol', val: 'hi', demo: [ 1, 2, 3 ] });
  test.equals( tmpl2.render(), 'hihihi', 'Conditional in each loop using original context' );

  // Conditional in each loop using loop context
  var tmpl3 = combyne('{%each demo as key val%}{%if key == "lol"%}{{val}}{%endif%}{%endeach%}', { demo: { lol: 'hi', you: 'me?', what: 'test' } });
  test.equals( tmpl3.render(), 'hi', 'Conditional in each loop using loop context' );

  test.done();
};

exports.nestedEachLoopConditional = function( test ) {
  test.expect(2);

  // Conditional in each loop using no context
  var tmpl = combyne('{%each demo%}{%each demo2%}{%if "lol" == "lol"%}test{%endif%}{%endeach%}{%endeach%}', { demo: [ 1, 2, 3 ], demo2: [1] });
  test.equals( tmpl.render(), 'testtesttest', 'Conditional in each loop using no context' );

  // Conditional in each loop using original context
  var tmpl2 = combyne('{%each demo%}{%each demo2%}{%if test == "lol"%}{{val}}{%endif%}{%endeach%}{%endeach%}', { test: 'lol', val: 'hi', demo: [ 1, 2, 3 ], demo2: [1] });
  test.equals( tmpl2.render(), 'hihihi', 'Conditional in each loop using original context' );

  test.done();
};

exports.nestedIfElseInsideEachLoopConditional = function( test ) {
  test.expect(1);

  // Conditional in each loop using no context
  var tmpl = combyne('{%each demo as i%}{%if i == 1"%}test{%else%}{{i}}{%endif%}{%endeach%}', { demo: [ 1, 2, 3 ], demo2: [1] });
  test.equals( tmpl.render(), 'test23', 'Conditional if/else in each loop' );

  test.done();
};
*/
