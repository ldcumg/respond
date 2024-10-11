"use client";

import React, { useEffect, useState } from "react";

const Playlist = () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    
    useEffect(()=>{
        const fetchSpotifyData = async () => {
            try {
                const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
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

                if(!tokenRes.ok){
                    throw new Error("토큰 가져오기 실패");
                }
        
                const { access_token } = await tokenRes.json(); // 토큰 추출해서access_token 변수애 저장
        
                // Spotify API에 데이터 요청
                const spotifyRes = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DXbSWYCNwaARB', {
                    headers: { 
                      Authorization: `Bearer ${access_token}`, 
                    },
                  });
        
                  if (!spotifyRes.ok) {
                    throw new Error('스포티파이 데이터 패치 실패');
                  }
        
                  const data = await spotifyRes.json();
                  return data;
        
            } catch (error) {
                 throw error; 
            }
        }
        fetchSpotifyData()
    },[])


  return (
    <div>page</div>
  )
}

export default Playlist