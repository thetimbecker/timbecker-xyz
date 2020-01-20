
import React, { PureComponent } from 'react';
import { Layout } from 'antd';

import TimHeader from '../components/TimHeader'
import TimFooter from '../components/TimFooter'
import Section from '../components/Section'
import Skills from '../components/Skills'
import Education from '../components/Education'
import Home from '../components/Home'

import useWindowDimensions from '../utils/useWindowDimensions'

const { Content } = Layout;

const Index = () => {
  const { height, width } = useWindowDimensions();

  let skinny = width < 1100 // TODO don't hardcode this, sync with less
  
  let sections = [
    {
      key: "home",
      title: "Home",
      content: <Home/>
    },
    {
      key: "skills",
      title: "Skills",
      content: <Skills skinny={skinny}/>
    },
    {
      key: "experience",
      title: "Experience",
      content: <Skills skinny={skinny}/>
    },
    {
      key: "education",
      title: "Education",
      content: <Education width={width}/>
    },
    {
      key: "redeploy",
      title: "Redeploy",
      content: <Skills skinny={skinny}/>
    }
  ]

  let sectionElements = sections.map(section =>
    <Section
      sectionKey={section.key}
      title={section.title}
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
