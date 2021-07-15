import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI.js'

// First, create the thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
  },
})

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123))

/*************/
import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  loading: false,
  hasErrors: false,
  post: {},
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPost: state => {
      state.loading = true
    },
    getPostSuccess: (state, { payload }) => {
      state.post = payload
      state.loading = false
      state.hasErrors = false
    },
    getPostFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

export const { getPost, getPostSuccess, getPostFailure } = postSlice.actions
export const postSelector = state => state.post
export default postSlice.reducer

export function fetchPost(id) {
  return async dispatch => {
    dispatch(getPost())

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      )
      const data = await response.json()

      dispatch(getPostSuccess(data))
    } catch (error) {
      dispatch(getPostFailure())
    }
  }
}
