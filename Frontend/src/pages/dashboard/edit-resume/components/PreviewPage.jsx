import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTemplate } from "@/components/templates";
import PersonalDeatailPreview from "./preview-components/PersonalDeatailPreview";
import SummeryPreview from "./preview-components/SummaryPreview";
import ExperiencePreview from "./preview-components/ExperiencePreview";
import EducationalPreview from "./preview-components/EducationalPreview";
import SkillsPreview from "./preview-components/SkillsPreview";
import ProjectPreview from "./preview-components/ProjectPreview";
import { SectionSettingsProvider } from "@/contexts/SectionSettingsContext";

function PreviewPage() {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  useEffect(() => {
    console.log("PreviewPage rendered with resume data:", resumeData);
    console.log("Selected template:", resumeData?.selectedTemplate);
  }, [resumeData]);

  // Get the selected template, fallback to 'default' if not set
  const selectedTemplate = resumeData?.selectedTemplate || 'default';
  
  console.log("Using template:", selectedTemplate);
  
  // If a custom template is selected, use it
  if (selectedTemplate && selectedTemplate !== 'default') {
    try {
      const TemplateComponent = getTemplate(selectedTemplate);
      return (
        <SectionSettingsProvider>
          <div className="shadow-lg h-full">
            <TemplateComponent />
          </div>
        </SectionSettingsProvider>
      );
    } catch (error) {
      console.error("Error loading template:", selectedTemplate, error);
      // Fallback to default if template loading fails
    }
  }

  // Fallback to original preview components (default template)
  return (
    <SectionSettingsProvider>
      <div
        className={`shadow-lg h-full p-14 border-t-[20px]`}
        style={{
          borderColor: resumeData?.themeColor ? resumeData.themeColor : "#000000",
        }}
      >
        <PersonalDeatailPreview resumeInfo={resumeData} />
        {}
        <SummeryPreview resumeInfo={resumeData} />
        {resumeData?.experience && <ExperiencePreview resumeInfo={resumeData} />}
        {resumeData?.projects && <ProjectPreview resumeInfo={resumeData} />}
        {resumeData?.education && <EducationalPreview resumeInfo={resumeData} />}
        {resumeData?.skills && <SkillsPreview resumeInfo={resumeData} />}
      </div>
    </SectionSettingsProvider>
  );
}

export default PreviewPage;