---
layout: post
title: "Qwen 4: What We Know Before Release"
description: "Qwen 4 is still in training, but its architecture preview offers real clues. Here is what is confirmed, what looks promising, and what remains unknown."
keywords: "Qwen 4 before release, Qwen 4 architecture, Qwen 4 local AI, Qwen3.8 Flash Next, Qwen 4 release date"
date: 2026-10-08
---

**Qwen 4 before release** is still mostly an unknown model. Alibaba has confirmed that it is in training, but it has not announced a release date, model lineup, license, or performance results. What makes the story worth following now is Qwen3.8-Flash-Next: an open-weight experimental model that Qwen describes as an early preview of the architecture planned for Qwen 4. It offers credible clues about where the next family is heading—without proving how intelligent the finished models will be.

> **The short answer:** Qwen 4 is real and in training. Its architectural preview suggests a focus on efficient reasoning, long documents, coding, and tool use. Claims about its release date, final sizes, or superiority over other leading models are not yet verified.

## What do we actually know about Qwen 4?

Alibaba's [September 22 roadmap announcement](https://www.alibabacloud.com/en/press-room/alibaba-unveils-roadmap-on-full-stack-ai-strategy) contains the clearest official statement: **Qwen 4 is currently in training**. The company did not provide a launch date, API name, model sizes, benchmark table, or license.

That distinction matters because several specific claims are already circulating online. Until Qwen publishes a model card, weights, or an official product announcement, those details should not be treated as facts.

| Status | What it means |
|---|---|
| **Confirmed** | Qwen 4 is in training. Qwen3.8-Flash-Next previews parts of its architecture. |
| **Promising, not guaranteed** | The final family may improve efficiency, long-context work, coding, and agent-style tasks. |
| **Still unknown** | Release date, model sizes, local variants, open-weight availability, license, pricing, and final performance. |

Alibaba also discussed future models with 5–10 trillion parameters, but its announcement assigns that roadmap to **Qwen 4.5 and Qwen 5**, not Qwen 4. It would be misleading to describe Qwen 4 itself as a 10-trillion-parameter model.

## Why is Qwen3.8-Flash-Next relevant?

