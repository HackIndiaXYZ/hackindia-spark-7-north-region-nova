const { execSync } = require('child_process');
try {
  const output = execSync('npm run build', { cwd: 'c:/Users/A/Downloads/Product/frontend', encoding: 'utf-8' });
  console.log('BUILD SUCCESS\n', output);
} catch (error) {
  console.log('BUILD ERROR\n', error.stdout);
  console.log(error.stderr);
}
