export const isDefined = <T>(arg: T | null | undefined): arg is T => {
    return arg !== null && arg !== undefined;
  };