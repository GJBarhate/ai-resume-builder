import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { templatesList, templateInfo, getTemplate } from './index';
import { useSelector, useDispatch } from 'react-redux';
import { addResumeData } from '@/features/resume/resumeFeatures';
import { updateThisResume } from '@/Services/resumeAPI';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const TemplateSelector = () => {
  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state.editResume.resumeData);
  const [selectedTemplate, setSelectedTemplate] = useState(resumeData?.selectedTemplate || 'default');
  const [loading, setLoading] = useState(false);
  const { resume_id } = useParams();

  const handleTemplateChange = async (templateName) => {
    setSelectedTemplate(templateName);
    setLoading(true);
    
    // Update Redux state
    dispatch(addResumeData({
      ...resumeData,
      selectedTemplate: templateName
    }));

    // Save to backend
    if (resume_id) {
      const data = {
        data: {
          selectedTemplate: templateName
        }
      };
      
      try {
        await updateThisResume(resume_id, data);
        toast.success(`Template changed to ${templateInfo[templateName]?.name}`);
      } catch (error) {
        toast.error('Error saving template selection');
        console.error('Error updating template:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Choose Resume Template</h3>
        <p className="text-sm text-gray-600">Select a template style for your resume</p>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {templatesList.map((templateName) => {
          const info = templateInfo[templateName];
          const isSelected = selectedTemplate === templateName;
          
          return (
            <div
              key={templateName}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-lg relative ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              } ${loading ? 'opacity-50 pointer-events-none' : ''}`}
              onClick={() => handleTemplateChange(templateName)}
            >
              {/* Template Preview Placeholder */}
              <div className="h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center border">
                <div className="text-center">
                  <div className="text-xl mb-2">
                    {info.name === 'Default' ? '📄' : 
                     info.name === 'Onix' ? '📋' : 
                     info.name === 'Azurill' ? '📊' : 
                     info.name === 'Ditto' ? '🎨' : 
                     info.name === 'Pikachu' ? '⭐' :
                     info.name === 'Classic' ? '📝' :
                     info.name === 'Modern' ? '💼' :
                     info.name === 'Executive' ? '👔' :
                     info.name === 'Minimal' ? '⚡' :
                     info.name === 'Corporate' ? '🏢' :
                     info.name === 'Technical' ? '💻' :
                     info.name === 'Engineer' ? '⚙️' : '📄'}
                  </div>
                  <span className="text-gray-500 text-xs font-medium">
                    {info.name}
                  </span>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className={`font-semibold mb-1 text-sm ${isSelected ? 'text-blue-600' : 'text-gray-800'}`}>
                  {info.name}
                </h4>
                <p className="text-xs text-gray-600 mb-2 leading-tight">{info.description}</p>
                
                <div className="flex justify-center gap-1 text-xs">
                  <span className={`px-2 py-1 rounded ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                    {info.style}
                  </span>
                </div>
              </div>
              
              {isSelected && (
                <div className="mt-2 flex justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
              
              {loading && isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Selected: <span className="font-semibold">{templateInfo[selectedTemplate]?.name}</span>
        </p>
      </div>
    </div>
  );
};

export default TemplateSelector;