import { combineReducers } from 'redux'

import postsReducer from './posts'
import postReducer from './post'

const rootReducer = combineReducers({
  posts: postsReducer,
  post: postReducer,
})

export default rootReducer
