import React, { useState } from "react";
import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import {
  ContactContainer,
  ContactForm,
  FormGroup,
  Label,
  Input,
  TextArea,
  SubmitButton,
  FormMessage,
} from "./ContactStyles";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitted: false,
    isLoading: false,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus({ isSubmitted: false, isLoading: true });
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissionStatus({ isSubmitted: true, isLoading: false });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
        });
      } else {
        setSubmissionStatus({ isSubmitted: false, isLoading: false });
        setError(data.message);
      }
    } catch (error) {
      setSubmissionStatus({ isSubmitted: false, isLoading: false });
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <Section id="contact">
      <SectionDivider />
      <SectionTitle main>Contact Me</SectionTitle>
      <ContactContainer>
        <ContactForm onSubmit={handleSubmit}>
          {error && <FormMessage error={true}>{error}</FormMessage>}

          {submissionStatus.isSubmitted && (
            <FormMessage error={false}>
              Your message has been sent successfully!
            </FormMessage>
          )}

          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={submissionStatus.isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={submissionStatus.isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={submissionStatus.isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={submissionStatus.isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message *</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={submissionStatus.isLoading}
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={submissionStatus.isLoading}>
            {submissionStatus.isLoading ? "Sending..." : "Send Message"}
          </SubmitButton>
        </ContactForm>
      </ContactContainer>
    </Section>
  );
};

export default Contact;
