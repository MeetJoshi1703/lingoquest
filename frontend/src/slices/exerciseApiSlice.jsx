import { EXERCISE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const exerciseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExercisesByLang: builder.query({
      query: (language) => ({
        url: `${EXERCISE_URL}/lang/${language}`,
      }),
      providesTags: (result, error, language) => [{ type: 'Exercise', language }],
      keepUnusedDataFor: 5,
    }),

    getExerciseById: builder.query({
      query: (id) => ({
        url: `${EXERCISE_URL}/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Exercises', id }],
      keepUnusedDataFor: 5,
    }),

    getExercisesByDifficulty: builder.query({
      query: (difficulty) => ({
        url: `${EXERCISE_URL}/difficulty/${difficulty}`,
      }),
      providesTags: (result, error, difficulty) => [{ type: 'Exercises', difficulty }],
      keepUnusedDataFor: 5,
    }),

    createExercise: builder.mutation({
      query: (exerciseData) => ({
        url: EXERCISE_URL,
        method: 'POST',
        body: exerciseData,
      }),
      invalidatesTags: [{ type: 'Exercises' }],
    }),

    updateExercise: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `${EXERCISE_URL}/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
      invalidatesTags: [{ type: 'Exercises' }],
    }),

    deleteExercise: builder.mutation({
      query: (id) => ({
        url: `${EXERCISE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Exercises' }],
    }),
  }),
});

export const {
  useGetExercisesByLangQuery,
  useGetExerciseByIdQuery,
  useGetExercisesByDifficultyQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
} = exerciseApiSlice;
