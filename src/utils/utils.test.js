import {parseTime, transformObjProps} from './utils';

describe(`parseTime function`, () => {
  it(`returns right time object in format {hours: hh, minutes: mm, seconds: ss}`, () => {
    let seconds = 0;
    expect(parseTime(seconds)).toEqual({hours: `00`, minutes: `00`, seconds: `00`});

    seconds = 601;
    expect(parseTime(seconds)).toEqual({hours: `00`, minutes: `10`, seconds: `01`});

    seconds = 3600;
    expect(parseTime(seconds)).toEqual({hours: `01`, minutes: `00`, seconds: `00`});
  });
});

describe(`transformObjProps function`, () => {
  it(`transforms snake_style object props to camelCase correctly`, () => {
    const initialObj = {
      id: 1,
      [`film_name`]: `film name`,
      [`some_other_property`]: `some_other_property`,
    };

    expect(transformObjProps(initialObj)).toEqual({
      id: 1,
      filmName: `film name`,
      someOtherProperty: `some_other_property`,
    });
  });
});
