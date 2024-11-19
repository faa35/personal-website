

const LAST_FM_RECENT_TRACKS_URL = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LAST_FM_USERNAME}&api_key=${LAST_FM_API_KEY}&format=json`;

// Step 1: Fetch Last Played Song from Last.fm
async function getLastPlayedSong() {
    try {
        const response = await fetch(LAST_FM_RECENT_TRACKS_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch last played song from Last.fm');
        }

        const data = await response.json();
        const track = data.recenttracks.track[0]; // Get the most recent track

        const isNowPlaying = track['@attr']?.nowplaying === 'true'; // Check if currently playing
        const songName = track.name;
        const artistName = track.artist['#text'];
        const albumArtUrl = track.image[3]['#text'] || ''; // Use the largest album art available

        return {
            songName,
            artistName,
            albumArtUrl,
            isNowPlaying
        };
    } catch (error) {
        console.error('Error fetching Last.fm data:', error);
        return null;
    }
}

// Step 2: Display Last Played Song
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

// Call the function to display the last played song
displayLastPlayedSong();
