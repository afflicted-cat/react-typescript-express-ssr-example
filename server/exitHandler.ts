// tslint:disable: no-any no-console
const exitHandler = (options: any) => (err: any) => {
  if (options.cleanup) {
    process.stdout.write('clean');
  }
  if (err) {
    process.stdout.write(err.stack);
  }
  if (options.exit) {
    process.exit();
  }
  console.log('test');
};

process.stdin.resume();

// do something when app is closing
process.on('exit', exitHandler({ cleanup: true }));

// catches ctrl+c event
process.on('SIGINT', exitHandler({ exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler({ exit: true }));
process.on('SIGUSR2', exitHandler({ exit: true }));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler({ exit: true }));
process.on('unhandledRejection', exitHandler({ exit: false }));
