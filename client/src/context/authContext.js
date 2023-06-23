import { createContext, useReducer } from 'react';
import AuthReducer from './authReducer';

const INITIAL_STATE = {
     user: 
           {
        _id: "6461bf3e6f1deca292fd2fb8",
        username: "Seth",
        email: "seth@gmail.com",
        profilePicture: "https://cdn.myanimelist.net/images/characters/3/488553.jpg",
        coverPicture: "https://gifdb.com/images/thumbnail/8-bit-japan-river-skyline-85wd22njskto5oov.gif",
        followers: [
          "6461bf2d6f1deca292fd2fb4",
          "6461bf346f1deca292fd2fb6"
        ],
        following: [
          "6461bf346f1deca292fd2fb6",
          "6461bf2d6f1deca292fd2fb4"
        ],
        isAdmin: false,
        createdAt: "2023-05-15T05:12:30.150Z",
        __v: 0,
        desc: "Always sleepy",
        location: "Philippines",
        alias: "Sleepy"
      },
      // null,
      isFetching: false,
      error: false,

    //   user: {
    //     _id: "6461bf346f1deca292fd2fb6",
    //     username: "John",
    //     email: "john@gmail.com",
    //     profilePicture: "https://linuxhint.com/wp-content/uploads/2022/12/What-is-a-Roblox-Noob-2.png",
    //     coverPicture: "https://www.dexerto.com/_next/image/?url=https%3A%2F%2Feditors.dexerto.com%2Fwp-content%2Fuploads%2F2021%2F01%2FFortnite-best-skins.jpg&w=3840&q=75",
    //     followers: [

    //       "6461bf3e6f1deca292fd2fb8",
    //       "6461bf2d6f1deca292fd2fb4",
    //       "646afb3a7726ecc02acb6821"
    //     ],
    //     following: [
    //       "6461bf2d6f1deca292fd2fb4",
    //       "6461bf3e6f1deca292fd2fb8"
    //     ],
    //     isAdmin: false,
    //     createdAt: "2023-05-15T05:12:30.150Z",
    //     __v: 0,
    //     desc: "Always sleepy",
    //     location: "Mother's Basement",
    //     alias: "Noobmaster69"
    //   },

    //   user: {
    //     _id: "6461bf2d6f1deca292fd2fb4",
    //     username: "Jane",
    //     email: "thorlover@gmail.com",
    //     profilePicture: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/98feda9e-ebf5-4a1e-bc9d-643666f85f6a/dfop4mm-613380f3-8b74-479b-b307-45f68d7c95a9.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk4ZmVkYTllLWViZjUtNGExZS1iYzlkLTY0MzY2NmY4NWY2YVwvZGZvcDRtbS02MTMzODBmMy04Yjc0LTQ3OWItYjMwNy00NWY2OGQ3Yzk1YTkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VMN1eYeBkdT96Ah3Wzj5ybVyDQ-oz5GHdZ8X6C9_H2g",
    //     coverPicture: "https://pbs.twimg.com/media/E4Kh4aOX0AQdVRt.jpg:large",
    //     followers: [
    //       "6461bf2d6f1deca292fd2fb4",
    //       "6461bf346f1deca292fd2fb6",
    //       "646afb3a7726ecc02acb6821"
    //     ],
    //     following: [
    //       "6461bf3e6f1deca292fd2fb8",
    //       "6461bf346f1deca292fd2fb6",
    //       "646afb3a7726ecc02acb6821"
    //     ],
    //     isAdmin: false,
    //     createdAt: "2023-05-15T05:12:30.150Z",
    //     __v: 0,
    //     desc: "I love Thor",
    //     location: "Asgard",
    //     alias: "JaneLovesThor"
    //   },
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


    return(
        <AuthContext.Provider 
            value ={{
                user: state.user, 
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
                }}>
            {children}
        </AuthContext.Provider>
    );
};