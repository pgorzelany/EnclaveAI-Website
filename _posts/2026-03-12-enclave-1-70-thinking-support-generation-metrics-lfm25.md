---
layout: post
title: "Enclave 1.70: Thinking Support, Live Metrics, and a New Brain"
description: "Enclave 1.70 brings chain-of-thought thinking support, real-time tokens-per-second metrics, LiquidAI LFM 2.5, and smoother streaming to on-device AI chat."
keywords: "Enclave AI thinking support, tokens per second local LLM, LiquidAI LFM 2.5 on-device, Enclave AI update iOS, chain of thought local AI"
date: 2026-03-12
---

Enclave 1.70 is the most transparent version of the app we have ever shipped. You can now watch your local model think through problems in real time, see exactly how fast it generates text, and run conversations on a new embedded model that delivers noticeably better answers — all completely offline, completely private, on your own device. Here is everything that changed and why it matters.

## Chain-of-Thought Thinking Support: See How Your AI Reasons

The headline feature in Enclave 1.70 is full thinking support. Models that use chain-of-thought reasoning — like DeepSeek R1, Qwen3 in thinking mode, and others that produce `<think>` blocks — now get a dedicated, polished experience instead of dumping raw reasoning text into the chat.

When a model begins reasoning through a problem, you will see a shimmering **"Thinking"** indicator appear in real time. This is not a spinner or a generic loading state. It is a live signal that the model is actively working through the problem, generating internal reasoning tokens before it commits to an answer. The shimmer animates while thinking is in progress and settles once the model transitions to its visible response.

Once the response arrives, a tappable **"Thinking"** label sits above the answer. Tap it and a sheet slides up to reveal the model's full reasoning chain — every step, every consideration, every logical connection that led to the final response. It is like reading the scratch work of a brilliant colleague who normally only shows you their conclusions.

### Why This Matters for Local AI

Thinking models are among the most capable open-source models available today, and their reasoning traces are one of the most powerful tools for understanding and trusting AI output. Until now, running these models locally meant either seeing raw `<think>` tags cluttering the chat or losing the reasoning entirely. Enclave 1.70 gives you both — a clean response in the chat and the full thought process one tap away.

The implementation handles streaming edge cases gracefully. Partial `<think>` tag prefixes during streaming are detected and suppressed so you never see raw markup flash across the screen. The parser was built from scratch and backed by over 300 unit tests covering every edge case from empty tags to nested content.

## Real-Time Generation Metrics: Tokens Per Second and Model Name

Enclave 1.70 now measures and displays generation performance in real time. After each completed response, you will see two pieces of information directly below the message:

- **Model name** — which model generated this response
- **Tokens per second** — how fast it ran

This is not an estimate or a benchmark number from a spec sheet. Enclave measures actual wall-clock time from the first token to the last, counts every token generated during that span, and shows you the real throughput your hardware achieved for that specific response.

### Why You Want This

If you are running multiple local models and want to know which one is fastest on your device, now you have the data right in the conversation. If you are experimenting with different quantization levels (Q4 vs Q6 vs Q8), you can see the speed-quality tradeoff immediately. If you just enjoy watching numbers go up, we get it — there is something deeply satisfying about seeing your iPhone push 30+ tokens per second on a local model with zero internet required.

The metrics are togglable. Head to **Chat Settings** and flip the **Generation Info** switch on or off depending on whether you want the extra detail or a cleaner chat interface.

## New Embedded Model: LiquidAI LFM 2.5

The model that ships inside Enclave — the one that works instantly with zero setup and zero downloads — has been upgraded. Enclave 1.70 replaces the previous Llama 3.2 1B with **LiquidAI LFM 2.5 1.2B Instruct**.

LFM 2.5 is purpose-built for on-device deployment. It uses LiquidAI's proprietary liquid architecture rather than a standard Transformer, and it shows. Compared to the outgoing Llama 3.2 1B, LFM 2.5 delivers:

