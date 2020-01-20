import React, { PureComponent } from 'react';
import timOnRock from '../assets/tim-on-rock.jpg'

class Home extends PureComponent {
  descriptors = [
    "DevOps Engineer",
    "Full Stack Developer",
    "Cloud Architect",
    "Friend",
  ]

  render() {
    let descriptorElements = this.descriptors.map(d => <span className="tim-descriptor">{d}</span>)

    return (
      <div className="tim-on-rock" style={{backgroundImage: `url(${timOnRock})`}}>
        <div className="home-text home-text-top">
          <span className="home-text-hi">Hi, </span>
          <span className="home-text-im">I'm </span>
          <span className="home-text-tim">Tim</span>
        </div>
        <div className="home-text tim-descriptors">
          {descriptorElements}
        </div>
      </div>
    );
  }
}

export default Home
