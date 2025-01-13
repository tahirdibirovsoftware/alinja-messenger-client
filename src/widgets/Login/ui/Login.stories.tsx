import type { Meta, StoryObj } from '@storybook/react';
import { Login } from './Login';

//👇 This default export determines where your story goes in the story list
// const meta: Meta<typeof Login> = {
//     component: Login,
// };

export default {
    title: 'Widgets/Login', // Add title for better organization
    component: Login,
    args: {
        // Default props for all stories
    },
    argTypes: {
        // Define prop types and configurations (optional)
    },
} as Meta<typeof Login>;

type Story = StoryObj<typeof Login>;

export const FirstStory: Story = {
    // Add specific args for this story 
};