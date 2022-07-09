@echo off

del /Q /S build
call npm run build
call npm run start