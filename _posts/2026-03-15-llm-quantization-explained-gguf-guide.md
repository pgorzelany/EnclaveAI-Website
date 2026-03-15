---
layout: post
title: "LLM Quantization Explained: Run Bigger Models on Less RAM"
description: "What is LLM quantization? A plain-English guide to how it works, what GGUF types like Q4_K_M mean, and how to pick the right one for your hardware."
keywords: "LLM quantization explained, what is GGUF quantization, Q4_K_M vs Q5_K_M, run LLM on less RAM, quantization quality loss, local AI model size"
date: 2026-03-15
---

LLM quantization is a compression technique that shrinks a language model's memory footprint by storing its parameters in lower-precision number formats — for example, using 4 bits per weight instead of 16. This lets you run models that would normally require 14 GB of RAM in under 4 GB, with surprisingly little quality loss. If you have ever wondered how people run 70-billion-parameter models on a laptop, or what "Q4_K_M" means on a Hugging Face download page, this guide explains it from the ground up.

## What Are Model Weights?

A language model is, at its core, a massive collection of numbers called **weights**. These weights are the learned values that determine how the model processes language — what words relate to each other, how grammar works, what facts it has absorbed from training data.

A 7-billion-parameter model has 7 billion individual weight values. A 70-billion-parameter model has ten times as many. The model's intelligence lives entirely in these numbers.

The question is: how precisely do you need to store each one?

## How Precision Determines Model Size

During training, each weight is typically stored as a **floating-point number** — a format that uses a sign bit, an exponent, and a mantissa (fractional digits) to represent decimal values with high precision.

The three formats you will see most often:

- **FP32 (32-bit float)**: 4 bytes per weight. Highest precision (~7 decimal digits), used during training for accuracy. A 7B model in FP32 takes about **28 GB**.
- **FP16 (16-bit float)**: 2 bytes per weight. Good precision (~3–4 decimal digits), the standard format for distributing trained models. A 7B model in FP16 takes about **14 GB**.
- **BF16 (Brain Float 16)**: 2 bytes per weight. Same size as FP16 but trades fractional precision for a wider range of representable values. Increasingly common as a training and distribution format.

The memory formula is straightforward:

**Memory (GB) = Parameters × Bytes per weight**

A 7B model at FP16 (2 bytes per weight) = 7 billion × 2 = 14 GB. That is just for the weights — inference also needs memory for the KV cache (conversation context), activations, and runtime overhead.

This is where the problem becomes obvious. If a 7B model needs 14 GB just for weights, a 70B model needs 140 GB. Very few consumer devices have that kind of memory. And yet people run 70B models on 24 GB machines. How? Quantization.

## What Quantization Actually Does

Quantization reduces the number of bits used to store each weight. Instead of keeping every weight as a precise 16-bit float, you approximate it using fewer bits — 8, 5, 4, or even 2.

Here is a 7B model at different precisions:

| Precision | Bits per weight | Model size (7B) | Relative to FP16 |
|---|---|---|---|
| FP16 | 16 | ~14 GB | 100% |
| Q8 (8-bit) | 8 | ~7 GB | 50% |
| Q5 (5-bit) | 5 | ~4.5 GB | 32% |
| Q4 (4-bit) | 4 | ~3.8 GB | 27% |
| Q3 (3-bit) | 3 | ~3 GB | 21% |
| Q2 (2-bit) | 2 | ~2.5 GB | 18% |

At 4-bit quantization, a 7B model shrinks from 14 GB to under 4 GB — a 73% reduction. That is the difference between "does not fit in my phone's RAM" and "runs fine."

But storing a number with 4 bits instead of 16 is lossy. You are literally throwing away information. The question is: how much quality do you lose?

## How Much Quality Does Quantization Cost?

Researchers measure this using **perplexity** — a score that captures how surprised the model is by text it should be able to predict. Lower perplexity means the model is better at language. When you quantize, perplexity goes up (gets worse), and the increase tells you how much quality you sacrificed.

Here are real perplexity deltas from quantizing a 7B model, measured against the FP16 baseline (lower delta = less quality loss):

