const queryKey = {
  setting: {
    setting: ["setting"],
    privacy: ["privacy"]
  },
  playlist: (userId: string) => ["playlist", userId],
  auth: {
    loginUser: ["loginUser"]
  }
};

export default queryKey;
