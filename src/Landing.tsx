import React from 'react';
import Stack from './Stack';
import Annotation from './Project/Annotation';
import RichText from './Project/RichText';
import Project from './Project/Project';
import MapNode from './Project/MapNode';

interface Props{

}

interface State{
    passwordInput: string;
}

class Landing extends React.Component<Props, State>{

    constructor(props: Props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputUpdate = this.onInputUpdate.bind(this);
        this.testPoly = this.testPoly.bind(this);
        this.testTree = this.testTree.bind(this);

        this.state = {passwordInput: ''};
    }

    render(){
        return (
        <>
            <h1>Login</h1>
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onInputUpdate} type='text' placeholder='password' value={this.state.passwordInput}/>
                <button>Button</button>
            </form>
            <h1>{this.testPoly()}</h1>
            <p>{this.testTree()}</p>
        </>)
    }

    testPoly(){
        let annotation = new Annotation([[-1,-1],[-1, 1],[1,1],[1,-1]], new RichText(''));
        return annotation.pointInPolygon([0, 0]) ? 'true' : 'false'
    }

    testTree(){
        let nodes : MapNode[] = [];
        let project = new Project(nodes);
        let n0 = project.addNode();
        let n1 = project.addNode();
        n1.setParent(n0);
        return JSON.stringify(project.getTree());
    }

    onSubmit(event: React.FormEvent){
        event.preventDefault();

        if(this.state.passwordInput === 'asdf'){
            Stack.Push('Logged in');
        }

        this.setState({passwordInput: ''});
    }

    onInputUpdate(event: React.ChangeEvent<HTMLInputElement>){
        this.setState({passwordInput: event.target.value});
    }
}

export default Landing;