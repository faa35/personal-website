const CLIENT_ID = 'YOUR_CLIENT_ID'; // Replace with my Spotify Client ID
const REDIRECT_URI = 'http://localhost:8080'; // Replace with my hosted URL
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SCOPES = 'user-read-recently-played user-read-playback-state';

// Step 1: Redirect to Spotify Authorization
function redirectToSpotifyAuth() {
    const url = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES)}`;
    window.location.href = url;
}

// Step 2: Extract the Access Token from URL
function getAccessTokenFromUrl() {
    const hash = window.location.hash;
    if (!hash) {
        redirectToSpotifyAuth(); // Redirect user to login if no token
        return null;
    }
    const params = new URLSearchParams(hash.substring(1)); // Remove `#`
    return params.get('access_token');
}

// Step 3: Fetch Last Played Song
async function getLastPlayedSong(token) {
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch last played song. Please ensure your Spotify account is active.');
    }
    const data = await response.json();
    return data.items[0].track;
}

// Step 4: Display Song Info
async function displayLastPlayedSong() {
    try {
        const token = getAccessTokenFromUrl();
        console.log('Access Token:', token); // Debug access token
        if (!token) return;

        const song = await getLastPlayedSong(token);

        document.getElementById('song-name').textContent = song.name;
        document.getElementById('artist-name').textContent = `by ${song.artists.map(artist => artist.name).join(', ')}`;
        document.getElementById('album-art').src = song.album.images[0].url;
    } catch (error) {
        console.error(error);
        document.getElementById('song-name').textContent = 'Error fetching last played song';
        document.getElementById('artist-name').textContent = '';
        document.getElementById('album-art').src = '';
    }
}

displayLastPlayedSong();
