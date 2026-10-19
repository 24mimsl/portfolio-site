/* =====================================================================
   CONTENT FILE  -  edit this file to change your website.
   You never need to touch index.html, style.css, or main.js.

   Rules:
   - Keep the quote marks "like this" around text.
   - Keep the commas at the end of each line and between items.
   - Images: put files in the "images" folder, then write "images/your-file.jpg".
   ===================================================================== */

window.SITE_CONTENT = {

  /* ---------- BASICS ---------- */
  name: "Logan Mims",
  role: "Industrial & UI/UX Design",          // shown in the browser tab
  logo: "images/logo.png",                     // top-left corner
  footer: "© 2026 Logan Mims",

  /* ---------- NAVIGATION (top bar) ---------- */
  // Only change the labels. Keep page: "home" and page: "works".
  nav: [
    { label: "About",    page: "home"  },
    { label: "My works", page: "works" }
  ],
  contactButtonLabel: "Contact",               // button in the top-right corner

  /* ---------- HOME PAGE ---------- */
  home: {
    headline: "I combine industrial design and UX research to make products that work as well as they look, on the table and on the screen.",
    portrait: "images/portrait.jpg",
    portraitAlt: "Portrait of Logan Mims",
    intro: "",
    backgroundSketches: "images/sketches-bg.jpg",   // faded drawings behind the headline. Use "" for none.

    aboutTitle: "About me",
    // One line of text per paragraph. Add or remove lines freely.
    about: [
      "I’m a designer who works where physical products meet digital interfaces. With a background in industrial and UX design, I move between 3D modeling, user research, and prototyping to create products that feel natural to use, whether you’re holding them or tapping through them. My work centers on technology, soft goods, and home goods. My roots in visual communication and branding help me turn complicated problems into clear, testable ideas."
    ],
    // Button under the About text. Use "" for file to hide it.
    resumeLabel: "View my resume",
    resumeFile: "resume/Logan_Mims_Resume.pdf",

    toolsTitle: "Tools I use",
    // Each group has a name and a list of tools.
    tools: [
      { group: "3D and CAD", items: ["Rhino", "SolidWorks", "KeyShot"] },
      { group: "UI/UX",      items: ["Figma", "FigJam"] },
      { group: "Graphics",   items: ["Illustrator", "Photoshop", "InDesign"] },
      { group: "By hand",    items: ["Sketching", "Foam modeling", "Woodshop", "Metalworking", "3D printing"] }
    ],

    // Shown next to the tools. Copy a { ... } block to add another school.
    // Use "" for degree, minor, location, coursework, or dates to leave that line out.
    education: {
      title: "Education",
      items: [
        { school: "Rhode Island School of Design (RISD)", degree: "BFA in Industrial Design", minor: "Minor in Nature, Culture, and Sustainability Studies (NCSS)", location: "Providence, RI", coursework: "Relevant coursework: Design + Entrepreneurship, Furniture Design, Wood I, Metal I", dates: "Expected May 2028" },
        { school: "Brown University", degree: "Eco Entrepreneurship", minor: "", location: "Providence, RI", coursework: "", dates: "" }
      ]
    },

    // Shown right under Education. Copy a { ... } block to add another certificate.
    // Use "" for dates or details to leave that line out.
    certifications: {
      title: "Certifications",
      items: [
        { name: "Google UX Design Professional Certificate", dates: "04/2024 – 07/2024", details: "User-centered research, rapid prototyping, usability testing, and digital-physical integration." }
      ]
    }
  },

  /* ---------- MY WORKS PAGE ---------- */
  works: {
    title: "My works",
    allLabel: "All",

    // The filter buttons. "id" is a short code used by projects below.
    categories: [
      { id: "id",    label: "Industrial design" },
      { id: "ux",    label: "UI/UX" },
      { id: "other", label: "Other" }
    ],

    linkLabel: "View project",   // text on a project's link, if it has one

    /* Add a project by copying one block ( { ... }, ) and pasting it in the list.
       Fields:
         title        - project name
         category     - one of the ids above ("id", "ux", "other")
         description  - one or two sentences
         image        - path to an image, or "" for a blank placeholder
         imageAlt     - short description of the image (helps accessibility)
         link         - web address to a case study, Figma file, etc. or "" for none
       The order here is the order on the page. */
    projects: [
      {
        title: "Cube camera concept",
        category: "id",
        description: "Early form and mounting explorations for a compact camera. Replace with the problem, your role, and the result.",
        image: "images/sketch-1.jpg",
        imageAlt: "Pencil sketches of a cube-shaped camera on an angled stand",
        link: ""
      },
      {
        title: "Correction tape dispensers",
        category: "id",
        description: "Ink and pencil studies of dispenser forms and internal gears. Replace with your own description.",
        image: "images/sketch-2.jpg",
        imageAlt: "Ink sketches of correction tape dispensers and gears",
        link: ""
      },
      {
        title: "Razor form study",
        category: "id",
        description: "Marker renderings exploring grip shape and replaceable heads. Replace with your own description.",
        image: "images/sketch-3.jpg",
        imageAlt: "Marker sketches of razors with grip and blade head details",
        link: ""
      },
      {
        title: "Stapler studies",
        category: "id",
        description: "Line studies of a desktop stapler from several angles. Replace with your own description.",
        image: "images/sketch-4.jpg",
        imageAlt: "Ink sketches of staplers from several angles",
        link: ""
      },
      {
        title: "UI/UX project title",
        category: "ux",
        description: "The user, the problem, and the interface you designed. Add screenshots by setting the image path.",
        image: "",
        imageAlt: "",
        link: ""
      },
      {
        title: "Other project title",
        category: "other",
        description: "Illustration, branding, photography, or a side project.",
        image: "",
        imageAlt: "",
        link: ""
      }
    ]
  },

  /* ---------- CONTACT PANEL ---------- */
  contact: {
    title: "Get in touch",
    message: "Open to internships, collaborations, and freelance projects.",
    // Each link: label (left), text (right, grey), url.
    // Email links start with mailto:
    links: [
      { label: "Email",    text: "loganmims.design@gmail.com",     url: "mailto:loganmims.design@gmail.com" },
      { label: "LinkedIn", text: "/in/logan-mims-30923934b",      url: "https://www.linkedin.com/in/logan-mims-30923934b" }
    ]
  }
};
