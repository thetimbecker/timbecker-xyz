import React, { PureComponent } from 'react';
import { Card, Col } from 'antd';


class TimCard extends PureComponent {
  render() {
    let { children, title, description, gridItems, avatar, style } = this.props

    let gridElements = gridItems && gridItems.map((g, i) => 
      <Card.Grid>
        <div>{g}</div>
      </Card.Grid>
    )

    return (
      <Card
        key={title}
        className="section-card"
        style={style}
      >
        <Card.Meta 
          title={title}
          description={description}
          avatar={avatar}
        />
        {children}
        {gridElements}
      </Card>
    );
  }
}

export default TimCard
