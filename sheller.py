import json
import subprocess


def lambda_handler(event, context):
    output = subprocess.check_output(['/var/task/hellolambda'])
    print("this is a test")
    print(output)
