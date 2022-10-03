import os
import subprocess
import sys
import shutil
import re
import zipfile

ux_project_dir = "castle_blueq_ux"
api_project_dir = "castle_blueq_api"

ux_dist_dir = f"{ux_project_dir}/dist/castle_blueq_ux"
ux_dest_dir = f"{api_project_dir}/www"

api_build_dir = f"{api_project_dir}/build"

dist_dir = "dist"

angular_asset_re = re.compile(r'((main|polyfills|runtime).*.js|favicon.ico|3rdparty.*.txt|styles.*.css)')

def command(cmd, dir):
    r = subprocess.run(list(cmd), shell=True, stdout=sys.stdout, stderr=sys.stderr, cwd=dir)
    if r.returncode != 0:
        raise Exception("Error running command.")

def clean_api():
    if os.path.isdir(api_build_dir):
        shutil.rmtree(api_build_dir)

def build_api():
    print("Building API.....")
    clean_api()
    command(["npm", "install"], api_project_dir)
    command(["npm", "run", "build"], api_project_dir)

def clean_ux_files():
    for f in os.listdir(ux_dest_dir):
        m = angular_asset_re.match(f)
        if m:
            os.unlink(os.path.join(ux_dest_dir, f))

def copy_ux():
    print("Copying UX files....")
    clean_ux_files()
    for f in os.listdir(ux_dist_dir):
        shutil.copy(f"{ux_dist_dir}/{f}", ux_dest_dir)

def build_ux():
    print("Building UX.....")
    command(["npm", "install"], ux_project_dir)
    command(["npm", "run", "build-production"], ux_project_dir)
    copy_ux()

def build():
    build_api()
    build_ux()

def create_zip():
    print("Creating zip file.")
    os.makedirs(dist_dir, exist_ok=True)
    shutil.make_archive(f"{dist_dir}/castle_blueq", "zip", api_project_dir)

def dist():
    build()
    create_zip()

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "dist"
    if target not in globals():
        raise Exception(f"target {target} not found.")
    else:
        print(f"Running {target}.....")
        globals()[target]()

main()