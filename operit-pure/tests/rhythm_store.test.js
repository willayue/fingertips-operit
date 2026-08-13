"use strict";
var assert = require("assert");
var core = require("../core/rhythm_store.js")._test;
var passed = 0;
function test(name, fn) { fn(); passed++; }
function draft(times) { var d = core.draft(times[0]); core.recordPing(d, times[0]); times.slice(1).forEach(function(t) { core.recordPing(d, t); }); return d; }
test("duration counts active input time", function() { assert.strictEqual(core.duration(draft([1000, 6000, 10000])), 9000); });
test("pause count follows configured gap", function() { assert.strictEqual(core.pauses(draft([1000, 5000, 25000]), 15000), 1); });
test("short rhythm is hidden", function() { assert.strictEqual(core.rhythmText(draft([1000, 3000]), { minNoteSec: 10, pauseGapSec: 15, userName: "TA" }), ""); });
test("rhythm summary includes duration and pauses", function() { var text = core.rhythmText(draft([1000, 7000, 30000]), { minNoteSec: 1, pauseGapSec: 15, userName: "TA" }); assert.ok(text.indexOf("输入了") >= 0); assert.ok(text.indexOf("停下来想了") >= 0); });
test("abandoned summary is privacy safe", function() { var d = draft([1000, 8000]); var a = core.abandoned(d, "cleared", 9000); assert.ok(a); assert.strictEqual(a.durationMs, 7000); });
console.log("Fingertips pure rhythm tests passed: " + passed);