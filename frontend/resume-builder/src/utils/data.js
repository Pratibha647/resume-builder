import TEMPLATE_ONE_IMG from '../assets/template1.png';
import TEMPLATE_TWO_IMG from '../assets/template2.png';
import TEMPLATE_THREE_IMG from '../assets/template3.png';

// ================= RESUME TEMPLATES =================
export const resumeTemplates = [
  {
    id: '01',
    thumbnailImg: TEMPLATE_ONE_IMG,
    colorPaletteCode: 'themeOne',
  },
  {
    id: '02',
    thumbnailImg: TEMPLATE_TWO_IMG,
    colorPaletteCode: 'themeTwo',
  },
  {
    id: '03',
    thumbnailImg: TEMPLATE_THREE_IMG,
    colorPaletteCode: 'themeThree',
  },
];

// ================= COLOR PALETTES =================
export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],
    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FEF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#46545E"],
    ["#FFFDF6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#EFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#64B5F6", "#1E88E5", "#0D47A1"],
  ],
};

// ================= DUMMY DATA =================
export const DUMMY_RESUME_DATA = {
  profileInfo: {
    profileImg: null,
    profilePreviewUrl: "",
    fullname: "John Doe",
    designation: "Senior Software Engineer",
    summary:
      "Passionate and results-driven developer with 6+ years of experience building scalable web applications.",
  },

  contactInfo: {
    email: "john.doe@example.com",
    phone: "+1234567890",
    location: "#12 Anywhere, Any City, Any Country",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev",
  },

  workExperience: [
    {
      company: "Tech Solutions",
      role: "Senior Frontend Engineer",
      startDate: "2022-03",
      endDate: "2025-04",
      description:
        "Led frontend team to build scalable enterprise applications using React and Tailwind.",
    },
    {
      company: "Coding Dev",
      role: "Full Stack Developer",
      startDate: "2020-01",
      endDate: "2022-02",
      description:
        "Worked on cross-functional teams developing full-stack solutions using MERN stack.",
    },
    {
      company: "Startup Company",
      role: "Junior Web Developer",
      startDate: "2018-06",
      endDate: "2019-12",
      description:
        "Built responsive websites and maintained legacy codebases.",
    },
  ],

  education: [
    {
      degree: "M.Sc. Software Engineering",
      institution: "Tech University",
      startDate: "2021-08",
      endDate: "2023-06",
    },
    {
      degree: "B.Sc. Computer Science",
      institution: "State University",
      startDate: "2017-08",
      endDate: "2021-05",
    },
  ],

  skills: [
    { name: "JavaScript", progress: 95 },
    { name: "React", progress: 90 },
    { name: "Node.js", progress: 85 },
    { name: "TypeScript", progress: 80 },
    { name: "MongoDB", progress: 75 },
  ],

  projects: [
    {
      title: "Project Manager App",
      description:
        "Task and team management app built with MERN stack.",
      github: "https://github.com/johndoe/project-manager",
      liveDemo: "https://project-manager-demo.com",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce website with payment integration.",
      github: "https://github.com/johndoe/ecommerce",
      liveDemo: "https://ecommerce-demo.com",
    },
    {
      title: "Blog CMS",
      description:
        "Custom CMS for blogging with rich text editor.",
      github: "https://github.com/johndoe/blog-cms",
      liveDemo: "https://blogcms-demo.com",
    },
  ],

  certifications: [
    {
      title: "Full Stack Web Developer",
      issue: "Udemy",
      year: "2023",
    },
    {
      title: "React Advanced Certification",
      issue: "Coursera",
      year: "2022",
    },
  ],

  languages: [
    { name: "English", progress: 100 },
    { name: "Spanish", progress: 70 },
    { name: "French", progress: 40 },
  ],

  interests: ["Reading", "Open Source Contribution", "Hiking"],
};