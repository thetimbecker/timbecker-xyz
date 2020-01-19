
import React, { PureComponent } from 'react';
import { Layout, Card } from 'antd';

import TimHeader from '../components/TimHeader'
import TimFooter from '../components/TimFooter'
import Resume from '../components/Resume'
import VisitorInfo from '../components/VisitorInfo'
import SiteArchitecture from '../components/SiteArchitecture'

const { Content } = Layout;

class Index extends PureComponent {
  sections = [
    {
      key: "resume",
      title: "Resume",
      content: <Resume/>
    },
    {
      key: "visitor-info",
      title: "Visitor Info",
      content: <VisitorInfo/>
    },
    {
      key: "site-architecture",
      title: "Site Architecture",
      content: <SiteArchitecture/>
    }
  ]

  render() {
    let cards = this.sections.map(section =>
      <Card
        id={section.key}
        key={section.key}
        title={section.title}
        className="section-card"
      >
        {section.content}
      </Card>
    )

    return (
      <Layout className="layout">
        <TimHeader sections={this.sections}/>
        <Content className="content-wrapper">
          {cards}
        </Content>
        <TimFooter/>
      </Layout>
    );
  }
}

export default Index

