import React from 'react';
import { useSelector } from 'react-redux';

const CustomSection = ({ sectionData }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Check if this custom section should be visible
  const isVisible = sectionData?.visible !== false;
  
  if (!isVisible) return null;

  return (
    <div className="mb-2">
      <h2 
        className="text-sm font-bold uppercase tracking-wide border-b pb-0.5 mb-1"
        style={{ 
          color: resumeData?.themeColor || '#000', 
          borderColor: resumeData?.themeColor || '#000' 
        }}
      >
        {sectionData?.title || 'Custom Section'}
      </h2>
      <div className="text-gray-700 leading-tight text-xs">
        {sectionData?.content ? (
          <div dangerouslySetInnerHTML={{ __html: sectionData.content }} />
        ) : (
          <p>No content available</p>
        )}
      </div>
    </div>
  );
};

export default CustomSection;