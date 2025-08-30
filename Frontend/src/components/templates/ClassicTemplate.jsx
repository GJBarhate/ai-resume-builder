import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div className="text-center border-b border-gray-800 pb-1.5 mb-2">
      <h1 className="text-xl font-bold text-gray-900 mb-0.5">
        {resumeData?.firstName} {resumeData?.lastName}
      </h1>
      <p className="text-sm text-gray-700 mb-1">{resumeData?.jobTitle}</p>
      
      <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-600">
        {resumeData?.address && <span>📍 {resumeData.address}</span>}
        {resumeData?.phone && (
          <span>📞 <a href={`tel:${resumeData.phone}`} className="hover:text-blue-600">{resumeData.phone}</a></span>
        )}
        {resumeData?.email && (
          <span>✉️ <a href={`mailto:${resumeData.email}`} className="hover:text-blue-600">{resumeData.email}</a></span>
        )}
        {resumeData?.competitiveProgrammingLink && resumeData?.competitiveProgrammingPlatform && (
          <span>🌐 <a href={resumeData.competitiveProgrammingLink} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            {resumeData.competitiveProgrammingPlatform === 'leetcode' && 'LeetCode'}
            {resumeData.competitiveProgrammingPlatform === 'codeforces' && 'Codeforces'}
            {resumeData.competitiveProgrammingPlatform === 'codechef' && 'CodeChef'}
          </a></span>
        )}
        {resumeData?.otherLink && resumeData?.otherProfilePlatform && (
          <span>🔗 <a href={resumeData.otherLink} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            {resumeData.otherProfilePlatform === 'portfolio' && 'Portfolio'}
            {resumeData.otherProfilePlatform === 'github' && 'GitHub'}
            {resumeData.otherProfilePlatform === 'linkedin' && 'LinkedIn'}
          </a></span>
        )}
      </div>
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
      <h2 
        className="text-sm font-bold uppercase tracking-wide border-b pb-0.5 mb-1 flex items-center justify-between"
        style={{ color: themeColor || '#000', borderColor: themeColor || '#000' }}
      >
        <span>{sectionTitle}</span>
        <div className="ml-2">
          <SectionOptionsMenu sectionKey={sectionKey} />
        </div>
      </h2>
      {children}
    </div>
  );
};

const Summary = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.summary) return null;

  return (
    <Section title="Summary" themeColor={resumeData?.themeColor} sectionKey="summary">
      <p className="text-gray-800 leading-tight text-justify text-xs">{resumeData.summary}</p>
    </Section>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <Section title="Experience" themeColor={resumeData?.themeColor} sectionKey="experience">
      <div className="space-y-1.5">
        {resumeData.experience.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-0.5">
              <div>
                <h3 className="font-bold text-gray-900 text-xs">{item.companyName}</h3>
                <p className="text-gray-700 font-medium text-xs">{item.title}</p>
                <p className="text-xs text-gray-600">
                  {item.workMode !== 'remote' && item.city && `${item.city}`}
                  {item.workMode !== 'remote' && item.state && `, ${item.state}`}
                  {item.workMode === 'remote' && 'Remote'}
                  {item.workMode === 'hybrid' && ' (Hybrid)'}
                </p>
              </div>
              <div className="text-right text-xs text-gray-600">
                {item.startDate}
                {item.startDate && (item.currentlyWorking ? " - Present" : item.endDate ? ` - ${item.endDate}` : "")}
              </div>
            </div>
            {item.workSummary && (
              <div 
                className="text-gray-700 text-xs leading-tight ml-2"
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
    <Section title="Education" themeColor={resumeData?.themeColor} sectionKey="education">
      <div className="space-y-1.5">
        {resumeData.education.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 text-xs">{item.universityName}</h3>
                <p className="text-gray-700 text-xs">
                  {item.degree}
                  {item.degree && item.major ? ` in ${item.major}` : ''}
                </p>
                <p className="text-xs text-gray-600">{item.city && `${item.city}, `}{item.state}</p>
              </div>
              <div className="text-right text-xs text-gray-600">
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
              <p className="text-gray-700 text-xs mt-0.5">{item.description}</p>
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
    <Section title="Projects" themeColor={resumeData?.themeColor} sectionKey="projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {resumeData.projects.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between items-start mb-0.5">
              <h3 className="font-bold text-gray-900 text-xs">{project.projectName}</h3>
              {(project.startDate || project.endDate) && (
                <div className="text-xs text-gray-600">
                  {project.startDate}
                  {project.startDate && project.endDate && ` - ${project.endDate}`}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-700 font-medium">{project.role || 'Developer'}</p>
            {project.techStack && (
              <p className="text-xs text-gray-600 mb-0.5">
                {project.techStack.split(',').join(' • ')}
              </p>
            )}
            {project.projectSummary && (
              <div 
                className="text-gray-700 text-xs leading-tight"
                dangerouslySetInnerHTML={{ __html: project.projectSummary }}
              />
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
    <Section title="Skills" themeColor={resumeData?.themeColor} sectionKey="skills">
      <div className="text-xs text-gray-700">
        {resumeData.skills.map(skill => skill.name).join(', ')}
      </div>
    </Section>
  );
};

const ClassicTemplate = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Get custom sections from resume data
  const customSections = resumeData?.sectionSettings?.customSections || [];

  // Sort custom sections by order
  const sortedCustomSections = customSections
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="max-w-4xl mx-auto p-2 bg-white min-h-screen text-xs leading-tight">
      <Header />
      
      {/* Render standard sections */}
      <Summary />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      
      {/* Render custom sections */}
      {sortedCustomSections.map((section) => (
        <CustomSection key={section.id} sectionData={section} />
      ))}
    </div>
  );
};

export default ClassicTemplate;