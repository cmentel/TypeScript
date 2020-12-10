import React, { Component } from 'react';
import './App.css';
import Loginpage from "./loginpage";
import Homepage from "./homepage";
import FileViewer from "./FileViewer"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
function App(this: any) {
    // TODO fix logic here
    let ableToLogin = true

    if (ableToLogin) {
        return (
            <Homepage/>
        );
    } else {
        ableToLogin = true
        return (
            <Loginpage/>
        );
    }

}

*/

class App extends Component{
    render(){
        return(
            <Router>
                 <Switch>
                     <Route path = "/" component={Loginpage} exact={true}/>
                     <Route path = "/homepage" component={Homepage} exact={true}/>
                     <Route path = "/fileviewer" component={FileViewer} exact={true}/>
                 </Switch>
            </Router>
        )
    }
    

}
export default App;
