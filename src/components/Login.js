import React from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import '../css/Login.css'

class Login extends React.Component{
    state={
        login:'',
        password:'',
        isSignedUp:false,
        token:''
    };
    handleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value,
        })
    };

    handleSubmit=(e)=>{
        e.preventDefault();
        var self = this;
        const auth = {
            username:this.state.login,
            password:this.state.password
        };
        axios
            .post('https://test-api.dengiclick.kz/api/login',auth)
            .then(function(response){
                if(response.status===200){
                    alert('Добро пожаловать');
                    self.setState({
                        isSignedUp: true,
                        token:response.data.data.token
                    });
                }
            })
            .catch(function (error) {
                if(error.response.status===500){
                    alert('Логин или пароль неверны');
                    self.setState({
                        login:'',
                        password:''
                    });
                }
            })
    };
    render(){
        const token = this.state.token;
        if (this.state.isSignedUp) {
            return <Redirect to = {{
                pathname: "/zaim",
                state: { token: token }
            }}
            />;
        }
        else{
            return (
                <div className="App Login">
                    <header className="App-header">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="form-control" htmlFor="">Логин</label>
                                <input id="login" value={this.state.login} onChange={this.handleChange} className="form-control" type="text"/>
                            </div>
                            <div className="form-group">
                                <label className="form-control" htmlFor="">Пароль</label>
                                <input id="password" value={this.state.password} onChange={this.handleChange} className="form-control" type="text"/>
                            </div>
                            <button className="btn">Вход</button>
                        </form>
                    </header>
                </div>
            );
        }
    }
}

export default Login;