import React from 'react';
import MapNode from '../../Project/MapNode';
import { TextField } from '@material-ui/core';

interface Props{
    node : MapNode;
    onChange : () => void;
}

interface State{
    node : MapNode;
    onChange : () => void;
}

class MapNodeEditor extends React.Component<Props, State>{

    constructor(props : Props){
        super(props);

        this.onNameChange = this.onNameChange.bind(this);

        this.state = props;
    }

    render(){
        return (
            <>
                <div>
                    <TextField type='text' name='name' value={this.state.node.name} onChange={this.onNameChange}/>
                </div>
            </>)
    }

    onNameChange(x: any){
        this.state.node?.setName(x.target.value); 
        this.state.onChange();
    }
}

export default MapNodeEditor