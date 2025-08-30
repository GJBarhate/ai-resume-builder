import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div className="border-b border-gray-300 pb-1.5 mb-2">
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          {resumeData?.firstName} {resumeData?.lastName}
        </h1>
        <p className="text-sm text-gray-700 mt-0.5">{resumeData?.jobTitle}</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-2 mt-1 text-xs text-gray-600">
        {resumeData?.address && <span>{resumeData.address}</span>}
        {resumeData?.phone && (
          <span><a href={`tel:${resumeData.phone}`} className="hover:text-gray-900">{resumeData.phone}</a></span>
        )}
        {resumeData?.email && (
          <span><a href={`mailto:${resumeData.email}`} className="hover:text-gray-900">{resumeData.email}</a></span>
        )}
        {resumeData?.competitiveProgrammingLink && resumeData?.competitiveProgrammingPlatform && (
          <span><a href={resumeData.competitiveProgrammingLink} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            {resumeData.competitiveProgrammingPlatform === 'leetcode' && 'LeetCode'}
            {resumeData.competitiveProgrammingPlatform === 'codeforces' && 'Codeforces'}
            {resumeData.competitiveProgrammingPlatform === 'codechef' && 'CodeChef'}
          </a></span>
        )}
        {resumeData?.otherLink && resumeData?.otherProfilePlatform && (
          <span><a href={resumeData.otherLink} target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
            {resumeData.otherProfilePlatform === 'portfolio' && 'Portfolio'}
            {resumeData.otherProfilePlatform === 'github' && 'GitHub'}
            {resumeData.otherProfilePlatform === 'linkedin' && 'LinkedIn'}
          </a></span>
        )}
      </div>
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
    <div className="mb-1.5">
      <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-0.5 mb-1 flex items-center justify-between">
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
    <Section title="Summary" sectionKey="summary">
      <p className="text-gray-800 leading-tight text-justify text-xs">{resumeData.summary}</p>
    </Section>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <Section title="Experience" sectionKey="experience">
      <div className="space-y-1.5">
        {resumeData.experience.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline mb-0.5">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 inline text-xs">{item.title}</h3>
                <span className="text-gray-700 ml-1 text-xs">— {item.companyName}</span>
                {(item.city || item.workMode) && (
                  <span className="text-xs text-gray-600 ml-1">
                    {item.workMode === 'remote' ? '(Remote)' : 
                     item.workMode === 'hybrid' ? '(Hybrid)' : 
                     (item.city && `(${item.city}${item.state ? `, ${item.state}` : ''})`)}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-600 text-right ml-2">
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
    <Section title="Education" sectionKey="education">
      <div className="space-y-3">
        {resumeData.education.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline">
              <div>
                <h3 className="font-bold text-gray-900 inline">{item.universityName}</h3>
                <span className="text-gray-700 ml-2">
                  — {item.degree}
                  {item.degree && item.major ? ` in ${item.major}` : ''}
                </span>
                {(item.city || item.state) && (
                  <span className="text-sm text-gray-600 ml-2">
                    ({item.city}{item.state ? `, ${item.state}` : ''})
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600 text-right">
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
              <p className="text-gray-700 text-sm mt-1 ml-4">{item.description}</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumeData.projects.map((project, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-900">{project.projectName}</h3>
              {(project.startDate || project.endDate) && (
                <div className="text-xs text-gray-600 text-right ml-2">
                  {project.startDate}
                  {project.startDate && project.endDate && ` - ${project.endDate}`}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-700 font-medium">{project.role || 'Developer'}</p>
            {project.techStack && (
              <p className="text-xs text-gray-600 mb-1">
                <span className="font-medium">Tech:</span> {project.techStack.split(',').join(', ')}
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

const Skills = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.skills || resumeData.skills.length === 0) return null;

  return (
    <Section title="Skills" sectionKey="skills">
      <div className="text-sm text-gray-700 leading-relaxed">
        {resumeData.skills.map(skill => skill.name).join(', ')}
      </div>
    </Section>
  );
};

const Certifications = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  // Check if certifications exist in resumeData (if implemented in your data structure)
  const certifications = resumeData?.certifications || [];

  if (!certifications || certifications.length === 0) return null;

  return (
    <Section title="Certifications" sectionKey="certifications">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {certifications.map((cert, index) => (
          <div key={index} className="flex justify-between items-baseline">
            <div>
              <h4 className="font-bold text-gray-900 text-sm">{cert.name}</h4>
              <p className="text-sm text-gray-700">{cert.issuer}</p>
            </div>
            <div className="text-sm text-gray-600 ml-4">{cert.year}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const MinimalTemplate = () => {
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
    <div className="max-w-5xl mx-auto p-2 bg-white min-h-screen text-xs leading-tight">
      <Header />
      <Summary />
      <Experience />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="lg:col-span-2">
          <Projects />
          
          {/* Render custom sections for main content */}
          {mainContentSections.map((section) => (
            <CustomSection key={section.id} sectionData={section} />
          ))}
        </div>
        <div>
          <Education />
          <Skills />
          <Certifications />
          
          {/* Render custom sections for sidebar */}
          {sidebarSections.map((section) => (
            <CustomSection key={section.id} sectionData={section} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;