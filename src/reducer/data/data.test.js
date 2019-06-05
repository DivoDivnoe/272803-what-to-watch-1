import ActionCreator, {reducer, Operation, transformObjProps} from './data';
import MockAdapter from 'axios-mock-adapter';
import createAPI from '../../api';

describe(`transformObjProps function`, () => {
  it(`turns snake styled props to camel case`, () => {
    const obj = {
      some_name: ``,
      some_other_name: ``,
    };

    const transformedObj = transformObjProps(obj);

    expect(transformedObj).toEqual({
      someName: ``,
      someOtherName: ``,
    });
  });
});

describe(`ActionCreator LOAD_FILMS`, () => {
  it(`returns right action`, () => {
    const filmsList = [{name: `film1`}, {name: `film2`}];
    const action = ActionCreator[`LOAD_FILMS`](filmsList);

    expect(action).toEqual({
      type: `LOAD_FILMS`,
      payload: filmsList,
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
