# deploy учебного проекта "Mesto"
## Функционал
Одностраничный сайт с возоможностью добавить свои достопримечательности, редактировать свой профиль (фото, имя, род занятий) 
Имеется возможность регистрации, авторизации и выхода.
Приложение расположено на домене https://manproj.students.nomoredomains.sbs/

Здесь собраны фронт- и бэкенд проекта

Во фронтэнде:
* Реализованы всплывающие окна для редактирования профиля пользователя, ввода новой фотографиии с подписью, просмотра фото.
* Элемент сайта (информация о пользователе и галерея) заполняется после запроса информации на сервере.
* Флекс-сетка
* Грид-сетка
* Адаптивность
* Возможность закрытия фомы по Esc и кликом вне окна формы.
* Использованы единицы измерения, помогающие сделать верстку "резиновой": функция calc, относительные единицы измерения - %, дробные единицы в исчислении интерлиньяжа
* Использованы медиа-запросы

Бэкенд: создан сервер, который выполняет операции с данными (сохраняет новое место, выдает список имеющихся в базе, удаляет по запросу).
Кроме того - есть можем управлять пользователями: зарегистрировать нового , авторизовать, удалить.

## Использованы технологии
Node.js, React.js, Express.js, MongoDB

**Сейчас временно недоступно!**

## Для запуска проекта
При создании использован Webpack. 

Для установки зависимостей перейдите в папку с установленным проектом и введите команду 
npm install

затем - npm run start
В зависимости от места ввода эта команда запустит фронт или сервер бекэнда

## Статус проекта
Проект завершен и сдан