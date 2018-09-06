import ACTIONS from './action';

export const setSymbols = symbols => ({
    type: ACTIONS.SET_SYMBOLS,
    payload: symbols
});

export const updateStockPrices = symbols => ({
    type: ACTIONS.UPDATE_SYMBOL_PRICE,
    payload: symbols
})