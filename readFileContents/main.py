import os
import sys

cwd = os.getcwd()
input = ""

for line in sys.stdin:
  input = input + line
  
file = open(cwd + "/" + input.replace("\n", ""), "r")
print file.read().replace("\n", "")

file.close()

