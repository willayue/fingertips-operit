/* METADATA
{
  "name": "finger_tips",
  "author": "[原作] eveacla11, [移植适配] willayue",
  "description": "指尖语气 Fingertips：查看输入节奏状态、隐私配置并清理本地记录。不会读取输入框原文、屏幕内容或通知。",
  "tools": [
    {
      "name": "status",
      "description": "查看当前运行状态、实际配置门槛与本地输入节奏记录统计。不会返回输入原文。",
      "parameters": [{"name":"chat_id","description":"可选，目标对话 ID。","type":"string","required":false}]
    },
    {
      "name": "clear",
      "description": "清理指定对话或全部 Fingertips 本地记录。不会读取或返回输入原文。",
      "parameters": [{"name":"chat_id","description":"可选，目标对话 ID；留空清理全部记录。","type":"string","required":false}]
    },
    {
      "name": "capabilities",
      "description": "查看输入节奏工作能力、当前配置与隐私保护范围。不会修改设置或读取输入框原文。",
      "parameters": []
    }
  ]
}
*/
"use strict";
var store = require("../core/rhythm_store.js");
var settings = require("../core/settings.js");
function text(v) { return v === null || v === undefined ? "" : String(v); }
function stateView(chat) {
  var c = chat || {}, d = c.draftSession, segments = d && Array.isArray(d.inputSegments) ? d.inputSegments : [];
  return { schemaVersion: 1, hasDraftSession: !!d, draftStartedAt: d ? Number(d.startedAt || 0) : null, draftUpdatedAt: d ? Number(d.updatedAt || 0) : null, inputSegmentCount: segments.length, activeInputSegment: segments.length ? !!segments[segments.length - 1].active : false, abandonedDraftCount: Array.isArray(c.abandonedDrafts) ? c.abandonedDrafts.length : 0, hasPendingNote: !!c.pendingNote, pendingCreatedAt: c.pendingNote ? Number(c.pendingNote.createdAt || 0) : null, pendingInjectedAt: c.pendingNote ? Number(c.pendingNote.injectedAt || 0) : null };
}
function summary(s) { return (s.enabled ? "Fingertips 注入已启用" : "Fingertips 注入已禁用") + "；" + (s.scope === "global" ? "作用于所有对话" : "仅作用于绑定对话") + "；" + (s.injectRhythm ? "输入节奏已启用，显示门槛" + s.minNoteSec + "秒，停顿门槛" + s.pauseGapSec + "秒" : "输入节奏已禁用") + "；超过" + s.orphanMinutes + "分钟未继续输入或发送时，最多保留最近一条未发送记录。"; }
function instruction() { return "请优先使用 summary 向用户用中文概括结论，不要原样展示 JSON、内部状态文件路径或完整 ID 列表。"; }
async function status(params) { var id = text(params && params.chat_id).trim(), r = await store.peek(id), s = settings.loadSettings(); if (id) return { success: true, schema_version: 1, chat_id: id, state: stateView(r.state), config: Object.assign({}, r.config, { current: s }), summary: summary(s) + "；当前对话状态：" + (stateView(r.state).hasDraftSession ? "正在记录输入" : "没有正在记录的输入"), ai_instruction: instruction(), state_file: store.STATE_FILE, privacy: "不会读取或保存输入框原文、文字长度、光标位置、屏幕内容、截图或通知。" }; return { success: true, schema_version: 1, chat_count: Number(r.chatCount || 0), config: Object.assign({}, r.config, { current: s }), summary: summary(s) + "；当前共记录" + Number(r.chatCount || 0) + "个对话状态。", ai_instruction: instruction(), state_file: store.STATE_FILE, privacy: "不会读取或保存输入框原文、文字长度、光标位置、屏幕内容、截图或通知。" }; }
async function clear(params) { var id = text(params && params.chat_id).trim(), r = await store.clear(id); return { success: !!(r && r.ok), schema_version: 1, cleared_chat_id: r ? r.clearedChatId : null, summary: id ? "已清理指定对话的 Fingertips 本地记录。" : "已清理全部对话的 Fingertips 本地记录。", ai_instruction: "请用中文告诉用户清理范围和结果；如果清理全部记录，请明确提醒这是不可恢复的本地状态清理。" }; }
async function capabilities() { var s = settings.loadSettings(); return { success: true, schema_version: 1, hooks: { chat_input: true, prompt_input: true, input_menu_toggle: true }, privacy_gates: { injection_enabled: s.enabled, injection_scope: s.scope, bound_chat_id: s.boundChatId, bound_chat_title: s.boundChatTitle }, settings: { input_rhythm_enabled: !!s.injectRhythm, min_note_seconds: Number(s.minNoteSec), pause_gap_seconds: Number(s.pauseGapSec), orphan_minutes: Number(s.orphanMinutes) }, limits: { input_segments_per_draft: Number(store.CONFIG.maxInputSegments || 100), abandoned_drafts_kept: 1 }, summary: "Fingertips 只记录输入时长、停顿次数和欲言又止，不包含 App 或聊天切换记录。", ai_instruction: instruction(), privacy: "不会读取或保存输入框原文、文字长度、光标位置、屏幕内容、截图或通知。" }; }
exports.status = status;
exports.clear = clear;
exports.capabilities = capabilities;
