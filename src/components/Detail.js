import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../css/Detail.css'

class Detail extends React.Component{

    state = {
        id:null,
        token:this.props.location.token,
        data:'',
        loaded:false,
        loading:true
    };

    componentDidMount(){
        let id = this.props.match.params.number;
        const AuthStr = 'Bearer ' + this.state.token;
        const self= this;
        this.setState({
            id:id
        });
        axios.get('https://test-api.dengiclick.kz/api/loan/' +id + '/detail', { 'headers': { 'Authorization': AuthStr } })
            .then(function(response){
                if(!response.data.length){
                    self.setState({
                        data:response.data.data,
                        loaded:true,
                        loading:false
                    });
                }
            });
    }
    render(){
        const singleZaim = this.state.data;

        if(this.state.loaded){
            return(
                <div className="detail">
                    <h2>Заказ номер {this.state.id}</h2>

                    <Link to={{
                        pathname: '/zaim',
                        state: {
                            token: this.state.token
                        }
                    }}>
                        <img src="/images/rewind.png" width="70px" alt="Вернутся к списку"/>
                    </Link>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>Номер</td>
                            <td>{singleZaim.number}</td>
                        </tr>
                        <tr>
                            <td>Проценты</td>
                            <td>{singleZaim.interest}</td>
                        </tr>
                        <tr>
                            <td>Сумма займа</td>
                            <td>{singleZaim.issue_amount}</td>
                        </tr>
                        <tr>
                            <td>Дата займа</td>
                            <td>{singleZaim.issue_date}</td>
                        </tr>
                        <tr>
                            <td>Пеня</td>
                            <td>{singleZaim.overdue_days}</td>
                        </tr>
                        <tr>
                            <td>Переплаченная сумма</td>
                            <td>{singleZaim.repaid_amount}</td>
                        </tr>
                        <tr>
                            <td>Запрошенная сумма</td>
                            <td>{singleZaim.requested_amount}</td>
                        </tr>
                        <tr>
                            <td>Дата возврата</td>
                            <td>{singleZaim.return_date}</td>
                        </tr>
                        <tr>
                            <td>Статус</td>
                            <td>{singleZaim.status_name}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        return(
            <div className="detail">
                <h2>Заказ номер {this.state.id}</h2>
                {this.state.loading? <img src="/images/loading.gif" alt=""/>:''}
            </div>
        )
    }
}

export default Detail;
