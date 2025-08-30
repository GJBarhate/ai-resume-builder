import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div className="text-center border-b border-gray-300 pb-1 mb-2">
      <h1 className="text-xl font-bold text-gray-900 mb-0.5">
        {resumeData?.firstName} {resumeData?.lastName}
      </h1>
      <p className="text-sm text-gray-600 mb-1">{resumeData?.jobTitle}</p>
      
      <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600">
        {resumeData?.email && (
          <a 
            href={`mailto:${resumeData.email}`} 
            className="hover:text-blue-600 cursor-pointer"
          >
            📧 {resumeData.email}
          </a>
        )}
        {resumeData?.phone && (
          <a 
            href={`tel:${resumeData.phone}`} 
            className="hover:text-blue-600 cursor-pointer"
          >
            📞 {resumeData.phone}
          </a>
        )}
        {resumeData?.address && <span>📍 {resumeData.address}</span>}
      </div>

      {/* Profile Links */}
      {(resumeData?.competitiveProgrammingLink || resumeData?.otherLink) && (
        <div className="flex justify-center gap-1 mt-1">
          {resumeData?.competitiveProgrammingLink && resumeData?.competitiveProgrammingPlatform && (
            <a 
              href={resumeData.competitiveProgrammingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors"
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
              className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
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

const Section = ({ title, children, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <section className="mb-2 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-gray-800 mb-1 uppercase tracking-wide border-b border-gray-400 pb-0.5 flex-1">
          {sectionTitle}
        </h2>
        <div className="ml-2">
          <SectionOptionsMenu sectionKey={sectionKey} />
        </div>
      </div>
      {children}
    </section>
  );
};

const Summary = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.summary) return null;

  return (
    <Section title="Summary" sectionKey="summary">
      <p className="text-gray-700 leading-tight text-justify text-xs">{resumeData.summary}</p>
    </Section>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <Section title="Professional Experience" sectionKey="experience">
      <div className="space-y-1.5">
        {resumeData.experience.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-0.5">
              <div>
                <h3 className="text-xs font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-700 font-medium text-xs">
                  {item.companyName}
                  {item.workMode === 'remote' ? ' (Remote)' : 
                   item.workMode === 'hybrid' ? ' (Hybrid)' : ''}
                  {item.workMode !== 'remote' && item.city && `, ${item.city}`}
                  {item.workMode !== 'remote' && item.state && `, ${item.state}`}
                </p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>
                  {item.startDate}
                  {item.startDate && (item.currentlyWorking ? " - Present" : item.endDate ? ` - ${item.endDate}` : "")}
                </div>
              </div>
            </div>
            {item.workSummary && (
              <div 
                className="text-gray-600 text-xs leading-tight mt-0.5"
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
    <Section title="Education" sectionKey="education">
      <div className="space-y-1.5">
        {resumeData.education.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-xs text-gray-900">
                  {item.universityName}
                </h3>
                <p className="text-gray-700 text-xs">
                  {item.degree}
                  {item.degree && item.major ? ` in ${item.major}` : ''}
                </p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <div>
                  {item.startDate}
                  {item.startDate && item.endDate ? ` - ${item.endDate}` : ''}
                </div>
                {item.grade && (
                  <div>{item.gradeType}: {item.grade}</div>
                )}
              </div>
            </div>
            {item.description && (
              <p className="text-gray-600 text-xs mt-1">{item.description}</p>
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
    <Section title="Skills" sectionKey="skills">
      <div className="grid grid-cols-3 gap-2">
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-gray-800 text-xs">{skill.name}</span>
            {skill.rating && (
              <div className="h-1.5 bg-gray-200 w-[35%] rounded">
                <div
                  className="h-1.5 rounded bg-gray-600"
                  style={{
                    width: `${skill.rating * 20}%`,
                  }}
                />
              </div>
            )}
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
    <Section title="Projects" sectionKey="projects">
      <div className="space-y-1.5">
        {resumeData.projects.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-0.5">
              <h3 className="font-semibold text-xs text-gray-900">
                {project.projectName}
              </h3>
              {(project.startDate || project.endDate) && (
                <div className="text-right text-xs text-gray-500">
                  {project.startDate}
                  {project.startDate && project.endDate && ` - ${project.endDate}`}
                </div>
              )}
            </div>
            {project.techStack && (
              <p className="text-gray-600 text-xs">
                Tech Stack: {project.techStack.split(',').join(' | ')}
              </p>
            )}
            {project.projectSummary && (
              <div 
                className="text-gray-600 text-xs mt-0.5 leading-tight"
                dangerouslySetInnerHTML={{ __html: project.projectSummary }}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

const DefaultTemplate = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Get custom sections from resume data
  const customSections = resumeData?.sectionSettings?.customSections || [];

  return (
    <div className="max-w-4xl mx-auto p-2 bg-white min-h-screen text-xs leading-tight">
      <Header />
      
      <div className="space-y-0.5">
        <Summary />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        
        {/* Render custom sections */}
        {customSections
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((section) => (
            <CustomSection key={section.id} sectionData={section} />
          ))}
      </div>
    </div>
  );
};

export default DefaultTemplate;