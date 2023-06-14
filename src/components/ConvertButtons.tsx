import React from 'react';
import { IButtonProps } from '@fluentui/react';
import { useAppStore } from '../store/appStore';
import { useDialogStore } from '../store/dialogStore';
import { RoundButton } from './RoundButtons';
import { convertString,ConvertInput,ConvertOutput } from '../services/convertString';

export function HaWaButton(props: IButtonProps) {
  const showDialog = useDialogStore((state)=>state.showDialog);
  const setAppStore = useAppStore((state)=>state.setAppState);
  const convertedTextContent = useAppStore((state)=>state.convertedTextContent);
  const convertSwitch = useAppStore((state)=>state.convertSwitch);
  const convertStockHaWa = useAppStore((state)=>state.convertStockHaWa);
  const convertStockHeE = useAppStore((state)=>state.convertStockHeE);

  const haWaConvert = async () => {
    const convertInput: ConvertInput = {
      text: convertedTextContent,
      convertSwitch: convertSwitch,
      convertStockHaWa: convertStockHaWa,
      convertStockHeE: convertStockHeE,
      strA: 'は',
      strB: 'わ',
    };
    try {
      const convertOutput: ConvertOutput = await convertString(convertInput, showDialog);
      if (convertOutput.text === '') {
        return;
      }
      
      setAppStore('convertedTextContent',convertOutput.text);
      setAppStore('convertSwitch',convertOutput.convertSwitch);
      setAppStore('convertStockHaWa',convertOutput.convertStockHaWa);
      setAppStore('haWaButtonText',convertOutput.buttonTextHaWa);
    } catch (ex) {
      if (ex instanceof Error) {
        await showDialog(ex.message, "Error");
      } else {
        await showDialog("An unknown error occurred.", "Error");
      }
    }
  };

  return (
    <RoundButton text={useAppStore((state)=>state.haWaButtonText)} onClick={haWaConvert} {...props}/>
  );
}

export function HeEButton(props: IButtonProps) {
  const showDialog = useDialogStore((state)=>state.showDialog);
  const setAppStore = useAppStore((state)=>state.setAppState);
  const convertedTextContent = useAppStore((state)=>state.convertedTextContent);
  const convertSwitch = useAppStore((state)=>state.convertSwitch);
  const convertStockHaWa = useAppStore((state)=>state.convertStockHaWa);
  const convertStockHeE = useAppStore((state)=>state.convertStockHeE);

  const heEConvert = async () => {
    const convertInput: ConvertInput = {
      text: convertedTextContent,
      convertSwitch: convertSwitch,
      convertStockHaWa: convertStockHaWa,
      convertStockHeE: convertStockHeE,
      strA: 'へ',
      strB: 'え',
    };
    try {
      const convertOutput: ConvertOutput = await convertString(convertInput, showDialog);
      if (convertOutput.text === '') {
        return;
      }
      
      setAppStore('convertedTextContent',convertOutput.text);
      setAppStore('convertSwitch',convertOutput.convertSwitch);
      setAppStore('convertStockHeE',convertOutput.convertStockHeE);
      setAppStore('heEButtonText',convertOutput.buttonTextHeE);
    } catch (ex) {
      if (ex instanceof Error) {
        await showDialog(ex.message, "Error");
      } else {
        await showDialog("An unknown error occurred.", "Error");
      }
    }
  };

  return (
    <RoundButton text={useAppStore((state)=>state.heEButtonText)} onClick={heEConvert} {...props}/>
  );
}