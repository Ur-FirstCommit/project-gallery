---
id: sign-sense
slug: sign-sense
title: Sign Sense
description: A gentle practice companion that gives visual feedback while learners rehearse basic sign language.
category: AI
eventId: beginners-paradise-2026
featured: true
status: In progress
technologies: Python, MediaPipe, Webcam
creators: sana-khan, amina-joseph
imageTheme: signal
thumbnail:
images:
createdAt: 2026-07-20
updatedAt: 2026-08-02
---
## Overview
Sign Sense is a browser-based practice space designed with patience in mind. It recognises broad hand positions and offers encouraging, understandable feedback rather than a score.

## Build Story
### Start with confidence | Jul 18 | idea
We focused on how intimidating a first practice session can feel for a beginner.

### A hand tracking breakthrough | Jul 19 | breakthrough
After several experiments, we could reliably detect a small set of broad hand positions.

### A kinder feedback loop | Jul 20 | final
We replaced a numerical score with plain-language tips and a clear retry action.

## Development Telemetry
- Active days: 3
- Contributors: 2
- Primary stack: Python

## What I Learned
I learned that an AI feature still needs careful product thinking. The hard part was not getting a prediction; it was explaining its limits honestly and kindly.

## Challenges
### Keeping feedback helpful when recognition is uncertain.
How I solved it: We designed for suggestions, not judgement, and added a visible note about what the prototype can and cannot recognise.

## AI Usage
Categories: Research, Debugging
AI tools helped us understand computer-vision documentation and debug a browser permission issue. The recognition flow was designed and tested by our team.