The [official Qwen repository](https://github.com/QwenLM/Qwen3.8-Flash-Next) calls Qwen3.8-Flash-Next an early preview of the architecture intended for Qwen 4. In simple terms, it is a public test bed: Qwen can expose the new design to developers before building the full model family on top of it.

The preview changes four parts of the model. The names are technical, but their intended effects are easier to understand:

- **It tries to read long inputs more selectively.** Instead of giving equal attention to every part of a very long document, the model uses a lightweight system to identify the sections that appear most relevant.
- **It creates more routes for information inside the network.** Four controlled residual branches are designed to help useful signals survive through many layers and make training more stable.
- **It adds a large phrase-memory table.** Short patterns from nearby text can be looked up with relatively little computation, increasing model capacity without activating the entire network for every word.
- **It uses an updated training recipe.** Qwen combined two optimization approaches and adjusted its scaling rules for the new design.

These changes do not automatically make a model more intelligent. They are attempts to use training compute and inference compute more effectively. The important question is whether the gains continue when Qwen scales the architecture into a complete family.

## Why are expectations for Qwen 4 so high?

Qwen3.8-Flash-Next has about 180 billion parameters in total, while roughly 6 billion are active for each token. That makes it a useful experiment in doing more work with a smaller active portion of a much larger model.

Independent results provide a reason for cautious optimism. [Artificial Analysis currently gives the preview an Intelligence Index score of 40](https://artificialanalysis.ai/models/qwen3-8-flash-next), compared with 34 for the high-reasoning setting of Qwen3.8-27B. In that comparison, Flash-Next also scores 56% versus 48% on AutomationBench and 25% versus 6% on Terminal-Bench.

Those numbers suggest particular strength in completing multi-step computer and coding tasks. They do **not** prove that Qwen 4 will outperform every competing model. A benchmark is a collection of controlled tests, not a guarantee of better answers for every person or workload. Artificial Analysis also finds the preview relatively verbose and slower than the median among comparable open-weight models.

Qwen publishes additional strong coding and office-task results in its own model card. Those are useful evidence about the team's goals, but they remain vendor-reported results. The independent comparison is more persuasive precisely because it comes from outside Qwen.

## Will Qwen 4 run locally on an iPhone or Mac?

It is too early to say. The preview already works through llama.cpp and MLX-VLM according to Qwen's repository, so the basic Apple Silicon and GGUF ecosystem is paying attention. That is encouraging for future local support, but it is not the same as having a practical Qwen 4 download for consumer devices.

The phrase **“6 billion active parameters”** can also be misleading. It describes how much of the model participates in processing each token—not how much storage or memory the complete model needs. Flash-Next still contains roughly 180 billion parameters in total. Even when some components can be moved into regular system memory, it remains a very large download and a demanding local model.

This is why the final lineup matters more than the flagship architecture. A smaller dense or mixture-of-experts edition could be suitable for a Mac, while a compact variant might eventually work on an iPhone. Neither has been officially announced. Our [guide to local model sizes]({% link _posts/2025-08-13-understanding-model-sizes-in-2025.md %}) explains why total parameters, active parameters, quantization, and available memory must be considered separately.

Long context creates another practical constraint. A model may advertise support for hundreds of thousands of tokens, but longer conversations consume additional memory while running. For a plain-language explanation, see [why local AI chats need extra RAM]({% link _posts/2026-03-22-kv-cache-explained-local-llm-memory-iphone-mac.md %}).

## Does an open preview mean Qwen 4 will be open?

No. Qwen3.8-Flash-Next has downloadable weights, but that does not commit Alibaba to releasing every Qwen 4 model in the same way. Its model card uses the Qwen Community License 1.0, while other Qwen releases have used different licenses.

For local AI users, “open” should be checked as a list of concrete questions:

1. Can the weights be downloaded?
2. Does the license permit the intended personal or commercial use?
3. Are quantized versions available in formats such as GGUF or MLX?
4. Can established local runtimes load the model correctly?
5. Is the complete model small enough for the target device?

We will not know the answers for Qwen 4 until the actual models and their licenses appear. The current [Qwen 3.5 family overview]({% link _posts/2026-03-08-qwen-3-5-complete-model-family-local-ai.md %}) is useful historical context, but its sizes and licensing should not be projected onto the next generation.

## What should you watch before the Qwen 4 release?

Ignore countdowns and unsourced benchmark screenshots. These five signals will tell us when there is enough evidence to evaluate Qwen 4 properly:

- **An official model card** listing architecture, context length, input types, and limitations.
- **A published license** stating whether weights can be downloaded and how they may be used.
- **Real model identifiers** in Qwen's API or official repositories—not experimental architecture names in runtime code.
- **Runtime support** confirmed by llama.cpp, MLX, or another established local inference project.
- **Independent evaluations** covering quality, speed, memory use, and long-context reliability.

The last point is especially important. A model that leads one reasoning benchmark may still be too verbose, too slow, or too large for everyday local use. For privacy-focused users, the best Qwen 4 model may not be the largest one. It may be the smallest version that can perform a useful task reliably while keeping personal data on the device.

## Is Qwen 4 worth waiting for?

Yes—if expectations stay grounded. Qwen has disclosed a meaningful architectural preview, and independent testing shows that the preview is competitive despite activating only a small part of its full parameter count. That is a better reason for optimism than a rumor about a release date or an unsupported claim that it beats a named competitor.

The most credible expectation is that Qwen 4 will pursue **more capability per unit of active compute**, especially for coding, tools, and long inputs. Whether that becomes a major intelligence leap—and whether any version is genuinely practical on an iPhone or Mac—remains unanswered.

For now, Qwen 4 is a model to watch, not a model to recommend.

## Sources

- [Alibaba Cloud: Qwen 4 is in training](https://www.alibabacloud.com/en/press-room/alibaba-unveils-roadmap-on-full-stack-ai-strategy)
- [Qwen3.8-Flash-Next official repository and local runtime support](https://github.com/QwenLM/Qwen3.8-Flash-Next)
- [Qwen3.8-Flash-Next official model card](https://huggingface.co/Qwen/Qwen3.8-Flash-Next)
- [Qwen technical report on the preview architecture](https://arxiv.org/abs/2608.30320)
- [Artificial Analysis independent model profile](https://artificialanalysis.ai/models/qwen3-8-flash-next)
