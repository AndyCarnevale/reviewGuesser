# ReviewGuesser 🎮

A browser extension that turns Steam browsing into a guessing game! Challenge yourself to guess how many reviews a game has before seeing the actual count.

## Inspiration
This extension was directly inspired by this YouTube video by 
[Jonas Tyroller](https://twitter.com/JonasTyroller):
[![YouTube Video](https://img.youtube.com/vi/Tu2cCEMwvHI/0.jpg)](https://www.youtube.com/watch?v=Tu2cCEMwvHI)

## Features

- **Guess Game Modes**: Choose from 6 different review count ranges (0-9, 10-99, 100-999, 1K-9K, 10K-99K, 100K+)
- **Points System**: Earn up to 100 points for correct guesses, with partial credit for close guesses
- **Streak Tracking**: Build winning streaks and compete with yourself
- **Persistent Stats**: Track your accuracy, total games played, best streak, and total points
- **Random Game Discovery**: Quick navigation to discover new Steam games
- **Age Check Handling**: Seamlessly skip age-restricted games
- **Steam Native Design**: Clean interface using Steam's color scheme

## Installation

### From Chrome Web Store (Recommended)

[Install ReviewGuesser](https://chrome.google.com/webstore) ← Link coming soon!

### Manual Installation (Development)

1. Download or clone this repository
   ```bash
   git clone https://github.com/AndyCarnevale/reviewGuesser.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (top-right toggle)
4. Click "Load unpacked"
5. Select the `reviewGuesser` directory
6. Visit any Steam store page to start playing!

### Other Browsers

- **Edge**: Compatible! Install from Chrome Web Store
- **Opera**: Compatible! Install from Chrome Web Store
- **Firefox**: Coming soon

## How to Play

1. Navigate to any Steam game store page (e.g., `https://store.steampowered.com/explore/random/`)
2. The ReviewGuesser interface will appear, hiding the actual review count
3. Make your guess by clicking one of the range buttons
4. See your results and earn points based on accuracy
5. Click "Next Random Game" to continue playing

## Stats

Track your progress with:
- **Games Played**: Total number of guesses made
- **Correct Guesses**: How many you got right
- **Accuracy**: Your success percentage
- **Current Streak**: Consecutive correct guesses
- **Best Streak**: Your longest streak ever
- **Total Points**: Cumulative points earned

Click the 📊 button (bottom-right) to view your stats anytime.

## Development

### Testing the Extension

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked" and select the `reviewGuesser` directory
4. Navigate to any Steam store page (e.g., `https://store.steampowered.com/explore/random/`)
5. The ReviewGuessr UI should appear where reviews normally display

### Live Development

After code changes:
- Click the refresh icon on the extension card in `chrome://extensions/`
- Reload any Steam store page to see updates

### Storage Inspection

View stored stats:
1. Open DevTools on a Steam store page (F12)
2. Go to Application > Storage > Local Storage > chrome-extension://[extension-id]
3. Look for the `stats` key containing the JSON object

### Project Structure

```
reviewGuesser/
├── manifest.json         # Extension configuration
├── src/
│   ├── content.js       # Main game logic and DOM manipulation
│   └── styles.css       # Steam-themed styling
├── AGENTS.md            # Development documentation
└── README.md            # This file
```

## Contributing

Found a bug or have a feature request?

- **Issues**: [GitHub Issues](https://github.com/AndyCarnevale/reviewGuesser/issues)
- **Pull Requests**: Welcome! Please read [AGENTS.md](AGENTS.md) for development setup

## Links

- **Website**: [ReviewGuesser.com](https://www.reviewguesser.com)
- **Chrome Web Store**: Coming soon!
- **GitHub**: [github.com/AndyCarnevale/reviewGuesser](https://github.com/AndyCarnevale/reviewGuesser)

## Support

Love ReviewGuesser?
- ⭐ Star this repo
- 🐛 Report bugs
- 💡 Suggest features
- 📢 Share with friends
