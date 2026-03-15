/**
 * 100 Games Arcade — Lightweight Analytics
 * 
 * Tracks game plays, time spent, scores, and completions using localStorage.
 * No server required — all data stays in the player's browser.
 * 
 * Usage from individual games:
 *   <script src="../analytics.js"></script>
 *   GameAnalytics.startSession();           // call when game starts
 *   GameAnalytics.trackScore(150);          // call on game over
 *   GameAnalytics.trackComplete();          // call on level/game completion
 *   GameAnalytics.endSession();             // call when leaving (auto on unload)
 * 
 * Usage from index.html:
 *   GameAnalytics.trackPlay('011-snake-classic');  // track a launch
 *   GameAnalytics.getStats();                       // get all stats
 *   GameAnalytics.getLeaderboard();                 // sorted by plays
 */

const GameAnalytics = (() => {
    const STORAGE_KEY = '100games_analytics';
    const SESSION_KEY = '100games_session';

    // Detect which game we're in from the URL path
    function detectGameId() {
        const path = window.location.pathname;
        const match = path.match(/(\d{3}-[a-z0-9-]+)/);
        return match ? match[1] : null;
    }

    function loadData() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    }

    function saveData(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch {
            // localStorage full or unavailable
        }
    }

    function getGameData(gameId) {
        const data = loadData();
        if (!data[gameId]) {
            data[gameId] = {
                plays: 0,
                totalTime: 0,      // seconds
                highScore: 0,
                lastPlayed: null,
                completions: 0,
                scores: [],         // last 10 scores
            };
        }
        return { data, game: data[gameId] };
    }

    return {
        /**
         * Track a game launch (call from index.html on link click)
         */
        trackPlay(gameId) {
            if (!gameId) return;
            const { data, game } = getGameData(gameId);
            game.plays++;
            game.lastPlayed = Date.now();
            saveData(data);
        },

        /**
         * Start a play session timer (call from within a game)
         */
        startSession() {
            const gameId = detectGameId();
            if (!gameId) return;
            
            sessionStorage.setItem(SESSION_KEY, JSON.stringify({
                gameId,
                startTime: Date.now()
            }));

            // Also count as a play if not already tracked from index
            const { data, game } = getGameData(gameId);
            const now = Date.now();
            // Only increment if last play was >3s ago (avoid double-counting from index click)
            if (!game.lastPlayed || (now - game.lastPlayed) > 3000) {
                game.plays++;
            }
            game.lastPlayed = now;
            saveData(data);
        },

        /**
         * Record a score (call on game over)
         */
        trackScore(score) {
            const gameId = detectGameId();
            if (!gameId || typeof score !== 'number') return;

            const { data, game } = getGameData(gameId);
            if (score > game.highScore) {
                game.highScore = score;
            }
            game.scores.push(score);
            if (game.scores.length > 10) {
                game.scores = game.scores.slice(-10);
            }
            saveData(data);
        },

        /**
         * Track a game/level completion
         */
        trackComplete() {
            const gameId = detectGameId();
            if (!gameId) return;

            const { data, game } = getGameData(gameId);
            game.completions++;
            saveData(data);
        },

        /**
         * End the session and record time spent
         */
        endSession() {
            try {
                const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
                if (!session) return;

                const elapsed = Math.round((Date.now() - session.startTime) / 1000);
                if (elapsed < 1 || elapsed > 86400) return; // sanity check

                const { data, game } = getGameData(session.gameId);
                game.totalTime += elapsed;
                saveData(data);
                sessionStorage.removeItem(SESSION_KEY);
            } catch {
                // ignore
            }
        },

        /**
         * Get all analytics data
         */
        getStats() {
            return loadData();
        },

        /**
         * Get aggregate summary
         */
        getSummary() {
            const data = loadData();
            const games = Object.entries(data);
            
            let totalPlays = 0;
            let totalTime = 0;
            let gamesPlayed = 0;

            games.forEach(([, g]) => {
                totalPlays += g.plays || 0;
                totalTime += g.totalTime || 0;
                if (g.plays > 0) gamesPlayed++;
            });

            return { totalPlays, totalTime, gamesPlayed };
        },

        /**
         * Get leaderboard sorted by most played
         */
        getLeaderboard(limit = 10) {
            const data = loadData();
            return Object.entries(data)
                .map(([id, g]) => ({ id, ...g }))
                .filter(g => g.plays > 0)
                .sort((a, b) => b.plays - a.plays)
                .slice(0, limit);
        },

        /**
         * Get recently played games
         */
        getRecent(limit = 5) {
            const data = loadData();
            return Object.entries(data)
                .map(([id, g]) => ({ id, ...g }))
                .filter(g => g.lastPlayed)
                .sort((a, b) => b.lastPlayed - a.lastPlayed)
                .slice(0, limit);
        },

        /**
         * Format seconds as human-readable time
         */
        formatTime(seconds) {
            if (seconds < 60) return `${seconds}s`;
            if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            return `${h}h ${m}m`;
        },

        /**
         * Format a timestamp as relative time
         */
        formatRelative(timestamp) {
            if (!timestamp) return 'Never';
            const diff = Math.round((Date.now() - timestamp) / 1000);
            if (diff < 60) return 'Just now';
            if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
            if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
            if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
            return new Date(timestamp).toLocaleDateString();
        },

        /**
         * Clear all analytics data
         */
        reset() {
            localStorage.removeItem(STORAGE_KEY);
            sessionStorage.removeItem(SESSION_KEY);
        }
    };
})();

// Auto-end session on page unload (for games that include this script)
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
        GameAnalytics.endSession();
    });
    window.addEventListener('pagehide', () => {
        GameAnalytics.endSession();
    });
}
