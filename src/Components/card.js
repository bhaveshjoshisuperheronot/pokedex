import React from 'react'

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items:[],
          pokeImg: [],
          hp: [],
          attack: [],
          defense: [],
          speed: [],
          type: '',
          abilities: '',
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // Calling individual Pokemon details
        fetch(this.props.pokeUrl)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result,
              pokeImg: result.sprites.other.home,
              hp: result.stats[0],
              attack: result.stats[1],
              defense: result.stats[2],
              speed: result.stats[5],
              type: result.types[0].type.name,
              abilities: result.abilities
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

    handleClick(e) {
        e.currentTarget.classList.toggle('is-flipped');
    };
    

    render() {
        const { error, isLoaded, items, pokeImg, hp, attack, defense, speed , type, abilities} = this.state;
        let abilityList = "";
        for(var i = 0; i < abilities.length; i++) {
            if( i !== abilities.length - 1)
                abilityList = abilityList + (abilities[i].ability.name) + ', '
            else
                abilityList = abilityList + (abilities[i].ability.name)
        }
        // Making the card structure
        if (pokeImg.front_default == null) {
            return
        }
        else{
            return(
                <div className="card-main" id={items.id} onClick = {this.handleClick}>
                    <div className="card-face card-front">
                        <div className="card-img">
                            <img src={pokeImg.front_default}/>
                        </div>
                        <div className="card-id">{items.id}</div>
                        <p className="card-name">{items.name}</p>
                        <p className="card-stats">
                            <span>HP : {hp.base_stat}</span>
                            <span>Attack : {attack.base_stat}</span>
                            <span>Defense : {defense.base_stat}</span>
                            <span>Speed : {speed.base_stat}</span>
                        </p>
                        <p className="card-description-list">
                            It is a {type} type pokemon. They have the following abilities : {abilityList}. Also they have a base experience of {items.base_experience}.
                        </p>
                    </div>
                    <div className="card-face card-back">
                        <div className="circle-img">
                            <img src={pokeImg.front_default}/>
                        </div>
                        <p className="card-name">{items.id}. {items.name}</p>
                        <p className="card-description">
                            It is a {type} type pokemon. They have the following abilities : {abilityList}. Also they have a base experience of {items.base_experience}.
                        </p>
                    </div>
                </div>
            )
        }
    }
}