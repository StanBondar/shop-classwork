export const errorHandlerMiddleware = (err: any) => {
  console.log('Socket error catched');
  console.log(err)
}