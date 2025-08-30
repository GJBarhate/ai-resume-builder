import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { toast } from "sonner";
import { templateInfo } from "@/components/templates";
import ShareButtons from "@/components/custom/ShareButtons";
import ErrorBoundary from "@/components/custom/ErrorBoundary";
import { SectionSettingsProvider } from "@/contexts/SectionSettingsContext";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state.editResume.resumeData);

  useEffect(() => {
    fetchResumeInfo();
  }, []);
  
  const fetchResumeInfo = async () => {
    try {
      setLoading(true);
      const response = await getResumeData(resume_id);
      console.log("Resume data fetched:", response.data);
      dispatch(addResumeData(response.data));
      setResumeInfo(response.data);
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
      setLoading(false);
    }
  };

  const HandleDownload = () => {
    // Add print-specific class to body for better PDF rendering
    document.body.classList.add('print-mode');
    window.print();
    // Remove the class after print dialog closes
    setTimeout(() => {
      document.body.classList.remove('print-mode');
    }, 1000);
  };

  const selectedTemplate = resumeData?.selectedTemplate || 'default';
  const templateName = templateInfo[selectedTemplate]?.name || 'Default';
  
  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <SectionSettingsProvider>
      <div className="flex flex-col justify-center items-center">
        <div id="noPrint">
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI generated Resume is ready!
            </h2>
            <p className="text-center text-gray-600 mb-2">
              Template: <span className="font-semibold text-blue-600">{templateName}</span>
            </p>
            <p className="text-center text-gray-400">
              Now you are ready to download your resume and you can share unique
              resume url with your friends and family
            </p>
            <div className="flex flex-col items-center gap-6 my-10">
              <Button 
                onClick={HandleDownload}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                size="lg"
              >
                📄 Download Resume
              </Button>
              
              <div className="w-full max-w-md">
                <ErrorBoundary>
                  <ShareButtons 
                    resumeId={resume_id} 
                    resumeTitle={`${resumeData?.firstName || 'My'} ${resumeData?.lastName || 'Professional'} Resume`}
                  />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
        <div
          className=" bg-white rounded-lg p-8 print-area"
          style={{ width: "210mm", height: "297mm" }}
        >
          <div className="print">
            <ResumePreview />
          </div>
        </div>
      </div>
    </SectionSettingsProvider>
  );
}

export default ViewResume;