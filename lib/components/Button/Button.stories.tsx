import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { expect, userEvent, within, fn } from '@storybook/test';

// ============================================
// ICON COMPONENTS
// ============================================
// These are example icons - replace with your icon library if needed
const ArrowLeftIcon = () => <span>←</span>;
const ArrowRightIcon = () => <span>→</span>;
const SaveIcon = () => <span>💾</span>;
const CheckIcon = () => <span>✓</span>;
const PlusIcon = () => <span>+</span>;
const TrashIcon = () => <span>🗑️</span>;
const EditIcon = () => <span>✏️</span>;
const SettingsIcon = () => <span>⚙️</span>;
const SearchIcon = () => <span>🔍</span>;
const HeartIcon = () => <span>❤️</span>;
const StarIcon = () => <span>⭐</span>;
const DownloadIcon = () => <span>⬇</span>;
const UploadIcon = () => <span>⬆</span>;
const FolderIcon = () => <span>📁</span>;
const DocumentIcon = () => <span>📄</span>;
const LockIcon = () => <span>🔒</span>;
const UnlockIcon = () => <span>🔓</span>;
const BellIcon = () => <span>🔔</span>;
const ChatIcon = () => <span>💬</span>;
const RocketIcon = () => <span>🚀</span>;

// ============================================
// META CONFIGURATION
// ============================================
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, states, and icon support. Built with design tokens for consistent theming.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width of its container',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Button text content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    leftIcon: {
      control: false,
      description: 'Icon to display before the button text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    rightIcon: {
      control: false,
      description: 'Icon to display after the button text',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Click event handler',
      table: {
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// BASIC VARIANTS
// ============================================

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /primary button/i });
    
    // Verify button exists
    await expect(button).toBeInTheDocument();
    
    // Verify correct variant
    await expect(button).toHaveClass('btn--primary');
    
    // Test click
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await expect(button).toHaveClass('btn--secondary');
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await expect(button).toHaveClass('btn--outline');
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await expect(button).toHaveClass('btn--ghost');
  },
};

// ============================================
// SIZES
// ============================================

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await expect(button).toHaveClass('btn--sm');
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await expect(button).toHaveClass('btn--md');
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await expect(button).toHaveClass('btn--lg');
  },
};

// ============================================
// STATES
// ============================================

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Verify loading state
    await expect(button).toHaveClass('btn--loading');
    await expect(button).toBeDisabled();
    
    // Try to click (should not work)
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Verify disabled state
    await expect(button).toBeDisabled();
    
    // Try to click (should not work)
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
    onClick: fn(),
  },
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await expect(button).toHaveClass('btn--full-width');
  },
};

// ============================================
// ICONS - BASIC EXAMPLES
// ============================================

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <ArrowLeftIcon />,
    children: 'Back',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /back/i });
    
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRightIcon />,
    children: 'Next',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /next/i });
    
    await expect(button).toBeInTheDocument();
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <SaveIcon />,
    rightIcon: <CheckIcon />,
    children: 'Save Changes',
    variant: 'primary',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

// ============================================
// ICONS - NAVIGATION
// ============================================

export const NavigationIcons: Story = {
  name: '🧭 Navigation Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '250px' }}>
      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Navigation Icons</h3>
      <Button leftIcon={<ArrowLeftIcon />}>Back</Button>
      <Button rightIcon={<ArrowRightIcon />}>Next</Button>
      <Button leftIcon={<UploadIcon />}>Go Up</Button>
      <Button leftIcon={<DownloadIcon />}>Go Down</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    
    // Verify all buttons exist
    await expect(buttons).toHaveLength(4);
    
    // Click each button
    for (const button of buttons) {
      await userEvent.click(button);
    }
  },
};

// ============================================
// ICONS - ACTIONS
// ============================================

export const ActionIcons: Story = {
  name: '⚡ Action Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '250px' }}>
      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Action Icons</h3>
      <Button leftIcon={<SaveIcon />} variant="primary">
        Save
      </Button>
      <Button leftIcon={<TrashIcon />} variant="outline">
        Delete
      </Button>
      <Button leftIcon={<EditIcon />} variant="secondary">
        Edit
      </Button>
      <Button leftIcon={<PlusIcon />} variant="primary">
        Add New
      </Button>
      <Button leftIcon={<CheckIcon />} variant="primary">
        Confirm
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const saveButton = canvas.getByRole('button', { name: /save/i });
    const deleteButton = canvas.getByRole('button', { name: /delete/i });
    
    // Test specific buttons
    await expect(saveButton).toHaveClass('btn--primary');
    await expect(deleteButton).toHaveClass('btn--outline');
    
    // Click buttons
    await userEvent.click(saveButton);
    await userEvent.click(deleteButton);
  },
};

