@echo off

echo Running npm run build:libs
call npm run build:libs

echo Copying package.json to plugins
copy package.json .\plugins

echo Copying README.md to plugins
copy README.md .\plugins

echo Changing working directory to plugins
cd plugins

echo Publishing...
call npm publish

echo Cleaning up...
cd ..
if exist ".\scripts\windows\cleaner.bat" (
    call .\scripts\windows\cleaner.bat
) else (
    echo Warning: Windows cleanup script not found.
)

echo Done!
pause