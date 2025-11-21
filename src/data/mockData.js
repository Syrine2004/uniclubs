import { Briefcase, Users, Target, Building } from 'lucide-react';

// --- Données partagées pour les clubs (pour remplir rapidement) ---
const defaultObjectives = [
  { icon: Briefcase, title: "Skill Development", desc: "Enhance specific skills related to the club." },
  { icon: Users, title: "Networking", desc: "Connect with like-minded students and professionals." },
  { icon: Target, title: "Projects", desc: "Collaborate on fun and impactful projects." },
  { icon: Building, title: "Community", desc: "Build a strong and supportive community." },
];

const defaultLeadership = [
  { name: "Alex Johnson", role: "President", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Sarah Chen", role: "Vice President", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Michael Rodriguez", role: "Treasurer", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
];

const defaultMembers = [
  { avatar: "https://randomuser.me/api/portraits/women/2.jpg" }, { avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  { avatar: "https://randomuser.me/api/portraits/women/4.jpg" }, { avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
  { avatar: "https://randomuser.me/api/portraits/women/6.jpg" }, { avatar: "https://randomuser.me/api/portraits/men/7.jpg" },
  { avatar: "https://randomuser.me/api/portraits/women/8.jpg" }, { avatar: "https://randomuser.me/api/portraits/men/9.jpg" },
];

const defaultPhotoGallery = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=300",
];
// ------------------------------------------------------------------

export const mockClubs = [
  {
    id: 1,
    nom: "Computer Science Society",
    description: "Learn coding, build projects, and participate in hackathons.",
    image: "https://tse4.mm.bing.net/th/id/OIP.5GnL6LJ-37ows0KFzLbv5gHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
    banner: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200",
    categorie: "Technologie",
    admin: "Alex Johnson",
    membersCount: 247,
    eventsCount: 5,
    objectives: defaultObjectives,
    leadership: defaultLeadership,
    members: defaultMembers,
    photoGallery: defaultPhotoGallery
  },
  {
    id: 2,
    nom: "Debate Society",
    description: "Sharpen your public speaking skills.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500",
    banner: "https://edit.org/editor/json/2023/09/08/a/5/a5943bb8d2af49e5844fbbb2a3b73c68.webp", // Nouvelle bannière
    categorie: "Arts",
    admin: "Thomas Martin",
    membersCount: 85,
    eventsCount: 3,
    objectives: defaultObjectives,
    leadership: defaultLeadership,
    members: defaultMembers,
    photoGallery: [ // Photos différentes
      "https://www.francfort2017.com/wp-content/uploads/2022/12/concept-de-reunion-en-ligne-768x499.jpg",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=300",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300",
    ]
  },
  {
    id: 3,
    nom: "Photography Club",
    description: "Capture moments, learn composition.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    banner: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200", // Nouvelle bannière
    categorie: "Arts",
    admin: "Sophie Laurent",
    membersCount: 120,
    eventsCount: 8,
    objectives: defaultObjectives,
    leadership: defaultLeadership,
    members: defaultMembers,
    photoGallery: [ // Photos différentes
      "https://tse4.mm.bing.net/th/id/OIP.PLRiYhvxeNhxN-dG3ZQ94gHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?cs=srgb&dl=pexels-andre-furtado-1264210.jpg&fm=jpg",
      "https://img.freepik.com/premium-photo/frames-history-honoring-photography-august-19th_1131934-3787.jpg",
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=300",
    ]
  },
  {
    id: 4,
    nom: "Soccer Club",
    description: "Join our competitive team and play.",
    image: "https://th.bing.com/th/id/R.7cac350c9ad85830f565029c682d10d7?rik=C5zWsVHrbOGdhg&riu=http%3a%2f%2fclubdeportivosoccercitycom.mex.tl%2fuploads%2fs%2fh%2f5%2fn%2fh5n1fdd4gxmt%2fimg%2ffull_lGIy9fCL.png&ehk=CIf%2fJs726ebiKJAllI%2fKdO7iYYm9XMe0HXfSsvcw1SM%3d&risl=&pid=ImgRaw&r=0",
    banner: "https://tse3.mm.bing.net/th/id/OIP.6u8dweNjF91XtKDjsVWCwQHaC9?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3", // Nouvelle bannière
    categorie: "Sports",
    admin: "Pierre Leroy",
    membersCount: 57,
    eventsCount: 12,
    objectives: defaultObjectives,
    leadership: defaultLeadership,
    members: defaultMembers,
    photoGallery: [ // Photos différentes
      "https://th.bing.com/th/id/OIP.3lFvuHeklW2KFIFICZY77wHaE8?o=7&cb=ucfimgc2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://th.bing.com/th/id/OIP.T1V8qQCyI62h3i7BxDW9xAHaE8?o=7&cb=ucfimgc2rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://tse4.mm.bing.net/th/id/OIP.NG9LJs_agti0BGrtbqPjNQHaE7?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://tse4.mm.bing.net/th/id/OIP.ul0tuaeRhwZW1DGnzfU2EgHaGN?cb=ucfimgc2&w=940&h=788&rs=1&pid=ImgDetMain&o=7&rm=3",
    ]
  }
];

export const mockEvents = [
  {
    id: 1,
    titre: "Coding Workshop",
    description: "Learn advanced React hooks.",
    date: "2025-11-20",
    lieu: "Amphithéâtre A",
    clubId: 1,
    tag: "Workshop"
  },
  {
    id: 2,
    titre: "Tech Talk Series",
    description: "Guest speaker from Google.",
    date: "2025-11-22",
    lieu: "Auditorium B",
    clubId: 1,
    tag: "Talk"
  },
  {
    id: 3,
    titre: "Hackathon 2025",
    description: "24-hour coding competition.",
    date: "2025-12-05",
    lieu: "Innovation Hub",
    clubId: 1,
    tag: "Competition"
  },
  {
    id: 4,
    titre: "Spectacle de fin d'année",
    description: "Représentation théâtrale",
    date: "2025-12-20",
    lieu: "Salle des fêtes",
    clubId: 2, // L'ID 2 correspond à "Debate Society"
    tag: "Show"
  }
];

// Mock data pour Profil Étudiant (Maquette ⿦)
export const mockStudentUser = {
  id: 101,
  email: "emma.johnson@university.edu",
  prenom: "Emma",
  nom: "Johnson",
  role: "etudiant",
  major: "Computer Science Major",
  phone: "+1 (555) 123-4567",
  studentId: "STU-2024-001",
  avatar: "https://randomuser.me/api/portraits/women/68.jpg"
};

export const mockMembershipRequests = [
  { id: 1, clubName: "Programming Club", submitted: "2 days ago", status: "Pending" },
  { id: 2, clubName: "Art Society", submitted: "1 week ago", status: "Accepted" },
  { id: 3, clubName: "Music Band", submitted: "2 weeks ago", status: "Rejected" },
  { id: 4, clubName: "Drama Club", submitted: "3 days ago", status: "Pending" },
  { id: 5, clubName: "Robotics Team", submitted: "1 month ago", status: "Accepted" },
];

export const mockMyClubs = [
  { id: 1, name: "Programming Club", joined: "Jan 2024", members: 85, desc: "Learn coding, build projects, and participate in hackathons." },
  { id: 2, name: "Art Society", joined: "Feb 2024", members: 42, desc: "Express creativity through various art forms and exhibitions." },
  { id: 3, name: "Robotics Team", joined: "Mar 2024", members: 28, desc: "Build robots and compete in national competitions." },
];

// Mock data pour Admin Dashboard (Maquette ⿥)
export const mockAdminUser = {
  id: 202,
  email: "admin@club.com",
  prenom: "John",
  nom: "Admin",
  role: "admin",
  avatar: "https://randomuser.me/api/portraits/men/41.jpg"
};

export const mockAdminRequests = [
  { id: 1, name: "Sarah Johnson", class: "Computer Science • Class of 2025", message: "I'm passionate about technology and would love to join the club to connect with like-minded students and participate in coding competitions.", email: "sarah.johnson@university.edu", avatar: "https://randomuser.me/api/portraits/women/48.jpg", time: "2 hours ago", status: "Pending" },
  { id: 2, name: "Michael Chen", class: "Engineering • Class of 2024", message: "As an engineering student, I believe this club will help me develop leadership skills and contribute to meaningful projects in our community.", email: "m.chen@university.edu", avatar: "https://randomuser.me/api/portraits/men/49.jpg", time: "5 hours ago", status: "Pending" },
  { id: 3, name: "Emma Rodriguez", class: "Business Administration • Class of 2026", message: "I'm excited to bring my organizational skills to help with event planning and community outreach initiatives.", email: "emma.rodriguez@university.edu", avatar: "https://randomuser.me/api/portraits/women/50.jpg", time: "1 day ago", status: "Approved" },
];