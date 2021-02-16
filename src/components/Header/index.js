import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';

import './header.css';

class Header extends Component{
  constructor(props){
    super(props);
    this.state =  {
      nome: localStorage.nome
    }
  }

  async componentDidMount(){
    if(!firebase.getCurrent()){
      localStorage.removeItem('nome');
      return null;
    }
    firebase.getUsername((info)=>{
      localStorage.nome = info.val().nome;
      this.setState({nome: localStorage.nome})
    })
  }

  render(){
    return(
      <header id="main-header">
        <div className="header-content">
          <Link to="/">
            Blog Reactninzando!
          </Link>
          {
            firebase.getCurrent() ? 
            <Link to="/login">
              Olá, {this.state.nome}
            </Link>
            :
            <Link to="/login">
            Entrar
          </Link>
          }
        </div>
      </header>
    );
  }
}

export default Header;