export const LoginStart = (userCredentials) => ({
    type: 'LOGIN_START',
});

export const LoginSuccessful = (user) => ({
    type: 'LOGIN_SUCCESSFUL',
    payload: user,
});

export const LoginFailed = (error) => ({
    type: 'LOGIN_FAILED',
    payload: error,
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});
  
  export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});