---
layout: post
title: "Apple fm CLI: Run Local AI on Your Mac"
description: "Use Apple's fm CLI to chat with a local model, automate Mac tasks, create structured output, and understand exactly when a request leaves your device."
keywords: "Apple fm CLI, macOS 27 local AI, Apple Foundation Models terminal, fm respond, Private Cloud Compute CLI"
date: 2026-10-28
---

**Apple's fm CLI lets you run local AI from Terminal on a compatible Mac without building an app or installing a separate model runner.** It comes with macOS 27, uses Apple's on-device Foundation Model by default, and supports interactive chat, one-shot responses, and structured output for scripts. The important privacy detail is explicit: choosing `--model pcc` sends the request to Apple's Private Cloud Compute instead.

> **Quick answer:** open Terminal and run `fm`, then use `fm chat` for a conversation or `fm respond "Your prompt"` for one response. Stay with the default model when the task should remain on-device. Use `fm respond --help` before scripting because command options and model availability can change with macOS updates.

## What Is the Apple fm CLI?

The **Apple fm CLI** is a command-line interface to Apple Foundation Models. Apple introduced it at WWDC26 and ships it pre-installed with macOS 27. It turns capabilities that previously required Swift code into ordinary Terminal commands.

The tool has three useful entry points:

| Command | Best use | Default processing |
|---|---|---|
| `fm chat` | Interactive questions and follow-ups | On-device |
| `fm respond` | One response inside a shell workflow | On-device |
| `fm schema` | Define structured output for automation | Used with a selected model |

This is different from the [Foundation Models framework for Swift apps]({% link _posts/2026-01-24-apple-foundationmodels-framework-on-device-ai-swift.md %}). The framework is for shipping an AI feature inside an app; `fm` is for experimenting, personal workflows, and scripts directly on a Mac.

## What Does Your Mac Need to Run fm?

Apple says the command comes with **macOS 27 Golden Gate**. The wider Apple Intelligence requirements include a Mac with M1 or later, Apple Intelligence enabled, and matching supported device and Siri languages. Apple's current support page says the models may use up to 8 GB of storage on most compatible Macs and up to 14 GB on Macs with M3 or later and at least 12 GB of unified memory.

Use this checklist if `fm` is unavailable:

1. Confirm the Mac is running macOS 27.
2. Check that the Mac supports Apple Intelligence.
3. Turn on Apple Intelligence under System Settings.
4. Let the required models finish downloading.
5. Run `fm` again and read any setup or license prompt shown by the tool.

Language, region, hardware, and feature availability can differ. Apple's [current Apple Intelligence requirements](https://support.apple.com/en-us/121115) are a better source than a static compatibility list copied into a tutorial.

## How Do You Use the Apple fm CLI?

Start by asking the installed tool to show its commands:

```bash
fm
```

For a conversation with follow-up questions, use:

```bash
fm chat
```

Apple documents slash commands inside chat, including `/model` to change the model and `/save` to save a session for later. Treat saved sessions as data: check where they are stored before using chat with confidential material.

For a single response that another command can consume, use:

```bash
fm respond "Turn these rough notes into a five-item checklist"
```

The response is written to Terminal output, which makes `fm respond` the more practical choice for scripts. Apple also documents `--instructions`, image input, schemas, and an explicit model option. Inspect the version installed on your Mac before relying on any flag:

```bash
fm respond --help
```

We did not benchmark the model or independently test these commands for this article. The syntax above comes from Apple's WWDC26 documentation.

## How Can fm Return Structured JSON?

Free-form model text is fragile in automation. A script expecting a list can fail when a model adds an introduction, renames a field, or returns prose. Apple's schema command constrains the response to a defined structure.

For example, create a schema with an array of task names:

```bash
fm schema object --name Tasks --string task_names --array > tasks-schema.json
```

Then request output using that schema:

```bash
fm respond "Extract the action items from these notes: ..." \
  --schema tasks-schema.json
```

Structured output improves parsing; it does **not** prove the extracted tasks are correct. Validate required fields, reject unexpected paths or commands, and show the proposed result before a script changes files, sends messages, or performs another irreversible action.

