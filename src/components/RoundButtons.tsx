import React from 'react';
import { DefaultButton, PrimaryButton, IButtonStyles, IButtonProps, getTheme } from '@fluentui/react';

const theme = getTheme();
const customButtonStyles: IButtonStyles = {
  root: {
    borderRadius: '6px',
    borderColor: theme.palette.neutralQuaternary,
    boxShadow: theme.effects.elevation4,
    selectors: {
      ':hover': {
        borderRadius: '6px',
      },
    },
  },
};

export const RoundButton: React.FC<IButtonProps> = (props) => {
  return <DefaultButton styles={customButtonStyles} {...props} />;
};

export const PrimaryRoundButton: React.FC<IButtonProps> = (props) => {
  return <PrimaryButton styles={customButtonStyles} {...props} />;
};