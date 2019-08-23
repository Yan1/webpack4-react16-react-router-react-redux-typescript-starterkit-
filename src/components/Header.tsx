import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IHeaderProps extends RouteComponentProps {
}

class Header extends React.Component<IHeaderProps> {
  onClick = (key: string) => {
    const { history, location } = this.props
    if (location.pathname !== key) {
      history.push(key)
    }
  }

  public render() {
    const { pathname } = this.props.location
    return (
      <header>
        <span
          onClick={this.onClick.bind(this, '/')}
          className={`item ${pathname === '/' ? 'active' : ''}`}
        >
          Home
        </span>
        <span
          onClick={this.onClick.bind(this, '/About')}
          className={`item ${pathname === '/About' ? 'active' : ''}`}
        >
          About
        </span>
      </header>
    );
  }
}
export default withRouter(Header)