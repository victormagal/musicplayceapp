import React from 'react';
import {
  MPConfigurationIcon, MPConfigurationSelectedIcon, MPNotificationIcon, MPNotificationSelectedIcon,
  MPProfileIcon, MPProfileSelectedIcon
} from './index';


export const MPTabConfigurationIcon = (props) => {
  return props.focused ? <MPConfigurationSelectedIcon /> : <MPConfigurationIcon />
};


export const MPTabNotificationIcon = (props) => {
  return props.focused ? <MPNotificationSelectedIcon /> : <MPNotificationIcon />
};


export const MPTabProfileIcon = (props) => {
  return props.focused ? <MPProfileSelectedIcon /> : <MPProfileIcon />
};
