import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaGithub, FaLinkedin, FaTelegramPlane, FaYoutube,
  FaTiktok, FaEnvelope, FaPlay, FaExternalLinkAlt, FaChevronRight
} from 'react-icons/fa';
import { mainProjects } from './project/projectsData';
import './portfolio.css';

const videos = [
  { id: 'welcome-to-jocode', name: 'Welcome to Jocode - Get Started', category: 'basics', videoId: '_BhpZdwS8ns', description: 'Learn how to use the Jocode platform and discover its benefits for beginner developers.' },
  { id: 'mern-stack-amharic', name: 'MERN Stack Full Guide በአማርኛ', category: 'fullstack', videoId: 'hh41oKF1NjM', description: 'Complete MERN Stack mentorship in Amharic — from database design to production deployment.' },
  { id: 'photo-studio-system', name: 'Photo Studio Management System', category: 'fullstack', videoId: '-UqosF_VvN8', description: 'A full-stack studio management system with admin, staff, and client dashboards — built for real photo studios.' },
  { id: 'jocode-hotel', name: 'JocodeHotel - Full Stack Social + Hotel App', category: 'fullstack', videoId: 'jjXTjXJ9j_I', description: 'A real-world MERN stack hotel + social media platform built as a complete teaching project with Jocode students.' },
  { id: 'guest-registration-system', name: 'Guest Registration System', category: 'fullstack', videoId: 'nILMiZ1lAOM', description: 'A streamlined system that scans guest IDs and payment receipts, securely storing data to speed up future check-ins and simplify finance records.' },
  { id: 'kanaho', name: 'KANAHO - Multi-Role Marketplace', category: 'fullstack', videoId: 'J8zFIAefwAc', description: 'A marketplace for Ethiopia — order products online and pay on delivery, no credit card needed.' },
  { id: 'hotel-management-mern', name: 'Full-Stack Hotel Management System (MERN)', category: 'fullstack', videoId: 'PyHK26jJfHU', description: 'Build and deploy a full-stack hotel management system using the MERN stack, step by step.' },
  { id: 'chrome-devtools', name: 'Learn Developer Tool በ 15 ደቂቃ', category: 'tools', videoId: 'qf-zcK1AV1Q', description: 'Quickly learn how to inspect, debug, and optimize websites using Chrome DevTools efficiently.' },
  { id: 'free-photo-resources', name: '5 Free Photo Sites You Need', category: 'tools', videoId: 'f_Q20Yt2IXE', description: 'Discover the top 5 free photo resources for your projects all in one place.' },
  { id: 'frontend-roadmap-2025', name: 'Frontend Roadmap 2025 በአማርኛ', category: 'roadmap', videoId: 'Icdh9VIGeWk', description: 'The 2025 Frontend Developer Roadmap in Amharic — what to learn, in what order, and why it matters.' },
  { id: 'vscode-shortcuts', name: 'VS Code Shortcuts በቀላሉ', category: 'tools', videoId: '-dugArwZQ6A', description: 'Boost your productivity with essential VS Code shortcuts and time-saving keyboard tips.' },
  { id: 'vscode-extensions', name: '25 VS Code Extensions በቀላሉ', category: 'tools', videoId: 'x3lWZylSQZg', description: 'Must-have VS Code extensions to make your development smoother and more efficient.' },
  { id: 'html-intro', name: 'Introduction to HTML', category: 'basics', videoId: 'HXu73kJeKlo', description: 'Learn the foundational building blocks of the web — structure pages with HTML elements.' },
  { id: 'css-intro', name: 'Introduction to CSS', category: 'basics', videoId: '6GbvzfjbKHw', description: 'Understand how to style web pages beautifully using Cascading Style Sheets.' },
  { id: 'backend-roadmap', name: 'Backend Roadmap በ JS እውቀት ላይ', category: 'roadmap', videoId: 'JwBoGhUWIuE', description: 'Backend roadmap for JavaScript developers — from Node.js to APIs and databases.' },
  { id: 'command-line-intro', name: 'Using Command Line on OS', category: 'tools', videoId: 'tHtwC1Wo4tc', description: 'Master basic command-line skills — navigate, manage files, and automate tasks on any OS.' },
  { id: 'my-cli', name: 'My Own CLI - jocode-create-folder', category: 'tools', videoId: 'rXg1L7TMmhY', description: 'Jocode create-folder CLI creates a full MVC folder structure in just one command.' },
  { id: 'html-full-course', name: 'HTML Full Course', category: 'basics', videoId: 'MmQG7TMZ1rU', description: 'A complete HTML course covering everything you need to structure web pages from scratch.' },
  { id: 'media-file-upload', name: 'Media File Upload በቀላሉ', category: 'fullstack', videoId: 'amu313PyL-I', description: 'Learn how to handle media file uploads in your full-stack app — from frontend to backend storage.' },
  { id: 'js-basics-before-frameworks', name: 'JS Basics Before Frameworks', category: 'basics', videoId: 'ZeUJMnv6im0', description: 'Master the essential JavaScript fundamentals you must know before jumping into React or any modern framework.' },
];

