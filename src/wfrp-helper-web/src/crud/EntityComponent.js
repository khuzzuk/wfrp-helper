import {Component} from "react";

export default class EntityComponent extends Component {
    updateEntity = property => value => {
        this.props.entity[property] = value;
        this.setState({[property]: value})
    };

    updateEntityWithEvent = property => event => {
        this.props.entity[property] = event.target.value;
        this.setState({[property]: event.target.value})
    };

    pushToEntity = property => value => {
        this.props.entity[property].push(value);
        this.setState({[property]: value});
    };

    removeFromArray = property => value => {
        const arrayToReduce = this.props.entity[property];
        arrayToReduce.splice(arrayToReduce.indexOf(value), 1);
        this.setState({[property + 'Reduced']: value});
    };

    removeOnContextMenu = (property, value) => event => {
        event.preventDefault();
        const arrayToReduce = this.props.entity[property];
        arrayToReduce.splice(arrayToReduce.indexOf(value), 1);
        this.setState({[property + 'Reduced']: value});
    };
}