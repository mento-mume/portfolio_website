import Link from "next/link";
import React, { useState } from "react";
import {
  AiFillGithub,
  AiFillTwitterSquare,
  AiFillLinkedin,
  AiOutlineMenu,
} from "react-icons/ai";
import { DiCssdeck } from "react-icons/di";

import {
  Container,
  Div1,
  Div2,
  Div3,
  NavLink,
  SocialIcons,
  Span,
  MobileMenu,
  MobileMenuButton,
  MobileNavLink,
} from "./HeaderStyles";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <Div1>
        <Link legacyBehavior href="#">
          <a
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              marginBottom: "20px",
            }}
          >
            <DiCssdeck size="3rem" /> <Span>NE</Span>
          </a>
        </Link>
      </Div1>
      <Div2>
        <li>
          <Link legacyBehavior href="#projects">
            <NavLink>Projects</NavLink>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="#tech">
            <NavLink>Technologies</NavLink>
          </Link>
        </li>
        <li>
          <Link legacyBehavior href="#about">
            <NavLink>About</NavLink>
          </Link>
        </li>
        <li>
          <NavLink href="/resume.pdf" download>
            Resume
          </NavLink>
        </li>
      </Div2>
      <Div3>
        <SocialIcons href="https://github.com/mento-mume">
          <AiFillGithub size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://www.linkedin.com/in/ndukeabasi-etim-237411169">
          <AiFillLinkedin size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://twitter.com/kevinjnr1">
          <AiFillTwitterSquare size="3rem" />
        </SocialIcons>
        <MobileMenuButton onClick={toggleMenu}>
          <AiOutlineMenu size="2.4rem" />
        </MobileMenuButton>
      </Div3>
      <MobileMenu isOpen={isOpen}>
        <MobileNavLink href="#projects">Projects</MobileNavLink>
        <MobileNavLink href="#tech">Technologies</MobileNavLink>
        <MobileNavLink href="#about">About</MobileNavLink>
        <MobileNavLink href="/resume.pdf" download>
          Resume
        </MobileNavLink>
      </MobileMenu>
    </Container>
  );
};

export default Header;
