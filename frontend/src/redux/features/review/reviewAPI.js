import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../../utils/baseURL';

export const reviewApi=createApi({
    reducerPath:'reviewApi',
    baseQuery:fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/review`,
        credentials: 'include'
    }),
    tagTypes: ["Reviews"],
    endpoints:(builder)=>({
        postReview: builder.mutation({
            query: (reviewData)=>({
                url:'/postreview',
                method: "POST",
                body:reviewData
            }),
            invalidatesTags: (result,error,{postId})=>[{type:"Reviews",id:postId}]
        }),
        getReviewCount: builder.query({
            query:()=>({
                url:'/total-review'
            })
        }),
        getReviewByUserId: builder.query({
            query:(userId)=>({
                url:`/${userId}`

            }),
            providesTags: (result)=>result? [{type:"Reviews", id: result[0]?.email}]:[]
        })
    })
})
export const {useGetReviewByUserIdQuery,useGetReviewCountQuery,usePostReviewMutation} =reviewApi;
