import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div 
      className="text-white p-3 rounded-lg mb-2"
      style={{ background: `linear-gradient(135deg, ${resumeData?.themeColor || '#3B82F6'}, ${resumeData?.themeColor ? resumeData.themeColor + '80' : '#8B5CF6'})` }}
    >
      <div className="text-center">
        <h1 className="text-xl font-bold">
          {resumeData?.firstName} {resumeData?.lastName}
        </h1>
        <p className="text-base text-blue-100">{resumeData?.jobTitle}</p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs">
          {resumeData?.email && (
            <div className="flex items-center gap-1">
              <span>✉️</span>
              <a 
                href={`mailto:${resumeData.email}`} 
                className="hover:underline cursor-pointer"
              >
                {resumeData.email}
              </a>
            </div>
          )}
          {resumeData?.phone && (
            <div className="flex items-center gap-1">
              <span>📞</span>
              <a 
                href={`tel:${resumeData.phone}`} 
                className="hover:underline cursor-pointer"
              >
                {resumeData.phone}
              </a>
            </div>
          )}
          {resumeData?.address && (
            <div className="flex items-center gap-1">
              <span>📍</span>
              <span>{resumeData.address}</span>
            </div>
          )}
        </div>

        {/* Profile Links */}
        {(resumeData?.competitiveProgrammingLink || resumeData?.otherLink) && (
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {resumeData?.competitiveProgrammingLink && resumeData?.competitiveProgrammingPlatform && (
              <a 
                href={resumeData.competitiveProgrammingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-white/20 text-white rounded-full text-xs hover:bg-white/30 transition-colors"
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
                className="px-3 py-1 bg-white/20 text-white rounded-full text-xs hover:bg-white/30 transition-colors"
              >
                {resumeData.otherProfilePlatform === 'portfolio' && 'Portfolio'}
                {resumeData.otherProfilePlatform === 'github' && 'GitHub'}
                {resumeData.otherProfilePlatform === 'linkedin' && 'LinkedIn'}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, children, className, themeColor, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <div className={`bg-white rounded-lg shadow-md p-3 ${className}`}>
      <h2 
        className="text-sm font-bold mb-2 border-b pb-1 flex items-center justify-between"
        style={{ color: '#374151', borderColor: themeColor }}
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
    <Card title="Summary" themeColor={resumeData?.themeColor} sectionKey="summary">
      <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
    </Card>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <Card title="Experience" themeColor={resumeData?.themeColor} sectionKey="experience">
      <div className="space-y-6">
        {resumeData.experience.map((item, index) => (
          <div 
            key={index} 
            className="border-l-4 pl-4"
            style={{ borderColor: `${resumeData?.themeColor}40` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p 
                  className="font-medium"
                  style={{ color: resumeData?.themeColor }}
                >
                  {item.companyName}
                </p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>
                  {item.startDate}
                  {item.startDate && (item.currentlyWorking ? " - Present" : item.endDate ? ` - ${item.endDate}` : "")}
                </div>
                <div>
                  {item.workMode === 'remote' ? 'Remote' : 
                   item.workMode === 'hybrid' ? 'Hybrid' : 
                   (item.workMode !== 'remote' && item.city) ? item.city : ''}
                  {item.workMode !== 'remote' && item.state && `, ${item.state}`}
                </div>
              </div>
            </div>
            {item.workSummary && (
              <div 
                className="mt-2 text-gray-700 text-sm"
                dangerouslySetInnerHTML={{ __html: item.workSummary }}
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

const Education = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.education || resumeData.education.length === 0) return null;

  return (
    <Card title="Education" themeColor={resumeData?.themeColor} sectionKey="education">
      <div className="space-y-4">
        {resumeData.education.map((item, index) => (
          <div key={index}>
            <h3 className="font-bold text-gray-900">
              {item.degree}
              {item.degree && item.major ? ` in ${item.major}` : ''}
            </h3>
            <p className="text-gray-900">
              {item.universityName}
            </p>
            <div className="flex justify-between text-sm text-gray-900">
              <span>
                {item.startDate}
                {item.startDate && item.endDate ? ` - ${item.endDate}` : ''}
              </span>
              {item.grade && (
                <span>{item.gradeType}: {item.grade}</span>
              )}
            </div>
            {item.description && (
              <p className="text-sm text-gray-900 mt-1">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

const Skills = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.skills || resumeData.skills.length === 0) return null;

  return (
    <Card title="Skills" themeColor={resumeData?.themeColor} sectionKey="skills">
      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-900"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </Card>
  );
};

const Projects = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.projects || resumeData.projects.length === 0) return null;

  return (
    <Card title="Projects" themeColor={resumeData?.themeColor} sectionKey="projects">
      <div className="space-y-4">
        {resumeData.projects.map((project, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-bold">{project.projectName}</h3>
              {(project.startDate || project.endDate) && (
                <div className="text-right text-xs text-gray-500">
                  {project.startDate}
                  {project.startDate && project.endDate && ` - ${project.endDate}`}
                </div>
              )}
            </div>
            {project.techStack && (
              <p className="text-gray-600 text-sm mt-1">
                Tech Stack: {project.techStack.split(',').join(' | ')}
              </p>
            )}
            {project.projectSummary && (
              <div 
                className="text-gray-700 text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: project.projectSummary }}
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

const DittoTemplate = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Get custom sections from resume data
  const customSections = resumeData?.sectionSettings?.customSections || [];

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-2">
            <Summary />
            <Experience />
            <Projects />
            
            {/* Render custom sections */}
            {customSections
              .filter(section => !section.sidebar)
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((section) => (
                <CustomSection key={section.id} sectionData={section} />
              ))}
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            <Education />
            <Skills />
            
            {/* Render custom sections */}
            {customSections
              .filter(section => section.sidebar)
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

export default DittoTemplate;