---
layout: post
title: "llama.cpp Decision Models: A Local AI Guide"
description: "Learn how llama.cpp decision models score choices locally, when to use the System One API, and why confidence still requires testing on your data."
keywords: "llama.cpp decision models, local AI classification, System One API, local AI routing, GGUF decision models"
date: 2026-10-07
---

**llama.cpp decision models turn a fixed question into a structured local answer.** Instead of generating a paragraph token by token, a decision model scores options you provide and returns a choice, rating, or yes/no probability. llama.cpp added native support on October 2, 2026, making this useful pattern available through a local HTTP API and GGUF models.

> **In short:** use a decision model when your application needs to route, rank, or verify—not write. It can keep the evaluated data on your own machine, but its probability is not a guarantee. Test the model on representative examples and send uncertain or high-impact cases to a person.

## What Are llama.cpp Decision Models?

A generative language model predicts the next token repeatedly until it builds a response. A **decision model** is trained to read a state and score a set of possible answers directly. The state might be a support message, a document, an agent's latest action, or structured JSON.

The new llama.cpp endpoint follows the [System One API format](https://docs.typesafe.ai/api). It accepts three question types:

| Question type | What you provide | What the model returns |
|---|---|---|
| `choice` | Named options and optional descriptions | The highest-scoring option and a distribution across all options |
| `score` | An ordered rubric with 2–10 levels | A probability-weighted position on that scale |
| `noul` | A yes/no question | The probability assigned to yes |

The API always returns JSON with the same answer shape. That removes a common failure mode in automation: asking a chat model for JSON and then discovering that it added commentary, changed a key, or invented an option.

## What Did llama.cpp Add?

The merged [llama.cpp implementation](https://github.com/ggml-org/llama.cpp/pull/29818) adds a `POST /v1/systemone` route, conversion support, GGUF metadata for decision architectures, model discovery, multimodal input for compatible models, and server tests. The project also published a [curated GGUF decision-model collection](https://huggingface.co/collections/ggml-org/decision-models).

The maintainer announcement initially documented models ranging from a 144-million-parameter text classifier to 27-billion-parameter multimodal models. Licenses, modalities, model sizes, and hardware needs differ, so check each model card before choosing one. For example, the [Kev-4B GGUF card](https://huggingface.co/ggml-org/Kev-4B-GGUF) lists Apache 2.0 and provides several quantizations.

This is a new server capability, not a new chat mode. A native decision model exposes `decisions` in its output modalities, and some decision-only models cannot generate text at all. Update llama.cpp before trying the endpoint: `/v1/systemone` first landed in build 11361, so older builds will not recognize it.

## When Is a Local Decision Model Better Than Chat?

Decision models fit workflows where the allowed outcomes are known in advance:

- **Route a request** to billing, technical support, or sales.
- **Check an agent step** against a small set of completion criteria.
- **Moderate or label content** with a defined policy taxonomy.
- **Prioritize a queue** using an ordered urgency rubric.
- **Choose the next tool** from a fixed list of actions.

They are a poor fit when the answer must be open-ended, creative, explanatory, or based on facts the model may not know. A chat model should still draft the reply; a decision model can decide which workflow receives it.

That separation can make local agents easier to reason about. One model produces language, while another performs a narrow check with typed outcomes. It does not make the system infallible, but it creates a cleaner boundary for logging, evaluation, and human review.

## How Do You Run a Decision Model Locally?

The [official llama.cpp guide](https://huggingface.co/blog/ggml-org/decision-models-in-llamacpp) starts a supported model with one command:

```bash
llama serve -hf ggml-org/Kev-4B-GGUF
```

Your application then sends a state and one or more typed questions to `http://localhost:8080/v1/systemone`. A minimal request can ask which team should receive a message:

```json
{
  "state": "I was charged twice and need a refund.",
  "questions": {
    "route": {
      "type": "choice",
      "instructions": "Which team should handle this?",
      "criteria": {
        "billing": "charges, refunds, and invoices",
        "technical": "bugs and login problems"
      }
    }
  }
}
```

Describe each option clearly. The announcement shows that bare labels can produce a different route than labels with useful descriptions. If several questions share the same state, send them together; supported causal models can reuse the shared prefix rather than reading it again for every question.

GGUF quantization can reduce the model's memory footprint, but it can also change accuracy. Our [LLM quantization guide]({% link _posts/2026-03-15-llm-quantization-explained-gguf-guide.md %}) explains why a smaller file is not automatically the best choice.

## Can You Trust the Returned Confidence?

Not without validation. The [llama.cpp server reference](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md#post-v1systemone-typesafe-compatible-system-one-api) warns that probabilities are temperature-scaled from model metadata and are **not guaranteed to be calibrated for your data**. The OpenJev specification makes the same distinction: confidence describes how concentrated the returned distribution is, not whether the answer is correct.

A safe deployment process is straightforward:

1. Build a representative test set with expected decisions.
2. Measure errors separately for every class and important user group.
3. Choose thresholds from that evidence, not from a round number such as 0.8.
4. Route low-confidence and high-consequence cases to a person.
5. Re-run the evaluation after changing the model, quantization, prompt, or criteria.

The speed figures in the announcement are vendor measurements on an NVIDIA RTX PRO 6000, not Enclave AI testing and not evidence of performance on a Mac or iPhone. Benchmark the exact model, quantization, context length, and device you plan to use.

## Does Local Classification Improve Privacy?

It can reduce data exposure because the model and API can run on your own hardware. A support ticket, private note, or screenshot does not need to be sent to a hosted inference provider merely to choose a category.

Local inference is only one part of privacy, though. The surrounding application can still upload logs, analytics, prompts, or model inputs. Review the full data path, restrict network access where appropriate, and avoid placing raw sensitive content in diagnostic logs. Our guide to [why offline AI matters]({% link _posts/2024-02-15-why-offline-ai-matters.md %}) covers that broader boundary.

## The Bottom Line

llama.cpp decision models add a focused tool to the local AI stack: typed choices and probabilities without free-form generation. They are especially promising for routing, validation, moderation, and small agent-control steps where predictable output matters more than eloquent text.

The practical rule is simple: use them for bounded decisions, evaluate them on your own cases, and treat confidence as a signal rather than proof. For the larger project context, see how [llama.cpp's move to Hugging Face supports local AI]({% link _posts/2026-02-21-llama-cpp-joins-hugging-face-local-ai.md %}).

## Sources

- [ggml-org: New in llama.cpp — Decision Models](https://huggingface.co/blog/ggml-org/decision-models-in-llamacpp), published October 2, 2026
- [llama.cpp pull request #29818: Add the System One API](https://github.com/ggml-org/llama.cpp/pull/29818), merged October 2, 2026
- [llama.cpp server reference: `/v1/systemone`](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md#post-v1systemone-typesafe-compatible-system-one-api)
- [TypeSafe AI: System One API reference](https://docs.typesafe.ai/api)
- [ggml-org: GGUF decision-model collection](https://huggingface.co/collections/ggml-org/decision-models)

---

## Related Posts

- [llama.cpp Joins Hugging Face: What It Means for Local AI]({% link _posts/2026-02-21-llama-cpp-joins-hugging-face-local-ai.md %})
- [LLM Quantization Explained: Run Bigger Models on Less RAM]({% link _posts/2026-03-15-llm-quantization-explained-gguf-guide.md %})
- [Why Local AI Matters: The Benefits of Offline Language Models]({% link _posts/2024-02-15-why-offline-ai-matters.md %})
