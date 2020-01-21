# based on https://github.com/FitnessKeeper/terraform-lambda

import os
import subprocess
import urllib.request
import zipfile
import time
from shutil import copyfile

# Version of Terraform that we're using
TERRAFORM_VERSION = '0.12.19'

# Download URL for Terraform
TERRAFORM_DOWNLOAD_URL = (
        'https://releases.hashicorp.com/terraform/%s/terraform_%s_linux_amd64.zip'
        % (TERRAFORM_VERSION, TERRAFORM_VERSION))

# Paths where Terraform should be installed
TERRAFORM_DIR = os.path.join('/tmp', 'terraform_%s' % TERRAFORM_VERSION)
TERRAFORM_PATH = os.path.join(TERRAFORM_DIR, 'terraform')

def check_call(args, cwd='/tmp'):
    """Wrapper for subprocess that checks if a process runs correctly,
    and if not, prints stdout and stderr.
    """
    proc = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, cwd=cwd)
    stdout, stderr = proc.communicate()
    print(stdout)
    if proc.returncode != 0:
        print(stderr)
        raise subprocess.CalledProcessError(
            returncode=proc.returncode,
            cmd=args)


def install_terraform():
    """Install Terraform on the Lambda instance."""
    # Most of a Lambda's disk is read-only, but some transient storage is
    # provided in /tmp, so we install Terraform here.  This storage may
    # persist between invocations, so we skip downloading a new version if
    # it already exists.
    # http://docs.aws.amazon.com/lambda/latest/dg/lambda-introduction.html
    if os.path.exists(TERRAFORM_PATH):
        return

    urllib.request.urlretrieve(TERRAFORM_DOWNLOAD_URL, '/tmp/terraform.zip')

    with zipfile.ZipFile('/tmp/terraform.zip', 'r') as zip_ref:
        zip_ref.extractall(TERRAFORM_DIR)

    os.chmod(TERRAFORM_PATH, 0o755)

    # copy files TODO maybe get TF files from git or an artifact in S3 so all this doesn't have to be hardcoded
    lambda_dir = os.path.join(TERRAFORM_DIR, 'lambda')
    os.makedirs(lambda_dir)
    copyfile('main.tf', os.path.join(TERRAFORM_DIR, 'main.tf'))
    copyfile('static-site.tf', os.path.join(TERRAFORM_DIR, 'static-site.tf'))
    copyfile('lambda/terraform_apply.py', os.path.join(lambda_dir, 'terraform_apply.py'))
    copyfile('lambda/get_index_html_name.py', os.path.join(lambda_dir, 'get_index_html_name.py'))

# run when the lambda is loaded
install_terraform()

# run the terraform packaged with the lambda
def handler(event, context):
    check_call([TERRAFORM_PATH, 'init'], cwd=TERRAFORM_DIR)
    check_call([TERRAFORM_PATH, 'apply', '-input=false', '-auto-approve'], cwd=TERRAFORM_DIR)