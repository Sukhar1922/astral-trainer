### Данное руководство поможет настроить фронтенд приложение на сервере 

Для запуска веб-сервера потребуется python или node.js. В данном руководстве всё будет описано с использованием python под Ubuntu

## Самоподписанные сертификаты (Если нужно HTTPS и нет домена)

1. chmod +x generate.sh
2. bash generate.sh
3. sudo mv self.crt /etc/nginx/self.crt
4. sudo mv self.key /etc/nginx/self.key

## Nginx (Если нужен HTTPS)

1. cp nginx.conf.HTTPS.example astral_trainer
2. nano astral_trainer
3. sudo mv astral_trainer /etc/nginx/sites-available
4. sudo ln -s /etc/nginx/sites-available/astral_trainer /etc/nginx/sites-enabled/

## Nginx (Если нужен HTTP)

1. cp nginx.conf.HTTP.example astral_trainer
2. nano astral_trainer
3. sudo mv astral_trainer /etc/nginx/sites-available
4. sudo ln -s /etc/nginx/sites-available/astral_trainer /etc/nginx/sites-enabled/

## Перезапуск Nginx

1. sudo nginx -t
2. sudo systemctl restart nginx
