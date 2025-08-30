import React from 'react';
import { useSelector } from 'react-redux';
import SectionOptionsMenu from '@/components/custom/SectionOptionsMenu';
import CustomSection from '@/components/custom/CustomSection';

const Header = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  return (
    <div 
      className="text-gray-900 p-3 rounded-t-lg"
      style={{ backgroundColor: resumeData?.themeColor || '#FBBF24' }}
    >
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900">
          {resumeData?.firstName} {resumeData?.lastName}
        </h1>
        <p className="text-base text-gray-800 mt-1">{resumeData?.jobTitle}</p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {resumeData?.email && (
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded">
              <span>✉️</span>
              <a 
                href={`mailto:${resumeData.email}`} 
                className="text-sm hover:underline cursor-pointer"
              >
                {resumeData.email}
              </a>
            </div>
          )}
          {resumeData?.phone && (
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded">
              <span>📞</span>
              <a 
                href={`tel:${resumeData.phone}`} 
                className="text-sm hover:underline cursor-pointer"
              >
                {resumeData.phone}
              </a>
            </div>
          )}
          {resumeData?.address && (
            <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded">
              <span>📍</span>
              <span className="text-sm">{resumeData.address}</span>
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
                className="px-3 py-1 bg-white/30 text-gray-900 rounded-full text-xs hover:bg-white/40 transition-colors font-medium"
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
                className="px-3 py-1 bg-white/30 text-gray-900 rounded-full text-xs hover:bg-white/40 transition-colors font-medium"
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

const Section = ({ title, children, bgColor = "bg-white", themeColor, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <div className={`${bgColor} p-2 mb-2 rounded-lg shadow-sm`}>
      <h2 
        className="text-sm font-bold text-gray-900 mb-2 border-b pb-1 flex items-center justify-between"
        style={{ borderColor: themeColor }}
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

const SkillRating = ({ level, themeColor }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="text-lg"
          style={{ color: star <= level ? themeColor : '#D1D5DB' }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
};

const Summary = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.summary) return null;

  return (
    <Section 
      title="Summary" 
      bgColor="bg-yellow-50" 
      themeColor={resumeData?.themeColor}
      sectionKey="summary"
    >
      <p className="text-gray-700 leading-relaxed text-center italic">
        "{resumeData.summary}"
      </p>
    </Section>
  );
};

const Experience = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);

  if (!resumeData?.experience || resumeData.experience.length === 0) return null;

  return (
    <Section title="Experience" themeColor={resumeData?.themeColor} sectionKey="experience">
      <div className="space-y-6">
        {resumeData.experience.map((item, index) => (
          <div 
            key={index} 
            className="border-l-4 pl-6 relative"
            style={{ borderColor: resumeData?.themeColor }}
          >
            <div 
              className="absolute -left-2 top-0 w-4 h-4 rounded-full"
              style={{ backgroundColor: resumeData?.themeColor }}
            ></div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p 
                  className="font-semibold"
                  style={{ color: resumeData?.themeColor }}
                >
                  {item.companyName}
                </p>
              </div>
              <div className="text-right text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
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
                className="mt-3 text-gray-700 text-sm leading-relaxed"
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
    <Section title="Education" bgColor="bg-blue-50" themeColor={resumeData?.themeColor} sectionKey="education">
      <div className="space-y-4">
        {resumeData.education.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900">
                  {item.degree}
                  {item.degree && item.major ? ` in ${item.major}` : ''}
                </h3>
                <p 
                  className="font-semibold"
                  style={{ color: resumeData?.themeColor }}
                >
                  {item.universityName}
                </p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div className="bg-blue-100 px-2 py-1 rounded">
                  {item.startDate}
                  {item.startDate && item.endDate ? ` - ${item.endDate}` : ''}
                </div>
                {item.grade && (
                  <div className="mt-1">{item.gradeType}: {item.grade}</div>
                )}
              </div>
            </div>
            {item.description && (
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
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
    <Section title="Skills" bgColor="bg-green-50" themeColor={resumeData?.themeColor} sectionKey="skills">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resumeData.skills.map((skill, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-200"
          >
            <span className="font-medium text-gray-800">{skill.name}</span>
            {skill.rating && (
              <SkillRating level={skill.rating} themeColor={resumeData?.themeColor} />
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
    <Section title="Projects" bgColor="bg-purple-50" themeColor={resumeData?.themeColor} sectionKey="projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumeData.projects.map((project, index) => (
          <div key={index} className="bg-white border-2 border-purple-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-900">{project.projectName}</h3>
              {(project.startDate || project.endDate) && (
                <div className="text-right text-xs text-gray-500 bg-purple-100 px-2 py-1 rounded">
                  {project.startDate}
                  {project.startDate && project.endDate && ` - ${project.endDate}`}
                </div>
              )}
            </div>
            {project.techStack && (
              <p className="text-gray-600 text-sm mb-2">
                Tech: {project.techStack.split(',').join(', ')}
              </p>
            )}
            {project.projectSummary && (
              <div 
                className="text-gray-700 text-sm mb-3"
                dangerouslySetInnerHTML={{ __html: project.projectSummary }}
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};

const PikachuTemplate = () => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Get custom sections from resume data
  const customSections = resumeData?.sectionSettings?.customSections || [];

  return (
    <div 
      className="min-h-screen p-3"
      style={{ background: `linear-gradient(135deg, ${resumeData?.themeColor ? resumeData.themeColor + '20' : '#FEF3C7'}, ${resumeData?.themeColor ? resumeData.themeColor + '10' : '#FDBA74'})` }}
    >
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <Header />
        
        <div className="p-2 space-y-2">
          <Summary />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="space-y-2">
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
    </div>
  );
};

export default PikachuTemplate;