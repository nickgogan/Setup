// Testing treeshaking: "shake" should not appear in the main bundle.
const shake = () => console.log('shake');
const bake = () => console.log('bake');

export { shake, bake };
