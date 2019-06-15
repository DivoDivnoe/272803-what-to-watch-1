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

  it(`REMOVE_FAVORITE returns right action`, () => {
    const film = {name: `film2`};
    const action = ActionCreator[`REMOVE_FAVORITE`](film);

    expect(action).toEqual({
      type: `REMOVE_FAVORITE`,
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

  it(`LOAD_COMMENTS returns right action`, () => {
    const comments = [{text: `comment1`}, {text: `comment2`}];
    const action = ActionCreator[`LOAD_COMMENTS`](comments);

    expect(action).toEqual({
      type: `LOAD_COMMENTS`,
      payload: comments,
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

  it(`returns right state with LOAD_PROMO_FILM action`, () => {
    const initialState = {
      promoFilm: {},
    };

    const film = {name: `film2`};
    const action = {
      type: `LOAD_PROMO_FILM`,
      payload: film,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({promoFilm: film});
  });

  it(`returns right state with LOAD_FAVORITES action`, () => {
    const initialState = {
      favorites: [],
    };

    const filmsList = [{name: `film1`}, {name: `film2`}];
    const action = {
      type: `LOAD_FAVORITES`,
      payload: filmsList,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({favorites: filmsList});
  });

  it(`returns right state with UPDATE_FAVORITES action`, () => {
    const initialState = {
      favorites: [],
    };

    const film = {name: `film1`, id: 1};
    const action = {
      type: `UPDATE_FAVORITES`,
      payload: film,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({favorites: [film]});
  });

  it(`returns right state with REMOVE_FAVORITE action`, () => {
    const initialState = {
      favorites: [{name: `film1`, id: 1}],
    };

    const film = {name: `film1`, id: 1};
    const action = {
      type: `REMOVE_FAVORITE`,
      payload: film,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({favorites: []});
  });

  it(`returns right state with SET_GENRES action`, () => {
    const initialState = {
      genres: [],
    };

    const genres = [`Comedy`, `Crime`];
    const action = {
      type: `SET_GENRES`,
      payload: genres,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({genres});
  });

  it(`returns right state with LOAD_COMMENTS action`, () => {
    const initialState = {
      comments: [],
    };

    const comments = [{}, {}];
    const action = {
      type: `LOAD_COMMENTS`,
      payload: comments,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({comments});
  });
});

describe(`loadFilms function`, () => {
  it(`should make a correct call to /films`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    filmsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_FILMS`,
          payload: [{fake: true}],
        });
      });

  });
});

describe(`loadPromoFilm function`, () => {
  it(`should make a correct call to /films/promo`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const promoLoader = Operation.loadPromoFilm();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    promoLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_PROMO_FILM`,
          payload: [{fake: true}],
        });
      });

  });
});

describe(`loadFavorites function`, () => {
  it(`should make a correct call to /favorite`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const favoritesLoader = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    favoritesLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_FAVORITES`,
          payload: [{fake: true}],
        });
      });

  });
});

describe(`setToFavorites function`, () => {
  it(`should make a correct call to /favorite`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);

    const id = 1;
    const status = 1;
    const path = `/favorite/${id}/${status}`;
    const favoritesPoster = Operation.setToFavorites(id, status, jest.fn());

    apiMock
      .onPost(path)
      .reply(200, [{fake: true}]);

    favoritesPoster(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
      });
  });
});

describe(`setToFavorites function`, () => {
  it(`should make a correct call to /favorite`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);

    const id = 1;
    const status = 1;
    const path = `/favorite/${id}/${status}`;
    const onFail = jest.fn();
    const favoritesPoster = Operation.setToFavorites(id, status, onFail);

    apiMock
      .onPost(path)
      .reply(403, [{fake: true}]);

    favoritesPoster(dispatch, jest.fn(), api)
      .then(() => {
        expect(onFail).toHaveBeenCalledTimes(1);
      });
  });
});

describe(`loadComments function`, () => {
  it(`should make a correct call to /comments/:id`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const id = 1;
    const commentsLoader = Operation.loadComments(id);

    apiMock
      .onGet(`/comments/${id}`)
      .reply(200, [{fake: true}]);

    commentsLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_COMMENTS`,
          payload: [{fake: true}],
        });
      });

  });
});
