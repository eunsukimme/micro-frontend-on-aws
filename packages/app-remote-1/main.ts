const main = async () => {
  const { mountAppRemote1 } = await import("./src/mount");
  mountAppRemote1();
};

export default main;

export const app = main();