import React from 'react';
import MapNode from './MapNode'
import TreeItem from 'react-sortable-tree';
import { TextField } from '@material-ui/core';

class MapTreeNode {
    mapNode : MapNode;
    title : any
    children : MapTreeNode[];
    expanded : boolean = false;
    onTitleClick : (id : number) => void;
    onTitleChanged : () => void;

    constructor(mapNode : MapNode, children : MapTreeNode[], onTitleClick : (id : number) => void, onTitleChanged : () => void){
        this.mapNode = mapNode;
        this.title = (<TextField onClick={()=>onTitleClick(mapNode.id)} onChange={(x) => {this.onTextFieldChange(x.target.value)}} value={mapNode.name}/>);
        this.children = children;
        this.onTitleClick = onTitleClick;
        this.onTitleChanged = onTitleChanged;
    }

    onTextFieldChange(value : string){
        this.mapNode.setName(value);

        this.onTitleChanged();
    }
}

export default MapTreeNode;