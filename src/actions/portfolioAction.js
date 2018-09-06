import ACTIONS from './action';
import socIO from 'socket.io-client';

import getStore from '../store';

var socPromise, subscribeList = {};

export const addSymbolToPortFolio = symbol => {
    if(!subscribeList[symbol.symbol])
        socPromise.then(socket => {
            socket.emit("subscribe", symbol.symbol);
        });
    return {
        type: ACTIONS.ADD_SYMBOL_TO_PORTFOLIO,
        payload: symbol
    };
};

export const toggleSymbolMasterView = symbol => ({
    type: ACTIONS.TOGGLE_SYMBOL_MASTER_DETAIL,
    payload: symbol
})

export const removeSymbolFromPortFolio = symbol => {
    if(subscribeList[symbol.symbol]) {
        socPromise.then(socket => {
            socket.emit("unsubscribe", symbol.symbol);
        });
        delete subscribeList[symbol.symbol];
    }
    return {
        type: ACTIONS.REMOVE_SYMBOL_FROM_PORTFOLIO,
        payload: symbol
    }
}

export const removeSymbolFromMasterView = symbol => ({
    type: ACTIONS.REMOVE_SYMBOL_FROM_MASTER_DETAIL,
    payload: symbol
})

export const updateStockPrice = symbol => ({
    type: ACTIONS.UPDATE_SYMBOL_PRICE,
    payload: symbol
})


export const initializeSocket = () => {        
    const BASE_SOC_URL = 'https://ws-api.iextrading.com/1.0';
    
    const url = `${BASE_SOC_URL}/last`;
    const socket = socIO.connect(url);
        
    socPromise = new Promise(r => {
        socket.on('connect', () => { 
            console.log('connected');              
            r(socket);
        });
    });

    socPromise.then(socket => {
        socket.on('message', message => {
            getStore().dispatch(updateStockPrice(JSON.parse(message)));
        });
    });
}

export const disconnectSocket = () => {
    socPromise.then(socket => {
        socket.disconnect();
        console.log("Disconnecting Socket as component will unmount");
    });
}