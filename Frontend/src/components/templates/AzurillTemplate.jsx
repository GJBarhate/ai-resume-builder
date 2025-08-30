import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

// Utility functions
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div className="flex flex-col items-center justify-center space-y-1 pb-1 text-center">
      <div>
        <div className="text-lg font-bold">
          {resumeData?.firstName} {resumeData?.lastName}
        </div>
        <div className="text-sm">{resumeData?.jobTitle}</div>
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
        {resumeData?.address && (
          <div className="flex items-center gap-x-1">
            <span style={{ color: resumeData?.themeColor }}>📍</span>
            <div>{resumeData.address}</div>
          </div>
        )}
        {resumeData?.phone && (
          <div className="flex items-center gap-x-1">
            <span style={{ color: resumeData?.themeColor }}>📞</span>
            <a href={`tel:${resumeData.phone}`} target="_blank" rel="noreferrer" className="hover:underline">
              {resumeData.phone}
            </a>
          </div>
        )}
        {resumeData?.email && (
          <div className="flex items-center gap-x-1">
            <span style={{ color: resumeData?.themeColor }}>✉️</span>
            <a href={`mailto:${resumeData.email}`} target="_blank" rel="noreferrer" className="hover:underline">
              {resumeData.email}
            </a>
          </div>
        )}
      </div>

      {/* Profile Links */}
      {(resumeData?.competitiveProgrammingLink || resumeData?.otherLink) && (
        <div className="flex flex-wrap justify-center gap-1 mt-1">
          {resumeData?.competitiveProgrammingLink && resumeData?.competitiveProgrammingPlatform && (
            <a 
              href={resumeData.competitiveProgrammingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-1.5 py-0.5 text-xs rounded hover:opacity-80 transition-opacity"
              style={{ 
                backgroundColor: `${resumeData?.themeColor}20`, 
                color: resumeData?.themeColor 
              }}
            >
              {resumeData.competitiveProgrammingPlatform === 'leetcode' && 'LeetCode'}
              {resumeData.competitiveProgrammingPlatform === 'codeforces' && 'Codeforces'}
              {resumeData.competitiveProgrammingPlatform === 'codechef' && 'CodeChef'}
            </a>
          )}
          {resumeData?.otherLink && resumeData?.otherProfilePlatform && (
            <a 
              href={resumeData.otherLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-1.5 py-0.5 text-xs rounded hover:opacity-80 transition-opacity"
              style={{ 
                backgroundColor: `${resumeData?.themeColor}20`, 
                color: resumeData?.themeColor 
              }}
            >
              {resumeData.otherProfilePlatform === 'portfolio' && 'Portfolio'}
              {resumeData.otherProfilePlatform === 'github' && 'GitHub'}
              {resumeData.otherProfilePlatform === 'linkedin' && 'LinkedIn'}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

const Section = ({ title, children, className, color, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <section className={cn("mb-1.5", className)}>
      <div className="mb-1 border-l-3 pl-2 flex items-center justify-between" style={{ borderColor: color }}>
        <h3 className="text-xs font-bold" style={{ color: color }}>{sectionTitle}</h3>
        <div className="ml-2">
          <SectionOptionsMenu sectionKey={sectionKey} />
        </div>
      </div>
      <div className="pl-3">
        {children}
      </div>
    </section>
  );
};

const Summary = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.summary) return null;

  return (
    <Section title="Summary" color={resumeData?.themeColor} sectionKey="summary">
      <p className="text-gray-700 leading-tight text-xs">{resumeData.summary}</p>
    </Section>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <Section title="Experience" color={resumeData?.themeColor} sectionKey="experience">
      <div className="space-y-1.5">
        {resumeData.experience.map((item, index) => (
          <div key={index}>
            <div className="font-bold text-sm text-gray-900">{item.companyName}</div>
            <div className="text-gray-900 text-xs">{item.title}</div>
            <div className="text-xs text-gray-900">
              {item.startDate}
              {item.startDate && (item.currentlyWorking ? " - Present" : item.endDate ? ` - ${item.endDate}` : "")}
              {item.workMode === 'remote' ? ' | Remote' : 
               item.workMode === 'hybrid' ? ' | Hybrid' : ''}
              {item.workMode !== 'remote' && item.city && ` | ${item.city}`}
              {item.workMode !== 'remote' && item.state && `, ${item.state}`}
            </div>
            {item.workSummary && (
              <div 
                className="mt-1 text-xs text-gray-900"
                dangerouslySetInnerHTML={{ __html: item.workSummary }}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

const Education = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.education || resumeData.education.length === 0) return null;

  return (
    <Section title="Education" color={resumeData?.themeColor} sectionKey="education">
      <div className="space-y-1.5">
        {resumeData.education.map((item, index) => (
          <div key={index}>
            <div className="font-bold text-xs text-gray-900">{item.universityName}</div>
            <div className="text-gray-900 text-xs">
              {item.degree}
              {item.degree && item.major ? ` in ${item.major}` : ''}
            </div>
            <div className="text-xs text-gray-900">
              {item.startDate}
              {item.startDate && item.endDate ? ` - ${item.endDate}` : ''}
            </div>
            {item.grade && (
              <div className="text-xs text-gray-900">{item.gradeType}: {item.grade}</div>
            )}
            {item.description && (
              <div className="text-xs text-gray-900 mt-0.5">{item.description}</div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

const Skills = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.skills || resumeData.skills.length === 0) return null;

  return (
    <Section title="Skills" color={resumeData?.themeColor} sectionKey="skills">
      <div className="space-y-1">
        <div className="flex flex-wrap gap-1">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="px-1.5 py-0.5 text-xs rounded"
              style={{ 
                backgroundColor: `${resumeData?.themeColor}20`, 
                color: resumeData?.themeColor 
              }}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};

const Projects = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.projects || resumeData.projects.length === 0) return null;

  return (
    <Section title="Projects" color={resumeData?.themeColor} sectionKey="projects">
      <div className="space-y-1.5">
        {resumeData.projects.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-0.5">
              <div className="font-bold text-xs text-gray-900">{project.projectName}</div>
              {(project.startDate || project.endDate) && (
                <div className="text-right text-xs text-gray-900">
                  {project.startDate}
                  {project.startDate && project.endDate && ` - ${project.endDate}`}
                </div>
              )}
            </div>
            {project.techStack && (
              <div className="text-xs text-gray-900">
                Tech Stack: {project.techStack.split(',').join(' | ')}
              </div>
            )}
            {project.projectSummary && (
              <div 
                className="text-xs text-gray-900 mt-0.5"
                dangerouslySetInnerHTML={{ __html: project.projectSummary }}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

const AzurillTemplate = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Get custom sections from resume data
  const customSections = resumeData?.sectionSettings?.customSections || [];

  // Filter custom sections based on sidebar and column properties
  const sidebarSections = customSections
    .filter(section => section.sidebar || section.column === 'sidebar')
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  
  const mainContentSections = customSections
    .filter(section => !section.sidebar && section.column !== 'sidebar' && 
                      (section.column === 'main' || section.column === 'auto' || !section.column))
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div 
      className="max-w-4xl mx-auto p-2 bg-white border-t-4 text-xs leading-tight"
      style={{ borderColor: resumeData?.themeColor || '#000000' }}
    >
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-1">
          <Summary />
          <Experience />
          <Projects />
          
          {/* Render custom sections in main content */}
          {mainContentSections.map((section) => (
            <CustomSection key={section.id} sectionData={section} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-1">
          <Education />
          <Skills />
          
          {/* Render custom sections in sidebar */}
          {sidebarSections.map((section) => (
            <CustomSection key={section.id} sectionData={section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AzurillTemplate;