import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.USER;

export const getUserData = (state) => state[NAME_SPACE].userData;
