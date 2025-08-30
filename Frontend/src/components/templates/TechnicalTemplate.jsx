import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div 
      className="bg-gray-900 text-white p-4 mb-4"
      style={{ backgroundColor: resumeData?.themeColor || '#1f2937' }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {resumeData?.firstName} {resumeData?.lastName}
          </h1>
          <h2 className="text-lg text-gray-200 mb-2">{resumeData?.jobTitle}</h2>
          
          <div className="flex gap-6 text-sm text-gray-300">
            {resumeData?.email && (
              <a 
                href={`mailto:${resumeData.email}`} 
                className="hover:text-white flex items-center gap-1"
              >
                <span>📧</span> {resumeData.email}
              </a>
            )}
            {resumeData?.phone && (
              <a 
                href={`tel:${resumeData.phone}`} 
                className="hover:text-white flex items-center gap-1"
              >
                <span>📱</span> {resumeData.phone}
              </a>
            )}
            {resumeData?.address && (
              <span className="flex items-center gap-1">
                <span>📍</span> {resumeData.address}
              </span>
            )}
          </div>
        </div>
        
        {/* Profile Links */}
        <div className="text-right">
          {(resumeData?.competitiveProgrammingLink || resumeData?.otherLink) && (
            <div className="space-y-1">
              {resumeData?.competitiveProgrammingLink && resumeData?.competitiveProgrammingPlatform && (
                <div>
                  <a 
                    href={resumeData.competitiveProgrammingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-white text-sm"
                  >
                    {resumeData.competitiveProgrammingPlatform === 'leetcode' && '🔗 LeetCode'}
                    {resumeData.competitiveProgrammingPlatform === 'codeforces' && '🔗 Codeforces'}
                    {resumeData.competitiveProgrammingPlatform === 'codechef' && '🔗 CodeChef'}
                  </a>
                </div>
              )}
              {resumeData?.otherLink && resumeData?.otherProfilePlatform && (
                <div>
                  <a 
                    href={resumeData.otherLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-white text-sm"
                  >
                    {resumeData.otherProfilePlatform === 'portfolio' && '🌐 Portfolio'}
                    {resumeData.otherProfilePlatform === 'github' && '📚 GitHub'}
                    {resumeData.otherProfilePlatform === 'linkedin' && '💼 LinkedIn'}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children, themeColor, icon, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <div className="mb-5">
      <h3 
        className="text-lg font-bold mb-3 flex items-center gap-2"
        style={{ color: themeColor || '#1f2937' }}
      >
        <span>{icon}</span>
        {sectionTitle}
        <div className="ml-2">
          <SectionOptionsMenu sectionKey={sectionKey} />
        </div>
        <div 
          className="flex-1 h-px ml-2"
          style={{ backgroundColor: themeColor || '#1f2937' }}
        />
      </h3>
      {children}
    </div>
  );
};

const Summary = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.summary) return null;

  return (
    <Section title="TECHNICAL PROFILE" themeColor={resumeData?.themeColor} icon="👨‍💻" sectionKey="summary">
      <div className="bg-gray-50 p-4 rounded border-l-4" style={{ borderColor: resumeData?.themeColor || '#1f2937' }}>
        <p className="text-gray-800 leading-relaxed italic">
          {resumeData.summary}
        </p>
      </div>
    </Section>
  );
};

const Skills = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.skills || resumeData.skills.length === 0) return null;

  return (
    <Section title="Skills" themeColor={resumeData?.themeColor} icon="⚡" sectionKey="skills">
      <div className="bg-gray-50 p-4 rounded">
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-3 py-1 text-sm rounded border"
              style={{ 
                backgroundColor: resumeData?.themeColor + '10' || '#1f293710',
                borderColor: resumeData?.themeColor || '#1f2937',
                color: resumeData?.themeColor || '#1f2937'
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
    <Section title="FEATURED PROJECTS" themeColor={resumeData?.themeColor} icon="🚀" sectionKey="projects">
      <div className="space-y-4">
        {resumeData.projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg font-bold text-gray-900">{project.projectName}</h4>
              {(project.startDate || project.endDate) && (
                <div 
                  className="text-xs px-2 py-1 rounded text-white"
                  style={{ backgroundColor: resumeData?.themeColor || '#1f2937' }}
                >
                  {project.startDate}
                  {project.startDate && project.endDate && ` - ${project.endDate}`}
                </div>
              )}
            </div>
            {project.techStack && (
              <div className="mb-2">
                <span className="text-xs font-bold text-gray-600">Tech Stack: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {project.techStack.split(',').map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2 py-1 text-xs rounded bg-white border"
                      style={{ borderColor: resumeData?.themeColor || '#1f2937' }}
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {project.projectSummary && (
              <div 
                className="text-gray-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: project.projectSummary }}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <Section title="PROFESSIONAL EXPERIENCE" themeColor={resumeData?.themeColor} icon="💼" sectionKey="experience">
      <div className="space-y-5">
        {resumeData.experience.map((item, index) => (
          <div key={index} className="border-l-4 pl-4" style={{ borderColor: resumeData?.themeColor || '#1f2937' }}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                <h5 
                  className="text-base font-semibold"
                  style={{ color: resumeData?.themeColor || '#1f2937' }}
                >
                  {item.companyName}
                </h5>
                <p className="text-sm text-gray-600">
                  {item.workMode === 'remote' ? '🏠 Remote' : 
                   item.workMode === 'hybrid' ? `🏢 Hybrid - ${item.city || ''}${item.state ? `, ${item.state}` : ''}` : 
                   `🏢 ${item.city || ''}${item.state ? `, ${item.state}` : ''}`}
                </p>
              </div>
              <div 
                className="text-sm px-3 py-1 rounded text-white"
                style={{ backgroundColor: resumeData?.themeColor || '#1f2937' }}
              >
                {item.startDate}
                {item.startDate && (item.currentlyWorking ? " - Present" : item.endDate ? ` - ${item.endDate}` : "")}
              </div>
            </div>
            {item.workSummary && (
              <div 
                className="text-gray-700 text-sm leading-relaxed"
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
    <Section title="EDUCATION" themeColor={resumeData?.themeColor} icon="🎓" sectionKey="education">
      <div className="space-y-4">
        {resumeData.education.map((item, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded border">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900">
                  {item.degree}
                  {item.degree && item.major ? ` in ${item.major}` : ''}
                </h4>
                <p 
                  className="font-medium"
                  style={{ color: resumeData?.themeColor || '#1f2937' }}
                >
                  {item.universityName}
                </p>
                <p className="text-sm text-gray-600">
                  {item.city && `${item.city}, `}{item.state}
                </p>
              </div>
              <div className="text-right text-sm">
                <div className="font-medium text-gray-700">
                  {item.startDate}
                  {item.startDate && item.endDate ? ` - ${item.endDate}` : ''}
                </div>
                {item.grade && (
                  <div 
                    className="text-xs font-bold"
                    style={{ color: resumeData?.themeColor || '#1f2937' }}
                  >
                    {item.gradeType}: {item.grade}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const TechnicalTemplate = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Get custom sections from resume data
  const customSections = resumeData?.sectionSettings?.customSections || [];

  // Split custom sections between main content and sidebar
  // If section has a 'column' property, use it, otherwise put most in main content
  const mainContentSections = customSections.filter((section, index) => 
    section.column === 'main' || (!section.column && index % 3 !== 2)
  );
  
  const sidebarSections = customSections.filter((section, index) => 
    section.column === 'sidebar' || (!section.column && index % 3 === 2)
  );

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-screen text-sm">
      <Header />
      <div className="px-6 pb-6">
        <Summary />
        <Skills />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Projects />
            <Experience />
            
            {/* Render custom sections in main content */}
            {mainContentSections
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((section) => (
                <CustomSection key={section.id} sectionData={section} />
              ))}
          </div>
          <div>
            <Education />
            
            {/* Render custom sections in sidebar */}
            {sidebarSections
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((section) => (
                <CustomSection key={section.id} sectionData={section} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalTemplate;