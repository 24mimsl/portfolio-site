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
      { id: "id",    label: "Industrial Design" },
      { id: "ux",    label: "UI/UX" },
      { id: "other", label: "Crafting & Making" }
    ],

    linkLabel: "View project",   // text on a project's link, if it has one
    caseStudyLabel: "View case study",   // text on the link to a project's case study page
    backLabel: "← All works",            // link at the top of a case study page

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
        title: "Edify",
        category: "ux",
        description: "A mobile tutoring platform concept that connects parents with remote tutors based on each student’s needs, schedule, and learning goals.",
        image: "",
        imageAlt: "",
        cover: "edify",                                  // animated cover from js/covers.js (replaces image). Use "" to turn off.
        link: "",

        /* CASE STUDY PAGE (optional). Delete this whole caseStudy block to turn it off.
           Anything left as "" shows a grey "Add ..." hint on the page until you fill it in.
           Section types: "text", "carousel", "compare", "research", "cards", "journey", "images". */
        caseStudy: {
          id: "edify",                                   // page address becomes #works/edify
          titleImage: "images/edify-logo.png",           // logo shown instead of the title text. Use "" for plain text.
          subtitle: "Mobile tutoring platform concept",
          heroImage: "images/edify-cover.jpg",           // e.g. "images/edify-cover.jpg"
          heroImageAlt: "A parent and teen looking at a laptop together",
          heroTint: true,                                // faded photo with a light green-to-white gradient. Use false to show the plain photo.
          facts: [
            { label: "Timeline", value: "July–August 2026" },
            { label: "Role",     value: "UX research, UI/UX design, prototyping" },
            { label: "Tools",    value: "Figma, Google Forms, Adobe After Effects" }
          ],
          sections: [
            {
              type: "text",
              label: "Overview",                         // small blue text above the title (optional)
              title: "How might we make finding the right tutor easier for parents?",
              text: [
                "Parents need an easy, trustworthy way to find tutors who match their child’s unique learning needs, schedule, and budget, while tutors need a simple platform to showcase their expertise and manage bookings. Existing solutions often lack transparency and make it difficult for both groups to connect effectively."
              ]
            },
            {
              type: "text",
              beside: true,                              // sits to the right of the section above; its image goes full width below both
              title: "Solution",
              text: [
                "The goal of Edify was to simplify the process of finding and booking qualified tutors for families. By creating a transparent, user-friendly platform, I aimed to help parents make more confident decisions by accurately matching each child’s unique learning needs, goals, and preferences with the right remote tutor, while giving tutors an easier way to showcase their expertise and manage their services."
              ],
              image: "images/edify-prototype.jpg",       // the image below the Overview and Solution text
              imageAlt: "Two Edify app screens: the home screen for Margot, and the top tutors recommended for her son Kody with match scores",

              /* Interactive points on the image. x and y are where each numbered dot sits,
                 as a percent of the image's width (x) and height (y). Delete this block for a plain image. */
              hotspots: {
                label: "Why Edify",
                title: "Tutor discovery built around the child",
                text: "Edify combines a child’s academic needs, learning preferences, and tutor qualifications to help parents find a more meaningful match.",
                hint: "Point to or tap the numbered dots on the prototype to see how.",
                points: [
                  { x: 28,   y: 49, title: "Child-first matching",
                    text: "Instead of starting with “What subject are you looking for?”, Edify starts with “Who is your child, and what do they need?” Each child’s profile (the subjects they struggle with, learning style, goals, grade level, and upcoming needs) shapes every recommendation." },
                  { x: 60.5, y: 52, title: "Qualifications plus personal fit",
                    text: "Most tutor marketplaces sort by rating, experience, subject, and price. Edify keeps those, then adds the question parents actually ask: does this person fit my child? Tutor qualifications + child’s needs + compatibility." },
                  { x: 78.5, y: 55.5, title: "Meet the tutor, not just the resume",
                    text: "Each tutor profile opens with an introduction video, so parents get a sense of personality and teaching style before booking. A transcript keeps it accessible. Choosing a tutor is partly about human connection." },
                  { x: 79.4, y: 72.7, title: "Match scores",
                    text: "Instead of leaving parents to weigh ten tutors on their own, a match score answers “Why is this tutor a good fit for my child?”, so parents can quickly spot tutors whose experience and teaching approach align with their child’s needs." }
                ]
              }
            },
            {
              type: "carousel",
              label: "High-fidelity prototypes",
              title: "From first search to booked session",
              text: [],
              // One screen per slide, in the order a parent moves through the app.
              slides: [
                { src: "images/edify-hifi-home.png",    caption: "Home",              alt: "Edify home screen greeting Margot, with a Search For a Tutor button and online learning tips" },
                { src: "images/edify-hifi-search.png",  caption: "Top matches",       alt: "Top tutors recommended for Kody, each with a match score, subjects, and grade levels" },
                { src: "images/edify-hifi-profile.png", caption: "Tutor profile",     alt: "Henry Warber's profile with rating, location, background check, about, and qualifications" },
                { src: "images/edify-hifi-video.png",   caption: "Introduction video", alt: "Henry's introduction video with a timestamped transcript below" },
                { src: "images/edify-hifi-booking.png", caption: "Book a session",    alt: "Select the date screen with subject, day, time, session length prices, and comments" },
                { src: "images/edify-hifi-subject.png", caption: "Pick a subject",    alt: "Subject dropdown open on the booking screen, listing ACT Prep, Algebra, and AP courses" }
              ],
              image: "images/edify-mockup-desk.jpg",     // shown full width under the carousel
              imageAlt: "Phone showing the Edify home screen greeting Margot, lying on a wooden desk beside homework, books, and a laptop"
            },
            {
              type: "research",
              label: "Research",                         // small blue text above the title (optional)
              title: "What to know about Parents and tutors?",
              text: [
                "Through user interviews and competitive analysis, I uncovered the challenges parents and tutors face with remote tutoring, and the key pain points that shaped the design."
              ],
              columns: [
                { title: "Methods",      items: ["5 user interviews", "Online survey", "Competitive analysis", "Affinity mapping"] },
                { title: "Participants", items: ["Parents", "Independent tutors"] },
                { title: "Duration",     items: ["1 week"] }
              ],
              questionsTitle: "Key research questions",
              questions: [
                "What information do parents need to confidently choose a tutor?",
                "What challenges do tutors face when managing bookings and attracting students?",
                "How can a platform personalize tutor recommendations for each child’s learning needs?"
              ],
              insights: [
                { title: "Insight #1", text: "Parents need an efficient way to compare and book tutors." },
                { title: "Insight #2", text: "Parents don’t just want a qualified tutor, but also the right tutor for their child’s unique learning style, goals, and personality." },
                { title: "Insight #3", text: "Trust and transparency influence decision-making." }
              ]
            },
            {
              type: "text",
              label: "Personas",                         // small blue text above the title (optional)
              title: "Understand the user",
              softIntro: true,                           // intro text smaller, italic, and lighter
              text: [
                "I turned interview notes and quotes into an affinity map, then distilled the patterns into a persona to keep every design decision grounded in a real parent’s needs."
              ],
              // Image + explanation rows, alternating sides. Each row: src, alt, title, text.
              figures: [
                { src: "images/edify-affinity-map.png",
                  alt: "Affinity map of sticky notes and parent quotes grouped into six themes: Trust & Transparency, Tutor Profile, Child Personalization, Search Function, Booking, and Communication",
                  title: "Affinity map",
                  list: [
                    "Grouped what parents told me into six themes: trust and transparency, tutor profiles, child personalization, search, booking, and communication",
                    "Starred the notes that came up most often: background checks, a clear tutor introduction, matching based on each child’s needs, subject and grade filters, booking confirmation, and easy messaging",
                    "Those starred needs became the core of Edify"
                  ] },
                { src: "images/edify-persona-margot.png",
                  alt: "Persona card for Margot Yung, 37, a nurse with a master’s degree from Townsend, Tennessee, married with three kids, with her goals and frustrations",
                  title: "Meet Margot",
                  text: "Margot Yung is a 37-year-old nurse and mother of three who needs a qualified remote tutor for her son, Kody. She wants a tutor who fits his schedule, subjects, and budget, but a busy schedule makes booking and communicating hard, and she worries about a tutor’s trustworthiness and background. Her goals and frustrations shaped Edify’s match scores, introduction videos, and simple booking flow." }
              ]
            },
            {
              type: "cards",
              label: "Usability testing",                // small blue text above the title (optional)
              title: "Design improvements based on usability testing",
              softIntro: true,                           // intro text smaller, italic, and lighter
              text: [
                "Testing showed parents struggled to compare tutors quickly, so I redesigned the search results around what they look for first."
              ],
              numbered: true,                            // shows 01, 02, ... on each card
              items: [
                { title: "Personalized recommendations", text: "Recommendations are tailored to each child’s learning needs." },
                { title: "Match percentage",             text: "Helps parents quickly compare tutor suitability." },
                { title: "Improved information hierarchy", text: "Ratings, experience, and descriptions are easier to scan." },
                { title: "Enhanced tutor cards",         text: "More relevant information is visible before opening a profile." },
                { title: "Color-coded learning tags",    text: "Subjects and grade levels can be identified at a glance." }
              ]
            },
            {
              type: "cards",
              label: "Accessibility",
              title: "Designed for accessibility",
              text: [],
              // Screens and color palette shown beside the cards. Delete either to leave it out.
              screens: [
                { src: "images/edify-hifi-video.png",   alt: "Tutor introduction video with a timestamped transcript" },
                { src: "images/edify-hifi-booking.png", alt: "Booking screen with clearly labeled subject, day, and time fields" }
              ],
              palette: [
                { color: "#433DE1", name: "Indigo" },
                { color: "#B7E399", name: "Soft green" },
                { color: "#301F1F", name: "Espresso" },
                { color: "#FFF7EF", name: "Cream" }
              ],
              items: [
                { title: "Readability",      list: ["High-contrast color palette", "Clear typography", "Strong visual hierarchy"] },
                { title: "Interaction",      list: ["Large touch targets", "Clearly labeled form fields", "Consistent navigation"] },
                { title: "Inclusive content", list: ["Tutor introduction videos include transcripts", "Information communicated through both text and visuals"] },
                { title: "Usability",        list: ["Personalized recommendations reduce cognitive load", "Color paired with text labels for easy recognition"] }
              ]
            },
            {
              type: "text",
              label: "Sticker sheet",
              title: "A consistent design system",
              softIntro: true,                           // intro text smaller, italic, and lighter
              text: [
                "These principles are built into a shared set of components, so typography, color, buttons, and controls look and behave the same on every screen."
              ],
              fullImage: "images/edify-ui-kit.png",      // shown full width, uncropped
              fullImageAlt: "Edify sticker sheet: Shippori Antique and Sintony typography, main colors 433DE1, B7E399, 301F1F and FFF7EF, logo, icons, navigation bar, main and secondary buttons, tutor card, profiles, dropdowns, subject chips, calendar control, text field, and checkbox"
            },
            {
              type: "compare",
              label: "Wireframes",
              title: "From paper to pixels",
              softIntro: true,                           // intro text smaller, italic, and lighter
              text: [
                "I sketched several layouts for the homepage and tutor profile on paper, starred the strongest ideas, then rebuilt them as digital wireframes to map the full flow, from search through booking."
              ],
              // Drag the divider: the left image shows on the left side, the right image on the right.
              before: { src: "images/edify-wireframes-paper.jpg",   label: "Paper sketches",
                        alt: "Hand-drawn wireframe sketches: four homepage layouts labeled A to D and four tutor profile layouts" },
              after:  { src: "images/edify-wireframes-digital.png", label: "Digital wireframes",
                        alt: "Grayscale digital wireframes: menu, home, tutor detail, tips video, tutor profile, date and time booking, booking confirmed, and my sessions" }
            },
            {
              type: "text",
              label: "Reflection",                       // small blue text above the title (optional)
              title: "What I learned",
              background: "mesh",                        // soft blue / yellow / white color-point background. Use "" for none.
              cover: "edify",                            // animated logo beside the text (from js/covers.js). Use "" to turn off.
              text: [
                "Designing Edify reinforced the importance of creating solutions around real user needs rather than assumptions. Throughout the project, I learned how research, usability testing, and continuous iteration shape more thoughtful design decisions. One of the biggest challenges was balancing detailed tutor information with a clean, intuitive interface, which required multiple iterations to simplify the experience without sacrificing trust and transparency. Looking ahead, I would continue refining the personalized matching experience through additional user testing while exploring features such as progress tracking and AI-assisted tutor recommendations."
              ]
            }
          ]
        }
      },
      {
        title: "Wood Disk Trophy",
        category: "other",
        description: "A sculptural walnut and basswood stand designed to hold and showcase a lathed wooden disc.",
        image: "images/trophy-display.jpg",
        imageAlt: "Walnut disc held upright by curving light-wood arms on a sculptural stand",
        link: "",
        caseStudy: {
          id: "wood-disk-trophy",                        // page address becomes #works/wood-disk-trophy
          titleImage: "",
          subtitle: "Walnut and basswood display stand",
          heroImage: "images/trophy-disc.jpg",
          heroImageAlt: "The lathed walnut disc on its own, showing its swirling grain",
          heroTint: false,
          facts: [
            { label: "Materials", value: "Walnut and basswood" },
            { label: "Course",    value: "Woodworking I" },
            { label: "Year",      value: "2026" }
          ],
          sections: [
            {
              type: "text",
              label: "Overview",
              title: "A vessel for a lathed disc",
              text: [
                "After creating a lathed wooden disc, the objective was to design and fabricate a vessel that would both contain and showcase it. The only project requirement was to incorporate lathed wood veneer into the final design."
              ]
            },
            {
              type: "text",
              beside: true,                              // sits to the right of the Overview
              label: "Approach",
              title: "Let the disc lead",
              text: [
                "My goal was to create a display that celebrated the craftsmanship of the lathed wooden disc by making it the visual centerpiece of the design. Every decision was made to support and highlight the disc rather than compete with it."
              ]
            },
            {
              type: "images",
              label: "Final piece",
              title: "Built around the disc",
              text: [],
              images: [
                { src: "images/trophy-display.jpg",      caption: "Display position", alt: "Front three-quarter view of the stand holding the walnut disc upright" },
                { src: "images/trophy-disc-removed.jpg", caption: "Disc removed",     alt: "The stand on its own, showing the curved arms, pegs, and walnut cradle" },
                { src: "images/trophy-back.jpg",         caption: "Back view",        alt: "Back of the stand with the disc seated in the walnut cradle between two arms" }
              ]
            },
            {
              type: "text",
              label: "Reflection",
              title: "What I learned",
              background: "wood",                        // faint walnut grain behind the text
              text: [
                "Beyond exploring form and presentation, this project expanded my technical woodworking abilities, particularly in joinery, precision shaping, and finishing. It reinforced the importance of balancing aesthetics with craftsmanship to create a thoughtful and cohesive final product."
              ]
            }
          ]
        }
      },
      {
        title: "Candle Holder",
        category: "other",
        description: "A functional candle holder cut, bent, and riveted from a single 12\" × 18\" sheet of aluminum.",
        image: "images/candle-final.jpg",
        imageAlt: "Lit tea light inside an aluminum candle holder with curling petal-like arms on a wooden table",
        link: "",
        caseStudy: {
          id: "candle-holder",                           // page address becomes #works/candle-holder
          accent: "#B8460E",                             // orange section labels for this page (dark enough to read on white and metal)
          titleImage: "",
          subtitle: "Aluminum sheet metal candle holder",
          heroBackground: "images/candle-bokeh.jpg",     // photo behind the header, darkened for readability. Use "" for none.
          heroImage: "images/candle-final.jpg",
          heroImageAlt: "Lit tea light inside the finished aluminum candle holder, its folded arms catching the light",
          heroTint: false,
          facts: [
            { label: "Materials", value: "Aluminum sheet metal" },
            { label: "Course",    value: "Metalworking I" },
            { label: "Year",      value: "2025" }
          ],
          sections: [
            {
              type: "text",
              label: "Overview",
              title: "One sheet, no waste",
              text: [
                "The objective of this project was to design and fabricate a functional candle holder using a single 12\" × 18\" sheet of metal. Every cut, bend, and connection had to be carefully planned to maximize the material while creating a stable and visually engaging final product. The project emphasized thoughtful design, efficient material use, and precision in metal fabrication techniques."
              ]
            },
            {
              type: "text",
              label: "Design process",
              title: "From folded studies to final form",
              text: [],
              figures: [
                { src: "images/candle-studies.jpg",
                  alt: "Small folded and curled aluminum studies laid out on a workbench",
                  title: "Material exploration",
                  text: "Early metal studies tested how light, shadow, and folded form could shape the candle holder’s presence." },
                { images: [
                    { src: "images/candle-top.jpg",       alt: "Top view of a prototype: an octagonal riveted plate with paired curved arms on four sides" },
                    { src: "images/candle-prototype.jpg", alt: "Prototype standing on curved legs with a cross-shaped divider on top" }
                  ],
                  title: "Form refinement",
                  text: "Prototype iterations narrowed the proportions, curve, and cut line so the object felt balanced from every angle." }
              ]
            },
            {
              type: "text",
              label: "Final piece",
              title: "Curves that frame the flame",
              text: [],
              fullImage: "images/candle-unlit.jpg",
              fullImageAlt: "The finished aluminum candle holder unlit on a wooden table, showing its riveted octagonal base, scored X center, curved arms, and rolled feet",
              fullImageStyle: "photo"                    // edge-to-edge photo instead of a framed sheet
            },
            {
              type: "text",
              label: "Reflection",
              title: "What I learned",
              background: "metal",                       // pale blue brushed metal behind the text
              text: [
                "This project challenged me to balance creativity with the constraints of working from a single sheet of metal. My intention was to create a design that emphasized the candle as the focal point while using curved forms to add movement and visual interest. Through the fabrication process, I strengthened my skills in sheet metal forming, bending, rolling, and assembly, while gaining a greater appreciation for planning designs that are both manufacturable and aesthetically cohesive."
              ]
            }
          ]
        }
      },
      {
        title: "Storage Display Table",
        category: "other",
        comingSoon: true,                                // shows "Coming soon" over the image and hides the case study. Delete this line to publish it.
        description: "A small table with a display top for plants and an open base that keeps books and sketchbooks within reach.",
        image: "images/table-styled.jpg",
        imageAlt: "Small wooden table with scalloped apron and notched legs, a plant on top and sketchbooks stored underneath",
        link: "",
        caseStudy: {
          id: "storage-display-table",                   // page address becomes #works/storage-display-table
          titleImage: "",
          subtitle: "Display table with open book storage",
          heroImage: "images/table-styled.jpg",
          heroImageAlt: "The finished table holding a potted plant on its inset top, with books and sketchbooks stored in the open base",
          heroImageShape: "tall",                        // portrait photo in the header
          heroTint: false,
          facts: [
            { label: "Materials", value: "Basswood" },
            { label: "Course",    value: "Metalworking I" },
            { label: "Year",      value: "2025" }
          ],
          sections: [
            {
              type: "text",
              label: "Design process",
              title: "From silhouette to finished piece",
              text: [],
              // Image + text rows, alternating sides. An empty src shows a grey "Add ..." box until the image is added.
              figures: [
                { src: "", hint: "Add the initial table sketch",
                  alt: "Ink sketch of the table with a plant on top and books below",
                  title: "01 · Initial direction",
                  text: "The table’s overall silhouette established the furniture piece as simple, functional, and easy to read." },
                { images: [
                    { src: "images/table-shop.jpg",  alt: "Workbench with milled boards, legs, and joinery pieces for the table in progress" },
                    { src: "images/table-joint.jpg", alt: "Close-up of a test corner joint for the table frame, dry-fitted on the workbench" }
                  ],
                  title: "02 · Fabrication",
                  text: "Parts were milled and the frame joinery was cut and dry-fitted at the workbench before assembly." },
                { src: "", hint: "Add the detail sketches",
                  alt: "Detail sketches of the scalloped apron edge and a leg profile",
                  title: "03 · Detail pass",
                  text: "Material and edge decisions were refined through smaller views of the table’s touch points." },
                { src: "images/table-finished.jpg",
                  alt: "The finished table on its own, showing the inset top panel, scalloped apron, and notched legs",
                  title: "04 · Final read",
                  text: "The finished piece balances sturdy construction with a clean furniture profile." }
              ]
            },
            {
              type: "text",
              label: "In use",
              title: "Display on top, storage below",
              text: [],
              fullImage: "images/table-in-use.jpg",
              fullImageAlt: "The table at home with a plant on its inset top and folded fabrics stored upright in the open base",
              fullImageStyle: "photo tall"
            }
          ]
        }
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
