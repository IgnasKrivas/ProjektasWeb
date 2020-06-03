import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Ingredientas = props => (
    <tr>
    <td>{props.ingredient.title}</td>
    <td>{props.ingredient.description}</td>
    <td>{props.ingredient.calories}</td>
    <td>                                     </td>
    <a href="#" onClick={() => { props.deleteingredientas(props.ingredient._id) }}>Ištrinti</a>
    </tr> 
)

export default class Ingridientai extends Component {
    constructor(props) {
        super(props);

        this.deleteingredientas = this.deleteingredientas.bind(this)

        this.state = {ingredients: []};
    }

    componentDidMount(){
        axios.get('http://localhost:8080/ingredients/')
        .then(response =>{
            this.setState({ingredients: response.data})
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    deleteingredientas(id) {
        axios.delete('http://localhost:8080/ingredients/'+id)
        .then(res => console.log(res.data));
        this.setState({
            ingredientai: this.state.ingredients.filter(rl => rl._id !== id)
        })
        window.location = '/get';
    }

    ingredientaiList(){
        return this.state.ingredients.map(currentingridientas =>{
            return <Ingredientas ingredient={currentingridientas} deleteingredientas={this.deleteingredientas} key={currentingridientas._id}/>;
        })
    }
    
    render() {
        return (
            <div>
                <h3>Ingredientai</h3>
                <table className="Lentelė">
                    <thead className="thead-light">
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Calories</th>
                            <th>                              </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.ingredientaiList()}
                    </tbody>
                </table>
                <ul>
                </ul>
            </div>
        )
    }
}