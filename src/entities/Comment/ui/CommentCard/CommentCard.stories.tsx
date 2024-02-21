import type { Meta, StoryObj } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'entities/CommentCard',
  component: CommentCard,
} satisfies Meta<typeof CommentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    comment: {
      id: '1',
      text: 'some comment',
      user: {
        id: '1',
        username: 'username',
        avatar: 'https://i.pinimg.com/474x/64/fe/16/64fe16a190382098136091b98670d81f.jpg',
      },
    },

    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.LIGHT), StoreDecorator({})],
};
export const PrimaryDark: Story = {
  args: {
    comment: {
      id: '1',
      text: 'some comment',
      user: {
        id: '1',
        username: 'username',
        avatar: 'https://i.pinimg.com/474x/64/fe/16/64fe16a190382098136091b98670d81f.jpg',
      },
    },

    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};
export const WithoutAvatar: Story = {
  args: {
    comment: { id: '1', text: 'some comment', user: { id: '1', username: 'username', avatar: '' } },

    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};
