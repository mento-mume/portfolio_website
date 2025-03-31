// import React, { useState } from "react";
// import {
//   Section,
//   SectionDivider,
//   SectionTitle,
// } from "../../styles/GlobalComponents";
// import {
//   ContactContainer,
//   ContactForm,
//   FormGroup,
//   Label,
//   Input,
//   TextArea,
//   SubmitButton,
// } from "./ContactStyles";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//     phone: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     console.log(formData);
//   };

//   return (
//     <Section id="contact">
//       <SectionDivider />
//       <SectionTitle main>Contact Me</SectionTitle>
//       <ContactContainer>
//         <ContactForm onSubmit={handleSubmit}>
//           <FormGroup>
//             <Label htmlFor="name">Name *</Label>
//             <Input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </FormGroup>

//           <FormGroup>
//             <Label htmlFor="email">Email Address *</Label>
//             <Input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </FormGroup>

//           <FormGroup>
//             <Label htmlFor="phone">Phone Number (Optional)</Label>
//             <Input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//             />
//           </FormGroup>

//           <FormGroup>
//             <Label htmlFor="subject">Subject *</Label>
//             <Input
//               type="text"
//               id="subject"
//               name="subject"
//               value={formData.subject}
//               onChange={handleChange}
//               required
//             />
//           </FormGroup>

//           <FormGroup>
//             <Label htmlFor="message">Message *</Label>
//             <TextArea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               required
//             />
//           </FormGroup>

//           <SubmitButton type="submit">Send Message</SubmitButton>
//         </ContactForm>
//       </ContactContainer>
//     </Section>
//   );
// };

// export default Contact;
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

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

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
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: data.message },
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          phone: "",
        });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: data.message },
        });
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: {
          error: true,
          msg: "An error occurred. Please try again later.",
        },
      });
    }
  };

  return (
    <Section id="contact">
      <SectionDivider />
      <SectionTitle main>Contact Me</SectionTitle>
      <ContactContainer>
        <ContactForm onSubmit={handleSubmit}>
          {status.info.msg && (
            <FormMessage error={status.info.error}>
              {status.info.msg}
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
              disabled={status.submitting}
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
              disabled={status.submitting}
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
              disabled={status.submitting}
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
              disabled={status.submitting}
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
              disabled={status.submitting}
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={status.submitting}>
            {status.submitting ? "Sending..." : "Send Message"}
          </SubmitButton>
        </ContactForm>
      </ContactContainer>
    </Section>
  );
};

export default Contact;
