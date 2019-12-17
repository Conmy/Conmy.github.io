---
layout: post
author: David Conmy
title: I Built an Emulator
title-image: /assets/images/chip8/chip8-breakout.png
title-image-alt: Breakout running on my Chip-8 Emulator
excerpt_separator: <!--exerpt-->
categories:
tags:
    - emulator
    - programming
    - java
    - tdd
    - projects
---

I built an emulator as an exercise in developing a project using Test-Driven Development (TDD).

At the beginning of starting this project I had the following goals:
- Develop solely using TDD
- See how I can approach a problem with TDD principles
- Investigate how testing first influences how I develop a codebase
- Develop something cool
<!--exerpt-->

{% include image.html url='/assets/images/chip8/chip8-pong.png' description='Screenshot of Pong on my completed emulator' %}

## Non-Trivial
I wanted a project that would be non-trivial.

Whenever I'm trying a new framework or tool, my go-to project is a TODO list. This is the kind of project example you see all the time on different blogs or How-To articles. After a number of iterations, I would call this a trivial implementation.
This is what I wanted to avoid. I thought that if I had a new problem to solve it would give me a better understanding of whether TDD was a workflow that I could feasibly use to solve actually difficult problems or problems that I haven't faced before.

I wanted to create a project outside of my "comfort zone". I also wanted to make something cool.

## Inception
One of the benefits of having a background in Electronic Engineering is that I have quite a good fundamental understanding of Embedded Systems and Digial Systems Design. My Google suggestions are littered with articles about electronic devices, gaming devices and the latest articles from the world of application development. An emulator is a nice mix of all of these things.
I was delighted when this resulted in Google suggesting an article written by [someone else who created a nes emulator](https://kyle.space/posts/i-made-a-nes-emulator/).

Emulators were always something that interested me from the first time I saw an emulator magazine. It was advertising that I could play 100s of retro games from my PC at home by installing a small program. It even came with a disk with a number of emulators on it and even a few ROMS to run on them. (I'm sure these were all openly available and non-copyrighted ROMs - all above board and legal)

I also knew a NES emulator would be a timely project. It was maybe a project that would be too big for a test-run of a new programming approach but it was definitely a project that pulled my attention.

Enter the Chip-8.

## Chip 8

The Chip 8 is an interpreted programming language and isn't acually a physical chip so emulating it is a little different to emulating actual hardware but the principles are the same (or at least have some cross-over). It's a simple machine definition that originally ran on a [1970's COSMAC VIP](https://en.wikipedia.org/wiki/COSMAC_VIP) among other machines of that era. What's cool is that eventually interpreters of the chip8 started to appear on 1980's graphing calculators. I can only imagine the feeling of finding a way to play bootleg pong on a graphing calculator in the 80's. 
 
I will admit that I knew very little about this at the time of wanting to start this project but then I read that the Chip8 is a great starting point for learning about writing an emulator. Its instruction set is relatively small, the hardware definition isn't very complex, and it will get across the major design points of writing an emulator that I could write in a relatively short period of time.

I found this article about [how to write a chip 8 emulator](http://www.multigesture.net/articles/how-to-write-an-emulator-chip-8-interpreter/), pinned the [wiki page of the Op-Codes](https://en.wikipedia.org/wiki/CHIP-8) in my browser, re-read the article, and then set about writing my first emulator using a TDD approach.

{% include image.html url='/assets/images/chip8/chip8-breakout.png' description='Breakout on my Chip8 emulator' %}

## TDD

The practice of TDD at it's core is about iterating over the following steps:

- Write a Test
- Watch it Fail
- Make it Pass
- Refactor

The skill is in the approach to each of the steps.

There's a skill to writing tests. There's a skill to making tests pass. There's a skill to Refactoring. (There's a skill to watching the tests fail.)

The idea with this approach is that with the iterative process it gets easier to continue working on harder probelms because you always have a next step.