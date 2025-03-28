import React from "react";
import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { AboutContainer, AboutText } from "./AboutStyles";

const About = () => (
  <Section id="about">
    <SectionDivider />
    <SectionTitle main>About Me</SectionTitle>
    <AboutContainer>
      <AboutText>
        Proactive Developer with a knack for front end software engineering. In
        my budding career, I've been integral to the successful execution of
        numerous projects. My ability to swiftly adapt to new technologies and
        environments has fostered efficient collaborations with crossfunctional
        teams, resulting in high-quality products. Skilled in an array of front
        end and backend technologies, I'm passionate about delivering value to
        users and contributing to business growth. Highly motivated and
        results-driven, I'm eager to leverage my skills to create impactful
        digital solutions.
      </AboutText>
    </AboutContainer>
  </Section>
);

export default About;
