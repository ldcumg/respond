

# 응답하라 (Respond)

사용자들이 자신의 마이페이지를 자유롭게 꾸미고, 소통할 수 있는 플랫폼입니다. 
개인적인 게시판, 방명록, 스케줄 관리 기능을 통해 일상적인 소통을 즐기고, 
다양한 설정을 통해 자신의 공간을 개성 있게 꾸며보세요!

<br/>

## 🔥배포 링크

[Respond - 내일배움캠프 6기 4조](respond-woad.vercel.app/)

<br/>

## 📦폴더 구조

<details>
<summary>폴더구조</summary>
src
 ┣ app
 ┃ ┣ (auth)
 ┃ ┃ ┣ login
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┗ signup
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┣ [userId]
 ┃ ┃ ┣ board
 ┃ ┃ ┃ ┣ [postId]
 ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┣ chat
 ┃ ┃ ┃ ┣ [roomId]
 ┃ ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┣ playlist
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┣ schedule
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┣ setting
 ┃ ┃ ┃ ┣ components
 ┃ ┃ ┃ ┃ ┣ HomeSkelton.tsx
 ┃ ┃ ┃ ┃ ┣ SettingPrivacy.tsx
 ┃ ┃ ┃ ┃ ┣ SettingShowList.tsx
 ┃ ┃ ┃ ┃ ┗ SettingTabList.tsx
 ┃ ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┃ ┣ useGetUserIds.ts
 ┃ ┃ ┃ ┃ ┣ usePrivacyState.ts
 ┃ ┃ ┃ ┃ ┣ useSettingPrivacy.ts
 ┃ ┃ ┃ ┃ ┣ useSettingShowList.ts
 ┃ ┃ ┃ ┃ ┗ useSettingTabList.ts
 ┃ ┃ ┃ ┣ server-action
 ┃ ┃ ┃ ┃ ┣ playlistAction.ts
 ┃ ┃ ┃ ┃ ┗ settingAction.ts
 ┃ ┃ ┃ ┗ page.tsx
 ┃ ┃ ┣ layout.tsx
 ┃ ┃ ┗ page.tsx
 ┃ ┣ GlobalError.tsx
 ┃ ┣ favicon.ico
 ┃ ┣ globals.css
 ┃ ┣ layout.tsx
 ┃ ┗ page.tsx
 ┣ chatStyle
 ┃ ┗ styles.css
 ┣ components
 ┃ ┣ globalslayout
 ┃ ┃ ┣ GlobalsNav.tsx
 ┃ ┃ ┗ GlobalsUserInfo.tsx
 ┃ ┣ home
 ┃ ┃ ┣ BoardPrev.tsx
 ┃ ┃ ┣ ChatPrev.tsx
 ┃ ┃ ┣ Follow.tsx
 ┃ ┃ ┣ FollowComponent.tsx
 ┃ ┃ ┣ PlaylistPrev.tsx
 ┃ ┃ ┗ SchedulePrev.tsx
 ┃ ┣ playlist
 ┃ ┃ ┣ MyPlayList.tsx
 ┃ ┃ ┣ MyPlayListEdit.tsx
 ┃ ┃ ┣ PlayListModalBtn.tsx
 ┃ ┃ ┣ PlayTrackPreview.tsx
 ┃ ┃ ┣ Player.tsx
 ┃ ┃ ┣ PlaylistAll.tsx
 ┃ ┃ ┗ PlaylistSearch.tsx
 ┃ ┣ post
 ┃ ┃ ┣ createPost.tsx
 ┃ ┃ ┗ postList.tsx
 ┃ ┣ providers
 ┃ ┃ ┗ RQProvider.tsx
 ┃ ┣ searchBar
 ┃ ┃ ┣ RelatedSearchTerms.tsx
 ┃ ┃ ┗ UserSearchBar.tsx
 ┃ ┣ theme
 ┃ ┃ ┣ ThemeBtn.tsx
 ┃ ┃ ┗ ThemeModal.tsx
 ┃ ┣ ui
 ┃ ┃ ┣ LoadingSpinner.tsx
 ┃ ┃ ┣ checkbox.tsx
 ┃ ┃ ┣ label.tsx
 ┃ ┃ ┗ radio-group.tsx
 ┃ ┗ LogOutButton.tsx
 ┣ constants
 ┃ ┗ postSchema.ts
 ┣ hooks
 ┃ ┣ queries
 ┃ ┃ ┣ post
 ┃ ┃ ┃ ┗ usePostQuery.ts
 ┃ ┃ ┗ queryKeys.ts
 ┃ ┣ useFollow.ts
 ┃ ┣ useGetUserInfo.ts
 ┃ ┣ useLoggedIn.ts
 ┃ ┗ useOnAuthStateChange.ts
 ┣ lib
 ┃ ┗ utils.ts
 ┣ queries
 ┃ ┗ queryKey.ts
 ┣ server-action
 ┃ ┗ followAction.ts
 ┣ services
 ┃ ┣ auth
 ┃ ┃ ┗ serverAction.ts
 ┃ ┗ post
 ┃ ┃ ┣ postsPaginate.ts
 ┃ ┃ ┗ serverAction.ts
 ┣ store
 ┃ ┗ useUserInfoStore.ts
 ┣ styles
 ┃ ┗ styles.css
 ┣ types
 ┃ ┣ playlist
 ┃ ┃ ┣ Spotify.ts
 ┃ ┃ ┗ playlist.ts
 ┃ ┣ follow.ts
 ┃ ┣ post.ts
 ┃ ┣ setting.ts
 ┃ ┗ userInfo.ts
 ┣ utils
 ┃ ┗ supabase
 ┃ ┃ ┣ client.ts
 ┃ ┃ ┣ middleware.ts
 ┃ ┃ ┣ server.ts
 ┃ ┃ ┗ user.ts
 ┗ middleware.ts

 </details>

