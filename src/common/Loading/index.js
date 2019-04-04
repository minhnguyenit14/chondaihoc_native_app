import React from 'react';
import {
  ActivityIndicator,
} from 'react-native';
import {
  DotIndicator
} from 'react-native-indicators';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      containerStyle,
      color,
      size,
      dot
    } = this.props;
    color = color || vars.orange;
    size = size || "small";
    return (
      dot ?
        <DotIndicator
          color={color}
        />
        :
        <ActivityIndicator
          color={color}
          size={size}
          style={containerStyle}
        />

    );
  }
}

export default Loading;