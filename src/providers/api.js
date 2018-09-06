import http from 'axios';

const API_BASE_URL = 'https://api.iextrading.com/1.0';
var lookup = {};

export const getAllSymbols = () => {
    const url = `${API_BASE_URL}/ref-data/symbols`;
    return http.get(url).then(resp => (resp.data || []).filter(x => x.isEnabled && x.name && x.symbol));
}

export const getCompanyFromSymbol = symbol => {
    const url = `${API_BASE_URL}/stock/${symbol}/batch?types=logo,company,price,ohlc`;
    lookup[symbol] = lookup[symbol] || http.get(url).then(resp => ({ 
        ...resp.data.company,
        stock: { ...resp.data.ohlc,
            open: resp.data.ohlc.open.price,
            close: resp.data.ohlc.close.price, 
            price: resp.data.price,
        }, 
        logo: resp.data.logo.url,
    }));
    lookup[symbol].then(x=>{
        console.log(x);
    })
    return lookup[symbol];
}
