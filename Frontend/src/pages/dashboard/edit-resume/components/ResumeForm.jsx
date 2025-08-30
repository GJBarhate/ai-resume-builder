import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import TemplateSelector from "@/components/templates/TemplateSelector";
import { ArrowLeft, ArrowRight, HomeIcon, Download, Plus } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import { templateInfo } from "@/components/templates";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";
import ShareButtons from "@/components/custom/ShareButtons";
import ErrorBoundary from "@/components/custom/ErrorBoundary";
import { SectionSettingsProvider } from "@/contexts/SectionSettingsContext";
import CustomSectionManager from "./CustomSectionManager";

function ResumeForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enanbledNext, setEnabledNext] = useState(true);
  const [enanbledPrev, setEnabledPrev] = useState(true);
  const resumeInfo = useSelector((state) => state.editResume.resumeData);
  const navigate = useNavigate();
  const { resume_id } = useParams();

  useEffect(() => {
    if (currentIndex === 0) {
      setEnabledPrev(false);
    } else {
      setEnabledPrev(true);
    }
    
    if (currentIndex === 8) {
      setEnabledNext(false);
    } else {
      setEnabledNext(true);
    }
  }, [currentIndex]);

  const handleDownload = async () => {
    // Ensure template selection is saved before navigating
    if (resumeInfo?.selectedTemplate && resume_id) {
      try {
        const data = {
          data: {
            selectedTemplate: resumeInfo.selectedTemplate
          }
        };
        await updateThisResume(resume_id, data);
        console.log("Template saved before navigation:", resumeInfo.selectedTemplate);
      } catch (error) {
        console.error("Error saving template before navigation:", error);
      }
    }
    navigate(`/dashboard/view-resume/${resume_id}`);
  };

  const handlePreviewAndDownload = () => {
    window.print();
  };

  // To Add Dummy Data
  // useEffect(() => {
  //   dispatch(addResumeData(data));
  // }, []);

  return (
    <SectionSettingsProvider>
      <div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Link to="/dashboard">
              <Button>
                <HomeIcon />
              </Button>
            </Link>
            <ThemeColor resumeInfo={resumeInfo}/> 
          </div>
          <div className="flex items-center gap-3">
            {currentIndex > 0 && (
              <Button
                size="sm"
                className="text-sm gap-2"
                disabled={!enanbledPrev}
                onClick={() => {
                  setCurrentIndex(currentIndex - 1);
                }}
              >
                <ArrowLeft /> Prev
              </Button>
            )}
            {currentIndex < 8 && (
              <Button
                size="sm"
                className="gap-2"
                disabled={!enanbledNext}
                onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                }}
              >
                Next <ArrowRight className="text-sm" />
              </Button>
            )}
          </div>
        </div>
        {currentIndex === 0 && (
          <PersonalDetails
            resumeInfo={resumeInfo}
            enanbledNext={setEnabledNext}
          />
        )}
        {currentIndex === 1 && (
          <Summary
            resumeInfo={resumeInfo}
            enanbledNext={setEnabledNext}
            enanbledPrev={setEnabledPrev}
          />
        )}
        {currentIndex === 2 && (
          <Experience
            resumeInfo={resumeInfo}
            enanbledNext={setEnabledNext}
            enanbledPrev={setEnabledPrev}
          />
        )}
        {currentIndex === 3 && (
          <Project
            resumeInfo={resumeInfo}
            setEnabledNext={setEnabledNext}
            setEnabledPrev={setEnabledPrev}
          />
        )}
        {currentIndex === 4 && (
          <Education
            resumeInfo={resumeInfo}
            enanbledNext={setEnabledNext}
            enabledPrev={setEnabledPrev}
          />
        )}
        {currentIndex === 5 && (
          <Skills
            resumeInfo={resumeInfo}
            enanbledNext={setEnabledNext}
            enanbledPrev={setEnabledNext}
          />
        )}
        {currentIndex === 6 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Template</h2>
            <p className="text-gray-600 mb-6">Select a professional template that best represents your style</p>
            <TemplateSelector />
          </div>
        )}
        {currentIndex === 7 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Customize Sections</h2>
            <p className="text-gray-600 mb-6">Add, edit, or remove custom sections for your resume</p>
            <CustomSectionManager />
          </div>
        )}
        {currentIndex === 8 && (
          <div className="mt-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="text-green-600 text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Congratulations!
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Your AI-powered resume is ready with the {templateInfo[resumeInfo?.selectedTemplate || 'onix']?.name} template!
              </p>
              <p className="text-gray-500 mb-6">
                You can now download your resume or share it with potential employers.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 justify-center items-center">
              <Button 
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                size="lg"
              >
                <Download className="mr-2" />
                View & Download Resume
              </Button>
              
              <div className="w-full max-w-lg">
                <ErrorBoundary>
                  <ShareButtons 
                    resumeId={resume_id} 
                    resumeTitle={`${resumeInfo?.firstName || 'My'} ${resumeInfo?.lastName || 'Professional'} Resume`}
                  />
                </ErrorBoundary>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Selected Template: <span className="font-semibold text-gray-700">{templateInfo[resumeInfo?.selectedTemplate || 'onix']?.name}</span></p>
              <p className="mt-1">{templateInfo[resumeInfo?.selectedTemplate || 'onix']?.description}</p>
            </div>
          </div>
        )}
      </div>
    </SectionSettingsProvider>
  );
}

export default ResumeForm;