| Format | Bits (effective) | Perplexity delta | Plain-English impact |
|---|---|---|---|
| Q8_0 | 8.0 | +0.0004 | Essentially lossless |
| Q6_K | 6.0 | +0.0044 | Virtually no difference |
| Q5_K_M | 5.1 | +0.0142 | Very minor — hard to notice |
| Q4_K_M | 4.5 | +0.0535 | Small — fine for most tasks |
| Q4_K_S | 4.3 | +0.1149 | Noticeable on precision-sensitive tasks |
| Q3_K_L | 3.5 | +0.1803 | Meaningful degradation |
| Q3_K_M | 3.3 | +0.2437 | Significant quality loss |
| Q2_K | 2.5 | +0.8698 | Severe — only for extreme cases |

The pattern: 8-bit and 6-bit quantization are nearly lossless. 5-bit is excellent. 4-bit (specifically Q4_K_M) is the sweet spot where you get 73% compression with only a small quality penalty. Below 4 bits, degradation accelerates fast.

One critical caveat: perplexity is a statistical average across general text. Quantization does not degrade all tasks equally. Research shows it tends to hit **coding and STEM tasks** harder than general conversation, and it magnifies a model's existing weaknesses rather than creating new ones uniformly.

## GGUF and K-Quants: Why the Names Are So Confusing

If you have browsed Hugging Face for local models, you have seen names like `Q4_K_M`, `Q5_K_S`, `IQ3_XS`. These are **GGUF quantization types** — different strategies for how to compress weights, each with different trade-offs.

### What is GGUF?

