import React, {Component} from 'react';
import SimpleBar from 'simplebar-react';

class SimpleListView extends Component {
  render() {
    const {children, data, listStyle, ...other} = this.props;

    return <div {...other}>
      <SimpleBar style={{...{height: '100%', width: '100%'}, ...listStyle}}>
        {children}
        {data && data
                  .map(element => element.name || element)
                  .map(name => <div key={name}>{name}</div>)}
      </SimpleBar>
    </div>;
  }
}

export default SimpleListView;