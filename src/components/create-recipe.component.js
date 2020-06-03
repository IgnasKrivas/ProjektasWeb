import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCalories = this.onChangeCalories.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
      calories: '',
      ingredients: [],
      ingredient: [],
    };
  }

  componentDidMount() {
    // this.setState({
    //     ingredient: ['Pienas', 'Cukrus', 'Suris'],
    //     ingredients: 'Pienas',
    //     ingredients: 'Cukrus',
    //     ingredients: 'Suris'
    // })
    axios
      .get('http://localhost:8080/ingredients')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            ingredient: response.data.map((ing) => [
              ing._id,
              ing.title,
              ing.calories,
            ]),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeCalories(e) {
    this.setState({
      calories: e.target.value,
    });
  }
  onChangeIngredients(e) {
    this.setState({
      ingredients: [...this.state.ingredients, e.target.value],
    });
  }

  removeIngredient() {
    var array = [...this.state.ingredients];
    //var index = array.indexOf(e.target.value);
    //var index = -1;
    array.splice(1, 1);
    this.setState({ ingredients: array });
    /*if(index !== -1)
        {
            
        }*/
  }

  onSubmit(e) {
    e.preventDefault();

    const recipe = {
      title: this.state.title,
      description: this.state.description,
      calories: this.state.calories,
      ingredients: this.state.ingredients,
    };

    console.log(recipe);
    axios
      .post('http://localhost:8080/recipes', recipe)
      .then((res) => console.log(res.data));

    window.location = '/recipe';
  }
  render() {
    return (
      <div>
        <h3>Sukurti naują receptą</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Pavadinimas: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Kalorijos: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.calories}
              onChange={this.onChangeCalories}
            />
          </div>
          <div className="form-group">
            <label>Aprašymas: </label>
            <textarea
              required
              className="form-control"
              rows="4"
              value={this.state.description}
              onChange={this.onChangeDescription}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Ingredientai: </label>
            <select
              multiple
              ref="userInput"
              className="form-control show-tick"
              value={this.state.ingredients}
              onChange={this.onChangeIngredients}
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
            <input
              type="submit"
              value="Sukurti receptą"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    );
  }
}
