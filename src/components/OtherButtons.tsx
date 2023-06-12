import React, { useContext } from 'react';
import { IButtonProps } from '@fluentui/react';
import { AppContext } from '../context/AppContext';
import { RoundButton } from './RoundButtons';

export function ClearButton(props: IButtonProps) {
  const appState = useContext(AppContext);

  const clearText = () => {
    appState?.setAppState('lyricTextContent', '');
  };

  return (
    <RoundButton text="クリア" onClick={clearText} {...props} />
  );
}

export function CopyButton(props: IButtonProps) {
  const appState = useContext(AppContext);
  const copyText = () => {
    navigator.clipboard.writeText(appState?.convertedTextContent || '');
  };

  return (
    <RoundButton text="クリップボードへコピー" onClick={copyText} {...props} />
  );
}

export function PasteButton(props: IButtonProps) {
  const appState = useContext(AppContext);
  const pasteText = () => {
    navigator.clipboard.readText().then(clipText => {
      appState?.setAppState('lyricTextContent', clipText);
    });
  }

  return (
    <RoundButton text="クリップボードからぺースト" onClick={pasteText} {...props} />
  );
}

export function RemoveLineBreaksButton(props: IButtonProps) {
  const appState = useContext(AppContext);

  const removeLineBreaks = async () => {
    if (appState?.convertedTextContent === '') return;
    const result = await appState?.dialog('変換後テキストの改行を削除して繋げます。（空白行はそのまま残ります。）\n\nこの操作は元に戻せません。実行しますか？', 'Confirm', true);
    if (result) {
      const normalizedText = appState?.convertedTextContent.replace(/\r\n|\r|\n/g, '\n');
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
      appState?.setAppState('convertedTextContent', outputData);
    }
  };

  return (
    <RoundButton text="改行削除" onClick={removeLineBreaks} {...props} />
  );
}
