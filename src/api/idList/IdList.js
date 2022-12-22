import { createStore } from 'state-pool';

export const containerIdList = createStore();
containerIdList.setState("idList", "");

export const containerNameList = createStore();
containerNameList.setState("nameList", "");