// import nodemailer from "nodemailer";

// export default async function handler(req, res) {
//   // Only allow POST method
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     // Extract form data from request body
//     const { name, email, subject, message, phone } = req.body;

//     // Form validation
//     if (!name || !email || !subject || !message) {
//       return res.status(400).json({ message: "Required fields are missing" });
//     }

//     // Create email transporter with error handling
//     let transporter;
//     try {
//       transporter = nodemailer.createTransport({
//         service: "Gmail",
//         auth: {
//           user: process.env.EMAIL_USER || "",
//           pass: process.env.EMAIL_PASSWORD || "",
//         },
//       });
//     } catch (error) {
//       console.error("Error creating email transporter:", error);
//       return res.status(500).json({
//         message: "Error configuring email service",
//         error: error.message,
//       });
//     }

//     // Email content
//     const mailOptions = {
//       from: process.env.EMAIL_FROM,
//       to: process.env.EMAIL_TO,
//       subject: `New Contact Form Submission: ${subject}`,
//       replyTo: email,
//       text: `
//         Name: ${name}
//         Email: ${email}
//         Phone: ${phone || "Not provided"}
//         Subject: ${subject}

//         Message:
//         ${message}
//       `,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <h3>Message:</h3>
//         <p>${message.replace(/\n/g, "<br>")}</p>
//       `,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);

//     // Return success response
//     return res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Contact form error:", error);
//     return res
//       .status(500)
//       .json({ message: "Error sending email", error: error.message });
//   }
// }
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Extract form data from request body
    const { name, email, subject, message, phone } = req.body;

    // Form validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Create email transporter with error handling
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER || "",
          pass: process.env.EMAIL_PASSWORD || "",
        },
      });
    } catch (error) {
      console.error("Error creating email transporter:", error);
      return res.status(500).json({
        message: "Error configuring email service",
        error: error.message,
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    };

    // Send email with proper async/await handling
    try {
      await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error("Error sending email:", err);
            reject(err);
          } else {
            console.log("Email sent:", info.response);
            resolve(info);
          }
        });
      });
    } catch (error) {
      console.error("Error in sendMail promise:", error);
      throw error; // This will be caught by the outer catch block
    }

    // Return success response
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
}
