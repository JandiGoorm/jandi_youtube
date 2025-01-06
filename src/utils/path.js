export const buildPath = (endPoint, params) => {
  let path = endPoint;
  for (let key in params) {
    path = path.replace(`:${key}`, params[key]);
  }

  return path;
};
