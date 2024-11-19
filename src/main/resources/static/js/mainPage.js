// Last.fm Variables
const LAST_FM_RECENT_TRACKS_URL = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LAST_FM_USERNAME}&api_key=${LAST_FM_API_KEY}&format=json`;

// Discord Variables
const DISCORD_API_URL = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;

// Fetch Last Played Song from Last.fm
async function getLastPlayedSong() {
    try {
        const response = await fetch(LAST_FM_RECENT_TRACKS_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch last played song from Last.fm');
        }

        const data = await response.json();
        const track = data.recenttracks.track[0];

        const isNowPlaying = track['@attr']?.nowplaying === 'true';
        const songName = track.name;
        const artistName = track.artist['#text'];
        const albumArtUrl = track.image[3]['#text'] || '';

        return { songName, artistName, albumArtUrl, isNowPlaying };
    } catch (error) {
        console.error('Error fetching Last.fm data:', error);
        return null;
    }
}

// Display Last Played Song
async function displayLastPlayedSong() {
    const songData = await getLastPlayedSong();
    if (!songData) {
        document.getElementById('song-name').textContent = 'Error fetching the last played song';
        document.getElementById('artist-name').textContent = '';
        document.getElementById('album-art').src = '';
        return;
    }

    const { songName, artistName, albumArtUrl, isNowPlaying } = songData;

    document.getElementById('song-name').textContent = songName;
    document.getElementById('artist-name').textContent = `by ${artistName}`;
    document.getElementById('album-art').src = albumArtUrl || 'default-album-art.jpg';

    if (isNowPlaying) {
        document.getElementById('song-name').textContent += ' (Now Playing)';
    }
}

// Fetch Discord Presence
async function getDiscordPresence() {
    try {
        const response = await fetch(DISCORD_API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch Discord presence');
        }

        const data = await response.json();
        const user = data.data;
        const username = `${user.discord_user.username}#${user.discord_user.discriminator}`;
        const avatar = `https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.png`;
        const status = user.discord_status;

        // Determine the active platform
        let platform = 'Unknown';
        if (user.active_on_discord_mobile) platform = 'Mobile';
        else if (user.active_on_discord_web) platform = 'Web';
        else if (user.active_on_discord_desktop) platform = 'Desktop';

        let activity = 'No activity';
        let elapsedTime = null;

        if (user.activities.length) {
            const firstActivity = user.activities[0];
            activity = `${firstActivity.name}: ${firstActivity.state || 'No Details'}`;

            // Check for timestamps and calculate elapsed time
            if (firstActivity.timestamps?.start) {
                const startTime = firstActivity.timestamps.start;
                elapsedTime = Date.now() - startTime; // Milliseconds elapsed
            }
        }

        return { username, avatar, status, platform, activity, elapsedTime };
    } catch (error) {
        console.error('Error fetching Discord data:', error);
        return null;
    }
}


// Display Discord Presence
async function displayDiscordPresence() {
    const discordData = await getDiscordPresence();
    if (!discordData) {
        document.getElementById('discord-username').textContent = 'Error fetching Discord profile';
        document.getElementById('discord-status').textContent = '';
        document.getElementById('discord-avatar').src = '';
        document.getElementById('discord-activity').textContent = '';
        document.getElementById('discord-platform').textContent = '';
        return;
    }

    const { username, avatar, status, platform, activity, elapsedTime } = discordData;

    document.getElementById('discord-username').textContent = username;
    document.getElementById('discord-avatar').src = avatar;
    document.getElementById('discord-status').textContent = `Status: ${status}`;
    document.getElementById('discord-platform').textContent = `Active on: ${platform}`;
    document.getElementById('discord-activity').textContent = activity;

    // Format and display elapsed time
    if (elapsedTime !== null) {
        const formatTime = (ms) => {
            const seconds = Math.floor((ms / 1000) % 60);
            const minutes = Math.floor((ms / (1000 * 60)) % 60);
            const hours = Math.floor(ms / (1000 * 60 * 60));
            return `${hours}h ${minutes}m ${seconds}s`;
        };

        document.getElementById('discord-activity').textContent += ` (Active for: ${formatTime(elapsedTime)})`;

        // Update elapsed time every second
        setInterval(() => {
            const newElapsedTime = Date.now() - (Date.now() - elapsedTime);
            document.getElementById('discord-activity').textContent = `${activity} (Active for: ${formatTime(newElapsedTime)})`;
        }, 1000);
    }
}


// Display Last.fm and Discord Data
displayLastPlayedSong();
displayDiscordPresence();
