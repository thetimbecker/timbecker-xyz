import React, { PureComponent } from 'react';

import bbvaLogo from '../../assets/bbva.png'

import PlaceCard from '../PlaceCard';

class BBVADevOps extends PureComponent {
  render() {
    let bbvaLogoElement = <img style={{ width: 256 }} src={bbvaLogo} />

    let bbvaDetails = (
      <div>
        <div className="where">BBVA</div>
        <div className="what">DevOps Team</div>
        <div className="when">January 2018 - December 2018</div>
        <div>Automate business processes</div>
        <div>Design, develop, and maintain internal applications</div>
        <div>Employ, enforce, and educate teams on DevOps best practices</div>
      </div>
    )

    return (
      <PlaceCard
        logo={bbvaLogoElement}
        content={bbvaDetails}
        skinny={this.props.skinny}
        superSkinny={this.props.superSkinny}
      />
    )
  }
}

export default BBVADevOps
