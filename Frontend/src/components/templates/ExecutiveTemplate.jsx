import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div 
      className="text-white p-4 mb-4"
      style={{ backgroundColor: resumeData?.themeColor || '#1f2937' }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-1">
          {resumeData?.firstName} {resumeData?.lastName}
        </h1>
        <p className="text-xl opacity-90 mb-3">{resumeData?.jobTitle}</p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm opacity-85">
          {resumeData?.address && <span>📍 {resumeData.address}</span>}
          {resumeData?.phone && (
            <span>📞 <a href={`tel:${resumeData.phone}`} className="hover:opacity-100">{resumeData.phone}</a></span>
          )}
          {resumeData?.email && (
            <span>✉️ <a href={`mailto:${resumeData.email}`} className="hover:opacity-100">{resumeData.email}</a></span>
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
                className="px-3 py-1 bg-white/20 rounded-full text-xs hover:bg-white/30 transition-colors"
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
                className="px-3 py-1 bg-white/20 rounded-full text-xs hover:bg-white/30 transition-colors"
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

const Section = ({ title, children, themeColor, accent = false, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <div className="mb-5">
      <div className="flex items-center mb-3">
        {accent && (
          <div 
            className="w-1 h-6 mr-3"
            style={{ backgroundColor: themeColor || '#1f2937' }}
          />
        )}
        <h2 
          className="text-lg font-bold uppercase tracking-wide flex items-center"
          style={{ color: themeColor || '#1f2937' }}
        >
          <span>{sectionTitle}</span>
          <div className="ml-2">
            <SectionOptionsMenu sectionKey={sectionKey} />
          </div>
        </h2>
        <div 
          className="flex-1 h-px ml-3"
          style={{ backgroundColor: themeColor || '#1f2937', opacity: 0.3 }}
        />
      </div>
      {children}
    </div>
  );
};

const Summary = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.summary) return null;

  return (
    <Section title="Professional Summary" themeColor={resumeData?.themeColor} accent sectionKey="summary">
      <p className="text-gray-800 leading-relaxed text-justify italic font-medium">
        "{resumeData.summary}"
      </p>
    </Section>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <Section title="Professional Experience" themeColor={resumeData?.themeColor} accent sectionKey="experience">
      <div className="space-y-5">
        {resumeData.experience.map((item, index) => (
          <div key={index} className="border-l-2 border-gray-200 pl-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p 
                  className="font-semibold text-base"
                  style={{ color: resumeData?.themeColor || '#1f2937' }}
                >
                  {item.companyName}
                </p>
                <p className="text-sm text-gray-600">
                  {item.workMode !== 'remote' && item.city && `${item.city}`}
                  {item.workMode !== 'remote' && item.state && `, ${item.state}`}
                  {item.workMode === 'remote' && 'Remote Position'}
                  {item.workMode === 'hybrid' && ' (Hybrid Work Model)'}
                </p>
              </div>
              <div className="text-right">
                <div 
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: resumeData?.themeColor || '#1f2937' }}
                >
                  {item.startDate}
                  {item.startDate && (item.currentlyWorking ? " - Present" : item.endDate ? ` - ${item.endDate}` : "")}
                </div>
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
    <Section title="Education" themeColor={resumeData?.themeColor} sectionKey="education">
      <div className="space-y-4">
        {resumeData.education.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-900">{item.universityName}</h3>
              <p className="text-gray-700 font-medium">
                {item.degree}
                {item.degree && item.major ? ` in ${item.major}` : ''}
              </p>
              <p className="text-sm text-gray-600">{item.city && `${item.city}, `}{item.state}</p>
            </div>
            <div className="text-right text-sm">
              <div className="text-gray-600">
                {item.startDate}
                {item.startDate && item.endDate ? ` - ${item.endDate}` : ''}
              </div>
              {item.grade && (
                <div 
                  className="font-semibold"
                  style={{ color: resumeData?.themeColor || '#1f2937' }}
                >
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

const Projects = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.projects || resumeData.projects.length === 0) return null;

  return (
    <Section title="Key Projects" themeColor={resumeData?.themeColor} sectionKey="projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {resumeData.projects.map((project, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: resumeData?.themeColor || '#1f2937' }}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">{project.projectName}</h3>
              {(project.startDate || project.endDate) && (
                <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  {project.startDate}
                  {project.startDate && project.endDate && ` - ${project.endDate}`}
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-1">{project.role || 'Lead Developer'}</p>
            {project.techStack && (
              <div className="mb-2">
                <span className="text-xs font-semibold text-gray-600">Technologies: </span>
                <span className="text-xs text-gray-700">{project.techStack.split(',').join(' • ')}</span>
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

const Skills = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.skills || resumeData.skills.length === 0) return null;

  return (
    <Section title="Skills" themeColor={resumeData?.themeColor} sectionKey="skills">
      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill, index) => (
          <span 
            key={index} 
            className="px-2 py-1 text-xs rounded border"
            style={{ 
              borderColor: resumeData?.themeColor || '#1f2937',
              color: resumeData?.themeColor || '#1f2937'
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </Section>
  );
};

const ExecutiveTemplate = () => {
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
    <div className="max-w-5xl mx-auto bg-white min-h-screen text-sm leading-relaxed">
      <Header />
      <div className="px-6 pb-6">
        <Summary />
        <Experience />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Projects />
            
            {/* Render custom sections */}
            {mainContentSections.map((section) => (
              <CustomSection key={section.id} sectionData={section} />
            ))}
          </div>
          <div>
            <Education />
            <Skills />
            
            {/* Render custom sections */}
            {sidebarSections.map((section) => (
              <CustomSection key={section.id} sectionData={section} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;