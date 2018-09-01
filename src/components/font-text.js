import React, { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { Text } from 'react-native' ;

export default class FontText extends Component {
  Loadtext() {
    const { style, children } = this.props;

    return <Text style={style}>{children}</Text>;
  }

  render(){
    return (
      this.Loadtext()
    );
  }
}
