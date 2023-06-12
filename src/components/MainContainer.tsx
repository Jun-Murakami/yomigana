import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { mergeStyles } from '@fluentui/react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Text } from '@fluentui/react/lib/Text';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { ClearButton, CopyButton, PasteButton, RemoveLineBreaksButton } from './OtherButtons';
import { ToggleComponent } from './TogleButtons';
import { HaWaButton, HeEButton } from './ConvertButtons';
import { SubmitButton } from './SubmitButton';

function MainContainer() {
  const appState = useContext(AppContext);

  const borderStyles = mergeStyles({
    background: '#fafafa',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    selectors: {
      h1: {
        color: '#6958e1',
      },
    },
  });

  const themedMediumStackTokens: IStackTokens = {
    childrenGap: 's1',
    padding: 's1',
  };

  return (
    <div className={borderStyles}>

      <Stack tokens={themedMediumStackTokens} style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
        <h1 style={{ display: 'block', textAlign: 'center' }}>よみがなコンバーター</h1>
        <Stack wrap horizontal horizontalAlign="center" tokens={themedMediumStackTokens}>
          <Stack tokens={themedMediumStackTokens} style={{ width: '550px' }}>
            <Text>■ 歌詞テキスト</Text>
            <TextField
              multiline
              rows={25}
              value={appState ? appState.lyricTextContent : undefined}
              onChange={(e, newValue) => appState?.setAppState('lyricTextContent',newValue || '')}
            />
            <Stack wrap horizontal horizontalAlign="center" tokens={themedMediumStackTokens}>
              <SubmitButton/>
              <ClearButton/>
              <PasteButton/>
            </Stack>
          </Stack>
          <Stack tokens={themedMediumStackTokens} style={{ width: '550px' }}>
            <Text>■ 変換後テキスト</Text>
            <TextField
              multiline
              rows={25}
              value={appState ? appState.convertedTextContent : undefined}
              onChange={(e, newValue) => appState?.setAppState('convertedTextContent',newValue || '')}
            />
            <Stack wrap horizontal horizontalAlign="center" tokens={themedMediumStackTokens}>
              <HaWaButton/>
              <HeEButton/>
              <RemoveLineBreaksButton/>
              <CopyButton/>
            </Stack>
          </Stack>
        </Stack>
        <Stack wrap horizontal horizontalAlign="center" tokens={themedMediumStackTokens}>
          <ToggleComponent label="英語を変換しない" stateKey='englishIsChecked'/>
          <ToggleComponent label="カタカナを変換しない" stateKey='katakanaIsChecked'/>
          <ToggleComponent label="拗音(ゃゅょゎぁぃぅぇぉ)を繋げる" stateKey='youonIsChecked'/>
          <ToggleComponent label="促音(っ)を繋げる" stateKey='sokuonIsChecked'/>
          <ToggleComponent label="半角スペースで分離する" stateKey='spaceIsChecked'/>
        </Stack>
        <Stack wrap horizontalAlign="center" tokens={themedMediumStackTokens}>
          <a href="https://www.goo.ne.jp/">
            <img src="//u.xgoo.jp/img/sgoo.png" width="150" alt="supported by goo" title="supported by goo"/>
          </a>
          <a href="https://note.com/junmurakami/n/n35cd70b8dc12">
            <span>
              Developed by Jun Murakami.（解説記事＆ご意見はこちらまで）
            </span>
          </a>
        </Stack>
      </Stack>
    </div>
  );
}

export default MainContainer;