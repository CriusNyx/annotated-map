import React from 'react';
import Stack from './Stack';
import Annotation from './Project/Annotation';
import RichText from './Project/RichText';

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
        </>)
    }

    testPoly(){
        let annotation = new Annotation([[-1,-1],[-1, 1],[1,1],[1,-1]], new RichText());
        return annotation.pointInPolygon([0, 0]) ? 'true' : 'false'
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