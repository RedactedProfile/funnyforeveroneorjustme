CREATE TABLE `exerpts` (
  `id` char(36) NOT NULL,
  `content` TEXT,
  `ip` varchar(50) NOT NULL,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `exerpts_by_ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `votes` (
  `id` char(36) NOT NULL,
  `exerpt_id` char(36),
  `ip` varchar(50) NOT NULL,
  `is_funny` smallint(1) NOT NULL DEFAULT 0,
  `date_added` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `votes_by_exerpt` (`exerpt_id`),
  KEY `votes_by_ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
