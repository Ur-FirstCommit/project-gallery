---
id: bloom-console
slug: bloom-console
title: Bloom Console
description: A small desk companion that helps new plant owners notice when their plants need attention.
category: Hardware
eventId: build-weekend-2026
featured: false
status: Prototype
technologies: Arduino, C++, Sensors
creators: oliver-reed
imageTheme: bloom
thumbnail:
images:
createdAt: 2026-05-11
updatedAt: 2026-05-12
---
## Overview
Bloom Console combines simple moisture readings with a friendly physical display. Rather than promising perfect plant care, it makes patterns easier to notice.

## Build Story
### A calmer plant reminder | May 9 | idea
The goal was to make plant care feel less like another notification.

### The noisy sensor problem | May 10 | bug
Early readings jumped wildly, so I learned to smooth the values before displaying them.

### A living desk object | May 11 | final
The final enclosure gave the prototype a warm, understandable presence.

## Development Telemetry
- Active days: 3
- Contributors: 1
- Primary stack: Arduino

## What I Learned
I learned how physical components behave differently from code. A sensor value is messy, and that is normal.

## Challenges
### Turning inconsistent data into a meaningful cue.
How I solved it: I averaged several readings and only changed the display after a sustained trend.

## AI Usage
Categories: Learning
I used AI as a study partner to understand the sensor calibration examples I was reading.
