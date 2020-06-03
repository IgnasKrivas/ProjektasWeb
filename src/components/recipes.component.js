import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import { Button } from 'reactstrap';
import Buttonas from './styled/button';
import '../App.css';

const Receptas = (props) => (
  <div>
    <hr />
    <img
      class="card-img-top"
      className="photo"
      src="https://ci6.googleusercontent.com/proxy/klFZSVG1k26oUcc3lf12-zoJTiTYnUZ1bmUy4dzpaYZeaojDxc98vMaB47hdQQLmXRog9CUc6jT778WP3hHYAu9tH6M3BL37jaJBlJmA_L-s7btf_RX_-qLFiJ8x6PFCYsKWN10YSanha35RkOO74KTadoMpgpQV=s0-d-e1-ft#https://www.freelogodesign.org/file/app/client/thumb/5283731b-d683-40c3-a115-c3a32dbefdf8_200x200.png"
      alt="Card image cap"
    ></img>
    <div class="card-body-border">
      <h5 class="card-title">{props.recipe.title}</h5>
      <p class="card-text">
        <td>
          {props.recipe.description.split('\n').map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </td>
        Kalorijos: {props.recipe.calories}
        <td></td>
      </p>

      <td>
        <Buttonas>
          <Link className="App-link" to={'/inspect/' + props.recipe._id}>
            Peržiūrėti
          </Link>
        </Buttonas>
      </td>
      <td>
        <Buttonas>
          <Link className="App-link" to={'/edit/' + props.recipe._id}>
            Atnaujinti
          </Link>
        </Buttonas>
      </td>
      <td>
        <Buttonas>
          <Link
            href="#"
            onClick={() => {
              props.deleteReceptai(props.recipe._id);
            }}
            className="App-link"
          >
            Ištrinti
          </Link>
        </Buttonas>
      </td>
    </div>
  </div>
);

export default class Receptai extends Component {
  constructor(props) {
    super(props);

    this.deleteReceptai = this.deleteReceptai.bind(this);

    this.state = { recipes: [] };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/recipes')
      .then((response) => {
        this.setState({ recipes: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteReceptai(id) {
    axios
      .delete('http://localhost:8080/recipes/' + id)
      .then((res) => console.log(res.data));
    this.setState({
      receptai: this.state.recipes.filter((rl) => rl._id !== id),
    });
    window.location = '/recipe';
  }

  receptaiList() {
    return this.state.recipes.map((currentreceptas) => {
      return (
        <Receptas
          recipe={currentreceptas}
          deleteReceptai={this.deleteReceptai}
          key={currentreceptas._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Įkelti receptai.</h3>
        <table className="Lentelė">
          <thead className="thead-light"></thead>
          <tbody>{this.receptaiList()}</tbody>
        </table>
      </div>
    );
  }
}
