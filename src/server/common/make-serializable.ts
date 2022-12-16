/**
 * Da SSR o SSG permette di passare come props un OBJ
 * @param o Un OBJ
 * @returns Un obj passabile come props
 */
export const makeSerializable = <T>(o: T): T => {
  return JSON.parse(JSON.stringify(o));
};
