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
        mv: model.master,
        portfolio: true
    });

    return (<li className={cs}>
        <div onClick={() => onClick(model)}>
            {model.companyName} <small>({model.symbol})</small>
        </div>
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
            return (<div style={{"marginTop": '15px'}}>Add symbols from the above selector</div>);
        } 

        for(let k in symbols) {
            if(symbols.hasOwnProperty(k)){
                list.push(<PortfolioDetail key={k} remove={removeSymbol} onClick={toggleMaster} model={symbols[k]}/>);
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