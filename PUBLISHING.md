# Publishing Guide

## Chrome Web Store Publication

### Prerequisites

1. **Developer Account** ($5 one-time fee)
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Sign in with your Google account
   - Pay the one-time $5 registration fee

2. **Required Assets** (see ASSETS_NEEDED.md)
   - Extension icons (16px, 48px, 128px)
   - Screenshots (at least 1, up to 5)
   - Small promotional tile (440x280px)

### Step-by-Step Publishing Process

#### 1. Create Extension Package

From the project root directory:

```bash
# Remove the ASSETS_NEEDED.md file (not needed in the package)
rm ASSETS_NEEDED.md

# Create a zip file of your extension
# On Mac/Linux:
zip -r reviewguesser-v1.0.0.zip . -x "*.git*" "screenshots/*" "PUBLISHING.md" "*.DS_Store"

# On Windows (PowerShell):
Compress-Archive -Path . -DestinationPath reviewguesser-v1.0.0.zip -Exclude .git*,screenshots,PUBLISHING.md,.DS_Store
```

Or manually:
- Select all files EXCEPT: `.git`, `screenshots/`, `PUBLISHING.md`, `ASSETS_NEEDED.md`
- Right-click and "Compress" or "Send to > Compressed folder"

#### 2. Upload to Chrome Web Store

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click **"New Item"**
3. Upload your `.zip` file
4. Fill in the store listing:

**Store Listing Tab:**
- **Product Name**: ReviewGuesser
- **Summary**: Turn Steam browsing into a guessing game!
- **Description**: (Use content from README.md)
  ```
  ReviewGuesser transforms your Steam browsing experience into an engaging guessing game!

  Challenge yourself to guess how many reviews a game has before seeing the actual count.
  Build streaks, earn points, and discover new games.

  FEATURES:
  • 6 different review count ranges to choose from
  • Points system with partial credit for close guesses
  • Streak tracking and persistent statistics
  • Quick random game discovery
  • Steam-native design that blends seamlessly
  • Complete privacy - all data stored locally

  HOW TO PLAY:
  1. Visit any Steam game page
  2. Make your guess before seeing the review count
  3. Earn points and build your streak
  4. Click "Next Random Game" to continue playing

  100% free, no login required, and completely open source!
  ```

- **Category**: Fun
- **Language**: English

**Privacy Tab:**
- **Single Purpose**: Gamifies Steam review browsing
- **Permission Justification**: Content scripts on Steam pages to display game interface
- **Data Usage**:
  - Does NOT collect user data
  - Does NOT use remote code
  - All data stored locally in browser
- **Certification**: Check all applicable boxes

**Store Listing Assets:**
- Upload your 3 icon files (16px, 48px, 128px)
- Upload at least 1 screenshot (up to 5 recommended)
- Upload small promotional tile (440x280px)

**Pricing & Distribution:**
- Countries: All countries (or select specific ones)
- Pricing: Free
- Visibility: Public

5. Click **"Submit for Review"**

#### 3. Review Process

- **Timeline**: Usually 1-3 days (can be up to 1 week)
- **Email notifications**: You'll receive updates at your Google account email
- **Status**: Check dashboard for "Pending review" → "Published"

### After Approval

1. **Update README.md** with the Chrome Web Store link
2. **Update manifest homepage_url** if needed
3. **Announce on social media, Reddit, etc.**

### Future Updates

When you need to publish an update:

1. Update version in `manifest.json` (e.g., 1.0.0 → 1.1.0)
2. Create new zip package
3. Go to Chrome Web Store Developer Dashboard
4. Click on your extension
5. Click "Package" tab → "Upload new package"
6. Upload the new zip
7. Update store listing if needed
8. Click "Submit for review"

---

## GitHub Publication

### Step 1: Create Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `reviewGuesser`
3. Description: `🎮 Turn Steam browsing into a guessing game! Browser extension to guess game review counts.`
4. Set to **Public**
5. Do NOT initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Push Your Code

