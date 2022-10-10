const main = async () => {
  const { mountAppRemote2 } = await import("./src/mount");
  mountAppRemote2();
};

export default main;

export const app = main();
