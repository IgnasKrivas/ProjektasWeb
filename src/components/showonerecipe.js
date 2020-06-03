import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Inspect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      calories: '',
      ingredients: [],
      ingredient: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8080/recipes/' + this.props.match.params.id)
      .then((response) => {
        this.setState({
          title: response.data.title,
          description: response.data.description,
          calories: response.data.calories,
          ingredient: response.data.ingredients.map((ing) => [
            ing._id,
            ing.title,
            ing.calories,
          ]),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <img
          class="card-img-top"
          className="photo"
          src="https://ci6.googleusercontent.com/proxy/klFZSVG1k26oUcc3lf12-zoJTiTYnUZ1bmUy4dzpaYZeaojDxc98vMaB47hdQQLmXRog9CUc6jT778WP3hHYAu9tH6M3BL37jaJBlJmA_L-s7btf_RX_-qLFiJ8x6PFCYsKWN10YSanha35RkOO74KTadoMpgpQV=s0-d-e1-ft#https://www.freelogodesign.org/file/app/client/thumb/5283731b-d683-40c3-a115-c3a32dbefdf8_200x200.png"
          alt="Card image cap"
        ></img>
        <h3>Recepto peržiūra.</h3>
        <form>
          <div className="form-group">
            <label>Pavadinimas: </label>
            <input
              type="text"
              required
              disabled
              className="form-control"
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label>Kalorijos: </label>
            <input
              disabled
              type="number"
              className="form-control"
              value={this.state.calories}
            />
          </div>
          <div className="form-group">
            <label>Ingredientai: </label>
            <select
              multiple
              className="form-control"
              disabled
              value={this.state.ingredients}
            >
              {this.state.ingredient.map(function (ing) {
                return (
                  <option key={ing} value={ing[0]}>
                    {ing[1]} | kcal: {ing[2]}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Aprašymas: </label>
            <textarea
              disabled
              required
              className="form-control"
              rows="10"
              value={this.state.description}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="active-recipe__button">
              <Link to="/recipe">Grįžti atgal į receptų sąrašą</Link>
            </button>
          </div>
        </form>
      </div>
    );
  }
}
