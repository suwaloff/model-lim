import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import avatar from 'shared/assets/test/testImage.jpg';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';

const meta = {
  title: 'entities/ProfileCard',
  component: ProfileCard,
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: {
      first: 'Игорь',
      lastname: 'Сувалов',
      username: 'Lima',
      age: '34',
      city: 'Гомель',
      currency: Currency.USD,
      country: Country.Belarus,
      avatar,
    },
  },
};
export const WithError: Story = {
  args: {
    error: 'er',
  },
};
export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