// ============================================
// ICONS - SOCIAL & FEEDBACK
// ============================================

export const SocialIcons: Story = {
  name: '❤️ Social & Feedback Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '250px' }}>
      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Social & Feedback</h3>
      <Button leftIcon={<HeartIcon />} variant="ghost">
        Like
      </Button>
      <Button leftIcon={<StarIcon />} variant="ghost">
        Favorite
      </Button>
      <Button leftIcon={<ChatIcon />} variant="outline">
        Comment
      </Button>
      <Button leftIcon={<BellIcon />} variant="outline">
        Notify
      </Button>
    </div>
  ),
};

// ============================================
// ICONS - UTILITY
// ============================================

export const UtilityIcons: Story = {
  name: '🔧 Utility Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '250px' }}>
      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Utility Icons</h3>
      <Button leftIcon={<SearchIcon />}>Search</Button>
      <Button leftIcon={<SettingsIcon />}>Settings</Button>
      <Button leftIcon={<FolderIcon />}>Open Folder</Button>
      <Button leftIcon={<DocumentIcon />}>View Document</Button>
      <Button leftIcon={<LockIcon />}>Lock</Button>
      <Button leftIcon={<UnlockIcon />}>Unlock</Button>
      <Button leftIcon={<DownloadIcon />} rightIcon={<DocumentIcon />}>
        Download File
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const searchButton = canvas.getByRole('button', { name: /search/i });
    
    await userEvent.click(searchButton);
    await expect(searchButton).toBeInTheDocument();
  },
};

// ============================================
// COMPREHENSIVE SHOWCASE
// ============================================

export const AllVariants: Story = {
  name: '🎨 All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0' }}>Variants</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 1rem 0' }}>States</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary">Normal</Button>
          <Button variant="primary" loading>
            Loading
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  name: '📏 All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm" variant="primary">
        Small
      </Button>
      <Button size="md" variant="primary">
        Medium
      </Button>
      <Button size="lg" variant="primary">
        Large
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    
    await expect(buttons[0]).toHaveClass('btn--sm');
    await expect(buttons[1]).toHaveClass('btn--md');
    await expect(buttons[2]).toHaveClass('btn--lg');
  },
};

export const CompleteIconGallery: Story = {
  name: '🎭 Complete Icon Gallery',
  render: () => (
    <div style={{ padding: '2rem', maxWidth: '800px' }}>
      <h2 style={{ marginTop: 0 }}>Button Icon Gallery</h2>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Comprehensive showcase of all button variations with icons. Click any button to see Actions tab logging.
      </p>

      <section style={{ marginBottom: '3rem' }}>
        <h3>🧭 Navigation</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button leftIcon={<ArrowLeftIcon />}>Back</Button>
          <Button rightIcon={<ArrowRightIcon />}>Next</Button>
          <Button leftIcon={<UploadIcon />}>Up</Button>
          <Button leftIcon={<DownloadIcon />}>Down</Button>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3>⚡ Actions</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button leftIcon={<SaveIcon />} variant="primary">
            Save
          </Button>
          <Button leftIcon={<TrashIcon />} variant="outline">
            Delete
          </Button>
          <Button leftIcon={<EditIcon />} variant="secondary">
            Edit
          </Button>
          <Button leftIcon={<PlusIcon />} variant="primary">
            Add New
          </Button>
          <Button leftIcon={<CheckIcon />} variant="primary">
            Confirm
          </Button>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3>❤️ Social & Feedback</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button leftIcon={<HeartIcon />} variant="ghost">
            Like
          </Button>
          <Button leftIcon={<StarIcon />} variant="ghost">
            Favorite
          </Button>
          <Button leftIcon={<ChatIcon />} variant="outline">
            Comment
          </Button>
          <Button leftIcon={<BellIcon />} variant="outline">
            Notify
          </Button>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3>🔧 Utility</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button leftIcon={<SearchIcon />}>Search</Button>
          <Button leftIcon={<SettingsIcon />}>Settings</Button>
          <Button leftIcon={<FolderIcon />}>Open Folder</Button>
          <Button leftIcon={<DocumentIcon />}>Document</Button>
          <Button leftIcon={<LockIcon />}>Lock</Button>
          <Button leftIcon={<UnlockIcon />}>Unlock</Button>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h3>🚀 Special Cases</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
          <Button leftIcon={<RocketIcon />} variant="primary">
            Launch
          </Button>
          <Button leftIcon={<SaveIcon />} rightIcon={<CheckIcon />} variant="primary">
            Save & Continue
          </Button>
          <Button leftIcon={<DownloadIcon />} loading>
            Downloading...
          </Button>
          <Button leftIcon={<TrashIcon />} disabled>
            Delete (Disabled)
          </Button>
        </div>
      </section>

      <section>
        <h3>📦 Size Variations</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <Button leftIcon={<SaveIcon />} size="sm" variant="primary">
            Small Save
          </Button>
          <Button leftIcon={<SaveIcon />} size="md" variant="primary">
            Medium Save
          </Button>
          <Button leftIcon={<SaveIcon />} size="lg" variant="primary">
            Large Save
          </Button>
        </div>
      </section>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find key buttons
    const saveButton = canvas.getByRole('button', { name: /^Save$/i });
    const deleteButton = canvas.getByRole('button', { name: /^Delete$/i });
    
    // Test interactions
    await userEvent.click(saveButton);
    await expect(saveButton).toBeInTheDocument();
    
    // Test disabled button (should not click)
    const disabledButton = canvas.getByRole('button', { name: /delete \(disabled\)/i });
    await expect(disabledButton).toBeDisabled();
  },
};

