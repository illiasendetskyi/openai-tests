const world = 'world';

export function hello(who: string = world): string {
  const phrase = `Hello ${who}! `;
  console.log(phrase);
  return phrase;
}
hello();
