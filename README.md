# Fingertips 指尖语气 for Operit

> Version 1.0.1

让 AI 感知输入时长、停顿和欲言又止，并随用户消息附加一段可见的节奏摘要。

它能感知：

- 这条消息输入了约多久，中途停下来想了几次
- 一段输入在判定时间后没有发出来

例如：

```text
[Fingertips 指尖语气]
以下是 User 输入这条消息时留下的节奏，仅供感受。
这条消息 User 输入了约2分20秒，中途停下来想了1次。
```

```text
[Fingertips 指尖语气]
以下是 User 输入这条消息时留下的节奏，仅供感受。
User 10分钟前输入了约7分47秒，那条没有发出来。
```

## 功能

- 记录单条消息的输入时长、停顿次数和未发送节奏
- 支持所有对话或仅绑定对话注入
- 提供输入栏快捷开关和配置页
- 可配置节奏显示门槛、停顿判定和未发送判定时间
- 提供 `finger_tips:status`、`finger_tips:clear`、`finger_tips:capabilities` 三个 AI 工具

## 安装

1. 从 [Releases](../../releases) 下载 `.toolpkg` 附件。
2. 在 Operit 导入包，并确认主包已启用。
3. 在包管理中启用 `finger_tips` 子包；若工具列表未刷新，重新打开对话或重新启用该子包。

## 隐私边界

运行时会临时读取输入事件，用于判断输入状态和附加节奏摘要；不会保存、上传或注入输入原文，只记录输入时间、停顿和持续时长等节奏数据。

- 不保存输入框原文、文字长度、光标位置、屏幕内容、截图或通知内容。
- 用户可在配置页关闭注入。
- 用户可通过 `finger_tips:clear` 清理本地 Fingertips 记录。

它看见你的犹豫，永远看不见你咽下去的词。

## 开发与验证

本仓库源码为 Operit ToolPkg 纯净版。发布前已验证：

- `manifest.json` 版本与包 ID 正确
- 节奏回归测试通过
- 已通过 `debug_install_toolpkg` 安装，并启用 `finger_tips` 子包

## 致谢与许可

本插件基于 [eveacla11/fingertips](https://github.com/eveacla11/fingertips)（MIT License）进行 Operit 平台移植适配。

原作：eveacla11  
Operit 移植适配：willayue

本项目使用 MIT License，详见 [LICENSE](LICENSE)。