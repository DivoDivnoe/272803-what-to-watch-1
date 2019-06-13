import NameSpace from '../name-spaces';

export const getServerStatus = (state) => state[NameSpace.APPLICATION].isServerResponding;
