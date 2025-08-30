import React, { useState } from 'react';
import { MoreHorizontal, Edit3, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSectionSettings } from '@/contexts/SectionSettingsContext';

const SectionOptionsMenu = ({ sectionKey, isCustomSection = false, customSectionId = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const { 
    getSectionTitle, 
    updateSectionTitle, 
    toggleSectionVisibility, 
    removeCustomSection,
    updateCustomSection
  } = useSectionSettings();

  const currentTitle = isCustomSection 
    ? getSectionTitle('customSections')?.find(sec => sec.id === customSectionId)?.title || 'Custom Section'
    : getSectionTitle(sectionKey);

  const isVisible = isCustomSection
    ? getSectionTitle('customSections')?.find(sec => sec.id === customSectionId)?.visible !== false
    : getSectionTitle(sectionKey) !== false;

  const handleRename = () => {
    if (isCustomSection && customSectionId) {
      // For custom sections, update the custom section title
      updateCustomSection(customSectionId, { title: editTitle });
    } else {
      updateSectionTitle(sectionKey, editTitle);
    }
    setIsEditing(false);
  };

  const handleToggleVisibility = () => {
    if (isCustomSection && customSectionId) {
      // For custom sections, toggle visibility
      const customSections = getSectionTitle('customSections') || [];
      const section = customSections.find(sec => sec.id === customSectionId);
      if (section) {
        updateCustomSection(customSectionId, { visible: !section.visible });
      }
    } else {
      toggleSectionVisibility(sectionKey);
    }
    setIsOpen(false);
  };

  const handleRemove = () => {
    if (isCustomSection && customSectionId) {
      removeCustomSection(customSectionId);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="h-6 w-6 p-0 hover:bg-gray-200"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border"
          style={{ top: '100%', right: 0 }}
        >
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              setEditTitle(currentTitle);
              setIsEditing(true);
              setIsOpen(false);
            }}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Rename
          </button>
          
          <button
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleToggleVisibility}
          >
            {isVisible ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show
              </>
            )}
          </button>
          
          {isCustomSection && (
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </button>
          )}
        </div>
      )}

      {isEditing && (
        <div className="absolute right-0 mt-1 w-64 bg-white rounded-md shadow-lg p-3 z-50 border">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Section title"
            className="mb-2"
            autoFocus
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleRename}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionOptionsMenu;