const main = async () => {
  const { mountAppHost } = await import("./src/mount");
  mountAppHost();
};

export default main;

export const app = main();
