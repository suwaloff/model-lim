import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ButtonTHeme } from 'shared/ui/button/ui/Button';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'shared/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    children: 'text',
    theme: ButtonTHeme.MAIN,
  },
};

export const Clear: Story = {
  args: {
    children: 'text',
    theme: ButtonTHeme.CLEAR,
  },
};

export const Outline: Story = {
  args: {
    children: 'text',
    theme: ButtonTHeme.OUTLINE,
  },
};

export const OutlineDark: Story = {
  args: {
    children: 'text',
    theme: ButtonTHeme.OUTLINE,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
