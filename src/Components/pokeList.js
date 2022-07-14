import React from 'react'
import Card from './card';

export default class PokeList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        count: 0,
        isActive: false
      };
      // this.handleChange = this.handleChange.bind(this);
    }

    handleToggle = () => {
      this.setState({ isActive: !this.state.isActive });
    };
  
    componentDidMount() {
      fetch("https://pokeapi.co/api/v2/pokemon/")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              count: result.count
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, count, isActive } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        let listItems = [];
        for (var i = 1; i <= count; i++) {
            listItems.push(<Card key = {i} pokeUrl = {"https://pokeapi.co/api/v2/pokemon/" + i} />);
        }
        return (
          <div>
            <div className="switch-parent">
              <p>Grid View</p>
              <label className="switch">
                <input type="checkbox" onChange={this.handleToggle}/>
                <span className="slider round"></span>
              </label>
              <p>List View</p>
            </div>
            <div className={isActive ? "card-body list" : "card-body"}>{listItems}</div>
          </div>
        );
      }
    }
}