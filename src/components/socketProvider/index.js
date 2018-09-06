import React from 'react';
import socIO from 'socket.io-client';

class SocConnect extends React.Component {
    socket;

    constructor(props) {
        super(props);
        const BASE_SOC_URL = "";
        const url = `${BASE_SOC_URL}\s`;
        this.socket = socIO.connect(url);
    }

    componentDidMount() {
    }

    
   componentWillUnmount() {
        socket.disconnect()
        alert("Disconnecting Socket as component will unmount")
    }

    addSymbolToPortFolioList = s => {

    }

    render() {
        
        if(symbols && symbols.length > 0) {
            return (
                <Select className='symbol-input-control' 
                options={symbols}
                onChange={this.addSymbolToPortFolioList}></Select>
            );
        }
        return (<span>Loading Symbols</span>);
    }
}


const mapStateToProps = state => {
    return { symbols: state.portfolio };
}

const mapDispatchToProps = dispatch => ({
    addSymbol: p => dispatch(addSymbolToPortFolio(p)),
    setSymbols: p => dispatch(setSymbols(p)),
    getAllSymbols,
    getCompanyFromSymbol
});

export default 
connect(mapStateToProps,
    mapDispatchToProps)
(SymbolSelector);