import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {requireNativeComponent, UIManager, findNodeHandle} from 'react-native';

const COMPONENT_NAME = 'CoreView';
const RNCoreView = requireNativeComponent(COMPONENT_NAME);

export default class CoreView extends Component {
  static propTypes = {
    label: PropTypes.array,
    onUpdate: PropTypes.func,
  };
  _onUpdate = event => {
    if (this.props.onUpdate) {
      this.props.onUpdate(event.nativeEvent);
    }
  };
  render() {
    const {label, style} = this.props;
    return (
      <RNCoreView
        style={style}
        label={label}
        onUpdate={this._onUpdate}
        ref={ref => (this.ref = ref)}
      />
    );
  }
  update = (...args) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.ref),
      UIManager[COMPONENT_NAME].Commands.obtainLabelData,
      [...args],
    );
  };
}
