const JOB_STORAGE_KEY = "internarea_jobs";
const INTERNSHIP_STORAGE_KEY = "internarea_internships";
const APPLICATION_STORAGE_KEY = "internarea_applications";
const PUBLIC_POSTS_STORAGE_KEY = "internarea_public_posts";
const PUBLIC_USERS_STORAGE_KEY = "internarea_public_users";

const isBrowser = typeof window !== "undefined";

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const readStorage = <T>(key: string, fallback: T): T => {
  if (!isBrowser) return fallback;
  return safeParse<T>(window.localStorage.getItem(key), fallback);
};

const writeStorage = <T>(key: string, value: T) => {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const defaultJobs = [
  {
    _id: "job-101",
    title: "Frontend Developer",
    company: "Amazon",
    location: "Seattle",
    CTC: "$100K/year",
    Experience: "2+ years",
    category: "Engineering",
    StartDate: "April 1, 2025",
    aboutCompany:
      "Amazon is a global leader in e-commerce and cloud computing, providing cutting-edge technology solutions.",
    aboutJob:
      "Seeking a skilled Frontend Developer proficient in React.js, JavaScript, and UI development.",
    whoCanApply:
      "Developers with experience in JavaScript, React.js, and modern frontend frameworks.",
    perks: "Remote work, stock options, health insurance, learning resources.",
    AdditionalInfo: "This role is hybrid with occasional onsite meetings.",
    numberOfOpening: "3",
    createAt: new Date().toISOString(),
  },
  {
    _id: "job-102",
    title: "Data Analyst",
    company: "Microsoft",
    location: "Remote",
    CTC: "$90K/year",
    Experience: "1+ years",
    category: "Data Science",
    StartDate: "March 15, 2025",
    aboutCompany:
      "Microsoft is a technology company specializing in software development, cloud computing, and AI.",
    aboutJob:
      "Looking for a Data Analyst with expertise in SQL, Python, and data visualization tools.",
    whoCanApply:
      "Candidates with experience in data analytics, SQL, Python, and Tableau/Power BI.",
    perks: "Flexible hours, remote work, upskilling programs, bonuses.",
    AdditionalInfo: "This is a fully remote role.",
    numberOfOpening: "2",
    createAt: new Date().toISOString(),
  },
  {
    _id: "job-103",
    title: "UX Designer",
    company: "Apple",
    location: "California",
    CTC: "$110K/year",
    Experience: "3+ years",
    category: "Design",
    StartDate: "March 30, 2025",
    aboutCompany:
      "Apple is a leader in consumer electronics and software, focusing on design and innovation.",
    aboutJob:
      "Seeking a UX Designer to craft intuitive user experiences for our next-generation products.",
    whoCanApply:
      "Designers with experience in Figma, Adobe XD, user research, and usability testing.",
    perks: "Creative environment, free lunches, fitness perks, flexible hours.",
    AdditionalInfo: "Office-based with occasional remote work options.",
    numberOfOpening: "1",
    createAt: new Date().toISOString(),
  },
];

export const defaultInternships = [
  {
    _id: "internship-1",
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "New York",
    stipend: "$500/month",
    Duration: "3 Months",
    category: "Web Development",
    StartDate: "April 2025",
    aboutCompany:
      "TechCorp builds modern web applications for small and mid-sized businesses.",
    aboutInternship:
      "As a Frontend Developer Intern, you will work on real-world React and Tailwind projects.",
    whoCanApply:
      "Students and fresh graduates with knowledge of HTML, CSS, JavaScript, and React.",
    perks: "Certificate, mentorship, flexible hours.",
    additionalInfo: "This is a remote internship with flexible working hours.",
    numberOfOpening: "2",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "internship-2",
    title: "Data Science Intern",
    company: "DataTech",
    location: "San Francisco",
    stipend: "$800/month",
    Duration: "6 Months",
    category: "Data Science",
    StartDate: "May 2025",
    aboutCompany:
      "DataTech specializes in analytics and AI-driven insights for modern businesses.",
    aboutInternship:
      "As a Data Science Intern, you will build models, analyze data, and support product insights.",
    whoCanApply:
      "Students with experience in Python, statistics, and data visualization.",
    perks: "Mentorship, internship certificate, networking opportunities.",
    additionalInfo: "A strong foundation in statistics is preferred.",
    numberOfOpening: "1",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "internship-3",
    title: "Marketing Intern",
    company: "MarketPro",
    location: "Los Angeles",
    stipend: "$400/month",
    Duration: "4 Months",
    category: "Marketing",
    StartDate: "June 2025",
    aboutCompany:
      "MarketPro helps brands grow with performance marketing and social campaigns.",
    aboutInternship:
      "As a Marketing Intern, you will support campaign planning and digital outreach.",
    whoCanApply:
      "Students passionate about marketing, social media, and communications.",
    perks: "Learning sessions, flexible schedule, internship certificate.",
    additionalInfo: "This position includes both remote and onsite work.",
    numberOfOpening: "3",
    createdAt: new Date().toISOString(),
  },
];

export const defaultApplications = [
  {
    _id: "application-1",
    company: "TechCorp",
    category: "Web Development",
    user: { name: "John Doe", email: "john@example.com" },
    coverLetter: "I am excited to apply for this position.",
    availability: "Immediate",
    createdAt: new Date().toISOString(),
    status: "approved",
  },
  {
    _id: "application-2",
    company: "Health Solutions",
    category: "Healthcare",
    user: { name: "Rahul", email: "rahul@example.com" },
    coverLetter: "I am enthusiastic about this opportunity.",
    availability: "2 weeks",
    createdAt: new Date().toISOString(),
    status: "pending",
  },
  {
    _id: "application-3",
    company: "EduLearn",
    category: "Education",
    user: { name: "Alice Johnson", email: "alice@example.com" },
    coverLetter: "I believe I am a great fit for this role.",
    availability: "Immediate",
    createdAt: new Date().toISOString(),
    status: "rejected",
  },
];

export const defaultPublicPosts = [
  {
    _id: "post-1",
    author: {
      uid: "user-1",
      name: "Priya Sharma",
      email: "priya@example.com",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=64&q=80",
    },
    caption: "Excited to share my new coding project!",
    media: [],
    likes: [],
    comments: [],
    shares: [],
    createdAt: new Date().toISOString(),
  },
];

export const getJobs = () => readStorage(JOB_STORAGE_KEY, defaultJobs);
export const saveJobs = (jobs: any[]) => writeStorage(JOB_STORAGE_KEY, jobs);
export const addJob = (job: any) => {
  const jobs = getJobs();
  const nextJob = {
    _id: generateId(),
    ...job,
    createAt: new Date().toISOString(),
  };
  const nextJobs = [nextJob, ...jobs];
  saveJobs(nextJobs);
  return nextJob;
};
export const getJobById = (id: string) => getJobs().find((job: any) => job._id === id) || null;

export const getInternships = () =>
  readStorage(INTERNSHIP_STORAGE_KEY, defaultInternships);
export const saveInternships = (internships: any[]) =>
  writeStorage(INTERNSHIP_STORAGE_KEY, internships);
export const addInternship = (internship: any) => {
  const internships = getInternships();
  const nextInternship = {
    _id: generateId(),
    ...internship,
    createdAt: new Date().toISOString(),
  };
  const nextInternships = [nextInternship, ...internships];
  saveInternships(nextInternships);
  return nextInternship;
};
export const getInternshipById = (id: string) =>
  getInternships().find((internship: any) => internship._id === id) || null;

export const getApplications = () =>
  readStorage(APPLICATION_STORAGE_KEY, defaultApplications);
export const saveApplications = (applications: any[]) =>
  writeStorage(APPLICATION_STORAGE_KEY, applications);
export const addApplication = (application: any) => {
  const applications = getApplications();
  const nextApplication = {
    _id: generateId(),
    status: "pending",
    createdAt: new Date().toISOString(),
    ...application,
  };
  const nextApplications = [nextApplication, ...applications];
  saveApplications(nextApplications);
  return nextApplication;
};
export const updateApplicationStatus = (id: string, status: string) => {
  const applications = getApplications();
  const updated = applications.map((application: any) =>
    application._id === id ? { ...application, status } : application
  );
  saveApplications(updated);
  return updated;
};
export const getApplicationById = (id: string) =>
  getApplications().find((application: any) => application._id === id) || null;

export const getPublicPosts = () =>
  readStorage(PUBLIC_POSTS_STORAGE_KEY, defaultPublicPosts);
export const savePublicPosts = (posts: any[]) =>
  writeStorage(PUBLIC_POSTS_STORAGE_KEY, posts);
export const addPublicPost = (post: any) => {
  const posts = getPublicPosts();
  const nextPost = {
    _id: generateId(),
    likes: [],
    comments: [],
    shares: [],
    createdAt: new Date().toISOString(),
    media: post.media || [],
    ...post,
  };
  const nextPosts = [nextPost, ...posts];
  savePublicPosts(nextPosts);
  return nextPost;
};
export const mutatePublicPost = (postId: string, update: any) => {
  const posts = getPublicPosts();
  const nextPosts = posts.map((post: any) =>
    post._id === postId ? { ...post, ...update } : post
  );
  savePublicPosts(nextPosts);
  return nextPosts;
};
export const likePost = (postId: string, uid: string) => {
  const posts = getPublicPosts();
  const nextPosts = posts.map((post: any) => {
    if (post._id !== postId) return post;
    const likes = Array.from(new Set([...(post.likes || []), uid]));
    return { ...post, likes };
  });
  savePublicPosts(nextPosts);
  return nextPosts;
};
export const commentPost = (postId: string, comment: any) => {
  const posts = getPublicPosts();
  const nextPosts = posts.map((post: any) =>
    post._id === postId
      ? { ...post, comments: [...(post.comments || []), comment] }
      : post
  );
  savePublicPosts(nextPosts);
  return nextPosts;
};
export const sharePost = (postId: string, share: any) => {
  const posts = getPublicPosts();
  const nextPosts = posts.map((post: any) =>
    post._id === postId
      ? { ...post, shares: [...(post.shares || []), share] }
      : post
  );
  savePublicPosts(nextPosts);
  return nextPosts;
};

export const getPublicUsers = () =>
  readStorage(PUBLIC_USERS_STORAGE_KEY, [] as any[]);
export const savePublicUsers = (users: any[]) =>
  writeStorage(PUBLIC_USERS_STORAGE_KEY, users);
export const addOrUpdatePublicUser = (user: any) => {
  const users = getPublicUsers();
  const existing = users.find((item: any) => item.uid === user.uid);
  const nextUser = {
    ...existing,
    ...user,
    friends: existing?.friends || [],
  };
  const nextUsers = existing
    ? users.map((item: any) => (item.uid === user.uid ? nextUser : item))
    : [...users, nextUser];
  savePublicUsers(nextUsers);
  return nextUser;
};
export const updatePublicUserFriends = (uid: string, friendUid: string) => {
  const users = getPublicUsers();
  const nextUsers = users.map((user: any) => {
    if (user.uid !== uid) return user;
    const friends = Array.from(new Set([...(user.friends || []), friendUid]));
    return { ...user, friends };
  });
  savePublicUsers(nextUsers);
  return nextUsers.find((user: any) => user.uid === uid) || null;
};
export const getPublicUserByUid = (uid: string) =>
  getPublicUsers().find((user: any) => user.uid === uid) || null;
