---
layout: post
title: "KV Cache Explained Simply: Why Chats Need Extra RAM"
description: "A beginner-friendly look at the KV cache: why your AI chat uses RAM beyond the model file, and easy habits that keep local AI stable on iPhone and Mac."
keywords: "KV cache explained simply, why local AI uses RAM, LLM memory iPhone, chat uses more memory, local AI beginner guide, context length RAM"
date: 2026-03-22
---

When you run AI **on your phone or Mac**, the app downloads a model file (often a few gigabytes). That number is easy to understand. What is harder to see is that **while you chat**, the app also keeps a growing pile of **scratch notes** in memory so the model does not have to reread your entire conversation from scratch every time it adds the next word. That scratch space is usually called the **KV cache**. It is a normal part of how modern language models work — and it is a big reason a long thread can feel fine at first, then get slow or unstable, even when the model file itself never changed.

**Simple version:** The model remembers the conversation by keeping extra data in RAM. **More words in the conversation means more of that extra data** — on top of the model file, the app, and the system.

## A simple analogy

Imagine the model is a student writing an essay while looking back at everything you have said so far. Without shortcuts, they would reread the whole transcript before writing **each new word**. That would be incredibly slow.

Instead, the app **saves summaries of what it already processed** — layer by layer inside the neural network — so the next word only needs incremental work. Those saved summaries take **RAM**. The longer the chat (or the bigger the document you pasted in), the more summaries it stores. That is the KV cache in everyday terms.

## Why is this different from the model file size?

The **model file** is mostly the model's **long-term knowledge** — like a reference library frozen on disk.

The **KV cache** is **session-specific working memory** for *this* conversation. It grows as:

- Your **prompt** gets longer (including anything you paste).
- The **assistant's reply** gets longer (each new token adds to what must be remembered for what follows).

When you start a **new chat**, that working memory is usually cleared and you start fresh. The model file stays the same.

## What makes the KV cache larger or smaller?

You do not need to be an engineer to use these rules of thumb:

- **Longer context → more RAM.** Roughly speaking, **doubling** how much text is "in play" tends to **about double** the KV side of memory (other overhead aside).
- **Bigger / deeper models** usually need **more** scratch space per word than tiny ones.
- **Different model designs** are more or less frugal. Two models with a similar file size can still behave differently in a long chat — one was simply built to use less working memory per token.
- **Quantization** (smaller model files) mainly shrinks the **library** part. The **conversation scratch pad** is separate; it may still use higher precision unless your app or engine optimizes that too. Our [practical quantization guide for iPhone and Mac](/blog/2025/11/12/practical-quantization-guide-iphone-mac-gguf/) walks through file-size trade-offs; this article is about the **chat** side.

If you want the deeper picture of how quantization affects weights, see our [LLM quantization explainer](/blog/2026/03/15/llm-quantization-explained-gguf-guide/).

## Two moments that feel different: "reading" vs "writing"

Apps usually do two kinds of work:

**1. Taking in your message (often called *prefill*)**  
The model processes your prompt (and big pastes) in one go. That step can be **heavy** and cause a short **spike** in memory and CPU — like cramming before answering.

**2. Writing the reply one piece at a time (*decode*)**  
After that, it adds the answer **step by step**. Each step **adds** a bit more to the KV cache. So the chat can feel okay at the start of the reply and **heavier** as the answer grows.

When an app shows **tokens per second**, it is usually talking about the **writing** phase, not the initial **reading** phase.

## How this looks on your iPhone or Mac

Think of memory as a few buckets:

| What | Plain-English role |
|------|---------------------|
| **Model weights** | The big download — the model's fixed knowledge. |
| **KV cache** | Grows with **this** conversation (your text + the reply so far). |
| **Short-lived work** | Spikes especially when the model **digests** a long paste. |
| **System + other apps** | Everything else sharing RAM. |

On a phone with **limited RAM**, a long thread or a huge paste can push the total over what is comfortable. The OS may then slow things down or close the app — and **many things** can contribute (not only the KV cache), including loading the weights, spikes during digest, or simply running out of headroom.

## Easy habits that help

These are the fixes that actually move the needle for most people:

1. **Start a new chat** when a topic is done, or **summarize** and continue in a fresh thread if the old one is huge.
2. **Paste only what you need** — a short excerpt beats dropping a book unless you truly need it all.
3. **Pick a model that matches your device** — smaller models and ones tuned for mobile often survive longer chats more calmly. Our [guide to model sizes](/blog/2025/08/13/understanding-model-sizes-in-2025/) helps connect "billions of parameters" to real-world expectations.
4. **Leave RAM headroom** — if the phone or Mac is already tight, close heavy apps before a long local session.
5. **Keep your app updated** — newer versions often include **speed and memory** improvements under the hood.

Cloud services hide this because they run on big servers. **Local AI** keeps your words on your device — and your device has to hold both the **model** and the **conversation working set**. That trade-off is exactly what makes offline and private setups possible.

## Does this relate to privacy?

Yes, in a small way. The KV cache lives in **RAM while you are using the app**. It is not the same thing as a saved chat log on disk, but it exists because processing happens **locally**. When you end the chat or force-quit, that RAM is typically freed.

It also helps explain a common confusion: **private** does not mean **free of limits**. Your laptop is not a datacenter — long-context marketing from cloud products does not magically apply to your pocket.

## If you want a bit more technical detail

For readers who like numbers: many decoder-style models store keys and values for each processed token across many internal layers. A common back-of-envelope shape is **roughly proportional to** conversation length, model depth and width, how many key/value channels the design uses, and numeric precision. Some newer architectures change that picture to handle very long text more efficiently; details vary by model — see our [Qwen 3.5 overview](/blog/2026/03/08/qwen-3-5-complete-model-family-local-ai/) for one public example of a long-context-oriented family.

The important beginner takeaway stays the same: **treat the model file plus a growing conversation buffer as your real budget**, not the file size alone.

## Takeaways

- The **KV cache** is **working memory** for the current conversation, not the whole model file.
- It tends to **grow with how much text is active** in the chat (your side and the assistant's).
- **Long pastes and endless threads** are the usual reasons people hit limits on phones and laptops.
- **Simple habits** — shorter context, smaller pastes, realistic model choices, updates — matter more than memorizing jargon.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the KV cache in simple terms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The KV cache is extra memory the app keeps while you chat so the model does not reprocess your entire conversation from scratch for every new word. It grows as your prompt and the assistant reply get longer."
      }
    },
    {
      "@type": "Question",
      "name": "Why does my local AI use more RAM than the model download size?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The download mostly reflects the model weights. During a chat, the app also allocates working memory for the conversation, including the KV cache, plus short-lived work when it processes long inputs. Long threads and large pasted documents increase that extra memory."
      }
    },
    {
      "@type": "Question",
      "name": "Does shrinking the model file shrink the KV cache?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quantization mainly reduces weight storage. The KV cache is separate and may still use higher precision unless the app or inference engine compresses it. Smaller weights can still free overall RAM that makes long chats more comfortable."
      }
    },
    {
      "@type": "Question",
      "name": "What can I do if local AI gets slow or crashes on a long chat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start a new chat, shorten what you paste, pick a smaller or more mobile-friendly model, close other heavy apps, and update your local AI app. These steps reduce how much conversation state must stay in memory at once."
      }
    },
    {
      "@type": "Question",
      "name": "What is prefill vs decode?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prefill is when the model processes your prompt in bulk. Decode is when it generates the reply step by step. Prefill can cause a short burst of work and memory; decode steadily grows the conversation cache as the answer lengthens."
      }
    }
  ]
}
</script>
