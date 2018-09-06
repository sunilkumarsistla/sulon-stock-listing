import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { addSymbolToPortFolio } from '../../actions/portfolioAction';
import { setSymbols } from '../../actions/apiAction';
import { getAllSymbols, getCompanyFromSymbol } from '../../providers/api'


class SymbolSelector extends React.Component {

    componentDidMount() {
        const { getAllSymbols, setSymbols } = this.props;
        getAllSymbols().then(s => setSymbols(s));  
    }

    addSymbolToPortFolioList = s => {
        const { addSymbol, getCompanyFromSymbol } = this.props;
        getCompanyFromSymbol(s.value).then(c => addSymbol(c));
    }

    render() {
        const { symbols } = this.props;
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
    return { symbols: state.symbols.list };
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