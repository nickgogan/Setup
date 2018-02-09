// Testing treeshaking: "shake" should not appear in the main bundle.
const shake = () => console.log('TREESHAKE: shake');
const bake = () => console.log('TREESHAKE: bake');

export { shake, bake, };
