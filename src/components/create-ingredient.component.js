import React, { Component } from 'react';
import axios from 'axios';


export default class Ingredient extends Component { 
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCalories = this.onChangeCalories.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            description: '',
            calories: ''
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeCalories(e) {
        this.setState({
            calories: e.target.value
        });
    }
    
    onSubmit(e) {
        e.preventDefault();

        const ingredient = {
            title : this.state.title,
            description : this.state.description,
            calories : this.state.calories,
        }

        console.log(ingredient);
        window.alert("Jusu ingridientas buvo idetas");
        axios.post('http://localhost:8080/ingredients', ingredient)
        .then(res => console.log(res.data));

        this.setState({
            title: '',
            description: '',
            calories: ''

        })
    }
    render() {
        return (
            <div>
            <h3>Pridėti ingredientą</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Pavadinimas: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    />
              </div>
              <div className="form-group"> 
                <label>Kalorijos: </label>
                <input  type="number"
                    required
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
                    rows ="4"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    ></textarea>
              </div>
              <div className="form-group">
                <input type="submit" value="Pridėti" className="btn btn-danger" />
              </div>
            </form>
          </div>
        )
    }
}