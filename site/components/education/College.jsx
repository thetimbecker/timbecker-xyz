import React, { PureComponent } from 'react';

import vandyLogo from '../../assets/vandy.jpg'

import PlaceCard from '../PlaceCard';

class College extends PureComponent {
  render() {
    let vandyLogoElement = <img style={{height: 256, width: 256}} src={vandyLogo} />

    let vandyDetails = (
      <div>
        <div className="where">Vanderbilt University</div>
        <div className="what">B.S. in Computer Science and Mathematics</div>
        <div className="when">2013 - 2017</div>
        <div>Earned Academic Achievement while studying abroad in Australia</div>
        <div>Minored in Psychology</div>
      </div>
    )

    return (
      <PlaceCard
        logo={vandyLogoElement}
        content={vandyDetails}
        skinny={this.props.skinny}
        superSkinny={this.props.superSkinny}
      />
    )
  }
}

export default College

