
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
import reducer, { getCharacters, getCharactersSuccess, getCharactersFailure } from './characters';
import { store } from '../store';

const initialState = {
  loading: false,
  hasErrors: false,
  characters: [],
  savedCharacters: {}
};

test('should return the initial state', () => {

  expect(store.getState().characters).toEqual(
    initialState
  )
});

test('getCharacters should set loading to true', () => {
  // const previousState = initialState;
  // const initialState = store.getState().characters;
  store.dispatch(getCharacters());
  const nextState = store.getState().characters;
  expect(nextState.loading).toEqual(
    true
  )
});

test('getCharactersSuccess should populate characters array when is successfull', () => {
  const rickAndMortyCharacters = [{ id: 1, name: "Rick" }, { id: 2, name: "Morty" }];
  store.dispatch(getCharactersSuccess(rickAndMortyCharacters));
  const nextState = store.getState().characters;
  expect(nextState.loading).toEqual(
    false
  );
  expect(nextState.hasErrors).toEqual(false);
  expect(nextState.characters).toEqual(rickAndMortyCharacters);
});

test('getCharactersSuccess should set error when is failure', () => {
  store.dispatch(getCharactersFailure());
  const nextState = store.getState().characters;
  expect(nextState.loading).toEqual(
    false
  );
  expect(nextState.hasErrors).toEqual(true);
});

// test('should handle a todo being added to an existing list', () => {
//   const initialState = store.getState().book;;
//   const previousState =
//   {
//     loading: true,
//     hasErrors: false,
//     characters: [],
//     savedCharacters: {}
//   };


//   state = store.getState().book;

//   expect(reducer(previousState, getCharactersSuccess(previousState, [{ id: 1, name: "Rick" }])).toEqual(
//     {
//       loading: false,
//       hasErrors: false,
//       characters: [{ id: 1, name: "Rick" }],
//       savedCharacters: {}
//     }
//   )
// })

// test('getCharactersSuccess should populate characters array', () => {
//   const previousState =
//   {
//     loading: true,
//     hasErrors: false,
//     characters: [],
//   };


//   expect(reducer(previousState, getCharactersSuccess(previousState, { payload: "test" })
//   )).toEqual(
//     initialState
//   )
// });