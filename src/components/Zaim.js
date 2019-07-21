import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../css/Zaim.css'

class Zaim extends React.Component{

    state={
        data:[],
        token:this.props.location.state.token,
        loading:false
    };

    zaimShow=()=>{
        this.setState({
            loading:true
        });
        const AuthStr = 'Bearer ' + this.props.location.state.token;
        const self = this;
        axios.get('https://test-api.dengiclick.kz/api/loans',{ 'headers': { 'Authorization': AuthStr } })
            .then(function(response){
                console.log(response.data);
                self.state.loading = false;
                self.setState({
                    data:response.data.data
                })
            })
    };

    render(){
        const zaims = this.state.data;
        const zaimList = zaims.map(zaim=>{
            const newTo = {
                pathname: "/detail/" +zaim.number,
                token: this.state.token
            };

            return (

                <div className="zaim">
                    <div className="zaim-list">
                        <Link to={newTo}>
                            <div className="zaim-list-item">
                                <div className="row">
                                    <div className="col-md-4">Номер: {zaim.number}</div>
                                    <div className="col-md-4">Проценты: {zaim.interest}</div>
                                    <div className="col-md-4">Дата займа: {zaim.issue_date}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        });

        return(
            <div className="zaim">
                <h2>Список займов клиента</h2>
                <button onClick={this.zaimShow}>Вывести список</button>
                <div className="zaim-list">{zaimList}</div>
                {this.state.loading? <img src="/images/loading.gif" alt=""/>:''}
            </div>
        );

    }
}

export default Zaim;
