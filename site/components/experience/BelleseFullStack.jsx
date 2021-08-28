import React, { PureComponent } from 'react';

import belleseLogo from '../../assets/bellese.jpg'

import PlaceCard from '../PlaceCard';

class BelleseFullStack extends PureComponent {
  render() {
    let belleseLogoElement = <img style={{ width: 256 }} src={belleseLogo} />

    let belleseDetails = (
      <div>
        <div className="where">Bellese</div>
        <div className="what">Full Stack Developer</div>
        <div className="when">February 2020 - December 2020</div>
        <div>Own and contribute to backend API, microservice infrastructure, and front end</div>
        <div>Align tasks with stakeholders to provide value and achieve project goals</div>
        <div>Design and write intuitive JSON expression evaluator</div>
        <div>Write ETL job to move data from on-prem Oracle to DynamoDB</div>
      </div>
    )

    return (
      <PlaceCard
        logo={belleseLogoElement}
        content={belleseDetails}
        skinny={this.props.skinny}
        superSkinny={this.props.superSkinny}
      />
    )
  }
}

export default BelleseFullStack
