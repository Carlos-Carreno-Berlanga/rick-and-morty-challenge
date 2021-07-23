
// import { createReducer } from '@reduxjs/toolkit'

// const initialState = [
//   {
//     text: 'Use Redux',
//     completed: false,
//     id: 0
//   }
// ]

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {
//     todoAdded(state, action: PayloadAction<string>) {
//       state.push({
//         id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
//         completed: false,
//         text: action.payload
//       })
//     }
//   }
// })

// export const { todoAdded } = todosSlice.actions

// export default todosSlice.reducer
/********************* */
import { stubTrue } from 'lodash';
import reducer, { getCharacters } from './characters';

const initialState = {
  loading: false,
  hasErrors: false,
  characters: [],
  savedCharacters: {}
};

test('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(
    initialState
  )
})

test('getCharacters should set loading to true', () => {
  const previousState = initialState;
  expect(reducer(previousState, getCharacters(previousState))).toEqual(
    {
      loading: true,
      hasErrors: false,
      characters: [],
      savedCharacters: {}
    }
  )
})

// test('should handle a todo being added to an existing list', () => {
//   const previousState = [
//     {
//       text: 'Run the tests',
//       completed: true,
//       id: 0
//     }
//   ]
//   expect(reducer(previousState, todoAdded('Use Redux'))).toEqual([
//     {
//       text: 'Run the tests',
//       completed: true,
//       id: 0
//     },
//     {
//       text: 'Use Redux',
//       completed: false,
//       id: 1
//     }
//   ])
// })