- **Stronger reasoning** — more coherent multi-step answers
- **Better instruction following** — it does what you ask with less prompt engineering
- **Improved tool use capabilities** — a foundation for future features
- **Same compact footprint** — 1.2B parameters, roughly 1 GB on disk, 1 GB of memory

If you have been using Enclave's built-in model for quick offline conversations, you will notice the difference immediately. The answers are more focused, more accurate, and more useful — without any extra memory or storage cost.

For more background on LiquidAI's approach, see our coverage of [the original LFM2 release](/blog/2025/07/12/liquid-ai-lfm2-a-new-era-for-on-device-ai/).

## 30fps Streaming: Smoother Text Generation

Under the hood, Enclave 1.70 rearchitects how streaming text updates reach the screen. Previous versions updated the UI on every single incoming token. That worked fine for slower models but could cause frame drops on fast ones — especially the newer models that push 50+ tokens per second on Apple Silicon.

The new approach throttles UI updates to **30 frames per second**. Tokens accumulate in a buffer and the view refreshes at a steady cadence. The result is noticeably smoother text rendering during generation, particularly on longer responses. The text flows onto the screen like it is being typed by someone who never hesitates — fluid, consistent, and easy to read as it arrives.

When generation completes, the final content is flushed to the screen immediately so you never miss the last tokens. The throttling is invisible to the user except that everything feels better.

## Memory Leak Fix for Local Models

We tracked down and eliminated a memory leak that prevented local Llama-based models from being deallocated when a conversation ended or the model was switched. On devices with limited memory — particularly iPhones — this could cause degraded performance over extended sessions as orphaned model instances accumulated in memory.

The fix is a single-line change with significant impact. Models are now properly released when they are no longer needed, freeing memory for the next conversation or model load. If you run multiple models in a session or have long usage patterns, you should see more consistent performance over time.

## Updated Translations

All supported languages have been updated with new strings for the thinking UI, generation metrics, and model descriptions. If you use Enclave in German, Spanish, or Polish, every new feature label and description is fully localized.

## The Full Changelog

| Change | What It Does |
|--------|-------------|
| Thinking support | See chain-of-thought reasoning from thinking models with a dedicated UI |
| Generation metrics | Tokens per second and model name displayed on every response |
| LiquidAI LFM 2.5 | Upgraded embedded model with stronger reasoning and instruction following |
| 30fps streaming | Throttled UI updates for smoother text rendering during generation |
| Memory leak fix | Local models now properly deallocate when no longer in use |
| Translation updates | All new features fully localized across supported languages |

## What This Means for On-Device AI

Enclave 1.70 is about **transparency**. You can see what the model is thinking, how fast it is running, and which model produced each answer. This is information that cloud AI services rarely expose and that most local AI tools ignore. We think it matters — especially when you are running models on your own hardware, paying zero per query, and keeping every conversation completely private.

The thinking support in particular opens up new ways to use local AI. Chain-of-thought models are among the best open-source models available for math, coding, analysis, and complex reasoning tasks. With Enclave 1.70, running them locally is no longer a compromise — it is the best way to use them, because you get the full reasoning trace that cloud APIs often hide or charge extra for.

Update to Enclave 1.70 today. Your AI has a lot on its mind — and now you can see all of it.

---

## Related Posts

- [LiquidAI LFM2: A New Era for On-Device AI]({% link _posts/2025-07-12-liquid-ai-lfm2-a-new-era-for-on-device-ai.md %})
- [Introducing Qwen3: Hybrid Thinking Modes and Advanced AI]({% link _posts/2025-04-29-qwen3-thinking-modes-enclave-ai.md %})
- [DeepSeek R1 Distilled: Reasoning AI on Your Phone]({% link _posts/2025-02-02-deepseek-r1-distilled-mobile-ai.md %})
- [Five Best Local LLMs for iPhone and Mac]({% link _posts/2025-07-06-five-best-local-llms-iphone-mac-july-2025.md %})
