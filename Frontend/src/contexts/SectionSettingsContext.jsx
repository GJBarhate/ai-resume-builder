import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addResumeData } from '@/features/resume/resumeFeatures';

const SectionSettingsContext = createContext();

export const useSectionSettings = () => {
  const context = useContext(SectionSettingsContext);
  if (!context) {
    throw new Error('useSectionSettings must be used within a SectionSettingsProvider');
  }
  return context;
};

export const SectionSettingsProvider = ({ children }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  const dispatch = useDispatch();

  // Default section settings
  const defaultSectionSettings = {
    summary: { title: 'Summary', visible: true },
    experience: { title: 'Experience', visible: true },
    education: { title: 'Education', visible: true },
    skills: { title: 'Skills', visible: true },
    projects: { title: 'Projects', visible: true },
    customSections: []
  };

  const [sectionSettings, setSectionSettings] = useState(
    resumeData?.sectionSettings || defaultSectionSettings
  );

  // Update Redux store when section settings change
  useEffect(() => {
    if (resumeData) {
      dispatch(addResumeData({
        ...resumeData,
        sectionSettings: sectionSettings
      }));
    }
  }, [sectionSettings, dispatch]);

  // Update section title
  const updateSectionTitle = (sectionKey, newTitle) => {
    setSectionSettings(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        title: newTitle
      }
    }));
  };

  // Toggle section visibility
  const toggleSectionVisibility = (sectionKey) => {
    setSectionSettings(prev => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        visible: !prev[sectionKey].visible
      }
    }));
  };

  // Add custom section
  const addCustomSection = (title, content = '', sidebar = false, column = 'auto') => {
    const newSection = {
      id: Date.now().toString(),
      title: title,
      content: content,
      visible: true,
      order: sectionSettings.customSections.length,
      sidebar: sidebar,
      column: column
    };

    setSectionSettings(prev => ({
      ...prev,
      customSections: [...prev.customSections, newSection]
    }));
  };

  // Update custom section
  const updateCustomSection = (sectionId, updates) => {
    setSectionSettings(prev => ({
      ...prev,
      customSections: prev.customSections.map(section =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    }));
  };

  // Remove custom section
  const removeCustomSection = (sectionId) => {
    setSectionSettings(prev => ({
      ...prev,
      customSections: prev.customSections.filter(section => section.id !== sectionId)
    }));
  };

  // Get section title
  const getSectionTitle = (sectionKey) => {
    return sectionSettings[sectionKey]?.title || sectionKey;
  };

  // Check if section is visible
  const isSectionVisible = (sectionKey) => {
    return sectionSettings[sectionKey]?.visible !== false;
  };

  const contextValue = {
    sectionSettings,
    updateSectionTitle,
    toggleSectionVisibility,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    getSectionTitle,
    isSectionVisible
  };

  return (
    <SectionSettingsContext.Provider value={contextValue}>
      {children}
    </SectionSettingsContext.Provider>
  );
};