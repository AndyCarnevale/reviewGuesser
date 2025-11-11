// content.js - Updated with Steam's random endpoint
(function() {
  let hasGuessed = false;

  // Check if we're on an agecheck page
  const isAgeCheck = window.location.pathname.includes('/agecheck/');

  if (isAgeCheck) {
    // Add prominent button container for agecheck pages
    const ageCheckContainer = document.createElement('div');
    ageCheckContainer.className = 'review-guesser-container age-check';
    ageCheckContainer.innerHTML = `
      <div class="rg-header">
        <h2>🎮 ReviewGuesser</h2>
        <p>This game requires age verification</p>
      </div>
      <div class="action-buttons">
        <button id="next-game-agecheck-btn" class="primary-btn">
          Next Random Game →
        </button>
      </div>
    `;

    // Find the main element and append to bottom
    const mainElement = document.querySelector('div[role="main"]');
    if (mainElement) {
      mainElement.appendChild(ageCheckContainer);
    } else {
      // Fallback: append to body if we can't find main
      document.body.appendChild(ageCheckContainer);
    }

    // Wire up the button
    document.getElementById('next-game-agecheck-btn').addEventListener('click', () => {
      window.location.href = 'https://store.steampowered.com/explore/random/';
    });

    // Also add floating button for agecheck pages
    const floatingButton = document.createElement('div');
    floatingButton.className = 'reviewguessr-floating';
    floatingButton.innerHTML = `
      <button id="random-game-float" title="Skip to random game">
        🎲
      </button>
    `;
    document.body.appendChild(floatingButton);

    document.getElementById('random-game-float').addEventListener('click', () => {
      window.location.href = 'https://store.steampowered.com/explore/random/';
    });

    return; // Exit early for agecheck pages
  }

  // Extract current game ID from URL
  const currentAppId = window.location.pathname.match(/\/app\/(\d+)/)?.[1];

  // Find and hide review elements
  const reviewElements = document.querySelectorAll('[class*="user_reviews_summary_row"]');
  
  // Extract the actual review count
  let actualCount = 0;
  reviewElements.forEach(elem => {
    const text = elem.innerText;
    const match = text.match(/\(([\d,]+)\)/);
    if (match) {
      actualCount = parseInt(match[1].replace(/,/g, ''));
    }
  });
  
  if (actualCount === 0) return; // No reviews found
  
  // Hide original review counts
  reviewElements.forEach(elem => {
    elem.style.display = 'none';
  });
  
  // Create guess UI
  const guessContainer = document.createElement('div');
  guessContainer.className = 'review-guesser-container';
  
  const options = [
    { label: '0-9', min: 0, max: 9 },
    { label: '10-99', min: 10, max: 99 },
    { label: '100-999', min: 100, max: 999 },
    { label: '1K-9K', min: 1000, max: 9999 },
    { label: '10K-99K', min: 10000, max: 99999 },
    { label: '100K+', min: 100000, max: Infinity }
  ];
  
  // Add title and instructions
  guessContainer.innerHTML = `
    <div class="rg-header">
      <h2>🎮 ReviewGuesser</h2>
      <p>How many reviews does this game have?</p>
    </div>
    <div class="rg-buttons"></div>
  `;
  
  const buttonContainer = guessContainer.querySelector('.rg-buttons');
  
  options.forEach(option => {
    const button = document.createElement('button');
    button.className = 'review-guess-button';
    button.textContent = option.label;
    button.onclick = () => handleGuess(option, actualCount);
    buttonContainer.appendChild(button);
  });
  
  // Insert after the hidden review section
  const targetElement = document.querySelector('.user_reviews');
  if (targetElement) {
    targetElement.appendChild(guessContainer);
  }
  
  function handleGuess(option, actual) {
    hasGuessed = true;
    const correct = actual >= option.min && actual <= option.max;
    
    // Calculate points (closer guesses get more points even if wrong)
    const orderOfMagnitude = Math.floor(Math.log10(actual || 1));
    const guessedOrder = Math.floor(Math.log10(option.min || 1));
    const distance = Math.abs(orderOfMagnitude - guessedOrder);
    const points = correct ? 100 : Math.max(0, 50 - (distance * 20));
    
    guessContainer.innerHTML = `
      <div class="guess-result ${correct ? 'correct' : 'wrong'}">
        <h3>${correct ? '✅ Correct!' : '❌ Wrong!'}</h3>
        <p class="actual-count">Actual reviews: <strong>${actual.toLocaleString()}</strong></p>
        <p class="your-guess">You guessed: <strong>${option.label}</strong></p>
        <p class="points">Points earned: <strong>${points}</strong></p>
        <div class="action-buttons">
          <button id="next-game-btn" class="primary-btn">
            Next Random Game →
          </button>
        </div>
      </div>
    `;
    
    // Show original reviews
    reviewElements.forEach(elem => {
      elem.style.display = '';
    });
    
    // Wire up button
    document.getElementById('next-game-btn').addEventListener('click', () => {
      window.location.href = 'https://store.steampowered.com/explore/random/';
    });
    
    // Update stats
    updateStats(correct, points);
  }
  
  function updateStats(correct, points) {
    // Check if chrome.storage is available
    if (typeof chrome === 'undefined' || !chrome.storage) {
      console.warn('Chrome storage API not available');
      return;
    }

    chrome.storage.local.get(['stats'], (result) => {
      const stats = result.stats || {
        correct: 0,
        total: 0,
        streak: 0,
        bestStreak: 0,
        totalPoints: 0
      };

      stats.total++;
      stats.totalPoints += points;

      if (correct) {
        stats.correct++;
        stats.streak++;
        if (stats.streak > stats.bestStreak) {
          stats.bestStreak = stats.streak;
        }
      } else {
        stats.streak = 0;
      }

      chrome.storage.local.set({ stats });

      // Update streak display if visible
      updateStreakDisplay(stats.streak);
    });
  }
  
  function updateStreakDisplay(streak) {
    if (streak > 0) {
      // Add a streak indicator
      const streakBadge = document.createElement('div');
      streakBadge.className = 'streak-badge';
      streakBadge.textContent = `🔥 ${streak}`;
      streakBadge.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b, #ffd93d);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 10000;
        animation: streakPop 0.5s ease;
      `;
      document.body.appendChild(streakBadge);
      
      setTimeout(() => streakBadge.remove(), 3000);
    }
  }
  
  // Add floating button for random game (always visible)
  const floatingButton = document.createElement('div');
  floatingButton.className = 'reviewguessr-floating';
  floatingButton.innerHTML = `
    <button id="random-game-float" title="Skip to random game (breaks streak!)">
      🎲
    </button>
    <button id="stats-float" title="View stats">
      📊
    </button>
  `;
  document.body.appendChild(floatingButton);
  
  document.getElementById('random-game-float').addEventListener('click', () => {
    // Reset streak if leaving without guessing
    if (!hasGuessed && typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['stats'], (result) => {
        const stats = result.stats || {};
        stats.streak = 0;
        chrome.storage.local.set({ stats });
      });
    }
    window.location.href = 'https://store.steampowered.com/explore/random/';
  });
  
  document.getElementById('stats-float').addEventListener('click', () => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['stats'], (result) => {
        const stats = result.stats || { correct: 0, total: 0, streak: 0, bestStreak: 0, totalPoints: 0 };
        const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

        alert(`📊 ReviewGuesser Stats

Games Played: ${stats.total}
Correct Guesses: ${stats.correct}
Accuracy: ${accuracy}%
Current Streak: ${stats.streak} 🔥
Best Streak: ${stats.bestStreak}
Total Points: ${stats.totalPoints}`);
      });
    } else {
      alert('📊 ReviewGuesser Stats\n\nNo stats available yet. Start playing to track your progress!');
    }
  });
})();