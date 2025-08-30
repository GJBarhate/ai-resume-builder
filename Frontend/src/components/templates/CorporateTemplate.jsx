import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div className="text-center border-b-2 border-gray-300 pb-4 mb-4">
      <h1 className="text-xl font-bold text-gray-900 mb-0.5">
        {resumeData?.firstName} {resumeData?.lastName}
      </h1>
      <h2 
        className="text-xl font-medium mb-3"
        style={{ color: resumeData?.themeColor || '#2563eb' }}
      >
        {resumeData?.jobTitle}
      </h2>
      
      <div className="flex justify-center gap-8 text-sm text-gray-600">
        {resumeData?.email && (
          <div className="flex items-center gap-1">
            <span className="font-medium">Email:</span>
            <a 
              href={`mailto:${resumeData.email}`} 
              className="hover:text-blue-600"
            >
              {resumeData.email}
            </a>
          </div>
        )}
        {resumeData?.phone && (
          <div className="flex items-center gap-1">
            <span className="font-medium">Phone:</span>
            <a 
              href={`tel:${resumeData.phone}`} 
              className="hover:text-blue-600"
            >
              {resumeData.phone}
            </a>
          </div>
        )}
        {resumeData?.address && (
          <div className="flex items-center gap-1">
            <span className="font-medium">Location:</span>
            <span>{resumeData.address}</span>
          </div>
        )}
      </div>

      {/* Profile Links */}
      {(resumeData?.competitiveProgrammingLink || resumeData?.otherLink) && (
        <div className="flex justify-center gap-4 mt-3">
          {resumeData?.competitiveProgrammingLink && resumeData?.competitiveProgrammingPlatform && (
            <a 
              href={resumeData.competitiveProgrammingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              {resumeData.competitiveProgrammingPlatform === 'leetcode' && 'LeetCode Profile'}
              {resumeData.competitiveProgrammingPlatform === 'codeforces' && 'Codeforces Profile'}
              {resumeData.competitiveProgrammingPlatform === 'codechef' && 'CodeChef Profile'}
            </a>
          )}
          {resumeData?.otherLink && resumeData?.otherProfilePlatform && (
            <a 
              href={resumeData.otherLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
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

const Section = ({ title, children, themeColor, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <div className="mb-2">
      <h3 
        className="text-lg font-bold mb-3 pb-1 border-b flex items-center justify-between"
        style={{ 
          color: themeColor || '#2563eb',
          borderColor: themeColor || '#2563eb'
        }}
      >
        <span>{sectionTitle}</span>
        <div className="ml-2">
          <SectionOptionsMenu sectionKey={sectionKey} />
        </div>
      </h3>
      {children}
    </div>
  );
};

const Summary = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.summary) return null;

  return (
    <Section title="PROFESSIONAL SUMMARY" themeColor={resumeData?.themeColor} sectionKey="summary">
      <p className="text-gray-800 leading-relaxed text-justify">
        {resumeData.summary}
      </p>
    </Section>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <Section title="PROFESSIONAL EXPERIENCE" themeColor={resumeData?.themeColor} sectionKey="experience">
      <div className="space-y-5">
        {resumeData.experience.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                <h5 
                  className="text-base font-semibold"
                  style={{ color: resumeData?.themeColor || '#2563eb' }}
                >
                  {item.companyName}
                </h5>
                <p className="text-sm text-gray-600">
                  {item.workMode === 'remote' ? 'Remote' : 
                   item.workMode === 'hybrid' ? `Hybrid - ${item.city || ''}${item.state ? `, ${item.state}` : ''}` : 
                   `${item.city || ''}${item.state ? `, ${item.state}` : ''}`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">
                  {item.startDate}
                  {item.startDate && (item.currentlyWorking ? " - Present" : item.endDate ? ` - ${item.endDate}` : "")}
                </div>
              </div>
            </div>
            {item.workSummary && (
              <div 
                className="text-gray-700 text-sm leading-relaxed ml-0"
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
    <Section title="EDUCATION" themeColor={resumeData?.themeColor} sectionKey="education">
      <div className="space-y-4">
        {resumeData.education.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-900">
                {item.degree}
                {item.degree && item.major ? ` in ${item.major}` : ''}
              </h4>
              <p 
                className="font-medium"
                style={{ color: resumeData?.themeColor || '#2563eb' }}
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
                <div className="text-gray-600">
                  {item.gradeType}: {item.grade}
                </div>
              )}
            </div>
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
    <Section title="Skills" themeColor={resumeData?.themeColor} sectionKey="skills">
      <div className="grid grid-cols-3 gap-4">
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="text-center">
            <div 
              className="px-3 py-2 rounded border font-medium text-sm"
              style={{ 
                borderColor: resumeData?.themeColor || '#2563eb',
                color: resumeData?.themeColor || '#2563eb'
              }}
            >
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Projects = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.projects || resumeData.projects.length === 0) return null;

  return (
    <Section title="KEY PROJECTS" themeColor={resumeData?.themeColor} sectionKey="projects">
      <div className="space-y-4">
        {resumeData.projects.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-gray-900">{project.projectName}</h4>
              {(project.startDate || project.endDate) && (
                <div className="text-sm text-gray-600">
                  {project.startDate}
                  {project.startDate && project.endDate && ` - ${project.endDate}`}
                </div>
              )}
            </div>
            {project.techStack && (
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Technologies:</span> {project.techStack.split(',').join(' • ')}
              </p>
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

const CorporateTemplate = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Get custom sections from resume data
  const customSections = resumeData?.sectionSettings?.customSections || [];

  // Split custom sections between left and right columns
  // If section has a 'column' property, use it, otherwise alternate based on index
  const leftColumnSections = customSections.filter((section, index) => 
    section.column === 'left' || (!section.column && index % 2 === 0)
  );
  
  const rightColumnSections = customSections.filter((section, index) => 
    section.column === 'right' || (!section.column && index % 2 === 1)
  );

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 min-h-screen text-sm">
      <Header />
      <Summary />
      <Experience />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Education />
          <Projects />
          
          {/* Render custom sections for left column */}
          {leftColumnSections
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((section) => (
              <CustomSection key={section.id} sectionData={section} />
            ))}
        </div>
        <div>
          <Skills />
          
          {/* Render custom sections for right column */}
          {rightColumnSections
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((section) => (
              <CustomSection key={section.id} sectionData={section} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CorporateTemplate;