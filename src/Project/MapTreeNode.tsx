import MapNode from './MapNode'

class MapTreeNode{
    mapNode : MapNode;
    children : MapTreeNode[];

    constructor(mapNode : MapNode, children : MapTreeNode[]){
        this.mapNode = mapNode;
        this.children = children;
    }
}

export default MapTreeNode;