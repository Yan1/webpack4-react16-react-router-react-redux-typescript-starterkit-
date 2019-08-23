import Fetch, { to } from '../../utils/Fetch'
import { Dispatch } from 'redux';

export const fetchRepos = (name: string) => (dispatch: Dispatch) => new Promise(async resolve => {
  const [err, data] = await to(Fetch({
    url: `https://api.github.com/users/${name}/repos`,
    dispatch
  }))
  if (err) {
    throw err
  }
  return resolve(dispatch({
    type: 'SET_REPOS',
    user: name,
    repos: data
  }))
})