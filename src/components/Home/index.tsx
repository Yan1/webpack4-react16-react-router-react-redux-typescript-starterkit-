import * as React from 'react';

export interface IHomeProps {
}

export default class Home extends React.Component<IHomeProps> {
  public render() {
    return (
      <div>
        <h4>Welcome!</h4>
        <p>
          This is the webpack4+react16+react-router+react-redux+typescript+starterkit!
        </p>
      </div>
    );
  }
}
