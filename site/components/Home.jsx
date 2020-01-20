import React, { PureComponent } from 'react';
import Resume from './Resume'
import timOnRock from '../assets/tim-on-rock.jpg'

class Home extends PureComponent {
  descriptors = [
    "DevOps Engineer",
    "Full Stack Developer",
    "Cloud Architect",
    "Friend",
    "Dog Owner",
  ]

  render() {
    let descriptorElements = this.descriptors.map(d => <span className="tim-descriptor">{d}</span>)

    return (
      <div className="tim-on-rock" style={{backgroundImage: `url(${timOnRock})`}}>
        <div className="home-text home-text-top">
          <span className="home-text-hi">HI, </span>
          <span className="home-text-im">I'M </span>
          <span className="home-text-tim">TIM</span>
        </div>
        <div className="home-text tim-descriptors">
          {descriptorElements}
        </div>
      </div>
    );
  }
}

export default Home
