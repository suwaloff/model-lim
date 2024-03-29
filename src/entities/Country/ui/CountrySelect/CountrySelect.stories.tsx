import type { Meta, StoryObj } from '@storybook/react';
import { CountrySelect } from './CountrySelect';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'entities/Select/CountrySelect',
  component: CountrySelect,
} satisfies Meta<typeof CountrySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
export const PrimaryDark: Story = {
  args: {},
  decorators: [ThemeDecorator(Theme.DARK)],
};
