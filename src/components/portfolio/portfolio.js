import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { toggleSymbolMasterView, 
    removeSymbolFromPortFolio,
    initializeSocket, 
    disconnectSocket } from '../../actions/portfolioAction';

const PortfolioDetail = props => {
    const  { model, onClick, remove } = props;
    const cs = classNames({
        mv: model.master
    });

    return (<li className={cs}>
        <a onClick={() => onClick(model)}>
            {model.companyName} <small>({model.symbol})</small>
        </a>
        <a className='remove-link' onClick={()=>remove(model)}>x</a>
    </li>);
}

class Portfolio extends React.Component {
    componentDidMount() { 
      initializeSocket(this.props.dispatch);
    }
  
    componentWillUnmount() {
      disconnectSocket();
    }

    render() {
        const { symbols, toggleMaster, removeSymbol } = this.props;
        var list = [];

        if(!symbols || Object.keys(symbols).length <= 0) {
            list.push(<li key={1}>Add symbols from the above selector</li>);
        } else {
            for(let k in symbols) {
                if(symbols.hasOwnProperty(k)){
                    list.push(<PortfolioDetail key={k} remove={removeSymbol} onClick={toggleMaster} model={symbols[k]}/>);
                }
            }
        }

        return (<ul>{list}</ul>);
    }
}

const mapStateToProps = state => {
    return { symbols: state.portfolio };
}

const mapDispatchToProps = dispatch => ({
    toggleMaster: p => dispatch(toggleSymbolMasterView(p)),
    removeSymbol: p => dispatch(removeSymbolFromPortFolio(p)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);