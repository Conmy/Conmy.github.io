---
layout: post
author: David Conmy
title: I Built my First Emulator
title-image: /assets/images/chip8/chip8-pong.png
title-image-alt: Pong on my Chip-8 Emulator
excerpt_separator: <!--exerpt-->
categories:
tags:
    - emulator
    - programming
    - java
    - tdd
    - projects
---
I built an emulator as an exercise in developing a project using Test-Driven Development (TDD) principles.

When I set out to do this, I had the following goals:
- Develop solely using TDD on a non-trivial project
- Establish how to approach a problem I don't already know the answers to with TDD principles
- Demonstrate how testing first could allow me to develop complex scenarios that would otherwise be complicated to test using a more "traditional" approach
<!--exerpt-->

{% include image.html url='/assets/images/chip8/chip8-pong.png' description='Pong on my completed emulator' square=false %}

## Non-Trivial
I wanted a project that would be non-trivial.

By this I mean a project that isn't your standard "Todo list" project or another type of project that has been documented to an extent that I would already be mostly familiar with all the concepts before I even began.

I wanted to create a project outside of my "comfort zone" (not an average web-application). I also wanted to make something cool.

## Inception
One of the benefits of having a background in Electronic Engineering is that I have quite a good fundamental understanding of Embedded Systems. My Google suggestions are littered with articles about electronic components and devices as well as blog posts of how-to articles and articles about things like "Top-10 Developer Mistakes in Application Development".
I was delighted when this resulted in Google suggesting an article on [someone else who created a nes emulator](https://kyle.space/posts/i-made-a-nes-emulator/).

How cool is that? I wanted to create one too.

I knew a NES emulator would be a timely project. There are a lot of different components in a NES and a lot of different instructions in the instruction-set but a smaller project for a different device would be interesting.

Enter the Chip-8.

## 
