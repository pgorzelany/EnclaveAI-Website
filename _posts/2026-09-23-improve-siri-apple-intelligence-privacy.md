---
layout: post
title: "Improve Siri & Apple Intelligence: Privacy Guide"
description: "Learn what Improve Siri & Apple Intelligence shares, how long Apple may retain it, and how to turn the optional AI training setting off on iPhone or Mac."
keywords: "Improve Siri and Apple Intelligence privacy, Apple Intelligence training opt-in, Siri data retention, Apple AI privacy setting, foundation model training"
date: 2026-09-23
---

**Improve Siri & Apple Intelligence privacy** comes down to an optional setting: when you opt in, Apple can collect Siri, Dictation, and Translate interactions to improve its services and train foundation models. The setting is separate from simply using Apple Intelligence. You can leave it off, keep using supported features, and review it later under **Privacy & Security > Analytics & Improvements**.

> **Quick answer:** Opting in can share audio, transcripts, responses, and related request data with Apple. Apple says the data is not tied to your Apple Account, but it may be retained for up to two years, and reviewed interactions may be kept longer. The switch can be changed at any time.

## What does Improve Siri & Apple Intelligence share?

Apple published a dedicated [support guide on September 16, 2026](https://support.apple.com/en-us/127070) and a more detailed [privacy notice dated September 14](https://www.apple.com/legal/privacy/data/en/improve-intelligence/). Together, they describe a program covering **Siri, Dictation, and Translate**.

If you enable Siri AI and opt in, Apple's legal notice says it may store:

- Audio and transcripts of what you say or type to Siri
- Siri's responses and continued conversations
- Related request data, including the request category, device specifications, performance statistics, and approximate device location
- Translate audio, text input, transcripts, and responses
- Requests routed through the ChatGPT extension, when that extension is also enabled

Apple's support page summarizes this as storing and reviewing “samples.” The legal notice is broader: it says Apple **may store all Siri and Dictation interactions** for an opted-in Siri AI user, while a subset may be selected for human review. That fuller notice is the safer basis for a privacy decision.

Apple says it does not associate this data with your Apple Account or email address. Instead, it uses a random device-generated identifier that rotates multiple times per hour. That is a meaningful safeguard, but not the same as collecting no data: Apple may connect identifiers when you return to the same conversation, and a reviewer may see context relevant to grading a response, such as contact names or installed apps.

## How long can Apple keep Siri improvement data?

Apple says opted-in data may be **retained and used for up to two years**. A small subset of interactions that has been reviewed may be kept beyond two years for continued improvement of Siri, Dictation, Search, other language features, and Apple's foundation models.

The company also says:

- Request history is not used to build a marketing profile.
- Request history is never sold.
- Only Apple employees review Siri, Dictation, and Translate audio.
- Trusted third-party service providers may process or store program data.

These are Apple’s stated policies, not a guarantee that sharing is risk-free. The practical question is whether contributing your real interactions is worth the model-improvement benefit to you.

## Is this the same as normal Apple Intelligence processing?

No. Three related systems are easy to confuse:

| Setting or system | What it does | What leaves the device? |
|---|---|---|
| **Improve Siri & Apple Intelligence** | Contributes interactions for product improvement and foundation-model training | Opted-in audio, text, transcripts, responses, and request data may be collected |
| **Share Device Analytics** | Helps Apple learn aggregate usage trends | Apple says differentially private signals can be shared without individual content |
| **Private Cloud Compute** | Handles requests too complex for the on-device model | The request is processed remotely, but Apple says its content is not retained or accessible to Apple |

Apple's general [Apple Intelligence privacy notice](https://www.apple.com/legal/privacy/data/en/intelligence-engine/) says many tasks run entirely on-device. When a task uses Private Cloud Compute, Apple says the request is processed only to fulfill it, is not stored, and is not accessible to Apple. You can inspect off-device requests by enabling **Apple Intelligence & PCC Report** under Privacy & Security.

Device Analytics is another independent choice. In its [technical explanation of differential privacy](https://machinelearning.apple.com/research/differential-privacy-aggregate-trends), Apple says participating devices can report noisy, aggregated signals about common prompt patterns without sending unique prompts or sampled email contents. That mechanism is materially different from the Improve Siri program's collection of interactions.

## How do you turn Improve Siri & Apple Intelligence off?

On an iPhone or iPad:

1. Open **Settings**.
2. Tap **Privacy & Security**.
3. Tap **Analytics & Improvements**.
4. Turn **Improve Siri & Apple Intelligence** off.

On a Mac:

1. Open **System Settings**.
2. Select **Privacy & Security**.
3. Open **Analytics & Improvements**.
4. Turn **Improve Siri & Apple Intelligence** off.

Apple says the initial preference from an iPhone or iPad can carry over to a newly configured Apple Watch, HomePod, Apple TV, or supported HomeKit accessory. Check each device if you want to confirm its current state. Apple publishes device-specific paths in its [support instructions](https://support.apple.com/en-us/127070).

Turning this improvement setting off is not the same as disabling Siri, Dictation, or Apple Intelligence. If you want to stop those features or delete locally stored Siri transcripts, Apple documents separate controls in the full privacy notice.

## What should privacy-conscious users check?

Use this short audit instead of treating “on-device” as a blanket promise:

1. **Review both switches.** Check Improve Siri & Apple Intelligence and Share Device Analytics separately.
2. **Enable the PCC report.** It shows when Apple Intelligence sends a request off your device for Private Cloud Compute or an enabled extension.
3. **Recheck after setup.** A choice made during device setup can propagate to other Apple devices.
4. **Match the tool to the data.** For especially sensitive text, a deliberately offline workflow removes the improvement-program and cloud-processing questions entirely.

That last distinction matters. On-device inference can reduce exposure, but privacy also depends on analytics, synchronization, extensions, and tool permissions. Our guides to [why offline AI matters]({% link _posts/2024-02-15-why-offline-ai-matters.md %}) and [Apple Intelligence prompt-injection risks]({% link _posts/2026-04-12-apple-intelligence-prompt-injection-on-device-ai-security.md %}) cover those separate parts of the threat model. Developers can also compare Apple's system features with the [FoundationModels framework for fully on-device app workflows]({% link _posts/2026-01-24-apple-foundationmodels-framework-on-device-ai-swift.md %}).

## The bottom line

Improve Siri & Apple Intelligence is an **optional contribution program**, not a requirement for using Apple Intelligence. Opting in can help Apple improve Siri and train foundation models, but it also permits collection and retention that normal on-device processing is designed to avoid.

The most useful action is simple: open **Analytics & Improvements**, read the two Apple Intelligence-related choices separately, and set them according to the sensitivity of your conversations—not according to a vague assumption that every Apple AI feature stays entirely on your device.

## Sources

- [Apple Support: Turn Improve Siri & Apple Intelligence on or off](https://support.apple.com/en-us/127070), published September 16, 2026
- [Apple Legal: Improve Siri & Apple Intelligence & Privacy](https://www.apple.com/legal/privacy/data/en/improve-intelligence/), dated September 14, 2026
- [Apple Legal: Apple Intelligence & Privacy](https://www.apple.com/legal/privacy/data/en/intelligence-engine/), dated September 14, 2026
- [Apple Machine Learning Research: Understanding Aggregate Trends Using Differential Privacy](https://machinelearning.apple.com/research/differential-privacy-aggregate-trends), updated September 9, 2026
