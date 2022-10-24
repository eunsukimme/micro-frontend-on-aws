const main = async () => {
  const { mountappOrder } = await import("./src/mount");
  mountappOrder();
};

export default main;

export const app = main();
