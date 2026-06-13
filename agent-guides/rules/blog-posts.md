
# Blog Post Workflow

## Step 1: Find a Trending Topic

Before writing, search the web for what's currently hot in AI. **Prioritize local and private AI developments** — this is the site's core niche and where we build topical authority. General/cloud AI topics are fine as a secondary mix to capture broader traffic.

**Primary focus (local/private AI):**
- On-device and edge AI model releases (Llama, Gemma, Phi, Qwen, Mistral, GGUF quantizations)
- Open-source LLM milestones and community developments
- Hardware enabling local AI (Apple Neural Engine, NPUs, edge AI chips, new iPhone/Mac capabilities)
- Privacy-focused AI news, regulations, and data sovereignty developments
- Practical guides for running AI offline on Apple devices
- Benchmarks and comparisons of local models on real hardware

**Secondary mix (general AI — use to capture broader search traffic):**
- Major cloud model releases (GPT, Claude, Gemini) — angle toward what this means for local alternatives
- AI product launches, funding rounds, or acquisitions
- Viral AI demos, controversies, or regulatory news
- "How to use AI for X" practical guides

Pick a topic with high current interest. Rehash the news in original words — don't copy, add perspective and practical context. When covering general AI topics, frame them through a local/privacy lens where natural (e.g. "New GPT-5 is impressive, but here's what open-source alternatives can do on your device"). Avoid repeating topics already covered in existing `_posts/` files.

## Step 2: Keyword Research

Before writing, identify:
- **Primary keyword** — the exact phrase you want to rank for (put in title + first 100 words)
- **3-5 secondary keywords** — related terms and long-tail variations
- **Search intent** — is the reader looking to learn, compare, or do something? Match the format to the intent

Target long-tail keywords (3-5 words) over broad ones. They have lower competition and higher conversion. Example: "run llama locally on iPhone" beats "AI models".

Prefer keywords in the local/private AI space — this is where the site has the most topical authority and can realistically compete. For general AI topics, find a long-tail angle that connects to on-device or privacy themes.

## Step 3: Write the Post

### Frontmatter (Required)

```yaml
---
layout: post
title: "Primary Keyword Near the Front — Keep Under 60 Characters"
description: "Compelling summary with keywords. Action-oriented. 140-155 characters max."
keywords: "primary keyword, secondary keyword, long-tail variation, related term"
date: YYYY-MM-DD
---
```

### File Naming

`_posts/YYYY-MM-DD-slug-with-keywords.md` — put keywords in the slug.

### Title Rules

- Front-load the primary keyword (first 3-4 words ideally)
- Stay under 60 characters so it doesn't get truncated in search results
- Use power formats: "How to...", "X Best...", "Why...", "Guide to...", "X vs Y"
- Make it specific — "5 Best Local LLMs for iPhone in 2026" beats "AI Models You Can Use"

### Content Structure

**Opening paragraph (first 100 words):**
- Answer the core question immediately (inverted pyramid style)
- Include the primary keyword naturally in the first 1-2 sentences
- This paragraph is what AI answer engines and featured snippets extract — make it self-contained and concise

**Body:**
- Use `##` (H2) for main sections — phrase these as questions or keyword-rich statements people actually search for
- Use `###` (H3) for subsections within those
- Keep paragraphs to 2-4 sentences max for scannability
- Use bullet lists, numbered lists, and bold key phrases — these get extracted by AI Overviews
- Include a definition or summary block near the top (featured snippet bait)
- Aim for 1,500-2,500 words for comprehensive guides, 800-1,200 for news/opinion pieces
- Cover the topic completely — depth beats length. Address follow-up questions a reader would naturally have

**Closing:**
- Summarize key takeaways
- Optionally mention Enclave AI if it naturally fits, but don't force it — the goal is traffic, not promotion

### Keyword Placement

Place the primary keyword in these locations:
1. Title (near the front)
2. First paragraph (first 100 words)
3. At least one H2 heading
4. Meta description
5. URL slug
6. Naturally throughout the body (don't stuff — write for humans, entity coverage matters more than density)

Use secondary keywords and semantic variations throughout the body. Google understands concepts via entity relationships, not keyword counting.

### Internal Linking

- Link to 2-3 related existing blog posts using descriptive anchor text (not "click here")
- Link to relevant site pages (features, FAQ) where natural
- This builds topical authority through content clusters — Google rewards interconnected coverage of a subject

### Formatting for AI Answer Engines

Modern search is shifting to AI-generated answers that cite sources. To get cited:
- Put a direct, concise answer in the first paragraph
- Use clear heading hierarchy (H2 > H3) so AI can parse structure
- Include lists and tables for comparative or step-by-step content
- Write paragraphs of 40-60 words for optimal extraction
- Add FAQ-style H2s phrased as questions ("How does X work?", "What is X?")

## Topic Diversity

Check existing posts in `_posts/` before writing to avoid overlap. Rotate across these angles:
- **News/trends** — what just happened in local or general AI this week
- **How-to guides** — practical tutorials (running models locally, quantization, optimization)
- **Explainers** — breaking down complex AI concepts for a general audience
- **Comparisons** — model X vs model Y, local vs cloud, tool A vs tool B
- **Listicles** — "N best local models/tools/tips for..."
- **Opinion/analysis** — industry predictions, what a development means for privacy and local AI
- **Use cases** — creative or professional applications of AI on-device

Aim for roughly 70% local/private AI content and 30% general AI content to maintain niche authority while capturing broader traffic. Each post should have a distinct primary keyword that no other post targets.
