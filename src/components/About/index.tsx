import * as React from 'react'
import { connect } from 'react-redux'
import { fetchRepos } from './actions'
import { IRepoItem } from './models';
import { IState } from '../../store';

interface IAboutProps {
  user: string,
  repos: IRepoItem[]
  setUser: (name: string) => void,
  fetchRepos: (name: string) => void
}
class About extends React.PureComponent<IAboutProps, any> {
  constructor(props: IAboutProps) {
    super(props)
    this.state = {
      val: this.props.user
    }
  }

  componentDidMount() {
    if (this.state.val) {
      this.props.fetchRepos(this.props.user)
    }
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ val: e.target.value.trim() })
  }

  onInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      this.onSearch()
    }
  }

  onSearch = () => {
    this.props.fetchRepos(this.state.val)
  }

  render() {
    const { user, repos } = this.props

    return (
      <div className="main">
        <div>Please enter the github's username and click search</div>
        <input onChange={this.onInputChange} onKeyUp={this.onInputKeyUp} />
        <button onClick={this.onSearch}>Search</button>
        {
          user && (
            <div>
              <h5>{user}</h5>
              <ul>
                {(repos && repos.length) ? repos.map(item => (
                  <li key={item.id}>
                    <a href={item.html_url} target="_blank">{item.name}</a>
                  </li>
                )) : 'No data'}
              </ul>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ( state: IState ) => {
  return {
    user: state.about.user,
    repos: state.about.repos
  }
}

const mapDispatchToProps = { fetchRepos }

export default connect(mapStateToProps, mapDispatchToProps)(About)
