const inquirer = require('inquirer');
const shell = require('shelljs');
const gradient = require('gradient-string');

const setEnvVars = (answer) => {
  return process.env.AWS_PROFILE = answer.aws_user;
}

const getRepoInfo = (repositories) => {
 // aws codecommit batch-get-repositories --repository-names
  const repoMetadata = JSON.parse(shell.exec(`aws codecommit batch-get-repositories --repository-names ${repositories.join(' ')}`));
  const sshCloneUrl = repoMetadata.repositories.map(repo => repo.cloneUrlSsh);
  console.log(sshCloneUrl)
  return cloneRepos(sshCloneUrl);
}

const cloneRepos = (repositories) => {
  repositories.forEach(element => {
    console.log((gradient.cristal(`CLONING REPOSITORY ${element}`)));
    return shell.exec(`cd ${process.env.PWD}/repositories && git clone ${element}`)
  });
}

const questions = [
  {
    type: 'input',
    name: 'aws_user',
    message: 'Please select user defined in ~.aws/credentials:',
  },
]

inquirer.prompt(questions)
  .then((answer) => {  
    return (setEnvVars(answer));
  })
  .then(() => {
    if (!shell.which('git')) {
      shell.echo('Sorry, this script requires git installed');
      shell.exit(1);
    }
    if (!shell.which('aws')) {
      shell.echo('Sorry, this script requires aws cli installed');
      shell.exit(1);
    }
    console.log(`using ${process.env.AWS_PROFILE} to list repositories:`)
    const repos = JSON.parse((shell.exec('aws codecommit list-repositories --query "repositories[*].repositoryName"').stdout));
    return getRepoInfo(repos)
  })