@echo off

npm run build

az functionapp create --resource-group Castle --consumption-plan-location eastus --runtime node --runtime-version 14 --functions-version 4 --name caslte_blueq_funcs --storage-account blueqst
