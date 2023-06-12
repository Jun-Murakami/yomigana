import React, { useContext } from 'react';
import { IButtonProps } from '@fluentui/react';
import { AppContext } from '../context/AppContext';
import { RoundButton } from './RoundButtons';
import { convertString,ConvertInput,ConvertOutput } from '../services/convertString';

export function HaWaButton(props: IButtonProps) {
  const appState = useContext(AppContext);

  const haWaConvert = async () => {
    const convertInput: ConvertInput = {
      text: appState?.convertedTextContent || '',
      convertSwitch: appState?.convertSwitch || {},
      convertStockHaWa: appState?.convertStockHaWa || [],
      convertStockHeE: appState?.convertStockHeE || [],
      strA: 'は',
      strB: 'わ',
    };
    try {
      let convertOutput: ConvertOutput
      if (appState) {
        convertOutput = await convertString(convertInput, appState.dialog);
        // その他の処理...
      } else {
        // appStateがnullまたはundefinedの場合の処理...
        throw new Error('appStateがnullまたはundefinedです');
      }
      if (convertOutput.text === '') {
        return;
      }
      
      appState?.setAppState('convertedTextContent', convertOutput.text);
      appState?.setAppState('convertSwitch', convertOutput.convertSwitch);
      appState?.setAppState('convertStockHaWa', convertOutput.convertStockHaWa);
      appState?.setAppState('haWaButtonText', convertOutput.buttonTextHaWa);
    } catch (ex) {
    }
  };

  return (
    <RoundButton text={appState?.haWaButtonText} onClick={haWaConvert} {...props}/>
  );
}

export function HeEButton(props: IButtonProps) {
  const appState = useContext(AppContext);

  const heEConvert = async () => {
    const convertInput: ConvertInput = {
      text: appState?.convertedTextContent || '',
      convertSwitch: appState?.convertSwitch || {},
      convertStockHaWa: appState?.convertStockHaWa || [],
      convertStockHeE: appState?.convertStockHeE || [],
      strA: 'へ',
      strB: 'え',
    };
    try {
      let convertOutput: ConvertOutput
      if (appState) {
        convertOutput = await convertString(convertInput, appState.dialog);
        // その他の処理...
      } else {
        // appStateがnullまたはundefinedの場合の処理...
        throw new Error('appStateがnullまたはundefinedです');
      }
      if (convertOutput.text === '') {
        return;
      }
      
      appState?.setAppState('convertedTextContent', convertOutput.text);
      appState?.setAppState('convertSwitch', convertOutput.convertSwitch);
      appState?.setAppState('convertStockHeE', convertOutput.convertStockHeE);
      appState?.setAppState('heEButtonText', convertOutput.buttonTextHeE);
    } catch (ex) {
      if (ex instanceof Error) {
        await appState?.dialog(ex.message, "Error");
      } else {
        await appState?.dialog("An unknown error occurred.", "Error");
      }
    }
  };

  return (
    <RoundButton text={appState?.heEButtonText} onClick={heEConvert} {...props}/>
  );
}