import { UNIQUE_IDENTIFIER } from '../constants';

export const UniqueOverride = (): MethodDecorator => {
  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    // const result = Reflect.getMetadata(UNIQUE_IDENTIFIER, descriptor.value);
    // console.log(result);
    // console.log(Object.getOwnPropertyNames(props));

    let result = Reflect.getOwnMetadata(UNIQUE_IDENTIFIER, target);
    console.log(target.constructor);

    console.log(result);
    return descriptor;
  };
};
