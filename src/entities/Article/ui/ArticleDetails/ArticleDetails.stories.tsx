import type { Meta, StoryObj } from '@storybook/react';
import { ArticleDetails } from './ArticleDetails';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Article, ArticleType, ArticleBlockType } from '../../model/types/Article';

const article: Article = {
  id: '1',
  title: 'Javascript статья 1',
  subtitle: 'Подзаголовок статьи',
  img: 'data:image/png;base64,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',
  views: 12841,
  createdAt: '14.02.2024',
  type: [ArticleType.IT],
  userId: {
    id: '1',
    username: 'liam',
  },
  blocks: [
    {
      id: '1',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
      ],
    },
    {
      id: '4',
      type: ArticleBlockType.CODE,
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
    },
    {
      id: '5',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
      ],
    },
    {
      id: '2',
      type: ArticleBlockType.IMAGE,
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
    },
    {
      id: '3',
      type: ArticleBlockType.CODE,
      code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
    },
    {
      id: '7',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
        'Существуют и другие способы запуска JS-кода в браузере. Так, если говорить об обычном использовании программ на JavaScript, они загружаются в браузер для обеспечения работы веб-страниц. Как правило, код оформляют в виде отдельных файлов с расширением .js, которые подключают к веб-страницам, но программный код можно включать и непосредственно в код страницы. Всё это делается с помощью тега <script>. Когда браузер обнаруживает такой код, он выполняет его. Подробности о теге script можно посмотреть на сайте w3school.com. В частности, рассмотрим пример, демонстрирующий работу с веб-страницей средствами JavaScript, приведённый на этом ресурсе. Этот пример можно запустить и средствами данного ресурса (ищите кнопку Try it Yourself), но мы поступим немного иначе. А именно, создадим в каком-нибудь текстовом редакторе (например — в VS Code или в Notepad++) новый файл, который назовём hello.html, и добавим в него следующий код:',
      ],
    },
    {
      id: '8',
      type: ArticleBlockType.IMAGE,
      src: 'https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png',
      title: 'Рисунок 1 - скриншот сайта',
    },
    {
      id: '9',
      type: ArticleBlockType.TEXT,
      title: 'Заголовок этого блока',
      paragraphs: [
        'JavaScript — это язык, программы на котором можно выполнять в разных средах. В нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, на настольном компьютере, это значит, что вы буквально в считанных секундах от своей первой JavaScript-программы.',
      ],
    },
  ],
};

const meta = {
  title: 'pages/ArticleDetails',
  component: ArticleDetails,
} satisfies Meta<typeof ArticleDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightArticle: Story = {
  args: {
    id: '',
  },
  decorators: [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
      articleDetails: { data: article },
    }),
  ],
};
export const DarkArticle: Story = {
  args: {
    id: '',
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      articleDetails: { data: article },
    }),
  ],
};
export const LoadingLight: Story = {
  args: {
    id: '',
  },
  decorators: [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
      articleDetails: { isLoading: true },
    }),
  ],
};
export const LoadingDark: Story = {
  args: {
    id: '',
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      articleDetails: { isLoading: true },
    }),
  ],
};
export const ErrorLight: Story = {
  args: {
    id: '',
  },
  decorators: [
    ThemeDecorator(Theme.LIGHT),
    StoreDecorator({
      articleDetails: { error: 'error' },
    }),
  ],
};
export const ErrorDark: Story = {
  args: {
    id: '',
  },
  decorators: [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
      articleDetails: { error: 'error' },
    }),
  ],
};
