export default async function onToastTimeout(): Promise<boolean> {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 3000);
  });
  return false;
}
