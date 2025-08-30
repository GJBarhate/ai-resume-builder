import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div className="bg-white border-b-4 pb-4 mb-4" style={{ borderColor: resumeData?.themeColor || '#0f766e' }}>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {resumeData?.firstName} {resumeData?.lastName}
          </h1>
          <h2 
            className="text-xl font-medium mb-3"
            style={{ color: resumeData?.themeColor || '#0f766e' }}
          >
            {resumeData?.jobTitle}
          </h2>
        </div>
        
        <div className="text-right space-y-1">
          {resumeData?.email && (
            <div className="flex items-center justify-end gap-2 text-sm">
              <span className="font-medium text-gray-600">Email:</span>
              <a 
                href={`mailto:${resumeData.email}`} 
                className="text-blue-600 hover:underline"
              >
                {resumeData.email}
              </a>
            </div>
          )}
          {resumeData?.phone && (
            <div className="flex items-center justify-end gap-2 text-sm">
              <span className="font-medium text-gray-600">Phone:</span>
              <a 
                href={`tel:${resumeData.phone}`} 
                className="text-blue-600 hover:underline"
              >
                {resumeData.phone}
              </a>
            </div>
          )}
          {resumeData?.address && (
            <div className="flex items-center justify-end gap-2 text-sm">
              <span className="font-medium text-gray-600">Location:</span>
              <span className="text-gray-800">{resumeData.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Profile Links */}
      {(resumeData?.competitiveProgrammingLink || resumeData?.otherLink) && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex gap-6">
            {resumeData?.competitiveProgrammingLink && resumeData?.competitiveProgrammingPlatform && (
              <a 
                href={resumeData.competitiveProgrammingLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                {resumeData.competitiveProgrammingPlatform === 'leetcode' && '🔗 LeetCode Profile'}
                {resumeData.competitiveProgrammingPlatform === 'codeforces' && '🔗 Codeforces Profile'}
                {resumeData.competitiveProgrammingPlatform === 'codechef' && '🔗 CodeChef Profile'}
              </a>
            )}
            {resumeData?.otherLink && resumeData?.otherProfilePlatform && (
              <a 
                href={resumeData.otherLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                {resumeData.otherProfilePlatform === 'portfolio' && '🌐 Portfolio Website'}
                {resumeData.otherProfilePlatform === 'github' && '📚 GitHub Repository'}
                {resumeData.otherProfilePlatform === 'linkedin' && '💼 LinkedIn Profile'}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Section = ({ title, children, themeColor, number, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3"
          style={{ backgroundColor: themeColor || '#0f766e' }}
        >
          {number}
        </div>
        <h3 
          className="text-lg font-bold uppercase tracking-wide"
          style={{ color: themeColor || '#0f766e' }}
        >
          {sectionTitle}
        </h3>
        <div className="ml-2">
          <SectionOptionsMenu sectionKey={sectionKey} />
        </div>
        <div 
          className="flex-1 h-px ml-4"
          style={{ backgroundColor: themeColor || '#0f766e' }}
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
    <Section title="Executive Summary" themeColor={resumeData?.themeColor} number="01" sectionKey="summary">
      <div className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: resumeData?.themeColor || '#0f766e' }}>
        <p className="text-gray-800 leading-relaxed text-justify font-medium">
          {resumeData.summary}
        </p>
      </div>
    </Section>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <Section title="Professional Experience" themeColor={resumeData?.themeColor} number="02" sectionKey="experience">
      <div className="space-y-6">
        {resumeData.experience.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                <h5 
                  className="text-base font-semibold mb-1"
                  style={{ color: resumeData?.themeColor || '#0f766e' }}
                >
                  {item.companyName}
                </h5>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>
                    📅 {item.startDate}
                    {item.startDate && (item.currentlyWorking ? " - Present" : item.endDate ? ` - ${item.endDate}` : "")}
                  </span>
                  <span>
                    📍 {item.workMode === 'remote' ? 'Remote Work' : 
                        item.workMode === 'hybrid' ? `Hybrid - ${item.city || ''}${item.state ? `, ${item.state}` : ''}` : 
                        `${item.city || ''}${item.state ? `, ${item.state}` : ''}`}
                  </span>
                </div>
              </div>
            </div>
            {item.workSummary && (
              <div 
                className="text-gray-700 text-sm leading-relaxed bg-white p-3 rounded border-l-2"
                style={{ borderColor: resumeData?.themeColor || '#0f766e' }}
                dangerouslySetInnerHTML={{ __html: item.workSummary }}
              />
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
    <Section title="Engineering Projects" themeColor={resumeData?.themeColor} number="03" sectionKey="projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumeData.projects.map((project, index) => (
          <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-gray-900 text-base">{project.projectName}</h4>
              {(project.startDate || project.endDate) && (
                <div 
                  className="text-xs px-2 py-1 rounded text-white"
                  style={{ backgroundColor: resumeData?.themeColor || '#0f766e' }}
                >
                  {project.startDate}
                  {project.startDate && project.endDate && ` - ${project.endDate}`}
                </div>
              )}
            </div>
            
            {project.techStack && (
              <div className="mb-3">
                <h5 className="text-xs font-bold text-gray-600 mb-1">TECHNOLOGIES USED:</h5>
                <div className="flex flex-wrap gap-1">
                  {project.techStack.split(',').map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded border"
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

const Education = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.education || resumeData.education.length === 0) return null;

  return (
    <Section title="Education & Qualifications" themeColor={resumeData?.themeColor} number="04" sectionKey="education">
      <div className="space-y-4">
        {resumeData.education.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-base">
                  {item.degree}
                  {item.degree && item.major ? ` in ${item.major}` : ''}
                </h4>
                <p 
                  className="font-semibold text-sm"
                  style={{ color: resumeData?.themeColor || '#0f766e' }}
                >
                  {item.universityName}
                </p>
                <p className="text-sm text-gray-600">
                  📍 {item.city && `${item.city}, `}{item.state}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-700">
                  📅 {item.startDate}
                  {item.startDate && item.endDate ? ` - ${item.endDate}` : ''}
                </div>
                {item.grade && (
                  <div 
                    className="text-sm font-bold mt-1"
                    style={{ color: resumeData?.themeColor || '#0f766e' }}
                  >
                    {item.gradeType}: {item.grade}
                  </div>
                )}
              </div>
            </div>
            {item.description && (
              <p className="text-sm text-gray-600 mt-2 italic">{item.description}</p>
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
    <Section title="Skills" themeColor={resumeData?.themeColor} number="05" sectionKey="skills">
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="grid grid-cols-3 gap-2">
          {resumeData.skills.map((skill, index) => (
            <div 
              key={index} 
              className="text-center p-2 border rounded"
              style={{ borderColor: resumeData?.themeColor || '#0f766e' }}
            >
              <span className="text-sm text-gray-800">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const EngineerTemplate = () => {
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
    <div className="max-w-5xl mx-auto bg-white p-6 min-h-screen text-sm">
      <Header />
      <Summary />
      <Experience />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Projects />
          
          {/* Render custom sections for left column */}
          {leftColumnSections
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((section) => (
              <CustomSection key={section.id} sectionData={section} />
            ))}
        </div>
        <div>
          <Education />
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

export default EngineerTemplate;