import React from 'react';
import { DefaultButton, PrimaryButton, IButtonStyles, IButtonProps } from '@fluentui/react';

const customButtonStyles: IButtonStyles = {
  root: {
    borderRadius: '6px',
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