Apple's own demonstration sorts draft and final files, then moves them. A safer real workflow separates the model from the action:

1. Give the model only the filenames or text it needs.
2. Save its structured classification.
3. Verify every returned item exists in the allowed directory.
4. Print a preview of the planned changes.
5. Require confirmation before copying, moving, deleting, or uploading anything.

That review step matters because language models are non-deterministic. A valid JSON response can still contain a wrong decision.

## Is fm Local and Private?

By default, Apple's documented `fm respond` workflow uses the on-device model. That means the prompt and inference can remain on the Mac, with no API key or per-request cloud service required.

The boundary changes when you select Private Cloud Compute:

```bash
fm respond "Analyze this complex plan" --model pcc
```

Apple says PCC uses a larger server model, can perform better on complex tasks, and is subject to usage limits. Its [Apple Intelligence privacy notice](https://www.apple.com/legal/privacy/data/en/intelligence-engine/) says content processed by PCC is used to fulfill the request, is not stored, and is not made accessible to Apple. The same notice says Apple may collect limited non-content information such as approximate request size, features used, and timing.

So “built into the Mac” does not mean every `fm` request is local. Check the selected model, avoid passing more data than the task requires, and use the Apple Intelligence & PCC Report when you want to inspect off-device processing. The optional improvement and analytics settings are separate; our [Improve Siri & Apple Intelligence privacy guide]({% link _posts/2026-09-23-improve-siri-apple-intelligence-privacy.md %}) explains those controls.

## What Is the fm CLI Good At?

The on-device model is a practical fit for bounded transformations where your Mac already has the input:

- Summarizing a local document or meeting note
- Rewriting text into a specified tone or length
- Extracting fields into a schema
- Classifying a list for human review
- Prototyping prompts before adding them to an app

It is a weaker fit for current facts, high-stakes decisions, or unattended actions. An on-device model does not automatically know today's news, and local processing does not make its answer accurate. Apple also publishes [acceptable-use requirements](https://developer.apple.com/support/terms/acceptable-use-requirements-for-the-foundation-models-framework/) that prohibit unsupervised material-impact decisions in areas such as employment, medicine, law, and finance.

For sensitive work, local inference reduces one category of exposure, but the surrounding shell script can still write logs, sync files, or call network services. Our [local AI privacy guide]({% link _posts/2024-06-08-privacy-in-ai-why-local-matters.md %}) covers that wider data path.

## The Bottom Line

Apple's fm CLI makes the Mac's built-in Foundation Model unusually accessible: `fm chat` is useful for exploration, while `fm respond` and schemas make local AI available to shell workflows.

The practical rule is to keep the default on-device model for private, bounded tasks; select PCC only deliberately; and never confuse structured output with verified output. Use the model to propose and classify, then let deterministic checks and a person control consequential actions.

## Sources

- [Apple Developer: Build AI-powered scripts with the fm CLI and Python SDK](https://developer.apple.com/videos/play/wwdc2026/334/), WWDC26
- [Apple Developer: What's new in the Foundation Models framework](https://developer.apple.com/videos/play/wwdc2026/241/), WWDC26
- [Apple Support: Get started with the next generation of Apple Intelligence](https://support.apple.com/en-us/121115)
- [Apple Legal: Apple Intelligence & Privacy](https://www.apple.com/legal/privacy/data/en/intelligence-engine/)
- [Apple Developer: Acceptable use requirements for the Foundation Models framework](https://developer.apple.com/support/terms/acceptable-use-requirements-for-the-foundation-models-framework/)

---

## Related Posts

- [Apple FoundationModels: On-Device AI for Every App]({% link _posts/2026-01-24-apple-foundationmodels-framework-on-device-ai-swift.md %})
- [Improve Siri & Apple Intelligence: Privacy Guide]({% link _posts/2026-09-23-improve-siri-apple-intelligence-privacy.md %})
- [Privacy in AI: Why Your Data Should Stay on Your Device]({% link _posts/2024-06-08-privacy-in-ai-why-local-matters.md %})
