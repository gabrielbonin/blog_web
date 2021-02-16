import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';

 class Dashboard extends Component{
  constructor(props){
    super(props);
    this.state = {
      nome:  localStorage.nome  
    }
    this.logout = this.logout.bind(this);
  }

  async componentDidMount(){
    if(!firebase.getCurrent()){
      this.props.history.replace('/login');
      return null;
    }
    firebase.getUsername((info)=>{
      localStorage.nome = info.val().nome;
      this.setState({nome: localStorage.nome})
    })
  }

  logout = async()=>{
    firebase.logout()
    .catch((error)=>{
      console.log(error);
    });
    localStorage.removeItem('nome');
    window.location.reload();
    this.props.history.push('/');
  }

  render(){
    return(
      <div id="dashboard">
        <div className="user-info">
        <h1>Bem vindo, {this.state.nome} </h1>
        <Link to="/dashboard/new">Nova publicação +</Link>
        </div>
        <p>logado como:{firebase.getCurrent()}</p>
        <button onClick={this.logout}>Deslogar</button>
      </div>
    )
  }
}
export default withRouter(Dashboard);