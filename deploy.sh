# 保存所有的修改
echo "执行命令：git add -A"
git add -A

# 把修改的文件提交
echo "执行命令：commit -m 'deploy'"
git commit -m 'deploy'

echo "git pull origin master"
git pull origin master
# 如果发布到 https://<USERNAME>.github.io
# git push -f https://github.com/fhtwl/socket.git master
git push -f https://github.com/fhtwl/socket.git master

# 提交成功
echo "提交成功"