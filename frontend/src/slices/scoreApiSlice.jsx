import { SCORES_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const scoreApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    completeExercise:builder.mutation({
      query:(data)=>({
        url:`${SCORES_URL}/${data.id}`,
        method:'POST',
        body:data,
      }),
      invalidatesTags:['Score'],
    })
  })
})

export const{
  useCompleteExerciseMutation,
}=scoreApiSlice