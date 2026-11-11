---
layout: post
title: "On-Device Speech AI: A Private Voice Guide"
description: "Learn how on-device speech AI handles transcription and text-to-speech on iPhone, Mac, Android, and web—and what to test before calling it private."
keywords: "on-device speech AI, local speech recognition, offline text-to-speech, MediaPipe audio, private voice assistant"
date: 2026-11-11
---

**On-device speech AI can now turn speech into text and generate spoken replies on iPhone, Mac, Android, and the web without sending each utterance to a cloud model.** Google's November 10 release adds documented iOS and macOS paths for open-weight speech models through MediaPipe and LiteRT. The useful result is a modular local voice pipeline—but privacy, speed, and quality still depend on the complete app.

> **In short:** a private voice assistant needs three local stages: speech recognition, a language model, and text-to-speech. Google's new reference stack supplies the first and third stages across multiple platforms. It does not make every app using those components private, and Google's performance figures are vendor results rather than our own tests.

## What Is On-Device Speech AI?

On-device speech AI processes voice on the user's hardware instead of uploading audio to a remote transcription or synthesis service. A typical voice interaction has three separate steps:

1. **Automatic speech recognition (ASR)** converts microphone audio into text.
2. **A language model** interprets the text and generates an answer or action.
3. **Text-to-speech (TTS)** turns the result into playable audio.

Google's [launch announcement](https://developers.googleblog.com/on-device-speech-recognition-and-text-to-speech-in-google-ai-edge-gallery/) keeps those stages modular. An app can use compact speech models beside a small language model, then measure recognition, answer quality, and voice latency separately.

## What Did Google Actually Release?

The announcement describes two different paths, and their numbers should not be mixed.

**Android's ML Kit path** uses speech models managed by Google's system services. Google reports recognition across more than 100 languages, transcription at roughly 10 times real time, and TTS across 21 locales. Those figures describe Google's integrated Android implementation, not the open models running on every iPhone, Mac, or browser.

**The cross-platform MediaPipe path** uses downloadable `.litertlm` bundles. Google's [Audio Transcriber documentation](https://developers.google.com/edge/mediapipe/solutions/audio/audio_transcriber) includes Swift examples for clips and streaming microphone buffers. Its [Text-to-Speech task](https://developers.google.com/edge/mediapipe/solutions/audio/text_to_speech) documents Swift integration and returns 24 kHz mono PCM audio.

