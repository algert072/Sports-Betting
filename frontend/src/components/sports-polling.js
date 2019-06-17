import React, {Component} from 'react';
import axios from 'axios';

const Poll = props => ( 
    <div className="pollGame">
        <h3 id="game-sport" > {props.poll.sport}</h3>
        <div id="game-name" > {props.poll.name}</div> 
    </div> 
) 
 
export default class Polling extends Component {
    constructor(props){
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeResponsible = this.onChangeResponsible.bind(this);
        this.onChangeBet = this.onChangeBet.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            polls: [],
            item: [],
            awayName: '',
            createdAt: '',
            group: '',
            homeName: '',
            id: '',
            name: '',
            objectId: '',
            sport: '',
            country: '',
            state: '', 
            bet: '',
            URL: "http://localhost",
            PORT: 2000
        }
    } 

    onChangeDescription(e) {
        this.setState({
            awayName: e.target.value
        });
    }

    onChangeResponsible(e) {
        this.setState({
            homeName: e.target.value
        });
    }
    
    onChangeBet(e) {
        this.setState({
            bet: e.target.value
        });
    }

    componentDidMount() {
        axios.get(`${this.state.URL}:${this.state.PORT}/gameBets`)
        .then(res => { 
            this.setState({ polls: res.data })
        })
        .catch(function(err){
            console.log(err);
        })
    }

    sportsPolling() { 
        return <Poll poll={this.state.polls}  />; 
    } 
    
    onSubmit(e){
        e.preventDefault();
        // create new schema to save the data and bet 
        const newPoll = {
            awayName: this.state.polls.awayName,
            createdAt: this.state.polls.createdAt,
            group: this.state.polls.group,
            homeName: this.state.polls.homeName,
            id: this.state.polls.id,
            name: this.state.polls.name,
            objectId: this.state.polls.objectId,
            sport: this.state.polls.sport,
            country: this.state.polls.country,
            state: this.state.polls.state,
            bet: this.state.bet
        }

        axios.post(`${this.state.URL}:${this.state.PORT}/gameBets/add`, newPoll)
        .then(res => console.log(res.data));

        this.setState({ 
            bet: this.state.bet
        })

        setTimeout(() => {
           window.location.reload();
        }, 1000);
    }

    render() {
        return (
            <div className="current-game">
                <h1 className="title"> Sports Poll</h1>
                <form onSubmit={this.onSubmit}>
 
                    {this.sportsPolling()}  

                    <div className="radios"> 
                        <input type="radio" name="rGroup" value="Home" id="r1" onChange={this.onChangeBet} />
                        <label className="radio" id="betOptions" htmlFor="r1">Home</label>
                        
                        <input type="radio" name="rGroup" value="Draw" id="r2" onChange={this.onChangeBet} />
                        <label className="radio" id="betOptions" htmlFor="r2">Draw</label>
                        
                        <input type="radio" name="rGroup" value="Away" id="r3" onChange={this.onChangeBet} />
                        <label className="radio" id="betOptions" htmlFor="r3">Away</label>
                    </div> 
                    <div id="bet-button">
                        <input className="bet-button" type="submit" value="BET" /> 
                    </div>  

                </form> 
       
            </div>
        )
    }

}
