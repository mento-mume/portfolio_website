// // import nodemailer from "nodemailer";

// // export default async function handler(req, res) {
// //   // Only allow POST method
// //   if (req.method !== "POST") {
// //     return res.status(405).json({ message: "Method not allowed" });
// //   }

// //   try {
// //     // Extract form data from request body
// //     const { name, email, subject, message, phone } = req.body;

// //     // Form validation
// //     if (!name || !email || !subject || !message) {
// //       return res.status(400).json({ message: "Required fields are missing" });
// //     }

// //     // Create email transporter
// //     const transporter = nodemailer.createTransport({
// //       // host: process.env.EMAIL_SERVER,
// //       // port: process.env.EMAIL_PORT,
// //       // secure: process.env.EMAIL_SECURE,
// //       service: "Gmail",
// //       auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASSWORD,
// //       },
// //     });

// //     // Email content
// //     const mailOptions = {
// //       from: process.env.EMAIL_FROM,
// //       to: process.env.EMAIL_TO,
// //       subject: `New Contact Form Submission: ${subject}`,
// //       replyTo: email,
// //       text: `
// //         Name: ${name}
// //         Email: ${email}
// //         Phone: ${phone || "Not provided"}
// //         Subject: ${subject}

// //         Message:
// //         ${message}
// //       `,
// //       html: `
// //         <h2>New Contact Form Submission</h2>
// //         <p><strong>Name:</strong> ${name}</p>
// //         <p><strong>Email:</strong> ${email}</p>
// //         <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
// //         <p><strong>Subject:</strong> ${subject}</p>
// //         <h3>Message:</h3>
// //         <p>${message.replace(/\n/g, "<br>")}</p>
// //       `,
// //     };

// //     // Send email
// //     await transporter.sendMail(mailOptions);

// //     // Return success response
// //     return res.status(200).json({ message: "Email sent successfully" });
// //   } catch (error) {
// //     console.error("Contact form error:", error);
// //     return res
// //       .status(500)
// //       .json({ message: "Error sending email", error: error.message });
// //   }
// // }
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
//         host: process.env.EMAIL_SERVER,
//         port: process.env.EMAIL_PORT,
//         secure: process.env.EMAIL_SECURE,
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
    console.log(`Method ${req.method} not allowed, only POST is accepted`);
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Extract form data from request body
    const { name, email, subject, message, phone } = req.body;

    // Log received data for debugging
    console.log("Received form data:", {
      name,
      email,
      subject,
      message: message?.substring(0, 20) + "...",
    });

    // Form validation
    if (!name || !email || !subject || !message) {
      console.log("Missing required fields:", {
        name,
        email,
        subject,
        message: !!message,
      });
      return res.status(400).json({ message: "Required fields are missing" });
    }

    // Create email transporter - use EITHER service OR host/port configuration
    const transportConfig = {
      service: "Gmail", // Using Gmail service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };

    console.log("Creating transport with config:", {
      service: transportConfig.service,
      auth: { user: process.env.EMAIL_USER ? "SET" : "NOT SET" },
    });

    const transporter = nodemailer.createTransport(transportConfig);

    // Verify transporter connection
    try {
      await transporter.verify();
      console.log("Transporter verified successfully");
    } catch (verifyError) {
      console.error("Transporter verification failed:", verifyError);
      return res.status(500).json({
        message: "Email service connection failed",
        error: verifyError.message,
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

    console.log("Sending email to:", process.env.EMAIL_TO);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    // Return success response
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
}
