import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import { isString } from 'lodash-es';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { mdc } = query;
  const data = isString(mdc) ? mdc : '';
  return parseMarkdown(data);
});
