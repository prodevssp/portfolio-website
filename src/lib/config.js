const config = {
  basicDetails: {
    name: "Soumya Sourav",
    role: "Creative Designer",
    location: "New York",
    about: `I'm a creative designer based in New York, and I'm very passionate and dedicated to my work.`,
  },
  socials: {
    linkedin: "https://www.linkedin.com/in/soumyasouravpatnaik/",
    github: "https://github.com/sspcodeflix",
    mail: "manager@soumyasourav.com",
  },
  about: {
    heading: `Hey there!`,
    // subHeading: `I Can Design Anything You Want`,
    paragraph: `I’m a visionary technology leader with over a decade of experience in machine learning,
    artificial intelligence, and cloud computing. My journey spans the pharmaceutical and
    banking domains, where I’ve had the privilege of solving complex challenges with innovative
    AI-driven solutions. Currently, I’m an Assistant Vice President – Specialist, Machine
    Learning &amp; AI Engineer at DBS Bank, leading the way in designing and implementing
    transformative data and AI solutions that drive success and enhance customer experiences.
    I thrive on exploring creative ways to leverage AI to tackle real-world problems—whether
    it’s optimizing operations or delivering personalized, impactful experiences. My technical
    expertise covers Python and JavaScript development, AWS cloud architecture, ML
    engineering, ML-Ops, and Generative AI.
    When I’m not deep in the tech world, I love sharing my passion through speaking, training,
    and participating in panel discussions at tech conferences on topics like Cloud, Data, and AI.
    Over the years, I’ve also mentored hundreds of professionals, helping them achieve their
    goals and embrace growth confidently.
    For me, it’s all about combining innovation, collaboration, and a forward-thinking mindset to
    create meaningful change. Let’s connect and explore what’s possible together!`,
    cta: "Get consultation",
  },
  certificationsHeading: {
    title: "Certification",
    description: "My Amazing Works",
    viewCertificate: "View Certificate",
  },
  certificates: [
    {
      title: "AWS Solution Architect",
      //   description:
      // "This certificate is awarded to Jane Doe for outstanding performance and dedication.",
      image: "/assets/certificate.webp",
      link: "/path-to-certificate1",
    },
    {
      title: "AWS Certified Developer",
      //   description:
      // "Awarded to Jane Doe for demonstrating exceptional skills and contribution.",
      image: "/assets/certificate.webp",
      link: "/path-to-certificate2",
    },
    {
      title:
        "Advanced Certification In Software Engineering For Cloud, Blockchain & IoT.",
      //   description:
      // "Advanced Certification In Software Engineering For Cloud, Blockchain & IoT.",
      image: "/assets/certificate.webp",
      link: "/path-to-certificate3",
    },
  ],
  achievementsHeading: {
    title: "Achievements",
    description: "Recognition & Awards",
  },
  achievements: [
    {
      title: "Best AI/ML Product Navigator of the Year",
      description:
        "Recognized for excellence in AI/ML product navigation and implementation",
      icon: "🏆",
    },
    {
      title: "Best CX Professional of the Year",
      description:
        "Awarded for outstanding contributions to customer experience",
      icon: "🌟",
    },
    {
      title: "Gold Award - DevOps Platform",
      description:
        "Gold Award Winner for developing Centralised DevOps Platform",
      icon: "🥇",
    },
    {
      title: "Gold Award - Process Automation",
      description:
        "Gold Award Winner for automating user entitlements simplification, significantly reducing manual efforts and improving overall process efficiency",
      icon: "⚡",
    },
    {
      title: "Gold Award - Stakeholder Management",
      description:
        "Gold Award Winner for demonstrating exceptional stakeholder management skills",
      icon: "🤝",
    },
    {
      title: "Gold Award - Leadership Excellence",
      description:
        "Gold Award Winner for demonstrating outstanding leadership capabilities",
      icon: "👑",
    },
    {
      title: "Executive Recognition",
      description:
        "Pat on the back award from Executive Leader of Bank of America for resolving critical stability issues",
      icon: "🎯",
    },
  ],
  projects: [
    {
      id: 1,
      category: "Youtube",
      image: "/assets/project.png",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Development of AI Powered Data Workbench ",
      description:
        "The development of an AI-powered data workbench enables organizations to streamline data ingestion, cleaning, and modelling  within a unified, intuitive interface. With intelligent automation and advanced analytics at its core, this platform empowers users to derive actionable insights more efficiently and at scale.",
    },
    {
      id: 2,
      category: "Vimeo",
      image: "/assets/project.png",
      video: "https://player.vimeo.com/video/76979871",
      link: "https://vimeo.com/76979871",
      title: "Xplorer",
      description:
        "A natural language chatbot product that can retrieve information directly from a database without requiring SQL queries. By interpreting user intent through AI-driven language understanding, it automatically fetches the relevant data and presents it in a clear, easily understandable format. Also it can be integrated with any existing communication tools like MS Teams and Slack.",
    },
    {
      id: 3,
      category: "Soundcloud",
      image: "/assets/project.png",
      link: "https://soundcloud.com/",
      title: "MLflow++",
      description:
        "Enhancing the MLflow tool with robust security measures ensures that sensitive model data and pipeline configurations remain protected throughout the machine learning lifecycle. Additional add-ons, such as advanced governance controls and automated compliance checks, further streamline operations while maintaining a secure, trustworthy environment.",
    },
    {
      id: 4,
      category: "Popup",
      image: "/assets/project.png",
      title: "Architected a Retrieval-Augmented Generation (RAG)",
      description:
        "RAG pipeline that integrates a generative language model with a document retrieval system, enabling more accurate and context-aware responses. This approach ensures that the model’s outputs are continually grounded in up-to-date, relevant information sources rather than relying solely on static training data.",
    },
    {
      id: 5,
      category: "Detail",
      image: "/assets/project.png",
      link: "https://example.com/detail",
      title: "SuperBot",
      description:
        "It’s a product which is versatile conversational agent that can interact with a variety of resources: from technical documentation and code repositories to live websites allowing users to efficiently locate answers, troubleshoot issues, and streamline their workflow. By understanding context and intelligently retrieving the most relevant information, SuperBot makes complex research and problem-solving more accessible than ever.",
    },
  ],
  blogsHeading: {
    title: "From My Blog",
    description: "Our Recent Updates, Blog, Tips, Tricks & More",
    readMore: "Read More",
  },
  blogs: [
    {
      id: 1,
      category: "Web Development",
      title: "Jim Morrison Says When the Music's Over Turn Off the Light",
      date: "23 Dec",
      image: "/assets/project.png",
      link: "#",
    },
    {
      id: 2,
      category: "Branding",
      title: "How to Be Appreciated for Your Hard Work as a Developer",
      date: "23 Dec",
      image: "/assets/project.png",
      link: "#",
    },
    {
      id: 3,
      category: "Social Media",
      title: "How Designers and Developers Can Collaborate Better",
      date: "23 Dec",
      image: "/assets/project.png",
      link: "#",
    },
  ],
  contact: {
    title: "Contact Me",
    description: "I Want To Hear From You",
    about:
      "Please fill out the form in this section to contact me. Or call between 9:00 a.m. and 8:00 p.m. ET, Monday through Friday.",
    address: "20, Somewhere in the World",
    email: "hey@ayushchugh.com",
    phone: "+123 456 7890",
  },
  servicesHeading: {
    description: "What I Do for Clients",
    cta: "Book a Call",
  },
  services: [
    {
      title: "Creative Design",
      price: "$99",
      description:
        "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
      icon: "/assets/avatar.png",
    },
    {
      title: "Graphic Design",
      price: "$199",
      description:
        "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
      icon: "/assets/avatar.png",
    },
    {
      title: "UI/UX Design",
      price: "$299",
      description:
        "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
      icon: "/assets/avatar.png",
    },
    {
      title: "Web Design",
      price: "$399",
      description:
        "Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development",
      icon: "/assets/avatar.png",
    },
  ],
  testimonialsHeading: {
    title: "Testimonials",
    description: "What My Clients Say",
  },
  testimonials: [
    {
      id: 1,
      text: "I rarely like to write reviews, but the Marketify team truly deserve a standing ovation for their customer support, customization, and most importantly, friendliness and professionalism. Many thanks once again for everything and hope that I get to deal with you again in the near future.",
      author: "Mike Anderson",
      position: "Vivaco Studio",
      avatar: "/assets/avatar.png",
    },
    {
      id: 2,
      text: "Excellent service and amazing designs! They went above and beyond to ensure everything was perfect. I am truly impressed with the quality and dedication.",
      author: "Sarah Johnson",
      position: "Creative Minds",
      avatar: "/assets/avatar.png",
    },
    {
      id: 3,
      text: "Their attention to detail and commitment to delivering top-notch results make them stand out from the rest. Highly recommended!",
      author: "Alex Brown",
      position: "DesignHub",
      avatar: "/assets/avatar.png",
    },
  ],
};

export const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#service", label: "Service" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export const categories = [
  "All",
  "Youtube",
  "Vimeo",
  "Soundcloud",
  "Popup",
  "Detail",
];

export default config;
