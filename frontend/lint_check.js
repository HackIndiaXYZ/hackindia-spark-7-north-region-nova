const { execSync } = require('child_process');
try {
  const output = execSync('npx eslint src', { cwd: 'c:/Users/A/Downloads/Product/frontend', encoding: 'utf-8' });
  console.log('ESLINT SUCCESS\n', output);
} catch (error) {
  console.log('ESLINT ERROR\n', error.stdout);
  console.log(error.stderr);
}
