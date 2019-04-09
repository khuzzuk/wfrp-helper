import React, {Component} from "react";
import {TextField} from "@material-ui/core";

class PriceField extends Component {

    updatePrice = (onChange, part) => event => {
        let number = parseInt(event.target.value);
        if (number) onChange({...this.props.value, ...{[part]: number}})
    };

    render() {
        const {onChange, value, label} = this.props;
        return <div>
            {label}
            <TextField label={'Gold'}
                       type='number'
                       value={value.gold}
                       onChange={this.updatePrice(onChange, 'gold')}/>
            <TextField label={'Silver'}
                       type='number'
                       value={value.silver}
                       onChange={this.updatePrice(onChange, 'silver')}/>
            <TextField label={'Lead'}
                       type='number'
                       value={value.lead}
                       onChange={this.updatePrice(onChange, 'lead')}/>
        </div>
    }
}

export default PriceField;