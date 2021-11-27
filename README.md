# Simple aws codecommit repository cloner

### Requirements
This tool works succefully with:

- aws-cli/1.18.69 
- Python/3.8.5
- Nodejs v14.18.1
- git version 2.25.1

### Configurations

You will need to have a correct configurations in .aws/config and .aws/credentials like....
```yml
#~/.aws/config

[profile my_profile]
output=json
region=us-east-1 # change this with your current aws codecommit region
```

```yml
#~/.aws/credentials
[my_profile]
aws_access_key_id = SAMPLEACCESSKEYIUU
aws_secret_access_key = UJ6zuuWIld0uCSppWbYK//U5q7O//sample//0uCSppWbYK
```

Also you will need to add this configuration to your .ssh/config file like this:
```yml
Host git-codecommit.*.amazonaws.com     # don't change this
  User APKARH4K4LEUASAAA                # you can get this value from your ssh profile, aws CodeCommit credentials 'SSH Key ID'
  IdentityFile ~/.ssh/your_pem.pem
```
To add your pem into aws codecommit you need to see this guide:

https://docs.aws.amazon.com/codecommit/latest/userguide/setting-up-ssh-unixes.html


### Installation and run

Just run npm i and run ```node index.js```, set your aws user defined in .aws/credentials when it's requested, all of your repositories will be cloned 
