import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`App component`, () => {
  const moviesList = [`Иван Васильевич меняет профессию`, `Бриллиантовая рука`, `Джентльмены удачи`];

  it(`reacts correctly to clicking the title link`, () => {
    const app = shallow(<App moviesList={moviesList} />);

    const titleLinks = app.find(`.small-movie-card__link`);
    const linkClickPrevention = jest.fn();

    titleLinks.forEach((link) => {
      link.simulate(`click`, {
        preventDefault: linkClickPrevention
      });
    });

    expect(linkClickPrevention).toHaveBeenCalledTimes(moviesList.length);
  });
});
