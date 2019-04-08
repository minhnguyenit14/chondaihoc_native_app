import React from 'react';
import {
  ActivityIndicator,
} from 'react-native';
import {
  DotIndicator
} from 'react-native-indicators';
import { vars } from '../../styles';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      containerStyle,
      color,
      size,
      dot,
      dotSize
    } = this.props;
    color = color || vars.orange;
    size = size || "small";
    dotSize = dotSize || vars.fontSizeStandard / 2;
    return (
      dot ?
        <DotIndicator
          color={color}
          size={dotSize}
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