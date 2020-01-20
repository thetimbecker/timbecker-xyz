import React, { PureComponent } from 'react';

import bbvaLogo from '../../assets/bbva.png'

import PlaceCard from '../PlaceCard';

class BBVACloudGov extends PureComponent {
  render() {
    let bbvaLogoElement = <img style={{height: 256, width: 256}} src={bbvaLogo} />

    let bbvaDetails = (
      <div>
        <div className="where">BBVA</div>
        <div className="what">Cloud Governance Team</div>
        <div className="when">Since December 2018</div>
        <div>Define and document a new cloud enterprise architecture model</div>
        <div>Develop, provision, and administrate tools to regulate and aid cloud development</div>
        <div>Define everything as code to improve automation, consistency, and auditability</div>
        <div>Onboard workloads into the enterprise architecture</div>
        <div>Lead a section of the team</div>
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

export default BBVACloudGov

