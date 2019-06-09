import ActionCreator, {reducer, Operation} from './data';
import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../api';

describe(`ActionCreator`, () => {
  it(`LOAD_FILMS returns right action`, () => {
    const filmsList = [{name: `film1`}, {name: `film2`}];
    const action = ActionCreator[`LOAD_FILMS`](filmsList);

    expect(action).toEqual({
      type: `LOAD_FILMS`,
      payload: filmsList,
    });
  });

  it(`LOAD_PROMO_FILM returns right action`, () => {
    const film = {name: `film2`};
    const action = ActionCreator[`LOAD_PROMO_FILM`](film);

    expect(action).toEqual({
      type: `LOAD_PROMO_FILM`,
      payload: film,
    });
  });

  it(`LOAD_FAVORITES returns right action`, () => {
    const filmsList = [{name: `film1`}, {name: `film2`}];
    const action = ActionCreator[`LOAD_FAVORITES`](filmsList);

    expect(action).toEqual({
      type: `LOAD_FAVORITES`,
      payload: filmsList,
    });
  });

  it(`UPDATE_FAVORITES returns right action`, () => {
    const film = {name: `film2`};
    const action = ActionCreator[`UPDATE_FAVORITES`](film);

    expect(action).toEqual({
      type: `UPDATE_FAVORITES`,
      payload: film,
    });
  });

  it(`SET_GENRES returns right action`, () => {
    const genres = [`All`, `Comedy`];
    const action = ActionCreator[`SET_GENRES`](genres);

    expect(action).toEqual({
      type: `SET_GENRES`,
      payload: genres,
    });
  });
});

describe(`reducer`, () => {
  it(`returns right state with LOAD_FILMS action`, () => {
    const initialState = {
      films: [],
    };

    const filmsList = [{name: `film1`}, {name: `film2`}];
    const action = {
      type: `LOAD_FILMS`,
      payload: filmsList,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({films: filmsList});
  });
});

describe(`questionLoader function`, () => {
  it(`should make a correct call to /films`, () => {
    const dispatch = jest.fn();
    const api = createAPI();
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    filmsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledNthWith(1, {
          type: `LOAD_QUESTIONS`,
          payload: [{fake: true}],
        });
      });

  });
});
