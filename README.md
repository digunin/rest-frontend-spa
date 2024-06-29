### Приложение для для просмотра и редактирования базы данных

---

#### В демонстрационных целях используются два разных компонента для отображения данных

- <strong>x-data-grid</strong> из библиотеки material UI
- самодельный адаптивный компонент <strong>DataTable</strong>, основанный на компоненте MUI TextField

#### Как они выглядят:

<details>
<summary>На широком экране</summary>
  
#### x-data-grid
![w1](https://github.com/digunin/test-frontend-spa/assets/61985576/633fd7ae-504d-4aae-a26b-6fcf73b73f4d)

#### DataTable

![w2](https://github.com/digunin/test-frontend-spa/assets/61985576/3c1989e2-4f83-4fb5-b4a7-712b140e346b)

</details>
<details>
<summary>На среднем экране</summary>

#### x-data-grid

<img src="https://github.com/digunin/test-frontend-spa/assets/61985576/cbe48b22-a5c7-47f8-ac75-149225a727d9" width="700"/>

#### DataTable

<img src="https://github.com/digunin/test-frontend-spa/assets/61985576/3fde6a4d-2b5a-4007-8844-5c43bb586e07" width="700"/>
</details>
<details>
<summary>На смартфоне</summary>

#### x-data-grid

<img src="https://github.com/digunin/test-frontend-spa/assets/61985576/db2bff7f-1c5d-4c41-b5e7-8aa8b0663130" width="420"/>

#### DataTable

<img src="https://github.com/digunin/test-frontend-spa/assets/61985576/544b7871-daad-4778-b20d-150477161c03" width="420"/>
</details>

---

#### Для работы с формами используются собственные инструменты:

- TextInput - компонент-обертка над mui TextField
- WithErrorHandling (HOC), который добавляет в TextInput свойства для обработки пользовательского ввода:

```typescript
type WithErrorHandlingProps = {
  validateHelpers?: Array<ValidateHelper>;
  validateOptions?: ValidateOptions;
  mutators?: Array<InputMutator>;
};
```

<details><summary>С типами можно ознакомиться в файле errors/index.ts</summary>

```typescript
export type ValidateHelper = {
  error_text: string;
  validate: InputValidator;
};

export type InputValidator = (
  inputed: string,
  options: ValidateOptions
) => boolean;

export type InputMutator = (inputed: string) => string;

export type ValidateOptions = {
  min?: number;
  max?: number;
  moreThan?: number;
  lessThan?: number;
  minLength?: number;
  maxLength?: number;
  maxAfterDot?: number;
};

export const checkLength: InputValidator = (
  inputed: string,
  options: ValidateOptions
) => {
  let correct = true;
  const { maxLength, minLength } = options;
  if (typeof minLength === "number") correct = inputed.length >= minLength;
  if (typeof maxLength === "number") correct = inputed.length <= maxLength;
  return correct;
};
```

</details>

Например, нужно задать минимальную длину вводимого текста 8 символов, в этом нам поможет функция-валидатор checkLength

```typescript
import checkLength from './errors'

const Min8CharsInput = () => {
  const validator = {validate: checkLength, error_text:'Минимум 8 символов'}
  return (
    <TextInput
      ...
      validateHelpers={[validator]}
      validateOptions={{minLength: 8}}
      ...
  />
)
}
```

---

[Запустить приложение](https://digunin.github.io/test-frontend-spa/)

Аутентификация:

- логин user{любое число}, (user5, user321)
- пароль password
