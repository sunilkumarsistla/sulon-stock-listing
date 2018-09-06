import ACTION from '../actions/action';

const initialState = {
    list: []
}

const loadSymbols = (state = initialState, action) => {
    var nextState = {
        list: action.payload.map(a => ({ symbol: a.symbol, value: a.symbol, label: `${a.name} (${a.symbol})`})),
    };
    return nextState;
}

const defaultReducer = a => a;
var reducerFactory = {};
reducerFactory[ACTION.SET_SYMBOLS] = loadSymbols;

export default (state = initialState, action) => {
    return (reducerFactory[action.type] || defaultReducer)(state, action);
}