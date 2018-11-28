import System.Environment

main :: IO ()
main = do
    args <- getContents
    putStr args