The open-source [Google AI Edge Gallery](https://github.com/google-ai-edge/gallery) demonstrates the full flow: live dictation, local chat, spoken replies, model selection, and sentence-synchronized playback. Google labels the app an experimental beta, so it is a reference implementation rather than proof of production quality on every supported device.

## Which Local Speech Models Fit iPhone and Mac?

The best model depends on whether the priority is language coverage, download size, or voice variety.

| Model | Job | Bundle and coverage | Practical trade-off |
|---|---|---|---|
| Parakeet-TDT 0.6B v3 | Speech-to-text | 615 MB; 25 European languages | Broad ASR coverage, but a much larger local footprint than the TTS options |
| Phonon 31M | Text-to-speech | 84 MB; English | Smallest listed bundle; limited to English |
| PocketTTS 100M | Text-to-speech | 156 MB for English; 725 MB for seven languages | More voices and language options at a higher storage cost |
| Kokoro-82M | Text-to-speech | Multilingual model with CPU and GPU variants | More deployment choices, but hardware behavior needs device-specific testing |

The [Parakeet LiteRT model card](https://huggingface.co/litert-community/parakeet-tdt-0.6b-v3) documents iOS and macOS support, automatic language detection, punctuation, and capitalization. It reports a 7.73% mean word-error rate across 25 languages on FLEURS, including 7.31% for Polish. Those evaluations do not guarantee results for noisy rooms, unusual names, accents, or a particular microphone.

The same card reports 765–800 MB peak memory for its INT8 model on a Galaxy S24 Ultra. That is not an iPhone measurement. A voice app may also hold ASR, the language model, TTS, audio buffers, and conversation state at the same time.

For synthesis, the [Phonon model card](https://huggingface.co/litert-community/phonon-31m-en) documents an 84 MB INT8 bundle under Apache 2.0. [PocketTTS](https://huggingface.co/litert-community/pocket-tts) offers single-language downloads or one 725 MB bundle covering seven languages. Check size, license, voices, and language support before choosing a default.

## How Should a Local Voice Pipeline Be Built?

A practical pipeline should stream work instead of waiting for every stage to finish completely:

1. Feed short microphone buffers into ASR and show interim text.
2. Finalize the transcript when the user stops speaking.
3. Send only the finalized text to the local language model.
4. Split the answer at sentence or clause boundaries.
5. Synthesize the first complete segment while the model continues generating later text.
6. Queue playback so inference and audio do not compete unpredictably for memory and compute.

Google's reference implementation removes Markdown and skips code blocks and tables before speech, so formatting is not recited as ordinary prose.

If the language-model step needs both audio and other media, the [LFM3 local model guide]({% link _posts/2026-11-04-lfm3-local-ai-model-guide.md %}) compares focused audio and multimodal options. For ordinary voice chat, separate ASR and TTS components may be easier to replace, profile, and constrain.

## Is On-Device Voice Automatically Private?

No. Local inference can keep microphone audio, transcripts, prompts, and synthesized speech off a remote inference service. That is useful for dictation, personal notes, and unreliable networks.

But the surrounding app can still transmit data through analytics, crash reports, cloud fallback, web search, remote tools, account sync, or backups. Model downloads also require a network connection before offline use unless the weights ship with the app.

Before calling a voice feature private, verify:

- it still transcribes and speaks after the models are downloaded and networking is disabled;
- cloud fallback is absent or clearly controlled by the user;
- raw audio and transcripts have explicit storage and deletion rules;
- diagnostics do not contain voice content or generated text;
- microphone permission is requested only when needed;
- remote tools receive only the data required for the chosen action.

Our [local AI privacy guide]({% link _posts/2024-06-08-privacy-in-ai-why-local-matters.md %}) explains why model location is only one part of the data path. The same boundary applies when local speech feeds an [Apple FoundationModels app]({% link _posts/2026-01-24-apple-foundationmodels-framework-on-device-ai-swift.md %}).

## What Should You Test Before Shipping?

A representative evaluation should measure:

- recognition errors for real accents, names, languages, noise, and interruptions;
- partial-transcript latency and the delay before final text stabilizes;
- time to first audible speech, not only total synthesis speed;
- peak memory when ASR, the language model, and TTS overlap;
- battery use and thermal throttling during a sustained conversation;
- audio quality for long sentences, numbers, abbreviations, and mixed languages;
- behavior after permission denial, low storage, model corruption, or lost connectivity;
- end-to-end network traffic and local data retention.

We did not run hands-on performance tests for this post. The published latency, accuracy, and memory figures come from Google and the linked model cards, under their stated hardware and evaluation conditions.

## The Bottom Line

MediaPipe's documented Swift support and the new `.litertlm` speech bundles give iPhone and Mac developers concrete local ASR and TTS options.

The right choice is not simply the smallest model. Select the language coverage and voices the product needs, then test recognition, first-audio latency, total memory, battery use, offline behavior, and every network path on the actual target devices. A local voice model is a strong privacy component; only the complete verified pipeline earns the privacy claim.

## Sources

- [Google Developers Blog: On-Device Speech Recognition and Text-to-Speech](https://developers.googleblog.com/on-device-speech-recognition-and-text-to-speech-in-google-ai-edge-gallery/), published November 10, 2026
- [Google AI Edge: MediaPipe Audio Transcriber documentation](https://developers.google.com/edge/mediapipe/solutions/audio/audio_transcriber)
- [Google AI Edge: MediaPipe Text-to-Speech documentation](https://developers.google.com/edge/mediapipe/solutions/audio/text_to_speech)
- [Google AI Edge Gallery: open-source reference implementation](https://github.com/google-ai-edge/gallery)
- [LiteRT Community: Parakeet-TDT 0.6B v3 model card](https://huggingface.co/litert-community/parakeet-tdt-0.6b-v3)

---

## Related Posts

- [LFM3 Local AI: Which 2B Model Should You Use?]({% link _posts/2026-11-04-lfm3-local-ai-model-guide.md %})
- [Privacy in AI: Why Your Data Should Stay on Your Device]({% link _posts/2024-06-08-privacy-in-ai-why-local-matters.md %})
- [Apple FoundationModels: On-Device AI for Every App]({% link _posts/2026-01-24-apple-foundationmodels-framework-on-device-ai-swift.md %})
