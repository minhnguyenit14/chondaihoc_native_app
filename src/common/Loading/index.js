import React from 'react';
import {
  ActivityIndicator,
} from 'react-native';


class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      containerStyle,
      color,
      size
    } = this.props;
    color = color || vars.orange;
    size = size || "small";
    return (

      <ActivityIndicator
        color={color}
        size={size}
        style={containerStyle}
      />

    );
  }
}

export default Loading;