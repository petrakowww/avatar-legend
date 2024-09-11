-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 28 2024 г., 04:59
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `avatar`
--

-- --------------------------------------------------------

--
-- Структура таблицы `admins`
--

CREATE TABLE `admins` (
  `id` int NOT NULL,
  `host` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `db` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `admins`
--

INSERT INTO `admins` (`id`, `host`, `user`, `db`, `password`) VALUES
(1, 'localhost', 'admin', 'avatar', '$2a$10$kqRuVvsMafiwdKx33dRD1uggkNzpkRdsdnSJs1IPgGWy4CWNPJekG');

-- --------------------------------------------------------

--
-- Структура таблицы `contacts`
--

CREATE TABLE `contacts` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `number` varchar(20) NOT NULL,
  `feedback_text` text NOT NULL,
  `feedback_date` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `contacts`
--

INSERT INTO `contacts` (`id`, `user_id`, `username`, `email`, `number`, `feedback_text`, `feedback_date`) VALUES
(7, 2, 'petrakow', 'petrakow@yandex.ru', '8(917)188-25-87', 'petrakowww', '2024-05-25 18:18:30'),
(8, 18, 'petrakow12345', 'petrakow12345@yandex.ru', '+79999999999', 'sdfsdsdfsdf', '2024-05-27 21:52:44'),
(9, 19, 'egor1', 'egor1@yandex.ru', '89999999999', 'ываыва', '2024-05-27 23:21:59');

-- --------------------------------------------------------

--
-- Структура таблицы `episodes`
--

CREATE TABLE `episodes` (
  `id` int NOT NULL,
  `season_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `duration` time DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `release_date` date DEFAULT NULL,
  `video_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `episodes`
--

INSERT INTO `episodes` (`id`, `season_id`, `title`, `duration`, `description`, `release_date`, `video_url`) VALUES
(51, 32, 'Мальчик из айсберга', '00:23:00', 'Девочка Катара вместе со своим братом Сокка – представители племени воды. С детства Катара знала от бабушки легенду об исчезнувшем аватаре и войне, длящейся более ста лет и развязанной хозяином огня Созином. Кроме того, Катара является магом воды и часто пользуется этим при ловле рыб. Однажды Катара и Сокка отправляются в море, где среди дрейфующих льдин пытаются наловить рыб. Подростки ссорятся, и поднявшаяся от гнева Катары энергия воды раскалывает проплывающий мимо айсберг, откуда дети спасают мальчика, назвавшегося Аангом. Вместе с мальчиком просыпается и огромный летающий бизон Аппа.', '2005-02-21', '/video/1716850802719-837389534-01 - Мальчик из айсберга.mkv'),
(52, 32, 'Возвращение аватара', '00:23:00', 'Во втором эпизоде Аанг узнаёт о войне, начавшейся сразу же после его исчезновения. Также происходит первая схватка с Зуко. Аанг пойман, но, применив магию воздуха, а позже перейдя в состояние Аватара, выбирается из плена.', '2005-02-21', '/video/1716850970020-154454430-02 - Возвращение Аватара.mkv'),
(53, 32, 'Южный храм воздуха', '00:23:00', 'С этого эпизода начинается долгое путешествие основных персонажей к Северному полюсу. И первой остановкой должен стать родной для Аанга Южный Храм Воздуха, где ему предстоит узнать страшную правду о своём народе. Зуко встречает своего соперника, адмирала Джао.', '2005-02-25', '/video/1716851026516-752618820-03 - Южный храм воздуха.mkv'),
(55, 32, 'Воины киоши', '00:23:00', 'Аанг, Сокка и Катара оказываются на острове Киоши (названном в честь одного из предыдущих аватаров). Здесь их сначала берут в плен, но потом встречают со всеми почестями. Впервые появляется Суюки. Она учит Сокку приёмам воительниц острова Киоши. О местонахождении Аанга узнаёт Зуко, что приводит к новой встрече с ним и его воинами.', '2005-03-04', '/video/1716851074149-224957272-04 - Воины Киоши.mkv'),
(56, 33, 'Царь Омашу', '00:23:00', 'Этот эпизод представляет нам ещё одного необычного персонажа, правителя города Омашу царя Буми. Он подвергает Аанга различным испытаниям, а в конце оказывается, что он — старый друг Аанга. Буми — очень сильный маг земли, Аанг называет его «безумным гением» за его выдающиеся идеи и сумасшедшее поведение.', '2005-03-18', '/video/1716851437698-812493231-05 - Царь Омашу.mkv'),
(57, 33, 'Пленные', '00:23:00', 'Эпизод, повествующий об одной из многочисленных деревнях племени Земли, захваченных людьми Огня. Там запрещена магия земли. А все маги находятся в тюрьме на барже, где не могут использовать магию. Освободиться им помогут Аанг, Сокка, а особенно Катара, сумевшая своей силой воли поднять магов земли на восстание.', '2005-03-25', '/video/1716851559284-949198725-06 - Пленные .mkv'),
(58, 33, 'Зимнее Солнцестояние, Часть 1: Мир Духов ', '00:23:00', 'Аанг с друзьями попадает в деревню, которой угрожает разгневанный лесной дух Хей Бай. Защищая жителей деревни, Аанг впервые попадает в Мир Духов, где знакомится с духом дракона Аватара Року, а также узнаёт, как ему с ним встретиться. Тем временем Зуко спасает своего дядю из плена магов земли.', '2005-04-08', '/video/1716851723432-809541219-07 - Зимнее Солнцестояние, Часть 1 - Мир Духов.mkv');

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` int NOT NULL,
  `episode_id` int NOT NULL,
  `user_id` int NOT NULL,
  `review_text` text NOT NULL,
  `review_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `episode_id`, `user_id`, `review_text`, `review_date`) VALUES
(79, 51, 19, 'Супер!', '2024-05-28'),
(84, 51, 2, 'fsdfsdf', '2024-05-28'),
(86, 51, 2, 'Cool!', '2024-05-28');

-- --------------------------------------------------------

--
-- Структура таблицы `seasons`
--

CREATE TABLE `seasons` (
  `id` int NOT NULL,
  `series_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `episode_count` int NOT NULL DEFAULT '0',
  `release_date` date DEFAULT NULL,
  `preview_image` varchar(255) NOT NULL,
  `view_count` int NOT NULL DEFAULT '0',
  `unique_number` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `seasons`
--

INSERT INTO `seasons` (`id`, `series_id`, `title`, `description`, `episode_count`, `release_date`, `preview_image`, `view_count`, `unique_number`) VALUES
(32, 1, 'Книга 1 - Вода (Часть 1)', 'Катара и её брат Сокка находят Аанга с Аппой и освобождают их из айсберга[8]. Аанг признаётся им, что он — Аватар, но пока владеет только родной стихией — воздухом. Ему необходимо обучиться магии ещё трёх стихий в определённом порядке, а именно: вода, земля и огонь. Втроём они решают отправиться в Северное племя воды, где Аанг смог бы найти себе учителя магии следующей по циклу стихии. По пути они посещают Южный храм воздуха, где аватар узнаёт об истреблении своего народа и находит там последнего крылатого лемура Момо, которого берёт с собой...', 4, '2005-02-21', '/img/seasons/previews/1716848331976-835424766-WaterBook1 Chapter1.webp', 16, 1),
(33, 1, 'Книга 1 - Вода (Часть 2)', 'На протяжении всего путешествия Аанга и его друзей преследует принц Зуко — изгнанный сын Озая, стремящийся пленить Аватара и тем самым вернуть себе честь и уважение[11]. Зуко путешествует вместе со своим дядей Айро — бывшим генералом армии народа огня и старшим братом Озая.\r\n\r\nВ конце сезона адмирал армии народа огня Джао нападает на Северное племя воды, стремясь убить физическое воплощение Духа Луны, чтобы лишить тем самым магов воды их силы. Аватару удаётся разрушить его планы. Тем временем Хозяин огня объявляет своего сына и брата предателями и посылает свою дочь Азулу схватить их.', 3, '2005-11-01', '/img/seasons/previews/1716848630738-961045025-WaterBook1.webp', 6, 2),
(34, 1, 'Книга 2 - Земля (Часть 1)', 'Аватар и его друзья покидают Северное племя воды, чтобы отыскать учителя магии земли. Им оказывается слепая девочка по имени Тоф Бейфонг. Тем временем Зуко и Айро пытаются начать новую жизнь на территории Царства земли. Найдя в пустыне Великую библиотеку, Аанг с друзьями узнают о предстоящем солнечном затмении, которое должно лишить магов огня их силы, сделав их беззащитными.', 0, '2006-03-17', '/img/seasons/previews/1716848837383-237820163-EarthBook 1 Chapter1.webp', 1, 3),
(35, 1, 'Книга 2 - Земля (Часть 2)', 'Они решают добраться до города Ба-Синг-Се, столицы Царства земли, и рассказать об этом царю. Но Азула при помощи тайной полиции города устраивает переворот и захватывает Ба-Синг-Се, а также уговаривает Зуко вновь встать на сторону народа огня. Позже она ударом молнии убивает Аанга, когда тот находится в состоянии аватара, но Катара возвращает его к жизни с помощью магической воды, полученной у Северного племени воды.', 0, '2006-10-07', '/img/seasons/previews/1716848961780-581903025-EarthBook 1 Chapter2.webp', 0, 4),
(36, 1, 'Книга 3 - Огонь (Часть 1)', 'Аватар, его друзья и многие другие персонажи, с которыми они повстречались в предыдущих сезонах, воспользовавшись затмением, устраивают вторжение в страну огня, чтобы победить Озая, но их планы рушатся, и им приходится отступать. Тем временем Зуко переосмысливает свои поступки, бросает вызов отцу и решает научить Аанга магии огня, вступив в команду аватара, которая принимает его.', 0, '2007-04-21', '/img/seasons/previews/1716849045306-187012974-FireBook 1 Chapter1.webp', 1, 5),
(37, 1, 'Книга 3 - Огонь (Часть 2)', 'В финале сезона Озай создаёт план, чтобы закончить войну раз и навсегда: сжечь Царство земли, чтобы лишить народ земли надежды на сопротивление и тем самым принудить к капитуляции. Хозяин огня выбирает для этого момент, когда в небе пролетает комета Созина, чьё появление вызывает увеличение способностей магов огня. Вместе с эскадрильей военных дирижаблей он отправляется к Царству земли. Друзья Аанга уничтожают эскадрилью, а сам он вступает в схватку с Хозяином огня, во время которой впадает в состояние аватара и лишает Озая магии, при этом не убивая его. В последней сцене сериала команда аватара празднует победу в чайной Айро, открытой им в Ба-Синг-Се. Мультфильм завершается поцелуем Аанга и Катары на фоне заходящего солнца.', 0, '2008-06-19', '/img/seasons/previews/1716849095664-359183416-FireBook 1 Chapter2.webp', 0, 6);

-- --------------------------------------------------------

--
-- Структура таблицы `series`
--

CREATE TABLE `series` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `preview_series` varchar(255) NOT NULL,
  `rating` decimal(3,2) NOT NULL DEFAULT '0.00',
  `release_date` date DEFAULT NULL,
  `genres` varchar(255) NOT NULL,
  `authors` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `series`
--

INSERT INTO `series` (`id`, `title`, `description`, `preview_series`, `rating`, `release_date`, `genres`, `authors`, `country`, `status`) VALUES
(1, 'Аватар: Легенда об Аанге', 'Всем тем, кто еще не успел безнадежно повзрослеть, обязательно понравится американский анимационный телесериал «Аватар: Легенда об Аанге», который можно смотреть в нашем онлайн-кинотеатре. Великолепный, продуманный до мелочей вымышленный мир, в котором сосуществуют четыре расы людей и несметное количество видов невероятных животных, по эпохальности и масштабности вполне сопоставим с далекой Галактикой «Звездных войн».\r\n\r\n                        Из предыстории сериала зрители узнают, что когда-то правитель народа огня возжелал возвыситься над тремя другими нациями – племенем воды, земли и воздушными кочевниками, –захватить их земли и подчинить своей воле. Лишь аватар Року был способен помешать коварным планам Созина. Но юный Аанг, в которого переродился повелитель четырех стихий, испугался ответственности, возложенной на него происхождением, покинул свой дом и, попав в океанский шторм, ушел в глубокий анабиоз, доступный всем аватарам. Очнувшись сто лет спустя, Аанг все же решится вступить в противостояние со Злом и восстановить баланс сил ради продолжения жизни на планете.', '/img/index/BG/BackgroundAvatar.jpg', '4.67', '2003-11-12', 'Фэнтези, Приключения, Комедийная драма', 'Майкл Данте Димартино, Брайан Кониецко', 'США', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `series_rating`
--

CREATE TABLE `series_rating` (
  `id` int NOT NULL,
  `series_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int NOT NULL,
  `rating_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `series_rating`
--

INSERT INTO `series_rating` (`id`, `series_id`, `user_id`, `rating`, `rating_date`) VALUES
(7, 1, 2, 5, '2024-05-24 19:10:05'),
(9, 1, 3, 5, '2024-05-24 19:19:53'),
(10, 1, 19, 4, '2024-05-28 02:18:59');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`) VALUES
(2, 'petrakow', 'petrakow@yandex.ru', '$2a$10$pbx.g/wD5kGC9yDgYZiPKeLN3WBEAQM1kdBQhdfK3ZKF6jJSlGpi6', '2024-05-23 22:22:01'),
(3, 'petrakow1', 'petrakow1@yandex.ru', '$2a$10$ZPjw9ndfGpwWADX4N8nbAOX/mmngjeaVgyiUEwm5A6dJZL.zF78Y2', '2024-05-24 03:23:28'),
(4, 'petrakow12', 'petrakow12@yandex.ru', '$2a$10$9RdfPysnTHEBP7i9nwH6/Ojuj80WNllfB6QWTrxBDyRLr1HAar4jq', '2024-05-25 04:35:23'),
(8, 'asdasd1', 'asdassssdas', '$2a$10$OSAlYHHR2HU6Kl3p5F8OAOP0xABjyvBFVmA/v7NVQ6zfNhpa37m/W', '2024-05-27 07:43:25'),
(9, 'asdasd2', 'asdasddda', '$2a$10$OSAlYHHR2HU6Kl3p5F8OAOP0xABjyvBFVmA/v7NVQ6zfNhpa37m/W', '2024-05-27 07:43:25'),
(11, 'asdasd4', 'asddssddas', '$2a$10$OSAlYHHR2HU6Kl3p5F8OAOP0xABjyvBFVmA/v7NVQ6zfNhpa37m/W', '2024-05-27 07:43:25'),
(16, 'check', 'petrakow123@yandex.ru', '$2a$10$SHWV41QOEu8HyXB/RQChY.QgO2C8V1bIzatMVw1Uhr461FHouD93e', '2024-05-27 19:15:02'),
(17, 'check1', 'check@mail.ru', '$2a$10$N/2iJ.WLSpesr7GDvUlwSu.RN4jFQ/qurZOFVnX53M5LAG50lxu.y', '2024-05-27 19:19:18'),
(18, 'petrakow12345', 'petrakow12345@yandex.ru', '$2a$10$j1bNu9bUvF8fUsi2lheLeuNVGFe9jlcUREDJ65y8nQBM.hOij6kiW', '2024-05-28 00:52:00'),
(19, 'egor1', 'egor1@yandex.ru', '$2a$10$9TSMTMlE6NJWNDc8bqZ4q.NNoBWkoeomKFemjo6/WLmkiqI7jCJd.', '2024-05-28 02:18:20');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db` (`db`);

--
-- Индексы таблицы `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `episodes`
--
ALTER TABLE `episodes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `episodes_ibfk_1` (`season_id`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `episode_id` (`episode_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `seasons`
--
ALTER TABLE `seasons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_number` (`unique_number`),
  ADD KEY `series_id` (`series_id`);

--
-- Индексы таблицы `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `series_rating`
--
ALTER TABLE `series_rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `series_id` (`series_id`),
  ADD KEY `series_rating_ibfk_2` (`user_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `episodes`
--
ALTER TABLE `episodes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT для таблицы `seasons`
--
ALTER TABLE `seasons`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT для таблицы `series`
--
ALTER TABLE `series`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `series_rating`
--
ALTER TABLE `series_rating`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `episodes`
--
ALTER TABLE `episodes`
  ADD CONSTRAINT `episodes_ibfk_1` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`episode_id`) REFERENCES `episodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `seasons`
--
ALTER TABLE `seasons`
  ADD CONSTRAINT `seasons_ibfk_1` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `series_rating`
--
ALTER TABLE `series_rating`
  ADD CONSTRAINT `series_rating_ibfk_1` FOREIGN KEY (`series_id`) REFERENCES `series` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `series_rating_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
