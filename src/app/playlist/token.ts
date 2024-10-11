import type { NextApiRequest, NextApiResponse } from 'next';

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
}

type ErrorResponse = {
  error: string;
}

// Spotify API 토큰을 발급받는 API
export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<TokenResponse | ErrorResponse> 
) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({ error: 'Missing Spotify client credentials' });
  }

  // Spotify API에 요청을 보내 토큰을 발급받음
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    res.status(200).json(data as TokenResponse); // Access token 반환
  } else {
    res.status(response.status).json({ error: 'Failed to get token' });
  }
}
