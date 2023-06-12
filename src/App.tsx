import React, { useState,useRef } from 'react';
import { AppState, AppContext } from './context/AppContext';
import MainContainer from './components/MainContainer';
import ModalDialog from './components/ModalDialog';

function App() {
  const [youonIsChecked, setYouonIsChecked] = useState(true);
  const [sokuonIsChecked, setSokuonIsChecked] = useState(true);
  const [katakanaIsChecked, setKatakanaIsChecked] = useState(true);
  const [englishIsChecked, setEnglishIsChecked] = useState(true);
  const [spaceIsChecked, setSpaceIsChecked] = useState(true);
  const [lyricTextContent, setLyricTextContent] = useState('');
  const [haWaButtonText, setHaWaButtonText] = useState('[は]→わ');
  const [heEButtonText, setHeEButtonText] = useState('[へ]→え');
  const [convertedTextContent, setConvertedTextContent] = useState('');
  const [convertSwitch, setConvertSwitch] = useState<Record<string, string>>({"は": "","へ": ""});
  const [convertStockHaWa, setConvertStockHaWa] = useState<string[]>([]);
  const [convertStockHeE, setConvertStockHeE] = useState<string[]>([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isDialogTwoButtons, setIsDialogTwoButtons] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogResult, setDialogResult] = useState<boolean | null>(null);

  const setAppState = (key: keyof AppState, value: boolean | string | null | Record<string, string> | string[]) => {
    switch (key) {
      case 'youonIsChecked':
        setYouonIsChecked(value as boolean);
        break;
      case 'sokuonIsChecked':
        setSokuonIsChecked(value as boolean);
        break;
      case 'katakanaIsChecked':
        setKatakanaIsChecked(value as boolean);
        break;
      case 'englishIsChecked':
        setEnglishIsChecked(value as boolean);
        break;
      case 'spaceIsChecked':
        setSpaceIsChecked(value as boolean);
        break;
      case 'lyricTextContent':
        setLyricTextContent(value as string);
        break;
      case 'convertedTextContent':
        setConvertedTextContent(value as string);
        break;
      case 'haWaButtonText':
        setHaWaButtonText(value as string);
        break;
      case 'heEButtonText':
        setHeEButtonText(value as string);
        break;
      case 'dialogResult':
        setDialogResult(value as boolean | null);
        break;
      case 'convertSwitch':
        setConvertSwitch(value as Record<string, string>);
        break;
      case 'convertStockHaWa':
        setConvertStockHaWa(value as string[]);
        break;
      case 'convertStockHeE':
        setConvertStockHeE(value as string[]);
    }
  };

  const dialog = (message: string, title: string, isTwoButtons = false): Promise<boolean> => {
    const showDialog = (message: string, title: string, isTwoButtons: boolean) => {
      setDialogMessage(message);
      setDialogTitle(title);
      setIsDialogTwoButtons(isTwoButtons);
      setIsDialogVisible(true);
    };
  
    const hideDialog = (result: boolean | null) => {
      setDialogResult(result);
      setIsDialogVisible(false);
    };
  
    showDialog(message, title, isTwoButtons);
  
    return new Promise((resolve) => {
      const handleHideDialog = (result: boolean | null) => {
        resolve(result === true);
        hideDialog(result);
      };
      handleDialogHide.current = handleHideDialog;
    });
  };
  
  const handleDialogHide = useRef<((result: boolean | null) => void) | null>(null);

  const appState: AppState = {
    isDialogVisible,
    isDialogTwoButtons,
    dialogMessage: '',
    dialogTitle: '',
    dialogResult,
    handleDialogHide,
    youonIsChecked,
    sokuonIsChecked,
    katakanaIsChecked,
    englishIsChecked,
    spaceIsChecked,
    lyricTextContent,
    convertedTextContent,
    haWaButtonText,
    heEButtonText,
    convertSwitch,
    convertStockHaWa,
    convertStockHeE,
    setAppState,
    dialog,
  };

  return (
    <AppContext.Provider value={appState}>
      {isDialogVisible && (
        <ModalDialog
          message={dialogMessage}
          title={dialogTitle}
          isTwoButtons={isDialogTwoButtons}
        />
      )}
      <MainContainer />
    </AppContext.Provider>
  );
}

export default App;