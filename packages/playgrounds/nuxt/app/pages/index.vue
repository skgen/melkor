<template>
  <NuxtLayout name="default">
    <pre>valid: {{ valid }}</pre>
    <MkInputText
      v-bind="fields.user"
    >
      <template #label>
        Username
      </template>
    </MkInputText>
    <MkInputText v-bind="fields.password">
      <template #label>
        Password
      </template>
    </MkInputText>
    <MkInputText v-bind="fields.url">
      <template #label>
        Url
      </template>
    </MkInputText>

    <br>
    <br>
    <MkSkeleton width="100px" height="20px" />
    <br>
    <br>
    <MkSkeleton width="500px" height="250px" />
    <br>
    <br>
    <MkSkeleton width="600px" height="200px" type="placeholder" />
    <br>
    <br>
    <MkSkeleton width="200px" height="20px" type="placeholder" />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { InputTextProps } from '@skgn/melkor/nuxt/components';

import { z } from 'zod';

// const a = reactive(useInputBinding<InputTextProps>({
//   value: null,
// }));

const cfg = useGlobalConfig();

const { data, valid, fields } = useForm({
  fields: {
    user: useInputBinding<InputTextProps>({
      value: null,
      valid: false,
      validate: z.string().nonempty(),
    }),
    password: useInputBinding<InputTextProps>({
      value: null,
      secure: true,
      valid: false,
      validate: z.string().nonempty(),
    }),
    url: useInputBinding<InputTextProps>({
      value: null,
      valid: false,
      validate: z.url({
        error: 'L\'input doit être un url valide',
      }).nonempty({
        error: 'L\'input ne doit pas être vide',
      }),
      validateOn: ['change'],
    }),
  },
});

// const a = data;
// const b = fields.password.value;
// const c = fields;

// watch(fields, (_) => {
//   console.log(_.user.value);
//   console.log(_.toto.value);
// }, {
// });
// watch(data, (_) => {
//   console.log(_.user);
//   console.log(_.toto);
// }, {
// });
</script>