<br/>


## 개발 일정

| 기간                | 활동                                                      |                   |
|---------------------|-----------------------------------------------------------|-----------------------------|
| 24.10.10            | 프로젝트 기획 및 주제 선정, 피그마로 프레임아웃 구성       |                             |
| 24.10.10            | 페이지 및 기능별 담당 구분, 프로젝트 세팅                   |                             |
| 24.10.10 ~ 24.10.17 | 기능 개발                                                 |                             |
| 24.10.16 ~ 24.10.17 | 스타일 적용 및 반응형 작업                                |                             |
| 24.10.17 ~ 24.10.17 | 트러블 슈팅 및 데이터 작업, 오류 수정, 최종 병합, 배포     |                             |
| 24.10.10 ~ 24.10.17 |                      총 개발 기간                               |                             |

<br/>


## 💻 개발 환경

## 기술 스택

### Frontend
- ![Next.js](https://camo.githubusercontent.com/d4ff95c6c85e810b4acfe5dbf01bf2b44680cf75945b21a7e5438c87b473f2c6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6578742d626c61636b3f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6578742e6a73266c6f676f436f6c6f723d7768697465) **Next.js**  
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white) **JavaScript**  
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) **HTML5**  
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) **CSS3**  

 
- ![Tanstack Query](https://img.shields.io/badge/TanstackQuery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) **TanStack Query**  
- ![Zustand](https://img.shields.io/badge/Zustand-181818?style=for-the-badge) **Zustand**  
- ![Tailwind CSS](https://camo.githubusercontent.com/b2eac0f505dfd05c25acf8c285b5eb346916090126c8836c6cbf9aeb754eac32/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f7461696c77696e646373732d2532333338423241432e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7461696c77696e642d637373266c6f676f436f6c6f723d7768697465) **Tailwind CSS**  
- ![](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) **Axios** 
- **React Hook Form**  
- **Zod**  
- **Lucide**  
-  **Shadcn** 
- **Moment Timezone**  
 

### Backend & API
-  **Supabase**  
- **Spotify API**  

### Development Tools

- **Yarn Berry**  


<br/>

## 🔧 주요기능

### 회원가입 페이지 / 로그인 페이지

![로그인/회원가입]()
- 아이디, 비밀번호, 닉네임을 입력하여 회원가입 할 수 있습니다.
- 아이디, 비밀번호를 입력하여 로그인 할 수 있습니다.

<br/>

### 나의 홈피 메인페이지
![메인페이지]()
- 홈피 메인페이지에 미리보기 탭으로 다양한 서비스를 접근할 수 있습니다.

![메인페이지 음악재생]()
- 메인페이지의 대문인 좌측 테이블에 플레이리스트에서 대표로 지정한 곡을 재생할 수 있습니다.

![메인페이지 테마바꾸기]()
- 사용자의 홈피 색상을 변경할 수 있습니다. 

![게시물]()
- 게시물을 업로드하고 조회하고 삭제할 수 있습니다.

![채팅]()
- 다른 사용자와 방을 만들고 실시간으로 채팅할 수 있습니다.
- 방은 생성되고 삭제할 수 있습니다.

![스케줄 관리]()
- 스케줄을 진행중, 완료됨, 취소됨의 상태로 관리할 수 있습니다.

![플레이리스트]()
- 플레이리스트에 곡을 추가할 수 있습니다.
- 추가된 곡은 삭제 또는 내 홈피 대문에 대표 곡으로 지정할 수 있습니다.

![내 설정]()
- 홈피 메인페이지에 미리보기 탭의 공개하고 싶은 목록을 수정할 수 있습니다.
- 공개범위를 설정할 수 있습니다. (이웃/서로이웃/모두/비공개)
- 공개하고 싶은 네비 탭 목록만 보여줄 수 있습니다.

<br/>

### 팔로잉/팔로워 사용자 검색 기능
![사용자 검색/팔로잉 기능]()
- 사용자를 검색하고 사용자의 홈피에 진입할 수 있습니다.
- 팔로잉을 걸고 사용자가 공개한 게시물과 플레이리스트를 접근할 수 있습니다.


<br/>

## 🏹 트러블 슈팅

### 1. 마이페이지 데이터 필터링

• 문제_
api 노래목록별로 추가버튼 생성 후 클릭시 supabase에 데이터가 올라가야하는데 에러

• 원인_
테이블의 각 행별로 설정상 null은 허용하지않는다 해두었다.
playlist에 값을 insert 해주면서 user_id 의 값을 넘겨주지않아, user_id 값이 null로 넘어가면서 생긴 문제

• 해결_
browserClient.auth.getUser() : 로그인한 유저의 정보를 가져온다. -> 로그인한 유저가 없으면 유효성처리
playlist에 값을 insert하면서 user_id도 같이 넘겨준다.
=> 이 과정을 기존 패치로 구현한부분에서 텐스텍쿼리로 전체 변경한다

<br />

### 2. docs 꼼꼼하게 읽지 않은 문제
• 문제_
server action에서 위처럼 클라이언트를 전역적으로 한번 선언하고 재사용하려고 하니 import { cookies } from "next/headers" 에서 에러가 발생했다.

• 해결_
supabase를 자세히 보니 사용 시 마다 클라이언트를 만들라고 나와있었다.

<br />

### 3. 저장된 유저 아이디(id)와 일치하는 nickname 가져오기
• 문제_
user_info의 id를 외래키로 설정해 participantIds 배열을 만들고 닉네임을 매칭시키지 않은 문제

• 해결_
rooms 테이블에 저장된 참가자 아이디(participants) 와 user_info 테이블에 저장된 유저 아이디(id)와 일치하는 nickname 가져오기

• 결론_
id와 일치하는 participant
(4d0d034b-c092-4b9e-bbdb-0d5b25e21cba) 찾아서 nickname 반환 성공!


<br/>

### 4. 유저 정보 가져오는 커스텀 훅 (RQ사용)
• 문제_
특정 상황에서 유저 데이터가 다르게 들어옴. 어쩔땐 ID만, 어쩔땐 객체로

• 해결_
유저 정보를 가져오는 RQ가 두 개 있었는데 같은 queryKey[“loginUser”] 를 공유했음. 따라서 다른 함수에서 다른 데이터를 요청하지만 같은 캐싱을 사용하기 때문에 발생했고, que 경하고 문제 해결


<br/>

### 5. 유저 정보 가져오는 커스텀 훅 (RQ사용)
• 문제_
user 상태가 초기에는 null인 상태에서 fetchTodos 함수가 호출되기 때문에 사용자가 로그인하지 않았거나 API호출이 지연되면 todo목록이 로드되지 않음

• 해결_
fetchTodos 함수가 user 상태가 변경된 후에만 호출되도록 useEffect 의 의존성 배열에 user를 추가


<br/>


## 📗 프로젝트 피드백

- 피드백입니다.