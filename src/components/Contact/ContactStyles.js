import styled from "styled-components";

export const ContactContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media ${(props) => props.theme.breakpoints.md} {
    max-width: 700px;
    padding: 2.5rem;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    width: calc(100% - 3rem);
    max-width: 100%;
    padding: 2rem;
    margin: 0 auto;
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 1.6rem;
  color: #e4e6e7;
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #e4e6e7;
  font-size: 1.6rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #13adc7;
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #e4e6e7;
  font-size: 1.6rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #13adc7;
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const SubmitButton = styled.button`
  padding: 1.2rem 2rem;
  background: linear-gradient(270deg, #13adc7 0%, #945dd6 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(19, 173, 199, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 1rem 1.5rem;
    font-size: 1.4rem;
  }
`;
