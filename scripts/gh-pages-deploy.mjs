import { execa } from 'execa';

(async () => {
  try {
    await execa('git', ['checkout', '--orphan', 'gh-pages']);
    await execa('pnpm', ['run', 'build']);
    await execa('git', ['--work-tree', 'dist', 'add', '--all']);
    await execa('git', ['--work-tree', 'dist', 'commit', '-m', 'gh-pages deployment']);
    await execa('git', ['push', 'origin', 'HEAD:gh-pages', '--force']);
    await execa('rm', ['-r', 'dist']);
    await execa('git', ['checkout', '-f', 'main']);
    await execa('git', ['branch', '-D', 'gh-pages']);
  } catch (e) {
    process.exit(1);
  }
})();
