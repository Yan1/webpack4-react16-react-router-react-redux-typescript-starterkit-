import { IAboutState } from "./models";

const initialState = { user: 'Yan1' }

export default function about(
  state: IAboutState = initialState,
  action: {type: string, [propName: string]: any}
): IAboutState {
  switch (action.type) {
    case 'SET_REPOS':
      return {
        ...state,
        repos: action.repos,
        user: action.user
      }
    default:
      return state
  }
}