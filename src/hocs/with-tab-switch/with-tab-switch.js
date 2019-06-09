import React, {PureComponent} from 'react';

export const FilmPageTab = {
  FILM_OVERVIEW_LABEL: `Overview`,
  FILM_DETAILS_LABEL: `Details`,
  FILM_REVIEWS_LABEL: `Reviews`,
};

const filmPageTabs = Object.keys(FilmPageTab).map((key) => FilmPageTab[key]);

const withTabSwitch = (Component) => {
  class WithTabSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        tab: FilmPageTab.FILM_OVERVIEW_LABEL,
      };

      this._setTab = this._setTab.bind(this);
      this._renderTabs = this._renderTabs.bind(this);
    }

    render() {
      return (
        <Component
          {...this.props}
          tab={this.state.tab}
          renderTabs={this._renderTabs}
        />
      );
    }

    _setTab(label) {
      this.setState({tab: label});
    }

    _renderTabs() {
      const {tab} = this.state;

      return (
        <ul className="movie-nav__list">
          {filmPageTabs.map((label, index) => (
            <li
              className={`movie-nav__item ${
                label === tab ? `movie-nav__item--active` : ``
              }`}
              key={`label-${index}`}
              onClick={(evt) => {
                evt.preventDefault();

                this._setTab(label);
              }}
            >
              <a href="#" className="movie-nav__link">
                {label}
              </a>
            </li>
          ))}
        </ul>
      );
    }
  }

  return WithTabSwitch;
};

export default withTabSwitch;
