import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div className="text-center pb-1.5 mb-2">
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

const SidebarSection = ({ title, children, themeColor, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <div className="mb-1.5">
      <h3 
        className="font-bold text-xs mb-1 uppercase tracking-wide"
        style={{ color: themeColor || '#000' }}
      >
        {sectionTitle}
        <div className="ml-2 inline-block">
          <SectionOptionsMenu sectionKey={sectionKey} />
        </div>
      </h3>
      {children}
    </div>
  );
};

const MainSection = ({ title, children, themeColor, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <div className="mb-2">
      <h2 
        className="text-sm font-bold uppercase tracking-wide border-b pb-0.5 mb-1"
        style={{ color: themeColor || '#000', borderColor: themeColor || '#000' }}
      >
        {sectionTitle}
        <div className="ml-2 inline-block">
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
    <MainSection title="Summary" themeColor={resumeData?.themeColor} sectionKey="summary">
      <p className="text-gray-800 leading-tight text-justify text-xs">{resumeData.summary}</p>
    </MainSection>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <MainSection title="Experience" themeColor={resumeData?.themeColor} sectionKey="experience">
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
                className="text-gray-700 text-xs leading-tight"
                dangerouslySetInnerHTML={{ __html: item.workSummary }}
              />
            )}
          </div>
        ))}
      </div>
    </MainSection>
  );
};

const Projects = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.projects || resumeData.projects.length === 0) return null;

  return (
    <MainSection title="Projects" themeColor={resumeData?.themeColor} sectionKey="projects">
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
            {project.projectSummary && (
              <div 
                className="text-gray-700 text-xs leading-tight"
                dangerouslySetInnerHTML={{ __html: project.projectSummary }}
              />
            )}
          </div>
        ))}
      </div>
    </MainSection>
  );
};

const Education = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.education || resumeData.education.length === 0) return null;

  return (
    <SidebarSection title="Education" themeColor={resumeData?.themeColor} sectionKey="education">
      <div className="space-y-1.5">
        {resumeData.education.map((item, index) => (
          <div key={index}>
            <h4 className="font-bold text-gray-900 text-xs">{item.universityName}</h4>
            <p className="text-gray-700 text-xs">
              {item.degree}
              {item.degree && item.major ? ` in ${item.major}` : ''}
            </p>
            <p className="text-xs text-gray-600">
              {item.startDate}
              {item.startDate && item.endDate ? ` - ${item.endDate}` : ''}
            </p>
            {item.grade && (
              <p className="text-xs text-gray-600">{item.gradeType}: {item.grade}</p>
            )}
          </div>
        ))}
      </div>
    </SidebarSection>
  );
};

const Skills = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.skills || resumeData.skills.length === 0) return null;

  return (
    <SidebarSection title="Skills" themeColor={resumeData?.themeColor} sectionKey="skills">
      <div className="text-xs text-gray-700 leading-tight">
        {resumeData.skills.map(skill => skill.name).join(', ')}
      </div>
    </SidebarSection>
  );
};

const ProfileLinks = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.competitiveProgrammingLink && !resumeData?.otherLink) return null;

  return (
    <SidebarSection title="Profiles" themeColor={resumeData?.themeColor} sectionKey="profiles">
      <div className="space-y-1">
        {resumeData?.competitiveProgrammingLink && resumeData?.competitiveProgrammingPlatform && (
          <div>
            <p className="text-xs font-semibold text-gray-900">
              {resumeData.competitiveProgrammingPlatform === 'leetcode' && '🔗 LeetCode'}
              {resumeData.competitiveProgrammingPlatform === 'codeforces' && '🔗 Codeforces'}
              {resumeData.competitiveProgrammingPlatform === 'codechef' && '🔗 CodeChef'}
            </p>
            <a 
              href={resumeData.competitiveProgrammingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline break-all"
            >
              {resumeData.competitiveProgrammingLink}
            </a>
          </div>
        )}
        {resumeData?.otherLink && resumeData?.otherProfilePlatform && (
          <div>
            <p className="text-xs font-semibold text-gray-900">
              {resumeData.otherProfilePlatform === 'portfolio' && '🌐 Portfolio'}
              {resumeData.otherProfilePlatform === 'github' && '🐙 GitHub'}
              {resumeData.otherProfilePlatform === 'linkedin' && '💼 LinkedIn'}
            </p>
            <a 
              href={resumeData.otherLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline break-all"
            >
              {resumeData.otherLink}
            </a>
          </div>
        )}
      </div>
    </SidebarSection>
  );
};

const ModernTemplate = () => {
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
    <div className="max-w-5xl mx-auto bg-white min-h-screen text-xs leading-tight">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {/* Sidebar */}
        <div className="lg:col-span-1 bg-gray-50 p-2">
          <Header />
          <Education />
          <Skills />
          <ProfileLinks />
          
          {/* Render custom sections in sidebar */}
          {sidebarSections.map((section) => (
            <CustomSection key={section.id} sectionData={section} />
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 p-2">
          <Summary />
          <Experience />
          <Projects />
          
          {/* Render custom sections in main content */}
          {mainContentSections
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((section) => (
              <CustomSection key={section.id} sectionData={section} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;