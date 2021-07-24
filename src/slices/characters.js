import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';

export const initialState = {
  loading: false,
  hasErrors: false,
  characters: [],
  savedCharacters: {}

}

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    getCharacters: state => {
      state.loading = true;
    },
    getCharactersSuccess: (state, { payload }) => {
      state.characters = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCharactersFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    },
    saveCharacterAction: (state, { payload }) => {

      let savedCharacters = state.savedCharacters ? cloneDeep(state.savedCharacters) : {};
      savedCharacters[payload] = !Boolean(savedCharacters[payload]);
      state.savedCharacters = savedCharacters;
    },
  },
})

export const { getCharacters, getCharactersSuccess, getCharactersFailure, saveCharacterAction } = charactersSlice.actions
export const charactersSelector = state => state.characters
export default charactersSlice.reducer

export function fetchCharacters(page = 1) {
  return async dispatch => {
    dispatch(getCharacters())

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      const data = await response.json()

      dispatch(getCharactersSuccess(data))
    } catch (error) {
      dispatch(getCharactersFailure())
    }
  }
}


export function saveCharacter(characterId) {
  return dispatch => dispatch(saveCharacterAction(characterId));
}