import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from './Header';

const Home = React.lazy(() => import('./Home/index'))
const About = React.lazy(() => import('./About/index'))

interface IAppProps { }
export default class App extends React.PureComponent<IAppProps, any> {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <React.Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route path="/about" component={About} />
              <Redirect from="*" to="/" />
            </Switch>
          </React.Suspense>
        </Router>
      </div>
    )
  }
}