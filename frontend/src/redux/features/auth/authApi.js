import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utils/baseURL'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: "POST",
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/signin',
                method: "POST",
                body: credentials
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: "POST",
                
            })
        }),
        getUsers: builder.query({
            query: ()=>({
                url: '/getusers',
                method: "GET"
            }),
            refetchOnMount: true,
            invalidatesTags:["User"]
        }),
        deleteUser: builder.mutation({
            query:(userId)=>({
                url:'/deleteuser',
                method:"POST",
                body:userId
            }),
            invalidatesTags:["User"]
        }),
        editProfile: builder.mutation({
            query:(profileData)=>({
                url:'/editprofile',
                method:"PATCH",
                body: profileData
            }),
        })
        
        
    })
});
export const {useRegisterUserMutation,useLoginUserMutation, useLogoutUserMutation,useGetUsersQuery,useDeleteUserMutation,
    useEditProfileMutation
}= authApi;