From your project directory:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial release v1.0.0"

# Add remote (replace [yourusername] with your GitHub username)
git remote add origin https://github.com/[yourusername]/reviewGuesser.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Create Release

1. Go to your repository on GitHub
2. Click "Releases" (right sidebar)
3. Click "Create a new release"
4. Tag version: `v1.0.0`
5. Release title: `ReviewGuesser v1.0.0 - Initial Release`
6. Description:
   ```markdown
   ## 🎮 ReviewGuesser - Initial Release

   Turn Steam browsing into a guessing game!

   ### Features
   - Guess game review counts across 6 different ranges
   - Points system with streak tracking
   - Local statistics storage
   - Steam-native design
   - Complete privacy protection

   ### Installation
   - Chrome Web Store: [Link pending approval]
   - Manual: Download source and load as unpacked extension

   ### What's Included
   - Core guessing game mechanics
   - Stats tracking
   - Age-restricted game handling
   - Random game navigation
   ```
7. Attach the `.zip` file you created for Chrome Web Store
8. Click "Publish release"

### Step 4: Repository Setup

Add these sections to your GitHub repo:

1. **Topics/Tags**: Click the gear icon next to "About"
   - Add: `chrome-extension`, `steam`, `browser-extension`, `game`, `javascript`

2. **About Section**:
   - Website: https://reviewguesser.com
   - Description: 🎮 Turn Steam browsing into a guessing game!

3. **Enable Issues** (for bug reports)
4. **Enable Discussions** (optional - for community engagement)

---

## Marketing & Launch

### Launch Checklist

- [ ] Extension published on Chrome Web Store
- [ ] Code published on GitHub
- [ ] Privacy policy live at reviewguesser.com/privacy
- [ ] Social media accounts created
- [ ] Press kit prepared (screenshots, description)

### Announcement Locations

1. **Reddit**:
   - r/Steam
   - r/WebGames
   - r/SideProject
   - r/somethingimade
   - r/chrome_extensions

2. **Social Media**:
   - Twitter/X
   - LinkedIn
   - ProductHunt

3. **Communities**:
   - Hacker News (Show HN)
   - IndieHackers
   - Steam Community forums

### Press Kit

Create a simple press kit with:
- High-quality screenshots
- Logo/icon files
- One-line description
- Feature list
- Contact information
- Link to GitHub and Chrome Web Store

---

## Monitoring

### Metrics to Track

1. **Chrome Web Store**:
   - Daily active users
   - Weekly installs
   - User ratings and reviews

2. **GitHub**:
   - Stars
   - Issues/bug reports
   - Pull requests

3. **Website Analytics** (when launched):
   - Traffic sources
   - User engagement

### Response Plan

- **Bug reports**: Respond within 24-48 hours
- **Feature requests**: Tag and categorize
- **Reviews**: Thank users for positive reviews
- **Updates**: Aim for monthly releases with improvements

---

## Legal Considerations

✅ **Completed**:
- Privacy policy (PRIVACY.md)
- Open source license (MIT)
- No trademark conflicts (verified "ReviewGuesser" available)

✅ **Not Needed** (No data collection):
- Terms of Service (simple extension)
- Cookie policy
- GDPR consent forms
- Analytics implementation

---

## Support & Maintenance

### Version Numbering
- Major.Minor.Patch (e.g., 1.0.0)
- **Major**: Breaking changes, redesigns
- **Minor**: New features
- **Patch**: Bug fixes

### Recommended Update Schedule
- **Patch releases**: As needed for bugs
- **Minor releases**: Monthly with new features
- **Major releases**: Yearly or for significant changes

---

## Need Help?

- Chrome Web Store Policies: https://developer.chrome.com/docs/webstore/program-policies/
- GitHub Docs: https://docs.github.com/
- Extension Development: See CLAUDE.md
