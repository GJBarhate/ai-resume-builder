import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSectionSettings } from '@/contexts/SectionSettingsContext';
import { Plus, Edit3, Trash2, Move } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CustomSectionManager = () => {
  const { sectionSettings, addCustomSection, updateCustomSection, removeCustomSection } = useSectionSettings();
  const [isAdding, setIsAdding] = useState(false);
  const [newSection, setNewSection] = useState({ title: '', content: '', sidebar: false, column: 'auto' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', content: '', sidebar: false, column: 'auto' });

  const handleAddSection = () => {
    if (newSection.title.trim()) {
      addCustomSection(newSection.title, newSection.content, newSection.sidebar, newSection.column);
      setNewSection({ title: '', content: '', sidebar: false, column: 'auto' });
      setIsAdding(false);
    }
  };

  const handleUpdateSection = (id) => {
    if (editData.title.trim()) {
      updateCustomSection(id, { 
        title: editData.title, 
        content: editData.content,
        sidebar: editData.sidebar,
        column: editData.column
      });
      setEditingId(null);
    }
  };

  const handleRemoveSection = (id) => {
    removeCustomSection(id);
  };

  const startEditing = (section) => {
    setEditingId(section.id);
    setEditData({ 
      title: section.title, 
      content: section.content || '',
      sidebar: section.sidebar || false,
      column: section.column || 'auto'
    });
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Custom Sections</h3>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Custom Section
        </Button>
      </div>

      {isAdding && (
        <div className="mb-6 p-4 border rounded-lg">
          <h4 className="text-md font-semibold mb-3">Add New Custom Section</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <Input
                value={newSection.title}
                onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                placeholder="e.g., Achievements, Certifications, Publications"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <Textarea
                value={newSection.content}
                onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                placeholder="Enter section content..."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <Select
                  value={newSection.column}
                  onValueChange={(value) => setNewSection({ ...newSection, column: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (Default)</SelectItem>
                    <SelectItem value="left">Left Column</SelectItem>
                    <SelectItem value="right">Right Column</SelectItem>
                    <SelectItem value="main">Main Content</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Display in Sidebar</label>
                <Select
                  value={newSection.sidebar ? "true" : "false"}
                  onValueChange={(value) => setNewSection({ ...newSection, sidebar: value === "true" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">No (Main Content)</SelectItem>
                    <SelectItem value="true">Yes (Sidebar)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSection}>
                Add Section
              </Button>
            </div>
          </div>
        </div>
      )}

      {sectionSettings.customSections && sectionSettings.customSections.length > 0 ? (
        <div className="space-y-4">
          {sectionSettings.customSections
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((section) => (
              <div key={section.id} className="border rounded-lg p-4">
                {editingId === section.id ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Section Title</label>
                      <Input
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        placeholder="Section title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Content</label>
                      <Textarea
                        value={editData.content}
                        onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                        placeholder="Section content"
                        rows={4}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Position</label>
                        <Select
                          value={editData.column}
                          onValueChange={(value) => setEditData({ ...editData, column: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto (Default)</SelectItem>
                            <SelectItem value="left">Left Column</SelectItem>
                            <SelectItem value="right">Right Column</SelectItem>
                            <SelectItem value="main">Main Content</SelectItem>
                            <SelectItem value="sidebar">Sidebar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Display in Sidebar</label>
                        <Select
                          value={editData.sidebar ? "true" : "false"}
                          onValueChange={(value) => setEditData({ ...editData, sidebar: value === "true" })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="false">No (Main Content)</SelectItem>
                            <SelectItem value="true">Yes (Sidebar)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                      <Button onClick={() => handleUpdateSection(section.id)}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-md font-semibold">
                        {section.title}
                      </h4>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startEditing(section)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSection(section.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" disabled>
                          <Move className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      {section.content ? (
                        <div 
                          className="text-sm text-gray-600 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      ) : (
                        <p className="text-sm text-gray-500 italic">No content added</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 border rounded-lg">
          <p>No custom sections added yet.</p>
          <p className="text-sm mt-2">Add custom sections like "Achievements", "Certifications", or "Publications".</p>
        </div>
      )}
    </div>
  );
};

export default CustomSectionManager;