import React from 'react';
import MapNode from './MapNode'
import TreeItem from 'react-sortable-tree';

class MapTreeNode {
    mapNode : MapNode;
    title : any
    children : MapTreeNode[];
    expanded : boolean = false;
    onTitleClick : (id : number) => void; 

    constructor(mapNode : MapNode, children : MapTreeNode[], onTitleClick : (id : number) => void){
        this.mapNode = mapNode;
        this.title = (<p onClick={()=>onTitleClick(mapNode.id)}>{mapNode.name}</p>);
        this.children = children;
        this.onTitleClick = onTitleClick;
    }
}

export default MapTreeNode;