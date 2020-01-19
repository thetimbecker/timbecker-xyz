
import React, { PureComponent } from 'react';
import { Layout } from 'antd';

import TimHeader from '../components/TimHeader'
import TimFooter from '../components/TimFooter'
import Section from '../components/Section'
import Resume from '../components/Resume'

import useWindowDimensions from '../utils/useWindowDimensions'

const { Content } = Layout;

const sections = [
  {
    key: "home",
    title: "Home",
    content: [
      <Resume/>,
      <Resume/>,
      <Resume/>,
      <Resume/>,
    ]
  },
  {
    key: "skills",
    title: "Skills",
    content:  [
      <Resume/>,
      <Resume/>,
      <Resume/>,
    ]
  },
  {
    key: "experience",
    title: "Experience",
    content:  [
      <Resume/>,
      <Resume/>,
    ]
  },
  {
    key: "education",
    title: "Education",
    content:  [
      <Resume/>,
      <Resume/>,
    ]
  },
  {
    key: "redeploy",
    title: "Redeploy",
    content:  [
      <Resume/>,
      <Resume/>,
    ]
  }
]

const Index = () => {
  const { height, width } = useWindowDimensions();

  let skinny = width < 1100 // TODO don't hardcode this, sync with less

  let sectionElements = sections.map(section =>
    <Section
      sectionKey={section.key}
      title={section.title}
      className="section-card"
      skinny={skinny}
    >
      {section.content}
    </Section>
  )

  return (
    <Layout className="layout">
      <TimHeader sections={sections}/>
      <Content className="content-wrapper">
        {sectionElements}
      </Content>
      <TimFooter/>
    </Layout>
  );
}

export default Index
