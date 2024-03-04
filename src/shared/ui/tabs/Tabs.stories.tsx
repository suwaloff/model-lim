import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'shared/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    tabs: [
      {
        content: 'tab1',
        value: 'tab1',
      },
      {
        content: 'tab2',
        value: 'tab2',
      },
      {
        content: 'tab3',
        value: 'tab3',
      },
    ],
    value: 'tab2',
  },
};

export const NormalDark: Story = {
  args: {
    tabs: [
      {
        content: 'tab1',
        value: 'tab1',
      },
      {
        content: 'tab2',
        value: 'tab2',
      },
      {
        content: 'tab3',
        value: 'tab3',
      },
    ],
    value: 'tab2',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
