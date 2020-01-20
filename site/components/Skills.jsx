import React, { PureComponent } from 'react';
import Resume from './Resume'

class Skills extends PureComponent {
  render() {
    let { skinny } = this.props

    return (
      <div className="skills">
        <Resume skinny={skinny} />
        <Resume skinny={skinny} />
        <Resume skinny={skinny} />
      </div>
    );
  }
}

export default Skills
