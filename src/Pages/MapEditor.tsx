import React from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import MapNode from '../Project/MapNode';
import MapTreeNode from '../Project/MapTreeNode';
import Project from '../Project/Project';
import { Button, TextField } from '@material-ui/core';
import '../App.css';
import MapNodeEditor from './MapEditor/MapNodeEditor';

interface Props{
    project : Project;
}

interface State{
    project : Project;
    treeData : any;
    expandMap : Map<number, boolean>;
    activeNode : MapNode | null;
}

class MapEditor extends React.Component<Props, State>{

    constructor(props : Props){
        super(props);

        this.updateTreeData = this.updateTreeData.bind(this);
        this.onTitleClick = this.onTitleClick.bind(this);
        this.getSingleNodeEditor = this.getSingleNodeEditor.bind(this);
        this.addNodeButtonClicked = this.addNodeButtonClicked.bind(this);
        this.updateState = this.updateState.bind(this)

        let project = props.project;
        let treeData = project.getTree(this.onTitleClick, this.updateState);

        this.state = { project, treeData, expandMap: new Map(), activeNode : null };   
    }

    render(){
        return <>
            <div style={{ height: '400px' }}>
                <h1 style = {{padding: 15, margin: 0}}>Map Editor</h1>
                <SortableTree treeData={this.state.treeData} onChange={this.updateTreeData}/>
                <Button onClick={this.addNodeButtonClicked}>
                    New Node
                </Button>
                {this.getSingleNodeEditor()}
            </div>
        </>
    }

    private updateState(){
        this.updateTreeData(this.state.treeData);
    }

    private addNodeButtonClicked(e : React.MouseEvent<HTMLElement, MouseEvent>){
        let newNode = this.state.project.addNode();
        let treeData = this.state.treeData;
        treeData.push(new MapTreeNode(newNode, [], this.onTitleClick, this.updateState));

        this.updateTreeData(treeData);
    }

    private getExpandMapFromTree(treeData : MapTreeNode[], map : Map<number, boolean>){
        for(let x of treeData){
            map.set(x.mapNode.id, x.expanded);
            this.getExpandMapFromTree(x.children, map);
        }
    }

    private applyExpandMapToTree(treeData : MapTreeNode[], map : Map<number, boolean>){
        for(let x of treeData){
            x.expanded = map.get(x.mapNode.id) ?? false;
            this.applyExpandMapToTree(x.children, map);
        }
    }

    private updateTreeData(treeData : any){
        let nodes = treeData as MapTreeNode[];
        
        if(nodes){
            // get current expand map
            let expandMap = new Map<number, boolean>();
            this.getExpandMapFromTree(nodes, expandMap);

            // update tree data structure
            for(let root of nodes){
                this.updateParentHierarchyRecursive(null, root);
            }

            this.state.project.orderNodes(this.getNodeOrder(nodes));

            // get new data structure
            let newTree = this.state.project.getTree(this.onTitleClick, this.updateState);
            this.applyExpandMapToTree(newTree, expandMap);

            this.setState({treeData: newTree});
        }
        else{
        }
    }

    private updateParentHierarchyRecursive(parent : MapTreeNode | null, child : MapTreeNode){
        if(child.mapNode.parent != parent?.mapNode.id){
            child.mapNode.setParent(parent?.mapNode ?? null);
        }
        for(let subChild of child.children){
            this.updateParentHierarchyRecursive(child, subChild);
        }
    }

    private onTitleClick(id : number){
        let node = this.state.project.getNode(id);
        this.setState({activeNode: node});
    }

    private getSingleNodeEditor(){
        if(this.state.activeNode){
            return <MapNodeEditor key={this.state.activeNode.id} node={this.state.activeNode} onChange={this.updateState}/>
        }
        else{
            return null;
        }
    }

    private getNodeOrder(nodes : MapTreeNode[], current: number[] = []){
        for(let x of nodes){
            current.push(x.mapNode.id);
            this.getNodeOrder(x.children, current);
        }
        return current;
    }
}

export default MapEditor;