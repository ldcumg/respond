const queryKey = {
  setting: {
    setting: ["setting"],
    privacy: ["privacy"]
  },
  playlist: (userId: string) => ["playlist", userId],
  auth: {
    loginUser: ["loginUser"]
  },
  follow: (hostUserId: string, loginUserId: string) => [hostUserId, loginUserId]
};

export default queryKey;
