# AGENTS.md

This file provides guidance to AI assistants when working with code in this repository.

## Project Overview

ReviewGuesser is a Chrome extension (Manifest V3) that gamifies browsing Steam store pages by challenging users to guess the number of reviews a game has before revealing the actual count. The extension tracks stats, streaks, and points across play sessions.

## Architecture

### Core Components

**Content Script ([src/content.js](src/content.js))**
- Runs on Steam store pages matching `https://store.steampowered.com/app/*`
- Self-executing function that maintains game state via `hasGuessed` flag
- Scrapes review counts from Steam's DOM (`.user_reviews_summary_row` elements)
- Dynamically creates and injects UI overlays replacing the native review display
- Implements scoring system based on order-of-magnitude distance from actual value
- Manages Chrome local storage for persistent stats (correct, total, streak, bestStreak, totalPoints)

**UI & Styling ([src/styles.css](src/styles.css))**
- Steam native color scheme: dark blue-gray gradients (#1b2838, #2a475e) and Steam green buttons (#5c7e10)
- Grid-based button layout for guess options (0-9, 10-99, 100-999, 1K-9K, 10K-99K, 100K+)
- Floating action buttons (random game navigation, stats display) positioned bottom-right
- Animations for results display (slideIn, streakPop)

**Extension Manifest ([manifest.json](manifest.json))**
- Chrome Manifest V3 configuration
- Content script injected on Steam app pages and age verification pages
- URL patterns: `https://store.steampowered.com/app/*` and `https://store.steampowered.com/agecheck/app/*`
- No permissions required beyond content script access

## Key Behaviors

**Navigation Flow**
- "Next Random Game" button appears after making a guess
- Floating dice button (🎲) provides quick navigation to random games at any time
- Both use Steam's official random endpoint: `https://store.steampowered.com/explore/random/`

**Stats Display**
- Floating stats button (📊) shows alert with: games played, correct guesses, accuracy %, current streak, best streak, and total points
- Includes chrome.storage availability check for robustness

**Age Check Page Handling**
- Extension detects age verification pages (`/agecheck/`) and displays only the floating random game button
- Allows users to skip age-restricted games and continue playing

## Links

- **Website**: https://www.reviewguesser.com
- **GitHub**: https://github.com/AndyCarnevale/reviewGuesser
- **Chrome Web Store**: Coming soon!
