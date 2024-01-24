import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'shared/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'enter value',
    options: [
      {
        value: '1',
        content: 'RUB',
      },
      {
        value: '2',
        content: 'USD',
      },
      {
        value: '3',
        content: 'EUR',
      },
    ],
  },
};
