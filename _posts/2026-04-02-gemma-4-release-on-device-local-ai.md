---
layout: post
title: "Gemma 4 Release: On-Device Models from E2B to 31B"
description: "Gemma 4 shipped Apr 2, 2026: E2B/E4B, 26B MoE, 31B dense, long context, Apache 2.0. Enclave AI: Gemma 4 not in the current build—support expected within the next few days."
keywords: "Gemma 4, Gemma 4 local AI, Gemma 4 E2B E4B, Gemma 4 on iPhone, Google open models 2026, Gemma 4 GGUF, private AI Gemma"
date: 2026-04-02
---

**Gemma 4** is Google’s latest open-weight family, announced **April 2, 2026**: four checkpoints aimed at everything from ultra-mobile browsers to serious local and self-hosted setups. The lineup pairs **2B and 4B effective “E” models** (built with the same Per-Layer Embedding ideas that made [Gemma 3n](/blog/2025/06/29/gemma-3n-on-ios-and-macos/) practical on phones) with a **31B dense** flagship and a **26B mixture-of-experts** variant that activates **4B parameters per token**. Smaller models carry a **128K** context window; the larger two expand to **256K**. **Gemma 4 is licensed under [Apache 2.0](https://ai.google.dev/gemma/apache_2)**—a shift from the Gemma Terms of Use that applied to earlier generations—so downstream use, modification, and redistribution follow a familiar open-source playbook.

Weights are on [Hugging Face](https://huggingface.co/collections/google/gemma-4) and [Kaggle](https://www.kaggle.com/models?query=gemma-4&publisher=google). For full technical detail, see Google’s [Gemma 4 model card](https://ai.google.dev/gemma/docs/core/model_card_4) and [core overview](https://ai.google.dev/gemma/docs/core).

## Enclave AI and Gemma 4

**Enclave AI does not ship Gemma 4 today.** The current App Store build still focuses on the [Gemma 3 and Gemma 3n](/blog/2025/06/29/gemma-3n-on-ios-and-macos/) lineups and our other supported models. **Gemma 4 support is in progress and we expect to roll it out in the next few days**—watch for an app update, then pick Gemma 4 from the model list once it appears.

## What shipped: the four sizes

| Variant | Role | Notes |
|--------|------|--------|
| **Gemma 4 E2B** | Edge, phone, browser | “Effective” ~2B parameters; PLE-heavy architecture tuned for constrained memory |
| **Gemma 4 E4B** | Stronger edge / tablet | ~4B effective; same mobile-first design philosophy as E2B |
| **Gemma 4 26B A4B** | Throughput + reasoning | MoE: **4B active** per forward pass; **full 26B weights** still need to be resident for routing (see below) |
| **Gemma 4 31B** | Maximum quality in the family | Dense model bridging server-grade behavior and ambitious local setups |

Across the family, Google emphasizes **reasoning** (including configurable [thinking modes](https://ai.google.dev/gemma/docs/capabilities/thinking)), **coding**, **built-in function calling**, and **native system-prompt / system-role** support—useful for agents and structured assistants without brittle prompt hacks.

## Multimodal and long context

Gemma 4 is **multimodal by design**: **text** and **images** (with variable aspect ratio and resolution) on all sizes; **video** and **audio** are part of the stack, with **audio emphasized on the E2B and E4B** models for on-device scenarios.

For local AI users, the headline is not just benchmarks but **usable context**: **128K tokens** on the small models and **256K** on 31B and 26B A4B. Long context still costs **KV-cache memory** on top of static weights—plan headroom if you actually fill the window. Our [KV cache explainer](/blog/2026/03/22/kv-cache-explained-local-llm-memory-iphone-mac/) walks through why long chats and big documents scale memory the way they do.

## Memory: what Google quotes for inference

Google publishes approximate **load-only** weight memory (not full runtime with max context). For **Q4_0 (4-bit)** inference:

| Model | Approx. Q4_0 weight memory |
|-------|----------------------------|
| Gemma 4 E2B | ~3.2 GB |
| Gemma 4 E4B | ~5.0 GB |
| Gemma 4 26B A4B | ~15.6 GB |
| Gemma 4 31B | ~17.4 GB |

BF16 numbers are higher (see the [official table](https://ai.google.dev/gemma/docs/core)); **SFP8** sits between BF16 and Q4_0.

**Important MoE caveat:** For **26B A4B**, Google explicitly notes that although only **4B parameters are active per token**, **all 26B parameters must be loaded** to keep expert routing and inference fast. In practice, that means **disk and RAM pressure look like a large model**, not like a 4B dense model—unlike some MoE deployments where only active experts stay hot. If you are sizing a Mac or a home server, budget for the **full checkpoint**, then add context and framework overhead.

## What Gemma 4 means for iPhone and Mac

- **Phones and tablets:** The **E2B** and **E4B** targets align with the same story as [Gemma 3 and Gemma 3n on iOS](/blog/2025/03/16/gemma-3-models-local-cloud-performance/)—models engineered so that **reasonable quantizations** can stay within **unified memory** on recent Apple silicon devices. Once Enclave adds Gemma 4, the same tradeoffs apply; our [quantization guide for iPhone and Mac](/blog/2025/11/12/practical-quantization-guide-iphone-mac-gguf/) is still the right reference for bit depth and real-world RAM use.

- **Mac desktops and workstations:** **31B at Q4** is already in the **~17 GB static weight** ballpark before context—feasible on **24 GB+** machines with headroom, tighter on **16 GB**. The **26B MoE** is **not** a free lunch for memory despite the 4B activation count.

- **Privacy:** Nothing about Gemma 4 changes the core tradeoff: **open weights + local inference** means your prompts and documents never need to touch a cloud API. That is the same promise we care about across [offline AI](/blog/2024/02/15/why-offline-ai-matters/) and [local-first workflows](/blog/2024/06/08/privacy-in-ai-why-local-matters/).

## How this fits next to Gemma 3 and the wider field

[Gemma 3](/blog/2025/03/16/gemma-3-models-local-cloud-performance/) established Google’s push into **efficient, on-device-capable** open models with strong text performance and large context. **Gemma 3n** doubled down on **mobile-first** design. **Gemma 4** is the generational bump: **longer context on the big tiers**, **richer multimodal surface** (including video and audio where advertised), **agent-oriented features** (function calling, system role), and **Apache 2.0** for simpler product integration.

Compared with other 2026 families—such as [Qwen 3.5’s eight-model spread](/blog/2026/03/08/qwen-3-5-complete-model-family-local-ai/)—Gemma 4 is a **tighter, four-model line** with a very clear split between **E-series edge** and **26B/31B desktop or server**. Neither approach is “better”; they optimize for different deployment ladders.

## Bottom line

**Gemma 4** refines Google’s bet that **open weights** and **device-local inference** belong in the same sentence as frontier-class behavior—especially for **reasoning, tools, and long documents**. The **E2B/E4B** pair is the one to watch for **private AI on phones**; **31B** is the quality anchor for **serious local chat**; **26B A4B** is a **throughput-oriented MoE** as long as you respect **full-model memory**. In Enclave, Gemma 4 will slot into that same privacy-first story as soon as the upcoming update lands—until then, [Gemma 3n](/blog/2025/06/29/gemma-3n-on-ios-and-macos/) remains the cutting edge of Google’s stack inside the app.

---

## Related posts

- [Gemma 3n on iOS and macOS]({% link _posts/2025-06-29-gemma-3n-on-ios-and-macos.md %})
- [Enclave AI and Gemma 3: Local Performance]({% link _posts/2025-03-16-gemma-3-models-local-cloud-performance.md %})
- [KV Cache Explained: Local LLM Memory on iPhone and Mac]({% link _posts/2026-03-22-kv-cache-explained-local-llm-memory-iphone-mac.md %})
- [Practical Quantization Guide for iPhone and Mac (GGUF)]({% link _posts/2025-11-12-practical-quantization-guide-iphone-mac-gguf.md %})
