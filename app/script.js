import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

    state = {
        status: 'off',
        time: 0,
        timer: null,
    }

    formatTime(totalSec){
        const min = Math.floor(totalSec/60);
        const sec = Math.floor(totalSec - (min*60));

        const finalFormat = `${(min < 10? `0${min}` : min)}:${(sec < 10? `0${sec}` : sec)}`;
        
        return finalFormat;
        
    }
    playBell = () => {
        const gong = new Audio('./sounds/bell.wav');
        gong.play();
    };
    step = () => {
        this.setState({time: this.state.time - 1});
        if (this.state.time === 0){
            this.setState({
                status: this.state.status === 'work'? 'rest' : 'work',
                time: this.state.status === 'work'? 20 : 1200,
            });
        }
    };
    timerInterval = setInterval(() => this.step(), 1000);

    startTimer = () => {
        this.setState({
            timer: this.timerInterval,
            status: 'work',
            time: 1200
        });
        this.playBell();
    };
    stopTimer = () => {
        this.setState({
           time: 0,
           status: 'off',
           timer:  null
        })
    } 
    componentWillUnmount () {
        clearInterval(this.timerInterval)
      }  
    closeApp(){
        window.close();
    }
  render() {
      const {status} = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off')  && <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div> }
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">
            {this.formatTime(this.state.time)}
        </div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
