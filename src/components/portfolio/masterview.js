import React from 'react';
import { connect } from 'react-redux';

const MasterDetail = props => {
    const { model } = props;

    return (<li className='tile'>
        <img src={model.logo} />
        <div className='company-name'>
            {model.companyName} - ({model.symbol})
        </div>
        <div className='company-details'>
            {model.description}
            <br />
            <a href={model.website}>website</a>
        </div>
        <div className='stock-details'>
            <div>Price</div>
            <div>Open</div>
            <div>Close</div>
            <div>High</div>
            <div>Low</div>
            <div>{model.stock.price}</div>
            <div>{model.stock.open}</div>
            <div>{model.stock.close}</div>
            <div>{model.stock.high}</div>
            <div>{model.stock.low}</div>
        </div>
      </li>);
}

class MasterView extends React.Component {
    render() {
        const { symbols } = this.props;

        if(!symbols || symbols.length <= 0)
            return (<ul>
                <li>Select Symbols from portfolio for more details</li>
            </ul>)
        return (<ul>
            {symbols.map((x, i) => <MasterDetail key={i} model={x} />)}
        </ul>);
    }
}

const mapStateToProps = state => {
    var symbols = [];
    for(let k in state.portfolio) {
        if(state.portfolio.hasOwnProperty(k) && state.portfolio[k].master)
            symbols.push(state.portfolio[k])
    }
    return { symbols };
}

export default connect(mapStateToProps)(MasterView);