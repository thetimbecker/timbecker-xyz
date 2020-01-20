import React, { PureComponent } from 'react';

import tbLogo from '../../assets/ticket-biscuit.png'

import PlaceCard from '../PlaceCard';

class BBVADevOps extends PureComponent {
  render() {
    let tbLogoElement = <img style={{width: 256}} src={tbLogo} />

    let tbDetails = (
      <div>
        <div className="where">TicketBiscuit</div>
        <div className="what">Software Developer</div>
        <div className="when">August 2017 - November 2017</div>
        <div>Develop core products and automate internal processes</div>
        <div>Trusted with high risk automated billing system overhaul 2 months into first job</div>
      </div>
    )

    return (
      <PlaceCard
        logo={tbLogoElement}
        content={tbDetails}
        skinny={this.props.skinny}
        superSkinny={this.props.superSkinny}
      />
    )
  }
}

export default BBVADevOps