GGUF is a file format created by the [llama.cpp](https://github.com/ggml-org/llama.cpp) project. A single `.gguf` file contains the model weights, architecture metadata, tokenizer, and everything needed to run the model. It is the standard format for local AI tools like llama.cpp, Ollama, and LM Studio, and it is what Enclave AI uses for downloaded models.

### K-Quants: The Modern Default

The "K" in Q4_K_M stands for **K-quant** — a quantization strategy that is smarter than simply rounding every weight to the nearest low-bit value. K-quants work by:

1. **Grouping weights into blocks** and computing a separate scaling factor for each block, so outlier values do not drag down the whole model.
2. **Using super-blocks** — blocks of blocks — with their own scaling factors (a technique called "double quantization") to reduce the overhead of all those per-block scales.
3. **Mixing precision across layers** — the `_S`, `_M`, and `_L` suffixes control how aggressively different parts of the model are compressed. `_M` (Medium) keeps the most sensitive layers at slightly higher precision, which is why Q4_K_M consistently outperforms Q4_K_S at a small size cost.

This is why a K-quant at 4 bits (Q4_K_M, perplexity delta +0.0535) dramatically outperforms a legacy 4-bit format (Q4_0, perplexity delta +0.2499). The bit count is similar, but the strategy is far more sophisticated.

### I-Quants: Maximum Compression

I-quants (IQ3_M, IQ4_XS, etc.) push compression even further using **importance-matrix calibration** — a process that analyzes which weights matter most for a specific model and preserves those more carefully. They achieve remarkable quality at 3 bits and below, but decode slower than K-quants on most hardware and require the calibration step during quantization.

### The Naming Pattern

| Part | Meaning | Example |
|---|---|---|
| Q | Quantized | Q4_K_M |
| Number | Approximate bits per weight | **4** |
| K / IQ | Quantization strategy (K-quant or I-quant) | **K** |
| _S / _M / _L | Precision mix: Small, Medium, or Large | **_M** |

## GGUF Is Not the Only Format

GGUF is the dominant format for CPU and hybrid CPU/GPU inference — which is how most people run models locally. But there are other quantization formats designed for different hardware:

- **GPTQ**: A post-training quantization algorithm optimized for Nvidia GPUs. It compresses weights layer by layer using calibration data to minimize error. Popular for pure-GPU inference servers.
- **AWQ (Activation-Aware Weight Quantization)**: Similar to GPTQ but prioritizes preserving the weights that have the highest impact on model outputs. Often achieves slightly better quality than GPTQ at the same bit width.
- **EXL2**: A flexible mixed-precision format that allows 2–8 bit quantization per layer. Runs through ExLlamaV2 and is popular for Nvidia GPU inference with fine-grained control.

If you are running models on a Mac, iPhone, or any setup involving CPU inference, GGUF is almost certainly what you want. The other formats are primarily relevant for dedicated Nvidia GPU servers.

## Two Approaches: Post-Training vs. Training-Aware

There are two fundamentally different ways to quantize a model:

**Post-Training Quantization (PTQ)** takes a fully trained model and compresses it after the fact. This is what tools like llama.cpp's `quantize` command do — you download an FP16 model and convert it to Q4_K_M. It is fast, simple, and produces good results at 4+ bits. The vast majority of GGUF files on Hugging Face are made this way.

**Quantization-Aware Training (QAT)** bakes quantization into the training process itself. The model trains while simulating the precision loss it will experience after compression, learning to compensate for it. The result is better quality at the same bit width — but it requires re-training the model, which is expensive and time-consuming.

Apple's on-device model in the FoundationModels framework uses QAT, running at 2-bit precision with quality that would be much worse if it were simply post-training quantized to 2 bits. When you see unusually good quality at very low bit widths, QAT is usually the reason.

## How to Choose the Right Quantization

For most people running local models, the decision comes down to how much RAM you have and how much quality you are willing to trade for it:

- **Plenty of RAM**: Use **Q8_0** or **Q6_K**. Essentially lossless, with the model behaving almost identically to the original.
- **Moderate RAM**: Use **Q5_K_M**. Excellent quality with meaningful size savings. The best choice when you can afford it.
- **Limited RAM**: Use **Q4_K_M**. The community consensus sweet spot — 73% smaller than FP16 with only minor quality loss for most tasks.
- **Very tight RAM**: Use **Q3_K_M** or **IQ3_M**. Expect noticeable quality degradation, but these can make otherwise impossible models fit on your device.

A bigger model at lower quantization almost always beats a smaller model at higher quantization. Running a 14B model at Q4_K_M will typically produce better results than running a 7B model at Q8_0 — because the extra parameters carry more knowledge than the extra precision preserves. When in doubt, pick the biggest model that fits your RAM at Q4_K_M or above.

For device-specific recommendations on which quantization to pick for your iPhone or Mac, see our [Practical GGUF Quantization Guide]({% post_url 2025-11-12-practical-quantization-guide-iphone-mac-gguf %}).

## Key Takeaways

- Quantization shrinks LLM memory usage by storing weights in fewer bits — 4-bit models are 73% smaller than 16-bit
- Quality loss at 4–5 bits is surprisingly small for most tasks (Q4_K_M perplexity delta: +0.0535)
- K-quants (Q4_K_M, Q5_K_M) are the modern standard — smarter compression preserves quality better than legacy formats
- GGUF is the standard file format for local AI; other formats like GPTQ and AWQ target Nvidia GPU inference
- When in doubt, use Q4_K_M — it is the community default for a reason
- Prefer a bigger model at Q4 over a smaller model at Q8 if both fit your RAM

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is LLM quantization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LLM quantization is a compression technique that reduces the number of bits used to store each weight in a language model. By using 4 bits instead of 16, a 7B model shrinks from 14 GB to under 4 GB with minimal quality loss, making it possible to run large models on consumer devices."
      }
    },
    {
      "@type": "Question",
      "name": "What does Q4_K_M mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Q4_K_M is a GGUF quantization type. Q4 means approximately 4 bits per weight, K means it uses K-quant block quantization with per-group scaling, and _M (Medium) means it keeps sensitive model layers at slightly higher precision. It is the most popular quantization choice for local AI."
      }
    },
    {
      "@type": "Question",
      "name": "How much quality do you lose with 4-bit quantization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At 4-bit K-quant (Q4_K_M), perplexity increases by about 0.05 compared to the unquantized model. This is a small penalty that most users cannot distinguish in general conversation. Quality loss is more noticeable in coding and math tasks, and below 4 bits degradation accelerates significantly."
      }
    },
    {
      "@type": "Question",
      "name": "Is it better to run a bigger model at lower quantization or a smaller model at higher quantization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A bigger model at lower quantization almost always wins. For example, a 14B model at Q4_K_M will typically outperform a 7B model at Q8_0, because the extra parameters carry more knowledge than the extra precision preserves."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between GGUF and GPTQ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GGUF is a file format optimized for CPU and hybrid inference, used by llama.cpp, Ollama, and LM Studio. GPTQ is a quantization algorithm optimized for Nvidia GPU inference. For running models locally on a Mac or iPhone, GGUF is the standard choice."
      }
    }
  ]
}
</script>
