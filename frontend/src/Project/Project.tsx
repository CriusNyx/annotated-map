import { timeStamp } from 'console';
import MapNode from './MapNode'
import MapTreeNode from './MapTreeNode';

class Project{
    name : string
    nodes : MapNode[]

    constructor(nodes : MapNode[] = []){
        this.name = '';
        this.nodes = nodes;
    }

    public getTree(onTitleClick: (id : number) => void, onTitleChanged : ()=>void){
        let map = new Map<number, {node: MapNode, children : number[]}>();

        // initialize map
        for(let node of this.nodes){
            map.set(node.id, {node, children : []});
        }

        let rootNodes : number[] = [];

        // link objects to parents
        for(let node of this.nodes){
            if(node.parent !== null){
                let parent = map.get(node.parent);
                if(parent){
                    parent.children.push(node.id);
                    map.set(node.parent, parent);
                }
            }
            else{
                rootNodes.push(node.id);
            }
        }

        let output : MapTreeNode[] = [];
        for(let x of rootNodes){
            output.push(this.buildTree(x, map, onTitleClick, onTitleChanged));
        }

        return output;
    }

    private buildTree(
        rootIndex : number, 
        map : Map<number, {node: MapNode, children : number[]}>,
        onTitleClick: (id: number) => void,
        onTitleChanged: () => void) 
        : MapTreeNode{
            let element = map.get(rootIndex);
            if(element){
                let children = element.children.map((x) => this.buildTree(x, map, onTitleClick, onTitleChanged));
                return new MapTreeNode(element.node, children, onTitleClick, onTitleChanged);
            }
            else{
                throw 'Invalid tree topology provided'
            }
    }

    public addNode(){
        let highestID = this.nodes.reduce<number>((out, x) => { return Math.max(out, x.id)}, -1);
        let newIndex = highestID + 1;
        let output = new MapNode(newIndex);
        this.nodes.push(output);
        return output;
    }

    public getNode(id : number){
        for(let x of this.nodes){
            if(x.id === id){
                return x;
            }
        }
            return null;
    }

    public removeNode(node : MapNode){
        let index = this.nodes.indexOf(node);
        this.nodes.splice(index, 1);

        for(let x of this.nodes){
            if(x.parent === node.id){
                x.setParent(null);
            }
        }
    }

    public orderNodes(order : number[]){
        let map = new Map<number, MapNode>();
        for(let x of this.nodes){
            map.set(x.id, x);
        }
        this.nodes = order.map((x) => map.get(x)) as MapNode[];
    }
}

export default Project