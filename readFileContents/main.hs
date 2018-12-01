{-# LANGUAGE OverloadedStrings #-}

import Data.Text(pack, unpack, replace)
import System.Environment
import System.Directory

removeNewline :: String -> String
removeNewline = unpack . replace "\n" "" . pack

main :: IO () 
main = do 
  fileName <- getContents
  currentDirectory <- getCurrentDirectory
  fileContents <- readFile (currentDirectory ++ "/" ++ (removeNewline fileName))
  putStr fileContents
     
