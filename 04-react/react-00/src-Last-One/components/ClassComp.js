import React from 'react';

class ClassComp extends React.Component {

    onClick = (e) => {
        
        this.props.callback();
    }
    render() {
      return (
        <h1 onClick={this.onClick}>Hello ClassComp, {JSON.stringify(this.props)}</h1>
      )
    }
  }

  export default ClassComp;