const socialLinks = [
  { name: 'GitHub',    icon: <FaGithub />,         url: 'https://github.com/josy216' },
  { name: 'LinkedIn',  icon: <FaLinkedin />,        url: 'https://www.linkedin.com/in/joseph-teka-271661309' },
  { name: 'Email',   icon: <FaEnvelope />,         url: 'mailto:josteka6250@gmail.com' },
  { name: 'Telegram',  icon: <FaTelegramPlane />,   url: 'https://t.me/jocode' },
  { name: 'YouTube',   icon: <FaYoutube />,         url: 'https://youtube.com/@jocode216' },
  { name: 'TikTok',   icon: <FaTiktok />,          url: 'https://www.tiktok.com/@joseph_jocode' },
];

const TABS = ['Projects', 'About Me', 'My Videos', 'Testimonials'];
const VIDEO_CATS = ['all', 'basics', 'tools', 'roadmap', 'fullstack'];

const Home = () => {
  const [activeTab, setActiveTab] = useState('Projects');
  const [activeVideoCat, setActiveVideoCat] = useState('all');
  const [currentVideoId, setCurrentVideoId] = useState(videos[0].videoId);
  const navigate = useNavigate();

  const filteredVideos = activeVideoCat === 'all'
    ? videos
    : videos.filter(v => v.category === activeVideoCat);

  return (
    <>
      <section className="pf-hero">
        <div className="pf-hero-inner">
          <div className="pf-avatar-wrap">
            <img src="/brnd.jpg" alt="Joseph Teka" className="pf-avatar" />
            <div className="pf-avatar-ring" />
          </div>

          <div>
            <h1 className="pf-name">Joseph Teka</h1>
            <p className="pf-tagline">Full-Stack Developer · Founder of Jocode </p>
          </div>

          <div className="pf-social-row">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="pf-social-btn"
                title={s.name}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="pf-tabs-bar">
        <div className="pf-tabs-inner">
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`pf-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="pf-content pf-tab-fade" key={activeTab}>

        {activeTab === 'Projects' && (
          <>
            <div className="pf-section-header">
              <h2 className="pf-section-title">My Work</h2>
              <p className="pf-section-subtitle">
                Production-ready applications with real-world impact and modern deployment.
              </p>
            </div>
            <div className="pf-projects-grid">
              {mainProjects.map((project, i) => (
                <div
                  key={project.id}
                  className="pf-project-card"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <div className="pf-project-card-top">
                    <span className="pf-project-num">#{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="pf-project-title">{project.title}</h3>
                  </div>

                  <p className="pf-project-desc">{project.description}</p>

                  {project.skills && (
                    <div className="pf-project-skills">
                      {project.skills.slice(0, 4).map((s) => (
                        <span key={s} className="pf-skill-tag">{s}</span>
                      ))}
                      {project.skills.length > 4 && (
                        <span className="pf-skill-tag">+{project.skills.length - 4}</span>
                      )}
                    </div>
                  )}

                  <div className="pf-project-footer">
                    <button
                      className="pf-view-btn"
                      onClick={(e) => { e.stopPropagation(); navigate(`/project/${project.id}`); }}
                    >
                      <FaPlay size={10} />
                      View Details &amp; Video
                    </button>
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pf-social-btn"
                        title="Live Demo"
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: 34, height: 34, borderRadius: 8 }}
                      >
                        <FaExternalLinkAlt size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'About Me' && (
          <>
            <div className="pf-section-header">
              <h2 className="pf-section-title">About Me</h2>
              <p className="pf-section-subtitle">A little about who I am and what drives me.</p>
            </div>

            <div className="pf-about-grid">
              <div className="pf-about-bio">
                <h3>Who I Am</h3>
                <p>
                  I am a <strong>Software Engineer at Honeyland Hotel</strong>, where I focus on automating manual tasks and digitalizing paperwork. I have made huge changes in my first month of employment by learning from the owner and people nearby. I am still meeting many people facing similar problems, and it is a great opportunity to make an impact.
                </p>
                <p>
                  I am also the founder of <strong>Jocode</strong>, a platform where I mentor beginner and intermediate developers through hands-on, real-world applications. I run a YouTube channel called Jocode where I share free tutorials in Amharic and English.
                </p>
                <p>
                  On a personal level, I love reading books, listening to podcasts, and exploring new
                  ideas. I can socialize but I do my best work independently.
                </p>
              </div>

              <div className="pf-about-card">
                <h3>Tech Stack</h3>
                <div className="pf-skills-wrap">
                  {[
                    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js',
                    'TanStack Router', 'Node.js', 'Express', 'MySQL', 'MongoDB',
                    'Tailwind CSS', 'Zustand', 'React Query', 'Git / GitHub', 'Firebase',
                    'Backend Development',
                  ].map((s) => (
                    <span key={s} className="pf-skill-chip">{s}</span>
                  ))}
                </div>
              </div>

              <div className="pf-about-card">
                <h3>At a Glance</h3>
                <div className="pf-stats-list">
                  {[
                    { label: 'Projects Built',        val: '100+' },
                    { label: 'Real Clients Served',   val: '5+' },
                    { label: 'YouTube Videos',        val: '80+' },
                    { label: 'Mentorship Students',   val: '17 paid · 100+ free' },
                    { label: 'npm Package Downloads', val: '500+' },
                  ].map(({ label, val }) => (
                    <div key={label} className="pf-stat-item">
                      <span className="label">{label}</span>
                      <span className="val">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pf-about-card" style={{ gridColumn: '1 / -1' }}>
                <h3>Find Me Online</h3>
                <div className="pf-links-list">
                  {[
                    { label: 'jocode.pro.et', href: 'https://jocode.pro.et', icon: <FaExternalLinkAlt /> },
                    { label: 'youtube.com/@jocode216', href: 'https://youtube.com/@jocode216', icon: <FaYoutube /> },
                    { label: 'github.com/josy216', href: 'https://github.com/josy216', icon: <FaGithub /> },
                    { label: 'linkedin.com/in/joseph-teka-271661309', href: 'https://www.linkedin.com/in/joseph-teka-271661309', icon: <FaLinkedin /> },
                    { label: 'tiktok.com/@joseph_jocode', href: 'https://www.tiktok.com/@joseph_jocode', icon: <FaTiktok /> },
                    { label: 't.me/jocode', href: 'https://t.me/jocode', icon: <FaTelegramPlane /> },
                  ].map(({ label, href, icon }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="pf-link-item">
                      {icon}
                      <span>{label}</span>
                      <FaChevronRight size={10} style={{ marginLeft: 'auto', opacity: 0.4 }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'My Videos' && (
          <>
            <div className="pf-section-header">
              <h2 className="pf-section-title">The Way I Teach</h2>
              <p className="pf-section-subtitle">
                Tutorials, roadmaps, and project walkthroughs — mostly in Amharic.
              </p>
            </div>

            <div className="pf-video-player-wrap">
              <iframe
                key={currentVideoId}
                src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&modestbranding=1`}
                title="Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>

            <div className="pf-video-category-bar">
              {VIDEO_CATS.map((cat) => (
                <button
                  key={cat}
                  className={`pf-cat-btn ${activeVideoCat === cat ? 'active' : ''}`}
                  onClick={() => setActiveVideoCat(cat)}
                >
                  {cat === 'all' ? 'All Videos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            <div className="pf-videos-grid">
              {filteredVideos.map((v) => (
                <div
                  key={v.id}
                  className={`pf-video-card ${currentVideoId === v.videoId ? 'playing' : ''}`}
                  onClick={() => setCurrentVideoId(v.videoId)}
                >
                  <div className="pf-video-thumb">
                    <img
                      src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`}
                      alt={v.name}
                      onError={(e) => {
                        e.currentTarget.src = `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="pf-play-overlay">
                      <div className="pf-play-icon"><FaPlay size={14} /></div>
                    </div>
                  </div>
                  <div className="pf-video-card-body">
                    <p className="pf-video-name">{v.name}</p>
                    <p className="pf-video-desc">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'Testimonials' && (
          <>
            <div className="pf-section-header">
              <h2 className="pf-section-title">What my last client said about my work?</h2>
              <div style={{ marginTop: '24px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', borderLeft: '4px solid #a78bfa', display: 'inline-block' }}>
                <p style={{ fontSize: '1.2rem', fontStyle: 'italic', margin: 0 }}>
                  "He said one nice thing about me He said I am a genius🤣🤣"
                </p>
              </div>
            </div>
            
            <div className="pf-video-player-wrap" style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '40px', marginTop: '30px' }}>
              <iframe
                src="https://www.youtube.com/embed/NywqMmimmPI?rel=0&modestbranding=1&autoplay=0"
                title="Client Testimonial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Home;
