import ActionCreator, {reducer} from './application';

describe(`reducer returns right state with`, () => {
  it(`GENRE_FILTER action`, () => {
    const initialState = {genre: `Comedy`};

    const action = {
      type: `GENRE_FILTER`,
      payload: `Crime`,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({genre: `Crime`});
  });
});

describe(`ActionCreator GENRE_FILTER`, () => {
  it(`returns right action`, () => {
    const appGenre = `Thriller`;
    const action = ActionCreator[`GENRE_FILTER`](appGenre);

    expect(action).toEqual({
      type: `GENRE_FILTER`,
      payload: appGenre,
    });
  });
});
