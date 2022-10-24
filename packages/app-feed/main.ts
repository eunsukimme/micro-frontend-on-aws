const main = async () => {
  const { mount } = await import("./src/mount");
  mount();
};

export default main;

export const app = main();
