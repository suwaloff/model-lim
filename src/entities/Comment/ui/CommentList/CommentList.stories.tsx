import type { Meta, StoryObj } from '@storybook/react';
import { CommentList } from './CommentList';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

const meta = {
  title: 'entities/CommentList',
  component: CommentList,
} satisfies Meta<typeof CommentList>;

export default meta;
type Story = StoryObj<typeof meta>;

const comments = [
  {
    id: '1',
    text: 'some comment',
    user: {
      id: '1',
      username: 'username',
      avatar: 'https://i.pinimg.com/474x/64/fe/16/64fe16a190382098136091b98670d81f.jpg',
    },
  },
  {
    id: '2',
    text: 'some comment',
    user: {
      id: '2',
      username: 'username',
      avatar: 'https://i.pinimg.com/564x/4b/ab/a5/4baba51abe8bec1979194d2afb94f31a.jpg',
    },
  },
  {
    id: '3',
    text: 'some comment',
    user: {
      id: '3',
      username: 'username',
      avatar: 'https://i.pinimg.com/474x/ee/6e/9a/ee6e9acdb1fa06abfe6db2c42dd91e5f.jpg',
    },
  },
];

export const Primary: Story = {
  args: {
    comments: comments,
    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.LIGHT), StoreDecorator({})],
};
export const PrimaryDark: Story = {
  args: {
    comments: comments,
    isLoading: false,
  },
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};

export const Skeleton: Story = {
  args: {
    comments: comments,
    isLoading: true,
  },
  decorators: [ThemeDecorator(Theme.LIGHT), StoreDecorator({})],
};
export const SkeletonDark: Story = {
  args: {
    comments: comments,
    isLoading: true,
  },
  decorators: [ThemeDecorator(Theme.DARK), StoreDecorator({})],
};
