import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Text, TextSize, TextTheme } from './Text';

const meta = {
  title: 'shared/Text',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Size_M: Story = {
  args: {
    size: TextSize.M,
    title: 'Title text',
    text: 'text tu-ru-ru Param-pam! pam_ tururum 0123456789 10',
  },
};
export const Size_L: Story = {
  args: {
    size: TextSize.L,
    title: 'Title text',
    text: 'text tu-ru-ru Param-pam! pam_ tururum 0123456789 10',
  },
};
export const Size_M_Dark: Story = {
  args: {
    size: TextSize.M,
    title: 'Title text',
    text: 'text tu-ru-ru Param-pam! pam_ tururum 0123456789 10',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const Size_L_Dark: Story = {
  args: {
    size: TextSize.L,
    title: 'Title text',
    text: 'text tu-ru-ru Param-pam! pam_ tururum 0123456789 10',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
export const Error: Story = {
  args: {
    size: TextSize.L,
    theme: TextTheme.ERROR,
    title: 'Title text',
    text: 'text tu-ru-ru Param-pam! pam_ tururum 0123456789 10',
  },
};
export const Error_Dark: Story = {
  args: {
    size: TextSize.L,
    theme: TextTheme.ERROR,
    title: 'Title text',
    text: 'text tu-ru-ru Param-pam! pam_ tururum 0123456789 10',
  },
  decorators: [ThemeDecorator(Theme.DARK)],
};
