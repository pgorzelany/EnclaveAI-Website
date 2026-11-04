---
layout: post
title: "LFM3 Local AI: Which 2B Model Should You Use?"
description: "Compare LFM3 text, vision, audio, omni, and decision models for local use, including Mac runtimes, privacy limits, benchmarks, and licensing."
keywords: "LFM3 local AI, LFM3 1.7B Mac, LFM3 Omni 2B, LFM3 GGUF, LFM3 MLX"
date: 2026-11-04
---

**LFM3 local AI is not one model but a family of six compact models for text, vision, audio, mixed media, and typed decisions.** Liquid AI released the family on October 27, 2026, with first-party formats for local runtimes. The practical choice is to run the narrowest model that matches your input: text for chat and tools, VL for images or video, Audio for speech, Omni for combined media, or d1 for classification.

> **In short:** start with LFM3-1.7B for ordinary local chat and tool use. Choose a multimodal variant only when you need its inputs, because images, video, audio, and long context add memory and processing costs. Liquid's performance numbers are vendor results; we did not independently test these models.

## What Is the LFM3 Local AI Family?

[Liquid AI's announcement](https://www.liquid.ai/blog/lfm3) describes LFM3 as one shared 1.7B-parameter backbone adapted into six roughly 2B-class models. The backbone mixes short convolutions, sliding-window attention, and global attention rather than using attention in every layer.

The important change is specialization. Instead of making one large model handle every modality, Liquid publishes smaller variants with different encoders, outputs, context limits, and recommended tasks.

| Model | Inputs and outputs | Best fit | Important limit |
|---|---|---|---|
| LFM3-1.7B | Text to text | Chat, tools, structured output, local agents | Not recommended for complex multi-step reasoning or agentic coding |
| LFM3-VL-2B | Text, images, or video to text | Documents, charts, app screens, visual questions | Not recommended for coding or long multi-turn chat |
| LFM3-Audio-2B | Text or audio to text or speech | Transcription, translation, voice tools | Voice chat and live ASR currently support English only |
| LFM3-Omni-2B | Text, images, video, or audio to text or speech | Questions that need sight and sound together | Non-reasoning model with a 32K context window |
| d1-2B | Text, images, or video to typed answers | Routing, extraction, moderation, visual inspection | Decision model, not a chat model |
| d1-Omni-2B | Text, images, video, or audio to typed answers | Multimodal classification and checks | Designed for bounded decisions, not open-ended writing |

This is more useful than a single leaderboard rank. A 2B voice model and a 2B visual decision model solve different problems, even when they share a backbone.

## Which LFM3 Model Should You Choose?

### Choose LFM3-1.7B for text and tools

The [LFM3-1.7B model card](https://huggingface.co/LiquidAI/LFM3-1.7B) lists 1.73 billion parameters, a 256K-token maximum context, 16 languages, tool calling, and structured output. Liquid says its 4-bit weights take about 1 GB.

That 1 GB figure is not total runtime memory. The inference engine, temporary buffers, and KV cache need additional space, and longer conversations increase the KV cache. Use the smallest context that fits your task rather than allocating 256K merely because the model supports it.

### Choose VL for images and video

[LFM3-VL-2B](https://huggingface.co/LiquidAI/LFM3-VL-2B) combines the text backbone with a 164M-parameter vision encoder. It accepts native-resolution images and video, exposes a 128K context window, and has first-party GGUF and MLX variants.

It is the focused choice for reading a chart, inspecting a screenshot, or asking about a clip. If the workflow also needs sound, use Omni instead of building a second audio path.

### Choose Audio or Omni for speech

[LFM3-Audio-2B](https://huggingface.co/LiquidAI/LFM3-Audio-2B) supports speech recognition, speech generation, translation, audio understanding, and spoken tool calls. Its card lists 18 speech languages or locales, while explicitly limiting conversational voice chat and live transcription to English today.

[LFM3-Omni-2B](https://huggingface.co/LiquidAI/LFM3-Omni-2B) adds images and video to that audio path. It can answer questions that require both a video's frames and soundtrack, but it is a non-reasoning model and its context is 32K, not the text model's 256K.

### Choose d1 for fixed decisions

The d1 models return typed choices, scores, extractions, or probabilities without generating a prose answer token by token. That makes them relevant for routing, moderation, form extraction, and guardrails. Our [guide to local decision models]({% link _posts/2026-10-07-llama-cpp-decision-models-local-ai.md %}) explains why a returned probability still needs calibration on your own examples.

## How Can You Run LFM3 on a Mac?

For the text model, the official [LFM3 GGUF repository](https://huggingface.co/LiquidAI/LFM3-1.7B-GGUF) documents support in llama.cpp v0.8.0 or build 11960 and newer, Ollama 0.40.12 and newer, and LM Studio's llama.cpp engine 2.65.1 and newer. A direct llama.cpp command is:

```bash
llama-cli -hf LiquidAI/LFM3-1.7B-GGUF:Q4_K_M \
  --temp 0.1 --top-k 50 --repeat-penalty 1.1
```

Apple Silicon users can also choose first-party 4-bit MLX exports. Availability differs across family members, so check the chosen model card before assuming that text, vision, audio, and Omni share the same runtime support.

Start with a short, representative test set. Compare answer quality, prompt-processing time, generation speed, peak memory, and failure cases using the exact runtime and quantization you intend to keep. Our [quantization guide]({% link _posts/2026-03-15-llm-quantization-explained-gguf-guide.md %}) covers why two 4-bit formats can behave differently.

## Are Liquid AI's LFM3 Benchmarks Trustworthy?

They are useful first-party evidence, not independent validation. Liquid reports that LFM3-1.7B beats larger comparison models on several agent and tool-use evaluations. Its edge tests use Q4_0 GGUF files, a 32K context, llama.cpp, and specific Apple, AMD, and iPhone hardware.

Those controls make the results more interpretable, but they do not predict your workload. Tool schemas, prompt length, media resolution, quantization, runtime version, and hardware can all change the outcome. Evaluate correctness before speed, especially when a model can call tools or make automated decisions.

## Is LFM3 Private and Open Source?

Running an LFM3 file locally can keep model inference and its inputs on your device. It does not prove the whole application is private: web search, remote tools, crash reports, analytics, and cloud storage can still transmit prompts or media. Review the complete data path, not only the model process.

LFM3 is an **open-weight** release, but that does not automatically make its license equivalent to an open-source software license. The weights use the **LFM Open License v1.0**, not Apache 2.0 or MIT. Liquid's [license summary](https://www.liquid.ai/lfm-license) says free commercial rights end when a company's annual revenue exceeds $10 million, after which a separate commercial license is required. Check the full current terms before shipping or redistributing a product.

## The Bottom Line

LFM3's practical advantage is choice: one small backbone now covers text, vision, audio, combined media, and decisions through task-specific models.

For most local Mac experiments, LFM3-1.7B is the sensible starting point. Move to VL, Audio, Omni, or d1 only when the workflow needs that capability, then test the exact model, context, runtime, quantization, and privacy boundary yourself.

## Sources

- [Liquid AI: Introducing LFM3](https://www.liquid.ai/blog/lfm3), published October 27, 2026
- [Liquid AI on Hugging Face: LFM3 family guide and usage](https://huggingface.co/blog/LiquidAI/lfm3), published October 27, 2026
- [Liquid AI: LFM3-1.7B model card and evaluation methodology](https://huggingface.co/LiquidAI/LFM3-1.7B)
- [Liquid AI: LFM3 multimodal model collection](https://huggingface.co/collections/LiquidAI/lfm3)
- [Liquid AI: LFM Open License v1.0](https://www.liquid.ai/lfm-license)

---

## Related Posts

- [LFM2.5-24B-A2B: A Practical Mac Guide]({% link _posts/2026-10-14-lfm2-5-24b-a2b-local-agent-mac.md %})
- [llama.cpp Decision Models: A Local AI Guide]({% link _posts/2026-10-07-llama-cpp-decision-models-local-ai.md %})
- [LLM Quantization Explained: Run Bigger Models on Less RAM]({% link _posts/2026-03-15-llm-quantization-explained-gguf-guide.md %})
