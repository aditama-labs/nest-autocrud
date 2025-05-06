@echo off

echo Removing the plugins directory...
rmdir /s /q ".\plugins"
if exist ".\plugins" (
    echo Warning: Failed to remove the plugins directory.
)

echo Removing the dist directory...
rmdir /s /q ".\dist"
if exist ".\dist" (
    echo Warning: Failed to remove the dist directory.
)

echo Done removing directories.