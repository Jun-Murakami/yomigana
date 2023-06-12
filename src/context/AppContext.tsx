import { createContext } from 'react';

export interface AppState {
  isDialogVisible: boolean;
  isDialogTwoButtons: boolean;
  dialogMessage: string;
  dialogTitle: string;
  dialogResult: boolean | null;
  youonIsChecked: boolean;
  sokuonIsChecked: boolean;
  katakanaIsChecked: boolean;
  englishIsChecked: boolean;
  spaceIsChecked: boolean;
  lyricTextContent: string;
  haWaButtonText: string;
  heEButtonText: string;
  convertedTextContent: string;
  convertSwitch: Record<string, string>;
  convertStockHaWa: string[];
  convertStockHeE: string[];
  setAppState: (key: keyof AppState, value: boolean | string | null | Record<string, string> | string[] ) => void;
  dialog: (message: string, title: string, isTwoButtons?: boolean) => Promise<boolean>;
  handleDialogHide: React.MutableRefObject<((result: boolean | null) => void) | null>;
}

export const AppContext = createContext<AppState | null>(null);
