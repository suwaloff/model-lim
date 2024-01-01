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

export const Outline_Disabled_Dark: Story = {
  args: {
    children: 'text',
    theme: ButtonTHeme.OUTLINE,
    disabled: true,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};

export const Outline_Disabled: Story = {
  args: {
    children: 'text',
    theme: ButtonTHeme.OUTLINE,
    disabled: true,
  },
};

export const BACKGROUND: Story = {
  args: {
    children: 'text',
    theme: ButtonTHeme.BACKGROUND,
  },
};

export const BACKGROUND_INVERTED: Story = {
  args: {
    children: 'text',
    theme: ButtonTHeme.BACKGROUND_INVERTED,
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
