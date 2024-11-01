export function SkeletonController(): ClassDecorator {
  return (target: object) => {
    console.log('STARTED', target);
  };
}
