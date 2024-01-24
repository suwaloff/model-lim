import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import testImage from './testImage.jpg';

const meta = {
  title: 'shared/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    src: testImage,
  },
};

export const Small: Story = {
  args: {
    src: testImage,
    size: 50,
  },
};
