import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.jsx';

Enzyme.configure({adapter: new Adapter()});

const movies = [
  {
    title: `Fantastic Beasts`,
    image: ``,
    genre: `comedy`,
  },
  {
    title: `Major Payne`,
    image: ``,
    genre: `comedy`,
  },
];

describe(`App component`, () => {
  it(`reacts correctly to clicking the title link`, () => {
    const app = mount(<App movies={movies} />);

    const titleLinks = app.find(`.small-movie-card__link`);
    const linkClickPrevention = jest.fn();

    titleLinks.forEach((link) => {
      link.simulate(`click`, {
        preventDefault: linkClickPrevention
      });
    });

    expect(linkClickPrevention).toHaveBeenCalledTimes(movies.length);
  });
});
