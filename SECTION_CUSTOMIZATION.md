# Section Customization Feature

This document explains how to use the section customization feature in the resume builder application.

## Overview

The section customization feature allows users to:
1. Rename sections (e.g., change "Projects" to "Personal Projects")
2. Show/hide sections
3. Add custom sections (e.g., "Achievements", "Certifications")
4. Remove custom sections

All changes are reflected across all resume templates.

## How It Works

### Backend Implementation

The section customization is stored in the resume document in the database:

```javascript
sectionSettings: {
  summary: {
    title: { type: String, default: "Summary" },
    visible: { type: Boolean, default: true }
  },
  experience: {
    title: { type: String, default: "Experience" },
    visible: { type: Boolean, default: true }
  },
  education: {
    title: { type: String, default: "Education" },
    visible: { type: Boolean, default: true }
  },
  skills: {
    title: { type: String, default: "Skills" },
    visible: { type: Boolean, default: true }
  },
  projects: {
    title: { type: String, default: "Projects" },
    visible: { type: Boolean, default: true }
  },
  customSections: [{
    id: { type: String },
    title: { type: String },
    content: { type: String },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 }
  }]
}
```

### Frontend Implementation

1. **SectionSettingsContext**: Manages the section settings state and provides functions to update them
2. **SectionOptionsMenu**: A component that provides the three-dot menu for each section
3. **CustomSection**: A component that renders custom sections
4. **Template Integration**: All templates have been updated to use dynamic section titles

## Usage

### Renaming Sections

1. Click the three-dot menu next to any section title
2. Select "Rename"
3. Enter the new section name
4. Click "Save"

The new name will be reflected across all resume templates.

### Showing/Hiding Sections

1. Click the three-dot menu next to any section title
2. Select "Hide" to hide the section or "Show" to make it visible
3. Hidden sections will not appear in any template

### Adding Custom Sections

1. Navigate to the "Customize Sections" step in the resume form (step 8)
2. Click "Add Custom Section"
3. Enter a title and content for your custom section
4. Click "Add Section"

Custom sections will appear after the standard sections in all templates.

### Editing Custom Sections

1. In the "Customize Sections" step, find the custom section you want to edit
2. Click the edit icon (pencil)
3. Modify the title and/or content
4. Click "Save Changes"

### Removing Custom Sections

1. In the "Customize Sections" step, find the custom section you want to remove
2. Click the trash icon
3. The section will be removed from all templates

## Template Integration

All 12 resume templates have been updated to support section customization:

1. Each section component now accepts a `sectionKey` prop
2. Section titles are dynamically retrieved from the section settings
3. Section visibility is controlled by the `visible` property
4. Custom sections are rendered after standard sections

Example from DefaultTemplate:

```jsx
const Section = ({ title, children, sectionKey }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  
  // Use custom title if available, otherwise use default
  const sectionTitle = resumeData?.sectionSettings?.[sectionKey]?.title || title;
  const isVisible = resumeData?.sectionSettings?.[sectionKey]?.visible !== false;
  
  if (!children || !isVisible) return null;

  return (
    <section className="mb-2 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-gray-800 mb-1 uppercase tracking-wide border-b border-gray-400 pb-0.5 flex-1">
          {sectionTitle}
        </h2>
        <div className="ml-2">
          <SectionOptionsMenu sectionKey={sectionKey} />
        </div>
      </div>
      {children}
    </section>
  );
};
```

## Technical Details

### Context Provider

The `SectionSettingsProvider` manages the section settings state and synchronizes changes with the Redux store:

```jsx
export const SectionSettingsProvider = ({ children }) => {
  const resumeData = useSelector((state) => state.editResume.resumeData);
  const dispatch = useDispatch();

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

  // ... functions for updating section settings
};
```

### Section Options Menu

The `SectionOptionsMenu` component provides the UI for section management:

```jsx
const SectionOptionsMenu = ({ sectionKey, isCustomSection = false, customSectionId = null }) => {
  // ... state and functions for managing section options
  
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
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
          <button onClick={() => { /* Rename logic */ }}>
            <Edit3 className="h-4 w-4 mr-2" />
            Rename
          </button>
          
          <button onClick={handleToggleVisibility}>
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
            <button onClick={handleRemove}>
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};
```

## Custom Section Manager

The `CustomSectionManager` component provides a UI for managing custom sections in the resume form:

```jsx
const CustomSectionManager = () => {
  const { sectionSettings, addCustomSection, updateCustomSection, removeCustomSection } = useSectionSettings();
  
  // ... functions for adding, updating, and removing custom sections
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Custom Sections</h3>
        <Button onClick={() => setIsAdding(!isAdding)}>
          <Plus className="h-4 w-4" />
          Add Custom Section
        </Button>
      </div>
      
      {/* UI for adding, editing, and listing custom sections */}
    </div>
  );
};
```

## Benefits

1. **Consistency**: Changes are reflected across all resume templates
2. **Flexibility**: Users can customize section names and visibility to match their needs
3. **Extensibility**: Custom sections allow users to add any additional content they need
4. **User-Friendly**: Simple three-dot menu interface makes customization easy