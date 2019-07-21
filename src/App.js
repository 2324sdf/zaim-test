import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from  './components/Login'
import Zaim from  './components/Zaim'
import Detail from  './components/Detail'

const App=()=>{

    return(
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/zaim" component={Zaim} />
                    <Route path="/detail/:number" component={Detail} />
                </Switch>
            </div>
        </BrowserRouter>

    );
};

export default App;

