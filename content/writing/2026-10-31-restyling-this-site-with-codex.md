+++
title = "Restyling This Site With Codex"
date = 2026-10-31
description = "How I used Codex with GPT-5.6 Sol to restyle this website while keeping its simple, personal character."
draft = false 
[taxonomies]
categories = ["General"]
tags = ["misc"]
+++

I am not really a frontend or UI person, but I do know how things work there.

I can tell when something feels wrong on a page, but that does not mean I always know the CSS responsible for it. This site is personal, though, so I care about how it feels. I want it to be simple, calm, and centred on the things I write.

I recently restyled it with Codex using [GPT-5.6 Sol](https://developers.openai.com/api/docs/models/gpt-5.6-sol) at high reasoning effort.

It started with a question about SEO. Then I noticed inconsistent spacing, duplicated CSS, mobile problems, and pages that did not feel related. What began as a review slowly became a restyling of almost the entire site.

I did not begin with a finished design or a detailed reconstruction plan. I moved through the site one page at a time. I questioned new files, asked why styles were duplicated, compared mobile screenshots, and sometimes reversed changes that felt like too much. The design emerged through those small decisions rather than from one large redesign.

## Trying not to overdo it

An AI coding agent makes it very easy to add things. A page can quickly gain cards, borders, gradients, animations, and another stylesheet.

That speed is useful, but it can also produce too much design.

Some early changes looked cool but stopped feeling like my website. The About page was one example. It had more personality, but it also felt over-designed. I kept giving the same feedback:

> Tone it down a bit.

Codex could produce and modify the interface quickly, while I decided what actually belonged. We would add something, look at it, and remove the parts that made the page feel busy.

The goal was never to turn the site into a modern landing page. I wanted a slightly better version of what was already here.

## Minimal as a system

I started to think of minimalism as having fewer rules to remember, not just fewer things on the screen.

Links are blue and turn green when hovered. Writings, Notes, Paper, and their archives use the same visual language. Dates, tags, headings, lists, and the little `cd` navigation should not look as if they came from unrelated websites.

This meant sharing templates, using the existing Sass structure, removing duplicated code, and checking the same layouts on desktop and mobile. A new page can now inherit an existing pattern instead of needing its own design and stylesheet.

That is more useful to me than making one page impressive on its own.

## The Daveads Galaxy

The biggest addition was the [Daveads Galaxy](@/pages/galaxy.md): Daveads at the centre, categories as constellations, topics as planets, and articles inside them.

I did not want it to be a hardcoded visual that would break as I wrote more. It reads the categories and tags already used by Writings and Notes. When I publish something new, the Galaxy should understand where it belongs without me manually adding another planet.

Mobile made the feature more interesting. Planets needed useful touch targets. Tapping one had to reveal its articles. Zooming the Galaxy should not zoom the entire page, and the navigation still needed to work in full-screen mode. We also kept a list view for anyone who wants a simpler way to browse.

The Galaxy is more playful than the rest of the website, but it follows the same rule: content should drive the interface.

## Working with Codex

A lot of my feedback came through screenshots. I would notice too much empty space, an uncentred video, a heading disappearing on mobile, or two labels sitting too close together. I could point at the problem without knowing which template or Sass rule created it.

Codex could trace the element back to the code and make a focused change. I would look at the result and decide whether it felt right. That loop worked well for someone who is not a frontend person but still has an opinion about the result.

We also checked the less visible things: responsiveness, builds, internal links, test pages, the Atom feed, and whether Google Analytics remained untouched.

After experimenting, we refactored the Galaxy into smaller files and shared common code across other pages. Generated code can work while still being difficult for a human to own. I want to open the repository later, find the relevant file, and change it myself.

GPT-5.6 Sol at high reasoning effort was helpful when a small request crossed templates, Sass, JavaScript, content configuration, and mobile behaviour. The [official OpenAI documentation](https://developers.openai.com/api/docs/guides/reasoning) describes high effort as useful for complex planning, debugging, and agentic work, which matched this project.

But it did not replace taste. I still had to say when something was too much, protect the parts I liked, and ask whether a new file was really necessary.

Codex gave me implementation speed. I kept responsibility for what the website should feel like.

The site now has more capability, but its ordinary pages feel calmer and more consistent. More importantly, it still feels like mine.
