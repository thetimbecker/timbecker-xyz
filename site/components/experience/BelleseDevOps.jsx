import React, { PureComponent } from 'react';

import belleseLogo from '../../assets/bellese.jpg'

import PlaceCard from '../PlaceCard';

class BelleseDevOps extends PureComponent {
  render() {
    let belleseLogoElement = <img style={{ width: 256 }} src={belleseLogo} />

    let belleseDetails = (
      <div>
        <div className="where">Bellese</div>
        <div className="what">DevOps Lead</div>
        <div className="when">Since January 2021</div>
        <div>Coach team members and delegate tasks</div>
        <div>Continually push to shift towards DevOps engineering culture</div>
        <div>Guide technology decisions as a member of the architect team</div>
        <div>Troubleshoot the weirdest issues</div>
        <div>Design, provision, and manage infrastructure</div>
        <div>Lead engineering effort to normalize and store data in central data repository</div>
        <div>Improve unplanned work intake process</div>
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

export default BelleseDevOps
