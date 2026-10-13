import { useParams, useNavigate } from "react-router-dom";
import { FaGithub, FaChevronLeft, FaExternalLinkAlt, FaShareAlt } from "react-icons/fa";
import { mainProjects } from "./projectsData";
import { useState, useEffect } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = mainProjects.find((p) => p.id === id);

  const [copied, setCopied] = useState(false);

  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!project) {
    return (
      <div className="pf-content" style={{ textAlign: "center", paddingTop: "100px" }}>
        <h2 className="pf-section-title">Project not found</h2>
        <button onClick={() => navigate("/")} className="pf-view-btn" style={{ marginTop: "20px" }}>
          <FaChevronLeft /> Back to Home
        </button>
      </div>
    );
  }

  const getYoutubeEmbedUrl = (videoUrl) => {
    try {
      const videoIdMatch = videoUrl.match(
        /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (!videoId) return "";
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`;
    } catch {
      return "";
    }
  };

  return (
    <div className="pf-content pf-tab-fade" style={{ maxWidth: '900px' }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="pf-tab-btn"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', background: 'rgba(255,255,255,0.05)' }}
      >
        <FaChevronLeft />
        <span>Back to all projects</span>
      </button>

      {/* Title Section */}
      <div className="pf-section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
        <h1 className="pf-section-title" style={{ fontSize: '2.5rem' }}>{project.title}</h1>
        <p className="pf-section-subtitle" style={{ marginLeft: 0 }}>{project.description}</p>
      </div>

      {/* Video Player */}
      <div className="pf-video-player-wrap" style={{ marginBottom: '40px' }}>
        {project.videoUrl ? (
          <iframe
            src={getYoutubeEmbedUrl(project.videoUrl)}
            title={`${project.title} Walkthrough`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      {/* Project Details Content */}
      <div className="pf-about-grid" style={{ gap: '32px' }}>
        <div className="pf-about-bio" style={{ gridColumn: 'span 1' }}>
          <h3>About This Project</h3>
          <p style={{ marginTop: '16px' }}>
            {project.longDescription || project.description}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="pf-about-card">
            <h3>Technologies Used</h3>
            <div className="pf-skills-wrap" style={{ marginTop: '16px' }}>
              {project.skills.map((skill, index) => (
                <span key={index} className="pf-skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pf-about-card">
            <h3>Project Links</h3>
            <div className="pf-links-list" style={{ marginTop: '16px' }}>
              {project.maintenance && (
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: '#ffaaaa', fontSize: '0.9rem', marginBottom: '16px' }}>
                  <strong>Demo Offline:</strong> Out for now due to yearly payment, will be back soon.
                </div>
              )}
              {project.demoUrl && project.demoUrl !== "#" && !project.maintenance && (
                <button
                  className="pf-link-item"
                  onClick={() => window.open(project.demoUrl, "_blank")}
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  <FaExternalLinkAlt /> {project.demoName || "Live Demo"}
                </button>
              )}
              {project.additionalDemoUrls && !project.maintenance && project.additionalDemoUrls.map((demo, index) => (
                <button
                  key={`additional-demo-${index}`}
                  className="pf-link-item"
                  onClick={() => window.open(demo.url, "_blank")}
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  <FaExternalLinkAlt /> {demo.name}
                </button>
              ))}
              {project.githubUrl && project.githubUrl !== "#" && project.githubUrl !== "Private" && (
                <button
                  className="pf-link-item"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                  style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                  <FaGithub /> GitHub Repository
                </button>
              )}
              {project.githubUrl === "Private" && (
                <button className="pf-link-item" disabled style={{ width: '100%', justifyContent: 'flex-start', opacity: 0.5, cursor: 'not-allowed' }}>
                  <FaGithub /> Private Repository
                </button>
              )}
              <button
                className="pf-link-item"
                onClick={handleShare}
                style={{ width: '100%', justifyContent: 'flex-start', color: copied ? '#a78bfa' : '' }}
              >
                <FaShareAlt /> {copied ? "Link Copied!" : "Share Project"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
