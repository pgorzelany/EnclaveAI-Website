---
layout: post
title: "Tiny Aya: 70 Languages Running Locally on iPhone and Mac"
description: "Cohere's Tiny Aya is a 3.35B open model that runs at 32 tok/s on iPhone 17 Pro and supports 70+ languages. Here's what it does and how to use it locally."
keywords: "Tiny Aya local iPhone, Cohere Tiny Aya on-device, multilingual AI iPhone, Tiny Aya GGUF, run Tiny Aya locally"
date: 2026-02-28
---

Most "multilingual" AI models treat language support as a checkbox — train heavily on English, sprinkle in some Chinese and Spanish, and list 100+ languages in the marketing copy. Cohere Labs just shipped something different. Tiny Aya, released February 17, is a 3.35-billion-parameter open-weight model that genuinely supports 70+ languages — including Bengali, Hindi, Tamil, Yoruba, and dozens of others that frontier models treat as afterthoughts — and runs locally on an iPhone 17 Pro at 32 tokens per second. GGUF versions are available on Hugging Face right now, making it immediately usable for local inference on iPhone and Mac.

## What Is Cohere Tiny Aya?

Tiny Aya is a family of open-weight multilingual language models from Cohere Labs, the research arm of enterprise AI company Cohere. The base model contains 3.35 billion parameters and covers 70+ languages during inference, with 67 languages in its post-training phase. The architecture, tokenizer, and training pipeline were designed specifically for on-device deployment — the goal was a model that works offline, on consumer hardware, in the languages that actually matter to the people using it.

At 3.35B parameters, Tiny Aya sits in the same size category as Gemma 3 4B, Qwen 3 4B, and Mistral's Ministral 3B. The difference is where those parameters go. Where other models concentrate capacity on high-resource languages, Tiny Aya distributes it toward South Asian, African, and Southeast Asian languages that most models handle poorly.

## Five Models, One Architecture

Cohere released a family of five models, not a single one:

- **TinyAya-Base** — The pretrained foundation, 3.35 billion parameters
- **TinyAya-Global** — Instruction-tuned for balanced performance across all 67 post-training languages
- **TinyAya-Earth** — Optimized for African and West Asian languages
- **TinyAya-Fire** — Optimized for South Asian languages (Bengali, Hindi, Punjabi, Urdu, Gujarati, Tamil, Telugu, Marathi)
- **TinyAya-Water** — Optimized for Asia-Pacific and European languages

All variants share the same base architecture and are available in GGUF format. TinyAya-Global is the right starting point for most users — it covers the full language range with strong instruction-following. The regional variants are for applications where a specific language family is the priority and you want to maximize performance within it.

## How Fast Does Tiny Aya Run on iPhone?

TinyAya-Global hits 32 tokens per second on an iPhone 17 Pro — roughly 4-5 words per second, fast enough for real-time chat, on-the-fly translation, and voice assistant applications. On Apple Silicon Macs with their larger Neural Engine and unified memory, speeds will be higher.

The architecture behind those numbers is a dense decoder-only Transformer with interleaved sliding window and full attention in a 3:1 ratio, plus Grouped Query Attention (GQA). These are the same techniques that make other efficient small models responsive on mobile hardware. The context window is 8,192 tokens — workable for conversational use cases, though shorter than alternatives like Gemma 3's 128K.

## How It Compares to Gemma 3 and Qwen 3

On the WMT24++ translation benchmark, TinyAya-Global beats Gemma 3 4B in 46 of 61 tested language directions. That is not a narrow lead on a few cherry-picked pairs — it is a decisive win across the majority of assessed languages, with the advantage largest in low-resource languages where Gemma and Qwen have sparse training data.

The African language math reasoning results are more striking:

| Model | African language accuracy (GlobalMGSM) |
|-------|----------------------------------------|
| TinyAya-Global | 39.2% |
| Gemma 3 4B | 17.6% |
| Qwen 3 4B | 6.25% |

A 3.35B model more than doubling a 4B competitor on mathematical reasoning in African languages is a significant result — and it points to how much thoughtful data curation matters over raw parameter count for underserved languages.

Where Tiny Aya trails: English-heavy tasks, coding, and anything requiring long context. Gemma 3 and Qwen 3 remain stronger for those workloads. Tiny Aya's advantage is specifically deep multilingual capability per parameter, not general-purpose performance.

## The Tokenizer Is the Real Innovation

The detail that matters most is not the parameter count — it is the tokenizer. Tiny Aya achieves more efficient tokenization across most assessed languages, meaning it needs fewer tokens to represent the same sentence in Hindi, Swahili, or Vietnamese than its competitors require.

This creates cascading effects for on-device inference. Fewer tokens per sentence means better output quality (the model sees more meaningful units per token budget), faster generation on constrained hardware, more content fitting within the 8K context window, and lower compute cost per inference.

This addresses one of the quiet problems in multilingual AI: a model might technically "support" Bengali, but if its tokenizer splits every Bengali word into 5-7 sub-tokens while English words get 1-2, the effective context window for a Bengali user is a fraction of what English users get. Tiny Aya is engineered against that failure mode from the start.

For more on how model architecture choices affect on-device performance, see our [practical quantization guide for iPhone and Mac](/blog/2025/11/12/practical-quantization-guide-iphone-mac-gguf/).

## How to Run Tiny Aya Locally

GGUF versions are available from CohereLabs directly on Hugging Face — search for `CohereLabs/tiny-aya-global-GGUF` to find the quantized versions. The models are also available via Ollama:

```
ollama run cohere/tiny-aya-global
```

For iPhone and Mac, any app that supports local GGUF inference can load Tiny Aya. At 3.35B parameters, it should run comfortably on iPhone 15 Pro and later and on any Apple Silicon Mac. If you are new to finding and loading GGUF models, our [guide to searching for GGUF models on Hugging Face](/blog/2025/05/07/huggingface-gguf-search-enclave-ios/) covers the full process.

The model was released under open weights — free to use and modify. Cohere is also releasing the training and evaluation datasets on Hugging Face and plans to publish a full technical report.

## Who Should Use Tiny Aya?

Tiny Aya is not a general-purpose replacement for Gemma 3 or Qwen 3. For English-centric work, coding, or long-context tasks, those models remain the better choice. For a broader look at what is worth running locally right now, see our [comparison of the best local LLMs for iPhone and Mac](/blog/2025/07/06/five-best-local-llms-iphone-mac-july-2025/).

Tiny Aya earns a download if any of these apply to you:

- You work across multiple languages and want one local model to handle all of them
- Your users speak South Asian, African, or Southeast Asian languages that other small models handle poorly
- You are building an offline-capable app for a multilingual audience
- You need a private, on-device translation engine that keeps text off a server

The use cases are practical and specific: a health worker in rural India needing real-time translation between Tamil and Hindi, a researcher analyzing Yoruba-language documents offline, a developer building a voice assistant in Urdu that cannot depend on a stable internet connection. These are the gaps that frontier cloud models technically cover but practically do not — because the latency, cost, and data sovereignty requirements make cloud inference unsuitable for the edge.

## The Bottom Line

Tiny Aya makes a credible argument that multilingual AI does not need to be a frontier-scale problem. A 3.35B model, trained on a single 64-GPU cluster, beats 4B-parameter competitors across the majority of translation benchmarks — because the team focused on the right problem: tokenizer design, data curation for underserved languages, and on-device efficiency.

The GGUF versions are on Hugging Face today. If you work in multiple languages or build for multilingual audiences, this is the strongest locally-runnable option available at its parameter size — and at 32 tokens per second on an iPhone, it is fast enough to actually use.
