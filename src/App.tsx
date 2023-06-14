import React from 'react';
import { useDialogStore } from './store/dialogStore';
import MainContainer from './components/MainContainer';
import ModalDialog from './components/ModalDialog';

function App() {
  const isDialogVisible = useDialogStore((state) => state.isDialogVisible);

  return (
    <>
      {isDialogVisible && (
        <ModalDialog />
      )}
      <MainContainer />
    </>
  );
}

export default App;