#!/bin/bash

echo "Введите IP сервера (для CN): "
read SERVER_IP

sudo openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout self.key \
  -out self.crt \
  -subj "/CN=$SERVER_IP"

echo "Сертификаты созданы:"
echo "  ssl/self.key"
echo "  ssl/self.crt"