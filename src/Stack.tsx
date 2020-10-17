import React from 'react';

interface Props{
    root: any
}

interface State{
    stack: [any]
}

let instance: Stack | null = null;

class Stack extends React.Component<Props, State>{

    constructor(props: Props){
        super(props);

        instance = this;

        this.state = {stack: [props.root]};
    }

    render(){
        let stack = this.state.stack;
        var top = stack[stack.length - 1];
        return top;
    }

    public static Push(element: any){
        let stack = instance?.state.stack;
        if(stack != null){
            stack.push(element);
            instance?.setState({stack});
        }
    }

    public static Pop(){
        let stack = instance?.state.stack;
        if(stack != null){
            stack.pop();
            instance?.setState({stack});
        }
    }
}

export default Stack;