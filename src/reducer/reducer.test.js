import ActionCreator, {reducer, filterFilms} from './reducer';

describe(`reducer returns right state with`, () => {
  it(`GENRE_FILTER action`, () => {
    const initialState = {
      genre: `comedy`,
      films: [
        {
          title: `some title`,
          image: `some image`,
          genre: `crime`,
          preview: `some http`,
        },
        {
          title: `some other title`,
          image: `some other image`,
          genre: `thriller`,
          preview: `some other http`,
        },
      ],
    };

    const action = {
      type: `GENRE_FILTER`,
      filter: `crime`,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      genre: `crime`,
      films: initialState.films,
    });
  });
});

describe(`ActionCreator GENRE_FILTER`, () => {
  it(`returns right action`, () => {
    const appGenre = `thriller`;
    const action = ActionCreator[`GENRE_FILTER`](appGenre);

    expect(action).toEqual({
      type: `GENRE_FILTER`,
      filter: appGenre,
    });
  });
});

describe(`filterFilms function`, () => {
  it(`returns full films list, when all genres are chosen`, () => {
    const films = [
      {
        title: `some title`,
        image: `some image`,
        genre: `crime`,
        preview: `some http`,
      },
      {
        title: `some other title`,
        image: `some other image`,
        genre: `thriller`,
        preview: `some other http`,
      },
    ];

    const filteredFilms = filterFilms(films, `all`);

    expect(filteredFilms).toEqual(films);
  });

  it(`returns right films list, when one of genres is chosen`, () => {
    const films = [
      {
        title: `some title`,
        image: `some image`,
        genre: `crime`,
        preview: `some http`,
      },
      {
        title: `some other title`,
        image: `some other image`,
        genre: `thriller`,
        preview: `some other http`,
      },
    ];

    const filteredFilms = filterFilms(films, `thriller`);

    expect(filteredFilms).toEqual([films[1]]);
  });

  it(`returns empty list, when there are no films with chosen genre`, () => {
    const films = [
      {
        title: `some title`,
        image: `some image`,
        genre: `crime`,
        preview: `some http`,
      },
      {
        title: `some other title`,
        image: `some other image`,
        genre: `thriller`,
        preview: `some other http`,
      },
    ];

    const filteredFilms = filterFilms(films, `drama`);

    expect(filteredFilms).toEqual([]);
  });
});
