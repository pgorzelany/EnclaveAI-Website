---
layout: post
title: "Apple FoundationModels: On-Device AI for Every App"
description: "Learn how Apple's FoundationModels framework lets developers add private, on-device AI to iOS and macOS apps with just a few lines of Swift."
keywords: "Apple FoundationModels framework, on-device AI, Swift AI, Apple Intelligence developer, private AI app, iOS AI framework, guided generation Swift"
date: 2026-01-24
---

Apple's FoundationModels framework gives every Swift developer direct access to the ~3 billion parameter language model that powers Apple Intelligence — entirely on-device, with no cloud dependency. Shipping with iOS 26 and macOS Tahoe, this framework means any app can now offer AI features that run locally, respect user privacy, and work offline. Here's what it offers, how it works, and why it matters for the future of private AI.

## What Is the Apple FoundationModels Framework?

The FoundationModels framework is Apple's Swift API for integrating on-device language model capabilities into apps across iOS, iPadOS, macOS, and visionOS. Rather than requiring developers to bundle their own models or call external APIs, the framework provides access to the same compact language model already installed on every Apple Intelligence-capable device.

Key facts at a glance:

- **Model size**: ~3 billion parameters, optimized for Apple Silicon
- **Runs on**: iPhone (A17 Pro and later), iPad, Mac (M1 and later), Vision Pro
- **Quantization**: 2-bit weights via quantization-aware training (QAT)
- **Languages**: 15 supported languages
- **Privacy**: All inference runs on-device — no data leaves the device
- **Offline**: Works without internet connectivity
- **Cost to developers**: Free — no API keys, no per-token charges, no cloud infrastructure

This is a significant shift. Until now, developers who wanted AI in their apps either had to integrate a third-party API (sending user data to external servers) or ship their own model (adding hundreds of megabytes to the app). FoundationModels eliminates both problems.

## How Does It Work Under the Hood?

Apple's on-device model uses a dense decoder-only Transformer architecture with several optimizations tailored for Apple Silicon:

- **KV-cache sharing**: The model is split into two blocks with a 5:3 depth ratio. The second block shares key-value caches from the first block's final layer, reducing KV cache memory by 37.5% and improving time-to-first-token latency.
- **2-bit quantization-aware training**: Weights are compressed to just 2 bits per weight using QAT with learnable weight clipping. The embedding table uses 4-bit quantization. Despite aggressive compression, Apple reports only ~4.6% regression on MGSM and a 1.5% *improvement* on MMLU compared to the uncompressed model.
- **Grouped-query attention**: 8 key-value heads reduce the KV-cache footprint while maintaining quality.
- **RoPE positional embeddings**: Base frequency set to 500k for long-context support.
- **Low-rank adapter recovery**: Trained adapters recover quality lost during compression.

The result is a model that runs fast enough for real-time interaction on an iPhone, while fitting comfortably in memory alongside other apps.

## What Can Developers Build With It?

The framework supports four core capabilities that cover a wide range of AI-powered features.

### Guided Generation with @Generable

The standout feature is guided generation — Apple's approach to structured output. Instead of parsing free-form text, developers annotate Swift structs and enums with a `@Generable` macro, and the framework guarantees the model's output conforms to those types.

```swift
@Generable
struct RecipeSuggestion {
    var name: String
    var ingredients: [String]
    var cookingTimeMinutes: Int
    var difficulty: Difficulty

    @Generable
    enum Difficulty {
        case easy, medium, hard
    }
}
```

Behind the scenes, the Swift compiler translates this into a format specification, the framework injects it into the prompt, and a constrained decoding engine ensures the output matches — backed by the Swift type system. No manual JSON parsing, no hoping the model returns valid output.

### Tool Calling

Tool calling lets the model invoke app-defined functions to retrieve data or trigger actions. Developers implement a simple `Tool` Swift protocol, and the framework handles the orchestration of parallel and serial tool calls automatically.

This is what turns a text generator into an intelligent agent. A cooking app could let the model check pantry inventory, look up nutritional data, and suggest recipes — all through tool calls that stay entirely on-device.

### Streaming Responses

The framework supports streaming output for responsive user interfaces. Tokens arrive as they're generated, so apps can display incremental results without waiting for the full response. This is essential for chat interfaces and any feature where perceived speed matters.

### Custom Adapters

For specialized use cases, developers can train rank-32 LoRA adapters using Apple's Python-based training toolkit. These adapters teach the base model new skills specific to an app's domain — think medical terminology, legal language, or specialized formatting.

