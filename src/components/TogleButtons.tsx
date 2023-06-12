import React, { useContext } from 'react';
import { AppContext, AppState } from '../context/AppContext';
import { IToggleStyles } from '@fluentui/react/lib/Toggle';
import { Toggle } from '@fluentui/react/lib/Toggle';

const toggleStyles: Partial<IToggleStyles> = {
  label: {
    marginLeft: '3px',
    marginRight: '10px',
  },
};
interface OwnProps {
  label: string;
  stateKey: keyof AppState;
}

type Props = OwnProps & React.ComponentProps<typeof Toggle>;

export function ToggleComponent({ label, stateKey, ...restProps }: Props) {
  const appState = useContext(AppContext);

  if (!appState) {
    throw new Error('AppContext not found');
  }

  const { setAppState } = appState;
  const isChecked = appState[stateKey];

  const handleChange = () => {
    setAppState(stateKey, !isChecked);
  };

  return (
    <Toggle inlineLabel label={label} onChange={handleChange} defaultChecked styles={toggleStyles} {...restProps} />
  );
}
