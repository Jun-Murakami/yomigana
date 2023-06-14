import React from 'react';
import { IButtonProps } from '@fluentui/react';
import { useAppStore } from '../store/appStore';
import { useDialogStore } from '../store/dialogStore';
import { RoundButton } from './RoundButtons';

export function ClearButton(props: IButtonProps) {
  const setAppState = useAppStore((state)=>state.setAppState);
  const clearText = () => {
    setAppState('lyricTextContent', '');
  };

  return (
    <RoundButton text="クリア" onClick={clearText} {...props} />
  );
}

export function CopyButton(props: IButtonProps) {
  const convertedTextContent = useAppStore((state)=>state.convertedTextContent);
  const copyText = () => {
    navigator.clipboard.writeText(convertedTextContent);
  };

  return (
    <RoundButton text="クリップボードへコピー" onClick={copyText} {...props} />
  );
}

export function PasteButton(props: IButtonProps) {
  const setAppState = useAppStore((state)=>state.setAppState);
  const pasteText = () => {
    navigator.clipboard.readText().then(clipText => {
      setAppState('lyricTextContent', clipText);
    });
  }

  return (
    <RoundButton text="クリップボードからぺースト" onClick={pasteText} {...props} />
  );
}

export function RemoveLineBreaksButton(props: IButtonProps) {
  const showDialog = useDialogStore((state)=>state.showDialog);
  const convertedTextContent = useAppStore((state)=>state.convertedTextContent);
  const setAppState = useAppStore((state)=>state.setAppState);

  const removeLineBreaks = async () => {
    if (convertedTextContent === '') return;
    const result = await showDialog('変換後テキストの改行を削除して繋げます。（空白行はそのまま残ります。）\n\nこの操作は元に戻せません。実行しますか？', 'Confirm', true);
    if (result) {
      const normalizedText = convertedTextContent.replace(/\r\n|\r|\n/g, '\n');
      if (normalizedText === undefined) return;

      const convertedData = normalizedText.split('\n');
      let outputData = '';
      let isConsecutive = false;

      for (const line of convertedData) {
        if (line.trim() === '') {
          if (!isConsecutive) {
            outputData += '\t';
          }
          isConsecutive = true;
        } else {
          outputData += line;
          isConsecutive = false;
        }
      }

      outputData = outputData.replace(/\t/g, '\n\n');
      setAppState('convertedTextContent', outputData);
    }
  };

  return (
    <RoundButton text="改行削除" onClick={removeLineBreaks} {...props} />
  );
}
