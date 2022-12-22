import { createStore } from 'state-pool';

export const containerLogger = createStore();
containerLogger.setState("isLogger", false);
