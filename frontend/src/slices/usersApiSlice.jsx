import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/auth`,
                method:'POST',
                body:data,
            }),
            keepUnusedDataFor:5,
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/`,
                method:'POST',
                body:data,
                
            }),
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST',

            }),
        }),
        getUsersByProf: builder.query({
            query: (language) => ({
              url: `${USERS_URL}/proficiency/${language}`,
            }),
            providesTags: (result, error, language) => [{ type: 'User', language }],
            keepUnusedDataFor: 5,
        }),
        
    }),

});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGetUsersByProfQuery
}= usersApiSlice; 
