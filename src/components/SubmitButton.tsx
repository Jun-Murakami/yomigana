import React, { useContext } from 'react';
import { IButtonProps } from '@fluentui/react';
import { AppContext } from '../context/AppContext';
import { PrimaryRoundButton } from './RoundButtons';
import { ApiInput, getHiraganaFromApi } from '../services/getHiraganaFromApi';

export function SubmitButton(props: IButtonProps) {
  const appState = useContext(AppContext);

  const handleSubmit = async () => {
    if (appState) {
      if (!appState.lyricTextContent.trim()) {
        return;
      }
      const apiInput: ApiInput = {
        text: appState.lyricTextContent,
        youonIsChecked: appState.youonIsChecked,
        sokuonIsChecked: appState.sokuonIsChecked,
        katakanaIsChecked: appState.katakanaIsChecked,
        englishIsChecked: appState.englishIsChecked,
        spaceIsChecked: appState.spaceIsChecked,
      };
      try {
        const convertedText = await getHiraganaFromApi(apiInput);
        appState.setAppState('convertedTextContent',convertedText);
      } catch (ex) {
        if (ex instanceof Error) {
          await appState.dialog(ex.message, "Error");
        } else {
          await appState.dialog("An unknown error occurred.", "Error");
        }
      }
    }
  };

  return (
    <PrimaryRoundButton text="変換実行" onClick={handleSubmit}{...props}/>
  );
}