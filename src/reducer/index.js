import {combineReducers} from 'redux';
import {reducer as app} from './application/application';
import {reducer as data} from './data/data';
import NameSpace from './name-spaces';

export default combineReducers({
  [NameSpace.APP]: app,
  [NameSpace.DATA]: data,
});
