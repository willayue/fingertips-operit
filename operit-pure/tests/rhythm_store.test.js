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
test("abandoned summary is privacy safe", function() { var d = draft([1000, 8000]); var a = core.abandoned(d, "timeout", 9000); assert.ok(a); assert.strictEqual(a.durationMs, 7000); });
test("display threshold follows configured value", function() { var d = draft([1000, 9000]); assert.strictEqual(core.rhythmText(d, { minNoteSec: 10, pauseGapSec: 30, userName: "TA" }), ""); assert.ok(core.rhythmText(d, { minNoteSec: 5, pauseGapSec: 30, userName: "TA" })); });
test("pause threshold follows configured value", function() { var d = draft([1000, 7000, 18000]); assert.strictEqual(core.pauses(d, 15000), 0); assert.strictEqual(core.pauses(d, 10000), 1); });
test("orphan threshold follows configured value", function() { var before = { draftSession: draft([1000, 8000]), abandonedDrafts: [] }; assert.strictEqual(core.gc(before, 9 * 60000, 10), null); assert.ok(before.draftSession); var after = { draftSession: draft([1000, 8000]), abandonedDrafts: [] }; assert.ok(core.gc(after, 11 * 60000, 10)); assert.strictEqual(after.draftSession, null); });
test("clear then resume before orphan threshold keeps one continuous rhythm", function() { var d = draft([1000, 10 * 60 * 1000]); core.recordPing(d, 10 * 60 * 1000 + 2000); var note = core.rhythmText(d, { minNoteSec: 5, pauseGapSec: 15, userName: "TA" }); assert.ok(note.indexOf("约10分1秒") >= 0); assert.ok(note.indexOf("停下来想了1次") >= 0); });
test("orphan attachment omits the preview-only heading", function() { var text = core.abandonedText({ endedAt: 60000, durationMs: 125000 }, 180000, "TA"); assert.strictEqual(text, "TA 2分钟前输入了约2分5秒，那条没有发出来。"); assert.strictEqual(text.indexOf("欲言又止"), -1); });
test("active draft submitted before orphan threshold is current rhythm", function() { var chat = { draftSession: draft([1000, 8000]), abandonedDrafts: [] }; var note = core.buildNote(chat, 9 * 60000, { minNoteSec: 5, pauseGapSec: 15, orphanMinutes: 10, userName: "TA", injectRhythm: true }); assert.ok(note.indexOf("这条消息") >= 0); assert.strictEqual(note.indexOf("没有发出来"), -1); });
console.log("Fingertips rhythm tests passed: " + passed);