Adapters are distributed as `.fmadapter` packages and can be bundled as asset packs. One important caveat: adapters are tied to a specific base model version and must be retrained when the OS updates the underlying model.

## How Does It Compare to Running Your Own Models?

For developers already familiar with running models locally via llama.cpp, MLX, or GGUF files in apps like Enclave AI, the FoundationModels framework occupies a different niche:

| | FoundationModels | Self-hosted (GGUF, llama.cpp, MLX) |
|---|---|---|
| **Model choice** | Apple's ~3B model only | Any open model (Llama, Qwen, Gemma, etc.) |
| **Model size** | ~3B parameters | 0.5B to 70B+ depending on device |
| **Customization** | Adapters only | Full model selection, quantization, fine-tuning |
| **Setup complexity** | A few lines of Swift | Requires bundling runtime and model files |
| **App size impact** | Zero — model is part of the OS | Adds model file size to the app |
| **Structured output** | Native `@Generable` macro | Manual parsing or grammar-based constraints |
| **Offline** | Yes | Yes |
| **Privacy** | Fully on-device | Fully on-device |
| **Platform** | Apple only | Cross-platform |

The FoundationModels framework is ideal for developers who want to add lightweight AI features quickly without managing models. For power users and developers who need larger models, model variety, or cross-platform support, the self-hosted approach — using apps like [Enclave AI](https://enclaveai.app) or building with llama.cpp and MLX — remains the more flexible choice. Both approaches share the same core advantage: **your data never leaves your device**.

## What This Means for Private AI

Apple's decision to open up its on-device model through a first-party framework validates what the local AI community has been building toward for years. When the world's most valuable company makes on-device inference a core developer platform feature, it sends a clear message: **privacy-first AI is not a niche — it's the future**.

Here's why this matters beyond Apple's ecosystem:

- **Normalizes on-device AI**: As millions of apps adopt FoundationModels, users will come to expect AI features that work offline and keep data private. Cloud-dependent AI will increasingly feel like the exception.
- **Raises the bar for privacy**: Developers now have a zero-excuse path to private AI on Apple platforms. Users and regulators will notice.
- **Validates small models**: Apple proving that a well-optimized 3B model can power production features undermines the narrative that useful AI requires massive cloud infrastructure.
- **Complements open-source**: The framework covers basic use cases elegantly, but complex tasks, larger context windows, and multi-modal workflows still benefit from the open-source model ecosystem running on tools like [Enclave AI](/blog/2026/01/15/local-ai-early-2026-ces-highlights-new-models/). Apple's framework and the open-source community are complementary, not competing.

With the EU AI Act reaching full enforcement in August 2026, the timing is particularly relevant. On-device processing sidesteps many compliance headaches around data transfer, storage, and processing — a practical benefit that goes well beyond philosophical privacy preferences.

## Getting Started

If you're a developer ready to explore the framework, here's how to begin:

1. **Check requirements**: Mac with Apple Silicon, macOS Tahoe 26, Xcode 26
2. **Watch the WWDC sessions**: Start with [Meet the Foundation Models framework](https://developer.apple.com/videos/play/wwdc2025/286/) and then the [hands-on code-along](https://developer.apple.com/videos/play/wwdc2025/259/)
3. **Try guided generation first**: The `@Generable` macro is the quickest way to get structured, reliable output
4. **Experiment with tool calling**: Define a few simple tools and observe how the model orchestrates them
5. **Profile and iterate**: Use the framework's built-in profiling to understand latency and optimize your prompts

Apple also published [Generative AI Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/generative-ai) to help design AI features responsibly — worth reading before shipping anything to users.

## The Bigger Picture

The FoundationModels framework is one piece of a much larger shift. Across the industry, on-device AI is becoming practical and mainstream — from [new hardware announced at CES 2026](/blog/2026/01/15/local-ai-early-2026-ces-highlights-new-models/) to the [rapid improvement of quantized open-source models](/blog/2025/11/12/practical-quantization-guide-iphone-mac-gguf/) that run on everyday devices.

Whether you're a developer adding AI to your app, or a user who cares about where your data goes, the direction is clear: the most powerful AI will increasingly be the AI that runs right on your device.

---

## Related Posts

- [Local AI in Early 2026: CES Highlights and New Models]({% link _posts/2026-01-15-local-ai-early-2026-ces-highlights-new-models.md %})
- [The Practical Quantization Guide for iPhone and Mac]({% link _posts/2025-11-12-practical-quantization-guide-iphone-mac-gguf.md %})
- [Gemma 3n on iOS and macOS]({% link _posts/2025-06-29-gemma-3n-on-ios-and-macos.md %})
