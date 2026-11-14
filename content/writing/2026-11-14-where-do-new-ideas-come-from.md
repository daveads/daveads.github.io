+++
title = "Where Do New Ideas Come From?"
date = 2026-11-14
description = "If ideas come from learning, where do new ideas come from when we let AI do more of the work?"
draft = true

[taxonomies]
categories = ["AI"]
tags = ["creativity", "llms"]
+++

Why do ideas feel like they’re becoming scarce?

And why do LLMs still seem to need us (humans) to be part of the loop to come up with something genuinely new?

An **idea** is a thought or possibility that comes to you as a result of thinking, learning, or experiencing something. **Creativity** is the ability to produce something original and valuable. The two are different. You can have an ordinary idea and still do something creative with it, and often the creativity is in what you do next, not in the idea itself.

## LLMs are very good at remixing

I think of LLMs as idea multipliers. They learn patterns from vast amounts of writing and code, and when you hand one the seed of an idea, it can take it in dozens of directions, including some you wouldn't have thought of.

So what is it actually doing? A Transformer splits text into pieces called tokens and turns each one into a list of numbers. Those numbers get multiplied by matrices, which are grids of weights the model learned during training. In an attention layer, that math lets each token score how relevant the earlier tokens are and pull in information from them. After many layers, the model scores every possible next token, picks one, adds it to the text, and repeats ([Attention Is All You Need](https://arxiv.org/html/1706.03762)).

It can combine patterns in ways it never saw during training. That deserves to be taken seriously, because humans do something similar. Most of our ideas are recombinations of things we've read, seen, and heard. If recombination were the whole story, there would be no reason for a person to be in the loop at all. So what is missing?

## The missing piece is the spark

I call it the initial spark: the moment something you saw or learned makes you question what you thought you knew. You go out to do one thing and come back with a question you never expected to ask. Once you've asked it, you start noticing things you used to walk right past.

My answer is that a model has everything except a reason to start. It doesn't walk into a room and get surprised. Nothing it tried last week failed in a way that still bothers it. It has no stakes, so it has no itch.

For people, the spark is the start of a loop:

1. We experience or learn something.
2. That gives us an idea.
3. We try it, and what happens teaches us something new.
4. That new knowledge changes what we notice next.

An LLM can give you the first suggestion. It can't give you the surprise that makes you care about the suggestion.

## What happens if we stop looping?

This is also my answer to the first question. Ideas themselves aren't scarce, since a model will hand you ten in seconds. What gets scarce is the new question, and new questions come from doing the work.

If ideas come from learning, then letting AI do everything for us has a cost. If I stop trying things myself, I stop being surprised. If I stop being surprised, I stop asking new questions, and eventually the only prompts I have left are the ones I've already asked.

There's early evidence of something like this. In one short-story experiment, readers rated stories by writers with access to AI suggestions as more creative and better written, but those stories were also more similar to one another. Better individually, more similar collectively ([Doshi and Hauser, *Science Advances*, 2024](https://doi.org/10.1126/sciadv.adn5290)).

That matters because the things we make carry the fingerprints of the lives behind them. Different experiences are a big part of why things have different flavours, different faces, and different kinds of beauty. If we all lean on the same tool and stop having our own experiences, the world starts to feel a little more the same.

## But machines are starting to loop too

This isn't a permanent argument that machines can't do this. Models are increasingly given tools, memory, and the ability to act and learn from the results. That starts to resemble the loop above.

Still, a loop isn't the same as an experience. Running an experiment and logging the result is not the same as being changed by it. I'm not sure where that line is, or whether it's a real line at all.
