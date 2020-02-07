import React from 'react';

let openDialog = {};

const DialogBuyOptionContext = React.createContext({
    openDialog: openDialog,
    setOpenDialog: () => {}
});

export const DialogBuyOptionProvider = DialogBuyOptionContext.Provider
export const DialogBuyOptionConsumer = DialogBuyOptionContext.Consumer
export default DialogBuyOptionContext;