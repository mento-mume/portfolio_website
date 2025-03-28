import styled from "styled-components";

export const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

export const AboutText = styled.p`
  font-size: 1.8rem;
  line-height: 1.8;
  color: #e4e6e7;
  text-align: justify;
  margin: 0;
  padding: 1rem;

  @media ${(props) => props.theme.breakpoints.sm} {
    font-size: 1.6rem;
    line-height: 1.6;
    padding: 0.5rem;
  }
`;
