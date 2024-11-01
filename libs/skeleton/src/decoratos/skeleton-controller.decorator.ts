import { UNIQUE_IDENTIFIER } from '../constants';

export function SkeletonController(): ClassDecorator {
  return (target: object) => {
    Reflect.defineMetadata(UNIQUE_IDENTIFIER, 'haha', target);
  };
}
