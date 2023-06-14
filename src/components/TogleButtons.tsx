import React  from 'react';
import { useAppStore,AppState } from '../store/appStore';
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
  const setZustandState = useAppStore((state)=>state.setAppState);
  const isChecked = useAppStore((state)=>state[stateKey]);

  const handleChange = () => {
    setZustandState(stateKey, !isChecked);
  };

  return (
    <Toggle inlineLabel label={label} onChange={handleChange} defaultChecked styles={toggleStyles} {...restProps} />
  );
}
