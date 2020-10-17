import React from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import MapNode from '../Project/MapNode';
import MapTreeNode from '../Project/MapTreeNode';
import Project from '../Project/Project';

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

        let project = props.project;
        let treeData = project.getTree(this.onTitleClick);

        this.state = { project, treeData, expandMap: new Map(), activeNode : null };

        
    }

    render(){
        return <>
            <div style={{ height: 400 }}>
                <h1>Heading</h1>
                <SortableTree
                treeData={this.state.treeData}
                onChange={this.updateTreeData}
                />
                {this.getSingleNodeEditor()}
            </div>
        </>
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

            // get new data structure
            let newTree = this.state.project.getTree(this.onTitleClick);
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
        for(let subchild of child.children){
            this.updateParentHierarchyRecursive(child, subchild);
        }
    }

    private onTitleClick(id : number){
        let node = this.state.project.getNode(id);
        this.setState({activeNode: node});
    }

    private getSingleNodeEditor(){
        if(this.state.activeNode){
            return (
                <p>
                    <form onSubmit={(e)=>{e.preventDefault()}}>
                        <label>Name: <input type='text' name='name' value={this.state.activeNode.name} onChange={(x)=>{this.state.activeNode?.setName(x.target.value); this.updateTreeData(this.state.treeData)}} /></label>
                    </form>
                </p>
            
            )
        }
        else{
            return null;
        }
    }
}

export default MapEditor;