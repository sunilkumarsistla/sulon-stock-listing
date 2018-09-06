import ACTION from '../actions/action';

const initialState = {
}

const defaultReducer = a => a;

const addSymbolToPortfolio = (state = initialState, action) => {
    if(!(action && action.payload) ||
     (state.hasOwnProperty(action.payload.symbol) &&
        state[action.payload.symbol].portfolio))
        return state;

    var newListing = {};
    newListing[action.payload.symbol] = {
        ...action.payload
    };
    
    return { ...state, ...newListing };
}

const removeSymbolFromPortfolio = (state = initialState, action) => {
    if(!action || !action.payload || !state.hasOwnProperty(action.payload.symbol))
        return state;
    var newState = { ...state };
    delete newState[action.payload.symbol];
    return newState;
}

const toggleSymbolMasterView = (state = initialState, action) => {
    if(!action || !action.payload || !state.hasOwnProperty(action.payload.symbol))
        return state;

    const mList = {};
    const { symbol } = action.payload; 
    mList[symbol] = { ...state[symbol], master: !state[symbol].master };

    return { ...state, ...mList };
}

const updateSymbolPrice = (state = initialState, action) => {
    const { symbol, price } = action.payload;

    if(!state[symbol]) return state;

    var newListing = {};
    newListing[symbol] = state[symbol] || {};
    newListing[symbol].stock.price = price;
    
    return {
        ...state,
        ...newListing
    };
}

var reducerFactory = {};
reducerFactory[ACTION.ADD_SYMBOL_TO_PORTFOLIO] = addSymbolToPortfolio;
reducerFactory[ACTION.REMOVE_SYMBOL_FROM_PORTFOLIO] = removeSymbolFromPortfolio;
reducerFactory[ACTION.TOGGLE_SYMBOL_MASTER_DETAIL] = toggleSymbolMasterView;
reducerFactory[ACTION.UPDATE_SYMBOL_PRICE] = updateSymbolPrice;

export default (state = initialState, action) => {
    return (reducerFactory[action.type] || defaultReducer)(state, action);
}