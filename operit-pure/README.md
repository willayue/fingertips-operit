# Fingertips 指尖语气（纯净版）

让 AI 感知你的输入时长、停顿次数和欲言又止，随用户消息注入 Fingertips 显性附件。

**只记节奏，永不记内容。**

- 包 ID：`com.operit.willayue_fingertips`
- 子包 ID：`finger_tips`
- 版本：`1.0.0`
- 原作：eveacla11
- Operit 移植适配：willayue

本插件基于 [eveacla11/fingertips](https://github.com/eveacla11/fingertips)（MIT License）进行 Operit 平台适配与二次开发。

## 你可以让 AI 感知什么

安装并启用后，Fingertips 会在用户发送消息时，以显性附件形式提供输入节奏摘要：

1. **斟酌过的消息**

   这条消息 TA 输入了 X 秒，中途停下来想了 X 次。

2. **咽回去的话**

   TA X 分钟前打过 X 分钟的字，那条没有发出来。

这些内容只描述输入节奏，不包含用户输入的文字。

## 功能总览

- 记录单条消息的输入时长
- 记录输入过程中的停顿次数
- 记录超时未发送的输入节奏摘要
- 随用户消息注入 Fingertips 显性附件
- 支持对所有对话注入，或只对绑定对话注入
- 支持按当前对话绑定或按标题精确绑定
- 支持自定义 User 显示名
- 提供输入栏快捷开关
- 提供工具箱配置页
- 提供 `status`、`clear`、`capabilities` 三个 AI 工具
- 本地状态可按指定对话或全部清理

## 隐私与使用须知

1. **隐私优先**：Fingertips 不读取或保存输入框原文、文字长度、光标位置、屏幕内容、截图或通知。
2. **本地处理**：输入节奏摘要只保存在设备本地，不上传到外部服务。
3. **随时关闭**：可以在配置页关闭注入，也可以通过输入栏快捷菜单关闭。
4. **清理记录**：可以通过 `clear` 工具清理指定对话或全部本地记录。
5. **显示范围**：Fingertips 只注入输入节奏摘要，不注入输入框原文，也不会根据文字内容推断用户意图。
6. **二改与分发**：可以二改自用，请勿私自分享二传！请勿倒卖盈利!

## 安装

将 `fingertips_pure.toolpkg` 导入 Operit 即可安装。

安装后请在包管理中确认以下项目已启用：

- 主包：**指尖语气 Fingertips**
- 子包：**finger_tips**

如果工具没有出现在可用工具列表中，请重新打开对话，或在包管理中重新启用 `finger_tips` 子包。

## 配置页

### 启用 Fingertips 注入

这是 Fingertips 的总开关，并与输入栏快捷菜单中的“指尖语气 Fingertips”开关同步。

输入消息的输入时长和停顿次数会跟随总开关一起注入，不再单独设置输入节奏开关。

### 注入范围

支持两种范围：

- **所有对话**：对所有聊天窗口生效
- **仅绑定对话**：只对指定对话生效

绑定对话支持按当前对话绑定，也支持按标题精确匹配。存在多个同名对话时，建议使用“绑定当前对话”。

### User 显示名

User 显示名会出现在注入摘要中。例如：

> 这条消息玥输入了约2分20秒，中途停下来想了1次。

### 输入节奏设置

- **输入节奏显示门槛**：输入总时长低于该门槛时，不生成本条输入节奏文案。
- **停顿时长计入门槛**：输入过程中停止超过该时长时，记为一次停顿。
- **未发送输入判定时间**：超过该时间没有继续输入或发送时，将上一段输入节奏记为“那条没有发出来”。

超时未发送草稿仅保留最新一次。再次输入并发送后，上一条未发送摘要会与当前消息的输入节奏一起注入。

## 注入示例

### 输入节奏

```text
[Fingertips 指尖语气]
以下是玥输入这条消息时留下的节奏，仅供感受。
这条消息玥输入了约3分19秒，中途停下来想了5次。
```

### 包含超时未发送输入

```text
[Fingertips 指尖语气]
以下是玥输入这条消息时留下的节奏，仅供感受。
玥 X分钟前打过约X分X秒的字，那条没有发出来。
这条消息玥输入了约X分X秒，中途停下来想了X次。
```

以上仅为格式示例，实际摘要会根据输入时长、停顿情况和配置阈值动态生成。

## AI 工具

### `finger_tips:status`：查看当前状态

查看 Fingertips 当前运行状态、实际配置阈值和本地输入节奏记录统计。

可以用于查看：

- 总注入开关是否启用
- 当前注入范围
- 输入节奏显示门槛
- 停顿门槛
- 未发送判定时间
- 当前本地记录数量

工具不会返回输入原文。

### `finger_tips:clear`：清理本地记录

清理 Fingertips 在设备本地保存的状态：

- 传入 `chat_id`：只清理指定对话
- 不传 `chat_id`：清理全部对话状态

清理全部记录不可恢复，请确认清理范围后再操作。

### `finger_tips:capabilities`：查看工作能力

只读查看 Fingertips 的工作能力、当前配置阈值和隐私保护范围。

工具不会修改设置，也不会读取输入框原文、屏幕内容或通知。

## 隐私边界

Fingertips 只保存实现输入节奏摘要所需的元数据，不保存以下内容：

- 输入框原文
- 文字长度
- 光标位置
- 输入框截图
- 屏幕内容
- 通知内容
- 文本指纹

AI 接收到的是输入时长、停顿次数和超时未发送等节奏摘要，不是用户输入的文字。

## 特别致谢

本插件基于 [eveacla11/fingertips](https://github.com/eveacla11/fingertips)（MIT License）进行 Operit 平台适配与二次开发。感谢原作者 eveacla11 的创意与开源精神。

原作：eveacla11  
Operit 移植适配：willayue  
问题反馈：小红书 **@LumiNaRyA.**

## License

本项目基于 [eveacla11/fingertips](https://github.com/eveacla11/fingertips)（MIT License）进行 Operit 平台适配与二次开发。

```text
MIT License

Copyright (c) 2026 fingertips contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

原作者项目：<https://github.com/eveacla11/fingertips>  
Operit 移植适配：<https://github.com/willayue/fingertips-operit>
