const queryKey = {
  setting: {
    setting: ["setting"],
    privacy: ["privacy"]
  },
  playlist: (userId: string) => ["playlist", userId],
  auth: {
    loginUser: ["loginUser"],
    userInfo: ["userInfo"]
  },
  follow: (hostUserId: string | null, loginUserId: string | null) => ["follow", hostUserId, loginUserId]
};

export default queryKey;
