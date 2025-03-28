import React from "react";

import {
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import Button from "../../styles/GlobalComponents/Button";
import { LeftSection } from "./HeroStyles";

const Hero = () => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle>
        Hi i'm
        <br />
        Ndukeabasi Etim
      </SectionTitle>
      <SectionText>
        I am a passionate full-stack web developer with two years of experience.
        I specialize in utilizing React, Next.js, and Node.js to build dynamic
        and interactive web applications
      </SectionText>
      <Button>Hire Me</Button>
    </LeftSection>
  </Section>
);

export default Hero;
