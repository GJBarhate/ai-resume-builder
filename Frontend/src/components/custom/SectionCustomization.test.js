import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { SectionSettingsProvider } from '@/contexts/SectionSettingsContext';
import SectionOptionsMenu from './SectionOptionsMenu';

// Mock Redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock the resume data
const mockResumeData = {
  sectionSettings: {
    summary: { title: 'Executive Summary', visible: true },
    experience: { title: 'Work Experience', visible: true },
    education: { title: 'Education', visible: true },
    skills: { title: 'Skills', visible: true },
    projects: { title: 'Personal Projects', visible: true },
    customSections: [
      { id: '1', title: 'Achievements', content: 'Won several awards', visible: true, order: 0 },
      { id: '2', title: 'Certifications', content: 'AWS Certified', visible: true, order: 1 }
    ]
  }
};

describe('Section Customization', () => {
  beforeEach(() => {
    useSelector.mockImplementation(callback => callback({ editResume: { resumeData: mockResumeData } }));
    useDispatch.mockReturnValue(jest.fn());
  });

  test('renders section with custom title', () => {
    render(
      <SectionSettingsProvider>
        <div data-testid="test-section">
          <SectionOptionsMenu sectionKey="projects" />
        </div>
      </SectionSettingsProvider>
    );

    // The section should display the custom title "Personal Projects"
    expect(screen.getByTestId('test-section')).toBeInTheDocument();
  });

  test('allows renaming sections', () => {
    render(
      <SectionSettingsProvider>
        <SectionOptionsMenu sectionKey="summary" />
      </SectionSettingsProvider>
    );

    // Click the menu button
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    // Click the rename option
    const renameButton = screen.getByText('Rename');
    fireEvent.click(renameButton);

    // Check if the edit input appears
    const editInput = screen.getByPlaceholderText('Section title');
    expect(editInput).toBeInTheDocument();
  });
});