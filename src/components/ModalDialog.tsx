import React,{useContext} from 'react';
import { AppContext } from '../context/AppContext';
import { PrimaryRoundButton, RoundButton } from './RoundButtons';
import { Dialog, DialogFooter } from '@fluentui/react';


interface DialogProps {
  message: string;
  title: string;
  isTwoButtons?: boolean;
}

export default function ModalDialog({ message, title }: DialogProps) {
  const appState = useContext(AppContext);
  return (
    <Dialog
    hidden={!appState?.isDialogVisible}
    onDismiss={() => appState?.handleDialogHide.current && appState?.handleDialogHide.current(null)}
      dialogContentProps={{
        title: title,
        subText: message,
      }}
      modalProps={{
        isBlocking: true,
        styles: { main: { maxWidth: 700, borderRadius: 10} },
      }}
    >
    <DialogFooter>
      <PrimaryRoundButton onClick={() => appState?.handleDialogHide.current && appState?.handleDialogHide.current(true)} text="OK" />
      {appState?.isDialogTwoButtons && <RoundButton onClick={() => appState?.handleDialogHide.current && appState?.handleDialogHide.current(false)} text="キャンセル" />}
    </DialogFooter>
  </Dialog>
  );
}