// ============================================
// INTERACTIVE PLAYGROUND
// ============================================

export const Playground: Story = {
  name: '🎮 Interactive Playground',
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Click Me',
    disabled: false,
    loading: false,
    fullWidth: false,
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Wait a bit for user to see
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Test click
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
    
    // Verify button properties
    await expect(button).toBeInTheDocument();
    await expect(button).toBeVisible();
  },
};

// ============================================
// ADVANCED INTERACTION TESTS
// ============================================

export const MultipleClicks: Story = {
  name: '🖱️ Multiple Clicks Test',
  args: {
    variant: 'primary',
    children: 'Click Me Multiple Times',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Click 5 times
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(button);
    
    // Verify onClick was called 5 times
    await expect(args.onClick).toHaveBeenCalledTimes(5);
  },
};

export const HoverInteraction: Story = {
  name: '🎯 Hover Interaction Test',
  args: {
    variant: 'outline',
    children: 'Hover Over Me',
    onClick: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Hover
    await userEvent.hover(button);
    await expect(button).toBeVisible();
    
    // Unhover
    await userEvent.unhover(button);
    await expect(button).toBeVisible();
    
    // Click after hover
    await userEvent.click(button);
  },
};

export const KeyboardNavigation: Story = {
  name: '⌨️ Keyboard Navigation Test',
  args: {
    variant: 'primary',
    children: 'Press Tab to Focus, Enter to Click',
    onClick: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Tab to focus
    await userEvent.tab();
    await expect(button).toHaveFocus();
    
    // Press Enter
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalled();
    
    // Press Space
    await userEvent.keyboard(' ');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

export const LoadingStateTransition: Story = {
  name: '⏳ Loading State Transition',
  render: () => {
    const [loading, setLoading] = React.useState(false);
    
    const handleClick = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <Button 
          variant="primary" 
          loading={loading}
          onClick={handleClick}
          leftIcon={<SaveIcon />}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
        <p style={{ color: '#666', fontSize: '0.875rem' }}>
          Click the button to see loading state (2 seconds)
        </p>
      </div>
    );
  },
};

// ============================================
// ACCESSIBILITY TESTS
// ============================================

export const AccessibilityTest: Story = {
  name: '♿ Accessibility Test',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <h3>Accessibility Features</h3>
      
      <div>
        <h4>Keyboard Navigation</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="primary">Tab to Focus</Button>
          <Button variant="secondary">Press Enter</Button>
          <Button variant="outline">Press Space</Button>
        </div>
      </div>
      
      <div>
        <h4>Screen Reader Support</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="primary" aria-label="Save your document">
            <SaveIcon />
          </Button>
          <Button variant="primary" disabled aria-label="This button is disabled">
            Disabled
          </Button>
          <Button variant="primary" loading aria-label="Loading, please wait">
            Loading
          </Button>
        </div>
      </div>
      
      <div>
        <h4>Focus Visible</h4>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          Tab through buttons to see focus indicators
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="primary">Button 1</Button>
          <Button variant="secondary">Button 2</Button>
          <Button variant="outline">Button 3</Button>
          <Button variant="ghost">Button 4</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    
    // Verify all buttons are accessible
    for (const button of buttons) {
      await expect(button).toBeInTheDocument();
    }
    
    // Test keyboard navigation
    const firstButton = buttons[0];
    firstButton.focus();
    await expect(firstButton).toHaveFocus();
  },
};

// Import React for LoadingStateTransition story
import React from 'react';