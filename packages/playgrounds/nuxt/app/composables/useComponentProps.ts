import meta from '@skgn/melkor/meta';

export function useComponentMeta(name: string, scope: keyof typeof meta = 'vue') {
  const sfcMeta = meta[scope].components.find(c => c.name === name);
  return sfcMeta ?? null;
}

// .map((p) => {
//       const { schema } = p;
//       let _type: (boolean | string | number | undefined)[] = [];

//       if (isObject(schema)) {
//         if (schema.kind === 'enum') {
//           if (schema.schema) {
//             _type = schema.schema.map((v) => {
//               if (isString(v)) {
//                 if (v === 'undefined') {
//                   return null;
//                 }
//                 return v;
//               }
//               return null;
//             }).filter(v => v !== null);
//           }
//         }
//       }

//       return {
//         s: p.schema,
//         name: p.name,
//         required: p.required,
//         // options,
//       };
//     })
