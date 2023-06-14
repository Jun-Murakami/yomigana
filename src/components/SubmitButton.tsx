import React from 'react';
import { IButtonProps } from '@fluentui/react';
import { useAppStore } from '../store/appStore';
import { useDialogStore } from '../store/dialogStore';
import { PrimaryRoundButton } from './RoundButtons';
import { ApiInput, getHiraganaFromApi } from '../services/getHiraganaFromApi';

export function SubmitButton(props: IButtonProps) {
  const showDialog = useDialogStore((state)=>state.showDialog);
  const _setAppState = useAppStore((state)=>state.setAppState);
  const text = useAppStore((state)=>state.lyricTextContent);
  const youonIsChecked = useAppStore((state)=>state.youonIsChecked);
  const sokuonIsChecked = useAppStore((state)=>state.sokuonIsChecked);
  const katakanaIsChecked = useAppStore((state)=>state.katakanaIsChecked);
  const englishIsChecked = useAppStore((state)=>state.englishIsChecked);
  const spaceIsChecked = useAppStore((state)=>state.spaceIsChecked);

  const handleSubmit = async () => {
    if (!text.trim()) {
      return;
    }
    const apiInput: ApiInput = {
      text: text,
      youonIsChecked: youonIsChecked,
      sokuonIsChecked: sokuonIsChecked,
      katakanaIsChecked: katakanaIsChecked,
      englishIsChecked: englishIsChecked,
      spaceIsChecked: spaceIsChecked,
    };
    try {
      const convertedText = await getHiraganaFromApi(apiInput);
      _setAppState('convertedTextContent',convertedText);
    } catch (ex) {
      if (ex instanceof Error) {
        await showDialog(ex.message, "Error");
      } else {
        await showDialog("An unknown error occurred.", "Error");
      }
    }
  };

  return (
    <PrimaryRoundButton text="変換実行" onClick={handleSubmit}{...props}/>
  );
}