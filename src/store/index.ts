import { createStore, combineReducers, applyMiddleware, Store } from 'redux'

import about from '../components/About/reducer'
import thunk from 'redux-thunk';
import { IAboutState } from '../components/About/models';

export interface IState {
  about: IAboutState
}

const reducers = { about }

const store: Store<IState> = createStore(combineReducers(reducers), applyMiddleware(thunk))

export default store