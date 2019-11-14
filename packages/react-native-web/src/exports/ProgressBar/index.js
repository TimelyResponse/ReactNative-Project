/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue } from '../../types';
import type { ViewProps } from '../View';

import applyNativeMethods from '../../modules/applyNativeMethods';
import StyleSheet from '../StyleSheet';
import View from '../View';
import React from 'react';

type ProgressBarProps = {
  ...ViewProps,
  color?: ColorValue,
  indeterminate?: boolean,
  progress?: number,
  trackColor?: ColorValue
};

class ProgressBar extends React.Component<ProgressBarProps> {
  _progressElement: View;

  static displayName = 'ProgressBar';

  componentDidMount() {
    this._updateProgressWidth();
  }

  componentDidUpdate() {
    this._updateProgressWidth();
  }

  render() {
    const {
      color = '#1976D2',
      indeterminate = false,
      progress = 0,
      trackColor = 'transparent',
      style,
      ...other
    } = this.props;

    const percentageProgress = progress * 100;

    return (
      <View
        {...other}
        accessibilityRole="progressbar"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow={indeterminate ? null : percentageProgress}
        style={[styles.track, style, { backgroundColor: trackColor }]}
      >
        <View
          ref={this._setProgressRef}
          style={[styles.progress, indeterminate && styles.animation, { backgroundColor: color }]}
        />
      </View>
    );
  }

  _setProgressRef = element => {
    this._progressElement = element;
  };

  _updateProgressWidth = () => {
    const { indeterminate = false, progress = 0 } = this.props;
    const percentageProgress = indeterminate ? 50 : progress * 100;
    const width = indeterminate ? '25%' : `${percentageProgress}%`;
    if (this._progressElement) {
      this._progressElement.setNativeProps({
        style: { width }
      });
    }
  };
}

const styles = StyleSheet.create({
  track: {
    height: 5,
    overflow: 'hidden',
    userSelect: 'none',
    zIndex: 0
  },
  progress: {
    height: '100%',
    zIndex: -1
  },
  animation: {
    animationDuration: '1s',
    animationKeyframes: [
      {
        '0%': { transform: [{ translateX: '-100%' }] },
        '100%': { transform: [{ translateX: '400%' }] }
      }
    ],
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite'
  }
});

export default applyNativeMethods(ProgressBar);
