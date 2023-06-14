import React from 'react';
import { useDialogStore } from '../store/dialogStore';
import { PrimaryRoundButton, RoundButton } from './RoundButtons';
import { Dialog, DialogFooter } from '@fluentui/react';

export default function ModalDialog() {
  const hideDialog = useDialogStore((state) => state.hideDialog);
  const resolveDialog = useDialogStore((state) => state.resolveDialog);
  return (
    <Dialog
      hidden={!useDialogStore((state) => state.isDialogVisible)}
      onDismiss={hideDialog}
      dialogContentProps={{
        title: useDialogStore((state) => state.dialogTitle),
        subText: useDialogStore((state) => state.dialogMessage),
      }}
      modalProps={{
        isBlocking: true,
        styles: { main: { maxWidth: 700, borderRadius: 10} },
      }}
    >
      <DialogFooter>
        <PrimaryRoundButton onClick={() => {
          resolveDialog?.(true);
          hideDialog();
        }} text="OK" />
        {useDialogStore((state) => state.isDialogTwoButtons) && <RoundButton onClick={() => {
          resolveDialog?.(false);
          hideDialog();
        }} text="キャンセル" />}
      </DialogFooter>
    </Dialog>
  );
}