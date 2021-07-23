import { getCharacters, getCharactersSuccess, getCharactersFailure, saveCharacterAction } from './characters';
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

test('saveCharacterAction should set dictionary of characters', () => {
  store.dispatch(saveCharacterAction(1));
  const nextState = store.getState().characters;
  expect(nextState.savedCharacters).toEqual(
    { 1: true }
  );
  store.dispatch(saveCharacterAction(1));
  const nextNextState = store.getState().characters;
  expect(nextNextState.savedCharacters).toEqual(
    { 1: false }
  );

});