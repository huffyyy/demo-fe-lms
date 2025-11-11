export const mockOverview = {
  courses: [
    {
      _id: "c1",
      name: "React for Beginners",
      category: { name: "Frontend" },
      thumbnail_url: "/assets/images/photos/photo-1.png"
    },
    {
      _id: "c2",
      name: "Node.js Essentials",
      category: { name: "Backend" },
      thumbnail_url: "/assets/images/photos/photo-2.png"
    },
    {
      _id: "c3",
      name: "Database Design 101",
      category: { name: "Database" },
      thumbnail_url: "/assets/images/photos/photo-3.png"
    }
  ],
  students: [
    {
      _id: "s1",
      name: "Amanda Zahra",
      photo_url: "/assets/images/photos/photo-4.png",
      courses: [{ name: "React for Beginners" }]
    },
    {
      _id: "s2",
      name: "Husnul Fikri",
      photo_url: "/assets/images/photos/photo-2.png",
      courses: [{ name: "Node.js Essentials" }]
    },
    {
      _id: "s3",
      name: "Raka Adrian",
      photo_url: "/assets/images/photos/photo-3.png",
      courses: [{ name: "Database Design 101" }]
    }
  ]
};

export const mockStudents = [
  {
    _id: "s1",
    name: "Amanda Zahra",
    email: "amanda@example.com",
    photo_url: "/assets/images/photos/photo-4.png",
    courses: [{ name: "React for Beginners" }]
  },
  {
    _id: "s2",
    name: "Husnul Fikri",
    email: "husnul@example.com",
    photo_url: "/assets/images/photos/photo-2.png",
    courses: [{ name: "Node.js Essentials" }]
  },
  {
    _id: "s3",
    name: "Raka Adrian",
    email: "raka@example.com",
    photo_url: "/assets/images/photos/photo-3.png",
    courses: [{ name: "Database Design 101" }]
  }
];

export const mockCourses = [
  {
    _id: "c1",
    name: "React for Beginners",
    tagline: "Learn React the easy way",
    description: "A complete introduction to React for building modern UIs.",
    thumbnail_url: "/assets/images/photos/photo-1.png",
    category: { name: "Frontend" },
    students: [
      {
        _id: "s1",
        name: "Amanda Zahra",
        photo_url: "/assets/images/photos/photo-4.png"
      },
      {
        _id: "s2",
        name: "Husnul Fikri",
        photo_url: "/assets/images/photos/photo-2.png"
      }
    ]
  },
  {
    _id: "c2",
    name: "Node.js Essentials",
    tagline: "Backend for modern web",
    description: "Learn server-side JavaScript with Node.js and Express.",
    thumbnail_url: "/assets/images/photos/photo-2.png",
    category: { name: "Backend" },
    students: [
      {
        _id: "s3",
        name: "Raka Adrian",
        photo_url: "/assets/images/photos/photo-3.png"
      }
    ]
  }
];

export const mockCourseDetails = {
  _id: "c1",
  name: "React for Beginners",
  category: { name: "Frontend" },
  thumbnail_url: "/assets/images/photos/photo-1.png",
  details: [
    {
      _id: "ct1",
      title: "Introduction to React",
      type: "video",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      _id: "ct2",
      title: "JSX and Components",
      type: "text",
      text: "<p>JSX is a syntax extension for JavaScript...</p>"
    }
  ],
  students: [
    { _id: "s1", name: "Amanda Zahra", photo_url: "/assets/images/photos/photo-4.png" },
    { _id: "s2", name: "Husnul Fikri", photo_url: "/assets/images/photos/photo-2.png" }
  ]
};

export const mockManagerSession = {
  name: "Admin Manager",
  role: "manager",
  email: "manager@example.com"
};

export const mockStudentSession = {
  name: "Amanda Zahra",
  role: "student",
  email: "amanda@example.com",
  photo_url: "/assets/images/photos/photo-4.png"
};
