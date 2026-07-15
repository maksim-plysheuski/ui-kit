# ui-kit

npm-библиотека UI-компонентов для React

## Технологии

- **React 18/19** + TypeScript
- **Tailwind CSS 4** + **Radix UI**
- **class-variance-authority**, **clsx**, **tailwind-merge**
- **Vite**, **tsup**, **Storybook 10**
- **Vitest** (unit + browser) + Testing Library
- **Changesets** для версионирования

## Скрипты

| Команда                         | Описание                          |
| ------------------------------- | --------------------------------- |
| `npm run dev`                   | Dev-сервер Vite                   |
| `npm run build`                 | Сборка библиотеки (`dist/`) + CSS |
| `npm run storybook`             | Storybook на порту 6006           |
| `npm run build-storybook`       | Статическая сборка Storybook      |
| `npm run test`                  | Unit + browser-тесты              |
| `npm run test:unit`             | Только unit-тесты                 |
| `npm run test:browser`          | Только browser-тесты              |
| `npm run test:watch`            | Тесты в watch-режиме              |
| `npm run test:coverage`         | Тесты с coverage                  |
| `npm run typecheck`             | Проверка типов                    |
| `npm run lint` / `lint:fix`     | ESLint                            |
| `npm run format`                | Prettier                          |
| `npm run changeset` / `version` | Changesets                        |

## Установка

```bash
npm install ui-kit
```

Peer-зависимости: `react`, `react-dom`, `radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`.  
Для form-компонентов дополнительно: `react-hook-form` (опционально `zod`).

## Использование

Подключите стили один раз в приложении:

```ts
import "ui-kit/styles.css";
```

### Импорт

```tsx
import { Button, Input, ButtonForm, InputForm } from "ui-kit";
import type { ButtonProps, InputProps } from "ui-kit";

<Button variant="primary">Сохранить</Button>
<Input variant="secondary" placeholder="Email" />
```

### Form-компоненты

`InputForm` и `ButtonForm` работают внутри `FormProvider` / `useForm` из `react-hook-form`:

```tsx
import { useForm, FormProvider } from "react-hook-form";
import { InputForm, ButtonForm } from "ui-kit";

const methods = useForm({ defaultValues: { email: "" } });

<FormProvider {...methods}>
  <form onSubmit={methods.handleSubmit(console.log)}>
    <InputForm control={methods.control} name="email" label="Email" />
    <ButtonForm>Отправить</ButtonForm>
  </form>
</FormProvider>;
```
