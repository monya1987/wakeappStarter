import React, {Component} from 'react';
import {fromJS} from 'immutable';
import changeCase from 'change-object-case';
import {find} from 'lodash';

export default function connectDecorator(cb) {
  return (InnerComponent) => class ConnectToInitial extends Component {
    constructor(props) {
      super(props);
      changeCase.options = {recursive: true, arrayRecursive: true};
      const initialState = changeCase.camelKeys(INITIAL_STATE);
      const {
        manager,
        user = {},
        advertiserApplicationList = [],
        rivalList = []
      } = initialState;

      const activeAdvertiserApplication = find(advertiserApplicationList, {active: 1}) || {};
      const otherProps = (cb && cb(initialState)) || {};
      this.state = {
        user,
        manager,
        activeAdvertiserApplication,
        rivalsList: fromJS(rivalList),
        advertiserApplicationList,
        ...otherProps
      };
    }

    render() {
      return <InnerComponent {...this.props} {...this.state} />;
    }
  };
}
