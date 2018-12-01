import os
import sys

def rmNewline(str):
  return str.replace("\n", "")

cwd = os.getcwd()
input = ""

for line in sys.stdin:
  input = input + line
  
file = open(os.path.join(cwd, rmNewline(input)), "r")
print rmNewline(file.read())

file.close()

