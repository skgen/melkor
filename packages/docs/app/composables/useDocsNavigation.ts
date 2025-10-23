// const categoriesNavigatio:

export async function useDocsNavigation() {
  const navigation = await useNavigation(ref('docs'));
  // console.log(navigation.value);

  return navigation;
}
