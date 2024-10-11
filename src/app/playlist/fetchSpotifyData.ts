// export const fetchSpotifyData = async () => {
//     try {
//         const tokenRes = await fetch("/api/token"); // 토큰 발급 API 호출
//         if(!tokenRes.ok){
//             throw new Error("토큰 가져오기 실패");
//         }

//         const { access_token } = await tokenRes.json(); // 토큰 추출해서access_token 변수애 저장

//         // Spotify API에 데이터 요청
//         const spotifyRes = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbJZGli0rRP3r', {
//             headers: { 
//               Authorization: `Bearer ${access_token}`, 
//             },
//           });
//           if (spotifyRes.ok) {
//             console.log('스포티파이 데이터 패치 성공')
//           }

//           if (!spotifyRes.ok) {
//             throw new Error('스포티파이 데이터 패치 실패');
//           }

//           const data = await spotifyRes.json();
//           return data;

//     } catch (error) {
//          throw error; 
//     }
// }