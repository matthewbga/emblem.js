'use strict';

var utils = require('../support/utils');
var integration_assertions = require('../support/integration-assertions');

/*global QUnit*/

QUnit.module("syntax helpers: bang syntax");

test("simple bang helper defaults to `unbound` invocation", function () {
  var emblem;
  emblem = utils.w("foo!");
  integration_assertions.compilesTo(emblem, "{{unbound foo}}");
});

test("bang helper defaults to `unbound` invocation", function () {
  var emblem;
  emblem = utils.w("foo! Yar", "= foo!");
  integration_assertions.compilesTo(emblem, "{{unbound foo Yar}}{{unbound foo}}");
});

test("bang helper works with blocks", function () {
  var emblem;
  emblem = utils.w("hey! you suck", "  = foo!");
  integration_assertions.compilesTo(emblem, "{{#unbound hey you suck}}{{unbound foo}}{{/unbound}}");
});

QUnit.module("syntax helpers: question mark");

test("? helper defaults to `if` invocation", function () {
  var emblem;
  emblem = "foo?\n  p Yeah";
  return integration_assertions.compilesTo(emblem, "{{#if foo}}<p>Yeah</p>{{/if}}");
});

test("else works", function () {
  var emblem;
  emblem = "foo?\n  p Yeah\nelse\n  p No";
  return integration_assertions.compilesTo(emblem, "{{#if foo}}<p>Yeah</p>{{else}}<p>No</p>{{/if}}");
});

test("compound with text", function () {
  var emblem;
  emblem = utils.w("p = foo? ", "  | Hooray", "else", "  | No", "p = bar? ", "  | Hooray", "else", "  | No");
  return integration_assertions.compilesTo(emblem, "<p>{{#if foo}}Hooray{{else}}No{{/if}}</p>" + "<p>{{#if bar}}Hooray{{else}}No{{/if}}</p>");
});

test("compound with variables", function () {
  var emblem;
  emblem = utils.w("p = foo? ", "  bar", "else", "  baz");
  return integration_assertions.compilesTo(emblem, "<p>{{#if foo}}{{bar}}{{else}}{{baz}}{{/if}}</p>");
});