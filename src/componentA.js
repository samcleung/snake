// React Component example
// Most applications will contain several components, which can accept and use input in the form of "properties" to display the user interface

import React from 'react'
import ComponentB from './ComponentB'
import './ComponentA.scss'

class ComponentA extends React.Component { // ComponentA is the child of the React.Component class
    constructor(props) { // props stands for properties
        super(props); // Sends parent constructor props
        // The state of a component represents its variable parts; for example, sub-titles or scores
        // With states, components are able to communicate with each other:
        //    When a state changes, all components that contain an instance of that state have to update that instance (REACT, if you will)
        this.state = {
            display: 'Hello World!', // We can access this prperty later on in the render function!
                                     // Note: never directly mutate a component's state like:
                                     //    this.state.display = 'Goodbye World!';
                                     // Instead, to change state, refer to the clickHandler event handler
            toggle: true
        }

        let state2 = Object.assign({}, this.state); // Make a copy of the original state with Object.assign which assigns the properties of this.state to an empty object state2
        state2.display = 'Goodbye World!'; // Now directly manipulate the properties of newState
        this.setState(newState); // Now set our current state to be newState

        // Without this line, the button we render will not work!
        // We must bind the handler to the current class/component, and now we access the handler through the 'this' pointer
        this.clickHandler = this.clickHandler.bind(this);
    }

    // clickHandler is an Event Handler
    //    Events are interactions between the page and the user, like a button that the user can click
    // In the render function, we attach clickHandler to a button
    clickHandler() {
        let newState = Object.assign({}, this.state);
        newState.toggle = !newState.toggle;
        this.setState(newState);
    }

    render () {
        return (
            // Wrapping everything in ONE HTML element since every component can only render one HTML element
            //    However, you can nest other HTML elements and/or components within that one HTML element
            <div className = 'ComponentA'>
                <ComponentB/>
                <div>
                    {this.state.display}
                </div>
                <button onClick = {this.clickHandler}>
                    {this.state.toggle ? 'True' : 'False'}
                </button>
            </div>
            // When the button is pressed, the button text will switch between displaying True and False
        )
    }
}

export default ComponentA