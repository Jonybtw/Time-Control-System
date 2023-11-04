-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 31, 2023 at 09:20 PM
-- Server version: 5.6.13
-- PHP Version: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mytimetracker`
--
CREATE DATABASE IF NOT EXISTS `mytimetracker` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `mytimetracker`;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) NOT NULL,
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `project_name`) VALUES
(9, 'A'),
(10, 'B'),
(11, 'C'),
(12, 'D');

-- --------------------------------------------------------

--
-- Table structure for table `time_tracking`
--

CREATE TABLE IF NOT EXISTS `time_tracking` (
  `tracking_id` int(11) NOT NULL AUTO_INCREMENT,
  `worker_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`tracking_id`),
  KEY `worker_id` (`worker_id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `time_tracking`
--

INSERT INTO `time_tracking` (`tracking_id`, `worker_id`, `project_id`, `start_time`, `end_time`) VALUES
(13, 8, 9, '2023-10-29 15:25:27', '2023-10-29 15:25:35'),
(14, 9, 10, '2023-10-29 15:25:45', '2023-10-29 15:25:49'),
(15, 10, 11, '2023-10-29 15:25:53', '2023-10-29 15:26:00'),
(16, 11, 12, '2023-10-29 15:26:31', '2023-10-29 15:26:36'),
(17, 8, 12, '2023-10-30 09:00:52', '2023-10-30 09:01:01'),
(18, 8, 9, '2023-10-31 10:38:52', '2023-10-31 10:39:06'),
(19, 9, 11, '2023-10-31 10:45:47', '2023-10-31 10:46:00'),
(20, 10, 11, '2023-10-31 20:29:49', '2023-10-31 20:30:29'),
(21, 9, 9, '2023-10-31 20:30:45', '2023-10-31 20:30:54');

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE IF NOT EXISTS `workers` (
  `worker_id` int(11) NOT NULL AUTO_INCREMENT,
  `worker_name` varchar(255) NOT NULL,
  PRIMARY KEY (`worker_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`worker_id`, `worker_name`) VALUES
(8, 'Maria'),
(9, 'JoÃ£o'),
(10, 'Ana'),
(11, 'Pedro');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `time_tracking`
--
ALTER TABLE `time_tracking`
  ADD CONSTRAINT `time_tracking_ibfk_1` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`worker_id`),
  ADD CONSTRAINT `time_tracking_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
