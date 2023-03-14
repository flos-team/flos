-- MariaDB dump 10.19  Distrib 10.10.3-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: flosdev
-- ------------------------------------------------------
-- Server version	10.10.3-MariaDB-1:10.10.3+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `ban`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ban` (
  `ban_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `release_date` date DEFAULT NULL,
  `members_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`ban_id`),
  KEY `FK1iwropuery25ywkri4nammrfl` (`members_id`),
  CONSTRAINT `FK1iwropuery25ywkri4nammrfl` FOREIGN KEY (`members_id`) REFERENCES `members` (`members_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `report_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `conclusion` varchar(255) DEFAULT NULL,
  `confirmed_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `description` varchar(255) DEFAULT NULL,
  `reporter_id` bigint(20) DEFAULT NULL,
  `target_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `FKkna022pn5p891xg151d8n71bb` (`reporter_id`),
  KEY `FK8xld4l6dfx4sn3a7qj9hcgu3j` (`target_id`),
  CONSTRAINT `FK8xld4l6dfx4sn3a7qj9hcgu3j` FOREIGN KEY (`target_id`) REFERENCES `members` (`members_id`),
  CONSTRAINT `FKkna022pn5p891xg151d8n71bb` FOREIGN KEY (`reporter_id`) REFERENCES `members` (`members_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `attendance_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `login_date` date DEFAULT NULL,
  `members_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `FKbpfs54obja47ate14u3rb0n6j` (`members_id`),
  CONSTRAINT `FKbpfs54obja47ate14u3rb0n6j` FOREIGN KEY (`members_id`) REFERENCES `members` (`members_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES
(1,'2023-02-14',6),
(2,'2023-02-14',5),
(3,'2023-02-14',7),
(4,'2023-02-14',2),
(5,'2023-02-14',4),
(6,'2023-02-14',8),
(7,'2023-02-14',9),
(8,'2023-02-14',10),
(9,'2023-02-14',11),
(10,'2023-02-14',11),
(11,'2023-02-14',13),
(12,'2023-02-14',12),
(13,'2023-02-14',14),
(14,'2023-02-14',15),
(15,'2023-02-14',17),
(16,'2023-02-14',16),
(17,'2023-02-14',17),
(18,'2023-02-14',17),
(19,'2023-02-14',18),
(20,'2023-02-14',3),
(21,'2023-02-14',19),
(22,'2023-02-14',18),
(23,'2023-02-14',20),
(24,'2023-02-14',18),
(25,'2023-02-14',21),
(26,'2023-02-14',22),
(27,'2023-02-14',8),
(28,'2023-02-14',7),
(29,'2023-02-14',23),
(30,'2023-02-14',7),
(31,'2023-02-14',24),
(32,'2023-02-14',25),
(33,'2023-02-14',26),
(34,'2023-02-14',26),
(35,'2023-02-14',27),
(36,'2023-02-14',28),
(37,'2023-02-14',29),
(38,'2023-02-14',30),
(39,'2023-02-15',3),
(41,'2023-02-15',5),
(42,'2023-02-15',18),
(43,'2023-02-15',20),
(44,'2023-02-15',4),
(53,'2023-02-15',2),
(54,'2023-02-15',6),
(55,'2023-02-15',1),
(56,'2023-02-16',18),
(57,'2023-02-16',3),
(58,'2023-02-16',4),
(59,'2023-02-16',7),
(60,'2023-02-16',7),
(61,'2023-02-16',7),
(62,'2023-02-16',6),
(63,'2023-02-16',7),
(64,'2023-02-16',7),
(65,'2023-02-16',8),
(66,'2023-02-16',43),
(67,'2023-02-16',5),
(68,'2023-02-16',2),
(69,'2023-02-01',44),
(70,'2023-02-02',44),
(71,'2023-02-03',44),
(72,'2023-02-04',44),
(73,'2023-02-05',44),
(74,'2023-02-06',44),
(75,'2023-02-07',44),
(76,'2023-02-08',44),
(77,'2023-02-09',44),
(78,'2023-02-10',44),
(79,'2023-02-11',44),
(80,'2023-02-12',44),
(81,'2023-02-13',44),
(82,'2023-02-14',44),
(83,'2023-02-15',44),
(84,'2023-02-16',44);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookmark` (
  `bookmark_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `members_id` bigint(20) DEFAULT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`bookmark_id`),
  KEY `FK6oj34e8iqqrb05ovempy0yn5d` (`members_id`),
  KEY `FKkm47dr0i09mor5ks9aaebx15u` (`post_id`),
  CONSTRAINT `FK6oj34e8iqqrb05ovempy0yn5d` FOREIGN KEY (`members_id`) REFERENCES `members` (`members_id`),
  CONSTRAINT `FKkm47dr0i09mor5ks9aaebx15u` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
INSERT INTO `bookmark` VALUES
(1,7,2),
(5,2,17),
(6,5,21),
(15,6,23);
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(200) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `is_approve` bit(1) DEFAULT b'0',
  `modified_at` datetime(6) DEFAULT NULL,
  `par_comment_id` bigint(20) DEFAULT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  `pri_comment_id` bigint(20) DEFAULT NULL,
  `members_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FKdpfvmxdjigt43i2ckariyt9yg` (`par_comment_id`),
  KEY `FKs1slvnkuemjsq2kj4h3vhx7i1` (`post_id`),
  KEY `FK5h682ldp358x7qflxxytbds43` (`pri_comment_id`),
  KEY `FKovujcydofi09p973sci632omj` (`members_id`),
  CONSTRAINT `FK5h682ldp358x7qflxxytbds43` FOREIGN KEY (`pri_comment_id`) REFERENCES `comment` (`comment_id`),
  CONSTRAINT `FKdpfvmxdjigt43i2ckariyt9yg` FOREIGN KEY (`par_comment_id`) REFERENCES `comment` (`comment_id`),
  CONSTRAINT `FKovujcydofi09p973sci632omj` FOREIGN KEY (`members_id`) REFERENCES `members` (`members_id`),
  CONSTRAINT `FKs1slvnkuemjsq2kj4h3vhx7i1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES
(2,'안녕하세요','2023-02-14 15:31:36.743673','',NULL,NULL,5,NULL,13),
(4,'안녕하세요','2023-02-14 15:32:09.108274','\0',NULL,2,5,2,2),
(6,'커여워용','2023-02-14 15:38:54.375323','\0',NULL,NULL,7,NULL,3),
(7,'반가워요','2023-02-14 15:39:35.200683','\0',NULL,NULL,8,NULL,2),
(8,'안녕하세여~ 프로필에서 이름 변경도 가능합니다 😃','2023-02-14 15:39:46.096028','\0',NULL,NULL,8,NULL,8),
(9,'억텐 ㄴ','2023-02-14 15:40:10.054127','\0',NULL,NULL,2,NULL,7),
(11,'안녕하세요','2023-02-14 15:41:08.842452','\0',NULL,NULL,7,NULL,2),
(12,'뿌뿌','2023-02-14 15:41:17.653039','\0',NULL,NULL,8,NULL,3),
(13,'??','2023-02-14 15:41:42.927660','\0',NULL,NULL,9,NULL,3),
(14,'반갑습니다','2023-02-14 15:41:49.276406','\0',NULL,NULL,9,NULL,2),
(15,'반갑다','2023-02-14 15:42:42.181031','\0',NULL,NULL,10,NULL,2),
(16,'ㅎ요','2023-02-14 15:42:53.654534','\0',NULL,NULL,2,NULL,21),
(17,'엄','2023-02-14 15:43:03.470921','\0',NULL,NULL,3,NULL,21),
(18,'움 치킨','2023-02-14 15:43:07.067362','\0',NULL,NULL,10,NULL,22),
(19,'여기 사진 어떻게 올리나요?','2023-02-14 15:43:12.992244','\0',NULL,NULL,8,NULL,21),
(20,'화이팅','2023-02-14 15:43:22.078740','',NULL,NULL,1,NULL,24),
(22,'알아 ㅋ','2023-02-14 15:44:24.713152','\0',NULL,21,11,21,22),
(23,'이거 미친사람이네','2023-02-14 15:44:51.100178','\0',NULL,NULL,8,NULL,7),
(24,'내가 만든 쿠키 ~ 🍪','2023-02-14 15:45:16.221353','',NULL,NULL,14,NULL,22),
(25,'그저 고트','2023-02-14 15:45:31.845594','\0',NULL,NULL,16,NULL,22),
(26,'인정합니다','2023-02-14 15:46:09.782783','\0',NULL,25,16,25,21),
(27,'1','2023-02-14 15:46:22.536564','\0',NULL,NULL,14,NULL,22),
(28,'2','2023-02-14 15:46:24.602723','\0',NULL,NULL,14,NULL,22),
(29,'3','2023-02-14 15:46:26.083180','\0',NULL,NULL,14,NULL,22),
(30,'4','2023-02-14 15:46:27.613117','\0',NULL,NULL,14,NULL,22),
(31,'5','2023-02-14 15:46:30.386683','\0',NULL,NULL,14,NULL,22),
(32,'빗물주세요','2023-02-14 15:47:11.266170','',NULL,NULL,17,NULL,24),
(33,'버그','2023-02-14 15:47:19.484090','\0',NULL,NULL,14,NULL,4),
(35,'저도 빗물 좀 ..','2023-02-14 15:47:39.437257','\0',NULL,NULL,17,NULL,22),
(36,'뿡','2023-02-14 15:50:51.990322','\0',NULL,10,1,10,5),
(37,'화이팅!','2023-02-14 15:50:57.342191','\0',NULL,20,1,20,5),
(38,'화이팅~','2023-02-14 15:53:48.129733','\0',NULL,NULL,15,NULL,5),
(39,'윙 치킨','2023-02-14 16:04:08.774158','\0',NULL,NULL,10,NULL,5),
(40,'안녕하세요 회장님','2023-02-14 16:05:21.060206','\0',NULL,15,10,15,5),
(41,'두두둥장','2023-02-14 16:11:42.139192','\0',NULL,NULL,16,NULL,3),
(42,'ee','2023-02-15 15:27:41.526967','\0',NULL,NULL,19,NULL,3),
(43,'백엔드 화이팅!','2023-02-15 16:30:02.520762','\0',NULL,NULL,21,NULL,5),
(44,'어쩔','2023-02-15 17:19:53.883431','\0',NULL,NULL,22,NULL,3),
(45,'아니다 내가 최고다','2023-02-15 17:20:14.539353','\0',NULL,NULL,22,NULL,1),
(46,'누가 최고인가?','2023-02-15 17:20:34.131668','\0',NULL,NULL,22,NULL,2),
(47,'신고합니다','2023-02-16 09:04:44.570974','\0',NULL,45,22,45,7),
(48,'ㄷㄷ','2023-02-16 09:19:11.606805','\0',NULL,NULL,22,NULL,6),
(49,'굿뜨','2023-02-16 09:20:31.260225','\0',NULL,NULL,19,NULL,6);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_entity`
--

DROP TABLE IF EXISTS `file_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_entity` (
  `files_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `original_name` varchar(255) DEFAULT NULL,
  `saved_name` varchar(255) DEFAULT NULL,
  `saved_path` varchar(255) DEFAULT NULL,
  `members_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`files_id`),
  KEY `FKm54h5pexc9loi6sa1afalf58i` (`members_id`),
  CONSTRAINT `FKm54h5pexc9loi6sa1afalf58i` FOREIGN KEY (`members_id`) REFERENCES `members` (`members_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_entity`
--

LOCK TABLES `file_entity` WRITE;
/*!40000 ALTER TABLE `file_entity` DISABLE KEYS */;
INSERT INTO `file_entity` VALUES
(4,'2023-02-06 00:00:00.000000','person1.jpg','person1.jpg',NULL,NULL),
(5,'2023-02-06 00:00:00.000000','person2.jpg','person2.jpg',NULL,NULL),
(6,'2023-02-06 00:00:00.000000','person3.jpg','person3.jpg',NULL,NULL),
(7,'2023-02-06 00:00:00.000000','person4.jpg','person4.jpg',NULL,NULL),
(8,'2023-02-06 00:00:00.000000','person5.jpg','person5.jpg',NULL,NULL),
(9,'2023-02-06 00:00:00.000000','person6.jpg','person6.jpg',NULL,NULL),
(10,'2023-02-14 15:11:08.828878','img_640x640.jpg','0d00a403-cacc-4488-852f-2c7c8cbd83e8.jpg','/home/ubuntu/flos/20230214/0d00a403-cacc-4488-852f-2c7c8cbd83e8.jpg',7),
(11,'2023-02-14 15:11:37.602157','다운로드.jpg','fa5a4a92-3016-413b-bf14-15ee1493e79f.jpg','/home/ubuntu/flos/20230214/fa5a4a92-3016-413b-bf14-15ee1493e79f.jpg',7),
(12,'2023-02-14 15:11:39.119315','00501275_20190311.jpg','32146073-c477-4dc5-85b0-9b73b328d958.jpg','/home/ubuntu/flos/20230214/32146073-c477-4dc5-85b0-9b73b328d958.jpg',2),
(13,'2023-02-14 15:12:50.733631','20210606021959.1258656.jpg','9925c397-2b33-4a59-b1b6-ec7a39879004.jpg','/home/ubuntu/flos/20230214/9925c397-2b33-4a59-b1b6-ec7a39879004.jpg',7),
(14,'2023-02-14 15:14:06.668504','99C1A4385E395C8C13.jpg','9c5de5e2-1bc7-4be0-bc9c-b4e443acaf4a.jpg','/home/ubuntu/flos/20230214/9c5de5e2-1bc7-4be0-bc9c-b4e443acaf4a.jpg',2),
(15,'2023-02-14 15:17:15.856035','img_640x640.jpg','810a645f-81f7-4956-bcd5-170033d35b58.jpg','/home/ubuntu/flos/20230214/810a645f-81f7-4956-bcd5-170033d35b58.jpg',8),
(16,'2023-02-14 15:25:05.099497','img_640x640.jpg','38e42d21-1a9a-4180-8adc-7d5b7b3e5d0c.jpg','/home/ubuntu/flos/20230214/38e42d21-1a9a-4180-8adc-7d5b7b3e5d0c.jpg',9),
(17,'2023-02-14 15:26:15.772372','img_640x640.jpg','cee3ff67-6ccd-4762-826f-433490a3ca26.jpg','/home/ubuntu/flos/20230214/cee3ff67-6ccd-4762-826f-433490a3ca26.jpg',10),
(18,'2023-02-14 15:27:15.932790','img_640x640.jpg','2527b682-9be2-4b7a-8444-7ebdc57dce1c.jpg','/home/ubuntu/flos/20230214/2527b682-9be2-4b7a-8444-7ebdc57dce1c.jpg',11),
(19,'2023-02-14 15:27:47.094408','img_640x640.jpg','88c83f30-3261-4d2b-97f1-f174d51bcd50.jpg','/home/ubuntu/flos/20230214/88c83f30-3261-4d2b-97f1-f174d51bcd50.jpg',13),
(20,'2023-02-14 15:28:14.128278','img_640x640.jpg','2b29c388-4243-4dce-95e0-1fa852527c36.jpg','/home/ubuntu/flos/20230214/2b29c388-4243-4dce-95e0-1fa852527c36.jpg',14),
(21,'2023-02-14 15:30:07.101568','img_640x640.jpg','73d3ea16-c681-4cff-883d-27b9c309aff2.jpg','/home/ubuntu/flos/20230214/73d3ea16-c681-4cff-883d-27b9c309aff2.jpg',15),
(22,'2023-02-14 15:30:36.187085','img_640x640.jpg','68814c07-da41-49fa-8d1f-231ffc539069.jpg','/home/ubuntu/flos/20230214/68814c07-da41-49fa-8d1f-231ffc539069.jpg',17),
(23,'2023-02-14 15:32:09.630128','img_640x640.jpg','f3e76eec-752d-4834-ac28-a9234679fac0.jpg','/home/ubuntu/flos/20230214/f3e76eec-752d-4834-ac28-a9234679fac0.jpg',18),
(24,'2023-02-14 15:34:57.369934','img_640x640.jpg','1691a966-39f1-4f4b-ae38-7c35a98172c2.jpg','/home/ubuntu/flos/20230214/1691a966-39f1-4f4b-ae38-7c35a98172c2.jpg',19),
(25,'2023-02-14 15:35:47.360529','img_640x640.jpg','1fe79654-538d-4f37-9734-e59902810c06.jpg','/home/ubuntu/flos/20230214/1fe79654-538d-4f37-9734-e59902810c06.jpg',20),
(26,'2023-02-14 15:36:27.744471','img_640x640.jpg','a15046d0-899a-4b14-b2ec-27a454b3cf23.jpg','/home/ubuntu/flos/20230214/a15046d0-899a-4b14-b2ec-27a454b3cf23.jpg',21),
(27,'2023-02-14 15:37:16.987820','IMG_0431.jpg','61cf9220-09c9-4c4b-97b5-32f4a5388838.jpg','/home/ubuntu/flos/20230214/61cf9220-09c9-4c4b-97b5-32f4a5388838.jpg',19),
(28,'2023-02-14 15:37:33.608418','img_640x640.jpg','f1de02f6-6a73-422e-b747-09ccfd0ecf57.jpg','/home/ubuntu/flos/20230214/f1de02f6-6a73-422e-b747-09ccfd0ecf57.jpg',22),
(29,'2023-02-14 15:41:29.347772','img_640x640.jpg','2f600e82-3bfc-4d5e-963e-7ff3b617e0d0.jpg','/home/ubuntu/flos/20230214/2f600e82-3bfc-4d5e-963e-7ff3b617e0d0.jpg',23),
(30,'2023-02-14 15:41:46.489869','unnamed.jpg','77ceace3-1cf6-4bae-be84-2f5aa9f7f0c5.jpg','/home/ubuntu/flos/20230214/77ceace3-1cf6-4bae-be84-2f5aa9f7f0c5.jpg',18),
(31,'2023-02-14 15:42:23.683314','img_640x640.jpg','05647b0a-0b4d-4072-b4ce-45e5f1193215.jpg','/home/ubuntu/flos/20230214/05647b0a-0b4d-4072-b4ce-45e5f1193215.jpg',24),
(32,'2023-02-14 15:44:37.122042','1671250021983.png','bab4cfc5-2020-4c44-89cf-3ff3dc03956e.png','/home/ubuntu/flos/20230214/bab4cfc5-2020-4c44-89cf-3ff3dc03956e.png',2),
(33,'2023-02-14 15:45:16.584886','img.gif','35c63817-bade-4100-892e-199294794293.gif','/home/ubuntu/flos/20230214/35c63817-bade-4100-892e-199294794293.gif',21),
(34,'2023-02-14 15:55:31.839024','img_640x640.jpg','b63de1ba-a3a3-4234-ab2b-c978bdf09387.jpg','/home/ubuntu/flos/20230214/b63de1ba-a3a3-4234-ab2b-c978bdf09387.jpg',25),
(35,'2023-02-14 15:56:11.678266','img_640x640.jpg','90f40772-574b-48d8-b1e0-4d650e7c3fa4.jpg','/home/ubuntu/flos/20230214/90f40772-574b-48d8-b1e0-4d650e7c3fa4.jpg',26),
(36,'2023-02-14 15:57:01.346085','baekprofile.jpg','75794e0e-5a91-4d3c-bd08-d1e26ba43b8f.jpg','/home/ubuntu/flos/20230214/75794e0e-5a91-4d3c-bd08-d1e26ba43b8f.jpg',25),
(37,'2023-02-14 16:22:21.610862','img_640x640.jpg','79eb510f-41a3-4a72-9c0d-4b4b31ed309d.jpg','/home/ubuntu/flos/20230214/79eb510f-41a3-4a72-9c0d-4b4b31ed309d.jpg',28),
(38,'2023-02-14 16:24:36.530119','img_640x640.jpg','26d3d289-da19-47e4-9552-ca8ebeae6b09.jpg','/home/ubuntu/flos/20230214/26d3d289-da19-47e4-9552-ca8ebeae6b09.jpg',29),
(39,'2023-02-14 16:27:49.472078','1672461772409.jpg','73291ee2-5a87-4010-ad46-24c84f774ec6.jpg','/home/ubuntu/flos/20230214/73291ee2-5a87-4010-ad46-24c84f774ec6.jpg',2),
(52,'2023-02-05 00:00:00.000000','catcat.jpg','catcat.jpg',NULL,1);
/*!40000 ALTER TABLE `file_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flower`
--

DROP TABLE IF EXISTS `flower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `flower` (
  `flower_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `blossom_at` datetime(6) DEFAULT NULL,
  `capacity` bigint(20) DEFAULT 10,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `flower_type` varchar(255) DEFAULT NULL,
  `gardening` bit(1) DEFAULT b'0',
  `lettering` bit(1) DEFAULT b'0',
  `height` bigint(20) DEFAULT NULL,
  `letter` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `files_id` bigint(20) DEFAULT NULL,
  `members_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`flower_id`),
  KEY `FKnwdysdowgoxwxf4u9p89nnyaa` (`files_id`),
  KEY `FKp9ou2a9bh7svin6yv7yv2jfwt` (`members_id`),
  CONSTRAINT `FKnwdysdowgoxwxf4u9p89nnyaa` FOREIGN KEY (`files_id`) REFERENCES `file_entity` (`files_id`),
  CONSTRAINT `FKp9ou2a9bh7svin6yv7yv2jfwt` FOREIGN KEY (`members_id`) REFERENCES `members` (`members_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flower`
--

LOCK TABLES `flower` WRITE;
/*!40000 ALTER TABLE `flower` DISABLE KEYS */;
INSERT INTO `flower` VALUES
(2,NULL,10,'2023-02-14 15:11:15.350879','Tulip','\0','\0',40,NULL,'엄준식',NULL,NULL,7),
(3,NULL,10,'2023-02-14 15:12:13.159009','Tulip','\0','\0',94,NULL,'가이드',NULL,NULL,5),
(4,NULL,10,'2023-02-14 15:25:13.491318','Tulip','\0','\0',48,NULL,'불꽃',NULL,NULL,9),
(5,NULL,10,'2023-02-14 15:26:33.190366','Tulip','\0','\0',40,NULL,'아오',NULL,NULL,10),
(6,NULL,10,'2023-02-14 15:27:48.445106','Tulip','\0','\0',76,NULL,'냠냠',NULL,NULL,11),
(7,NULL,10,'2023-02-14 15:28:15.225502','Tulip','\0','\0',36,NULL,'튜울립',NULL,NULL,12),
(8,NULL,10,'2023-02-14 15:28:23.031840','Tulip','\0','\0',72,NULL,'장미',NULL,NULL,14),
(9,NULL,10,'2023-02-14 15:29:08.858024','Tulip','\0','\0',22,NULL,'ji_flower','S1R1',NULL,13),
(10,NULL,10,'2023-02-14 15:30:52.795521','Tulip','\0','\0',56,NULL,'재짱','S1R1',NULL,15),
(11,NULL,10,'2023-02-14 15:30:57.943278','Tulip','\0','\0',50,NULL,'코스모스',NULL,NULL,16),
(12,'2023-02-15 17:19:42.571073',10,'2023-02-14 15:32:34.958336','TulipBlue','','',40,'안녕하세요111','테스트','S1R1',NULL,3),
(13,NULL,10,'2023-02-14 15:32:35.778999','Tulip','\0','\0',65,NULL,'튤립이애는착해요',NULL,NULL,18),
(15,NULL,10,'2023-02-14 15:35:55.616597','Tulip','\0','\0',57,NULL,'ㅁㄻㄴㅇㄻㄴㅇㄹ',NULL,NULL,20),
(18,NULL,10,'2023-02-14 15:38:07.562627','Tulip','\0','\0',37,NULL,'춘식이',NULL,NULL,8),
(20,NULL,10,'2023-02-14 15:42:40.391521','Tulip','\0','\0',53,NULL,'손니','S1R1',NULL,24),
(21,'2023-02-15 16:03:38.629102',10,'2023-02-14 15:43:37.349125','TulipBlue','','\0',38,NULL,'키키킼','S1R1',NULL,4),
(22,NULL,10,'2023-02-14 15:55:40.421496','Tulip','\0','\0',20,NULL,'튤립',NULL,NULL,25),
(23,NULL,10,'2023-02-14 15:56:20.209123','Tulip','\0','\0',81,NULL,'우왕',NULL,NULL,26),
(24,NULL,10,'2023-02-14 16:04:24.331495','Tulip','\0','\0',70,NULL,'규립',NULL,NULL,27),
(25,NULL,10,'2023-02-14 16:22:49.229852','Tulip','\0','\0',21,NULL,'오히려 좋아👍',NULL,NULL,28),
(26,NULL,10,'2023-02-14 16:24:46.589449','Tulip','\0','\0',37,NULL,'반장',NULL,NULL,29),
(27,NULL,10,'2023-02-14 16:29:57.965552','Tulip','\0','\0',60,NULL,'쑥쑥이',NULL,NULL,30),
(28,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipRed','','\0',30,NULL,'춘식이','S3R1',NULL,3),
(29,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipOrange','','\0',32,NULL,'석삼이','S3R1',NULL,3),
(30,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipYellow','','\0',34,NULL,'너구리','S2R1',NULL,3),
(31,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipRed','','\0',30,NULL,'춘식이','S3R1',NULL,4),
(32,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipOrange','','\0',32,NULL,'석삼이','S3R1',NULL,4),
(33,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipYellow','','\0',34,NULL,'너구리','S2R1',NULL,4),
(34,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipRed','','\0',30,NULL,'춘식이','S3R1',NULL,5),
(35,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipOrange','','\0',32,NULL,'석삼이','S3R1',NULL,5),
(36,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipYellow','','\0',34,NULL,'너구리','S2R1',NULL,5),
(37,'2023-02-15 17:48:12.420052',10,'2023-02-15 16:05:00.532596','TulipPurple','','\0',50,NULL,'줄리엣','S1R1',NULL,4),
(38,'2023-02-15 21:34:35.757503',10,'2023-02-15 17:21:09.161207','TulipPink','','\0',61,NULL,'onehee','S3R1',NULL,3),
(39,'2023-02-16 09:34:34.555129',10,'2023-02-15 20:13:56.833050','TulipPurple','','',59,NULL,'123','S3R1',NULL,4),
(40,'2023-02-15 21:35:38.178185',10,'2023-02-15 21:34:50.064738','TulipPink','','',61,'고마워 춘식아 만나서 반갑고 오래오래 행복하렴!\n가든에서 자주보자 춘식이 쵝오!','테스트','S1R3',NULL,3),
(41,'2023-02-15 21:37:31.347083',10,'2023-02-15 21:37:09.186390','TulipWhite','','',42,'룰루야 반갑고 가든에서 다시보자!','룰루','S1R1',NULL,3),
(42,'2023-02-15 21:41:52.559714',10,'2023-02-15 21:40:55.580508','TulipWhite','','',38,'뚜뚜야 반가워 가든에서 다시보자','뚜뚜','S1R1',NULL,3),
(43,NULL,10,'2023-02-15 21:42:23.110252','Tulip','\0','\0',78,NULL,'랄라',NULL,NULL,3),
(45,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipRed','','\0',50,NULL,'춘식이','S3R1',NULL,44),
(46,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipOrange','','\0',52,NULL,'석삼이','S3R1',NULL,44),
(47,'2023-02-08 00:00:00.000000',10,'2023-02-05 00:00:00.000000','TulipYellow','','\0',54,NULL,'너구리','S2R1',NULL,44);
/*!40000 ALTER TABLE `flower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follow` (
  `follow_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `follower_id` bigint(20) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `FKnoiuejlng8kw7wvqts9f85mfh` (`follower_id`),
  KEY `FKb2ru160as1kqkg26s3r17667o` (`owner_id`),
  CONSTRAINT `FKb2ru160as1kqkg26s3r17667o` FOREIGN KEY (`owner_id`) REFERENCES `members` (`members_id`),
  CONSTRAINT `FKnoiuejlng8kw7wvqts9f85mfh` FOREIGN KEY (`follower_id`) REFERENCES `members` (`members_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES
(2,22,3),
(3,22,5),
(4,3,2),
(6,5,22),
(7,5,18),
(8,25,23),
(9,2,23),
(11,18,5),
(12,7,3),
(13,6,4),
(14,6,3),
(15,3,22),
(16,3,7),
(17,3,6);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `members_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `email` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT '안녕하세요~',
  `last_login_at` datetime(6) DEFAULT NULL,
  `modified_at` datetime(6) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provider_type` varchar(255) DEFAULT 'LOCAL',
  `role_type` varchar(255) DEFAULT 'USER',
  `status` varchar(255) DEFAULT 'ACTIVE',
  `files_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`members_id`),
  KEY `FKplgyoce47yhsgvh86mk1cu7om` (`files_id`),
  CONSTRAINT `FKplgyoce47yhsgvh86mk1cu7om` FOREIGN KEY (`files_id`) REFERENCES `file_entity` (`files_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `notification_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `checked_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `message` varchar(255) DEFAULT NULL,
  `message_type` varchar(255) DEFAULT NULL,
  `reference_key` bigint(20) DEFAULT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `FKsx211v1rhgkexuj5drj2kpu0t` (`member_id`),
  CONSTRAINT `FKsx211v1rhgkexuj5drj2kpu0t` FOREIGN KEY (`member_id`) REFERENCES `members` (`members_id`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `post_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(2000) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `modified_at` datetime(6) DEFAULT NULL,
  `weather` varchar(255) DEFAULT NULL,
  `members_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FK4jh5r3u3qrmu3ij6wxsolu76f` (`members_id`),
  CONSTRAINT `FK4jh5r3u3qrmu3ij6wxsolu76f` FOREIGN KEY (`members_id`) REFERENCES `members` (`members_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES
(2,'우와 오늘부터 일기는 여기에 써야지!!\r\nFlos 덕분에 내 기분도 알 수 있고 귀여운 튤립도 키울 수 있다니!!!!!','2023-02-14 15:11:43.430263',NULL,'SUNNY',6),
(3,'너구리 다시마 두개 나왔다 당장 로또사러간다','2023-02-14 15:12:50.732707',NULL,'SUNNY',7),
(5,'안녕하세요','2023-02-14 15:31:12.077372',NULL,'CLOUDY',2),
(6,'안녕하시옴','2023-02-14 15:35:24.581038',NULL,'CLOUDY',3),
(7,'꼬소하이 쳐 직이네!','2023-02-14 15:37:16.987141',NULL,'RAINY',19),
(8,'반갑습니다','2023-02-14 15:38:51.139286',NULL,'CLOUDY',21),
(9,'어쩔방구 ㅋ 짜증','2023-02-14 15:41:23.599651',NULL,'RAINY',22),
(10,'안녕하십시오 휴먼','2023-02-14 15:42:31.189277',NULL,'SUNNY',18),
(11,'^^ 행복','2023-02-14 15:42:53.015549',NULL,'SUNNY',22),
(12,'이 감정분석은 긍정적으로 쓰면 햇빛을 줍니다 참 자알 하쥬?','2023-02-14 15:43:44.554072',NULL,'SUNNY',2),
(13,'당신의 프로젝트 내놓으십시오','2023-02-14 15:44:37.121307',NULL,'RAINY',2),
(14,'쿠쿠키','2023-02-14 15:44:40.904603',NULL,'CLOUDY',4),
(15,'안녕하세요. 마지막까지 모두 힘내봅시당','2023-02-14 15:44:53.085999',NULL,'SUNNY',24),
(16,'안녕하세요 제가바로 우주최강 GOAT ***입니다','2023-02-14 15:45:16.584087',NULL,'SUNNY',21),
(17,'프로젝트 눈물나네요...또륵','2023-02-14 15:46:06.100419',NULL,'RAINY',23),
(18,'월요일 좋아?','2023-02-14 16:24:39.898095',NULL,'CLOUDY',2),
(19,'글만 쓴 글','2023-02-14 16:26:55.585830',NULL,'CLOUDY',28),
(20,'횐님덜 새해복 많이^^','2023-02-14 16:27:49.471392',NULL,'CLOUDY',2),
(21,'redis 문제로 인해 DB가 어제 시점으로 초기화되고 있습니다.','2023-02-15 15:52:26.597480',NULL,'CLOUDY',3),
(22,'나는 ***다 나는 사람의 감정을 조종할 수 있다 나는 최고다','2023-02-15 16:55:46.915765',NULL,'SUNNY',4),
(23,'아악','2023-02-15 17:34:26.038601',NULL,'SUNNY',3);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_file`
--

DROP TABLE IF EXISTS `post_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_file` (
  `post_file_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `files_id` bigint(20) DEFAULT NULL,
  `post_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`post_file_id`),
  KEY `FK67sktdgej7dcthg8dsf1ptxy5` (`files_id`),
  KEY `FKn75omflablcagq3jsuoognqwy` (`post_id`),
  CONSTRAINT `FK67sktdgej7dcthg8dsf1ptxy5` FOREIGN KEY (`files_id`) REFERENCES `file_entity` (`files_id`),
  CONSTRAINT `FKn75omflablcagq3jsuoognqwy` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_file`
--

LOCK TABLES `post_file` WRITE;
/*!40000 ALTER TABLE `post_file` DISABLE KEYS */;
INSERT INTO `post_file` VALUES
(1,13,3),
(3,27,7),
(4,32,13),
(5,33,16),
(6,39,20);
/*!40000 ALTER TABLE `post_file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_tag`
--

DROP TABLE IF EXISTS `post_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_tag` (
  `post_tag_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) DEFAULT NULL,
  `tag_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`post_tag_id`),
  KEY `FKc2auetuvsec0k566l0eyvr9cs` (`post_id`),
  KEY `FKac1wdchd2pnur3fl225obmlg0` (`tag_id`),
  CONSTRAINT `FKac1wdchd2pnur3fl225obmlg0` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`tag_id`),
  CONSTRAINT `FKc2auetuvsec0k566l0eyvr9cs` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_tag`
--

LOCK TABLES `post_tag` WRITE;
/*!40000 ALTER TABLE `post_tag` DISABLE KEYS */;
INSERT INTO `post_tag` VALUES
(5,2,5),
(6,2,6),
(7,2,7),
(8,2,8),
(9,3,9),
(13,15,13),
(14,15,4),
(15,16,14),
(16,16,15),
(17,16,16),
(18,16,17),
(19,17,18),
(20,23,19);
/*!40000 ALTER TABLE `post_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `tag_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `UK_1r1tyf6uga9k6jwdqnoqwtk2a` (`tag_name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES
(4,'8기'),
(7,'가든'),
(12,'갤럭시'),
(16,'그와어깨를나란히할자과연누구인가'),
(14,'***그는신인가'),
(9,'너구리'),
(13,'대전'),
(3,'대전캠퍼스'),
(11,'보다'),
(15,'빛'),
(2,'싸피'),
(10,'아이폰'),
(5,'일기장'),
(8,'정원'),
(17,'***'),
(19,'태그'),
(6,'혁신적인SNS'),
(1,'화이팅'),
(18,'힘들어');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weather_resource`
--

DROP TABLE IF EXISTS `weather_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `weather_resource` (
  `weather_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT current_timestamp(6),
  `used_at` datetime(6) DEFAULT NULL,
  `weather_type` varchar(255) DEFAULT NULL,
  `contributor_id` bigint(20) DEFAULT NULL,
  `flower_id` bigint(20) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`weather_id`),
  KEY `FKaf7jl16tlxwcn5m5u4wofh3p1` (`contributor_id`),
  KEY `FKg6m6b85i9uko9edfggixgre61` (`flower_id`),
  KEY `FK7livp43laoljnitwoblv2tk5f` (`owner_id`),
  CONSTRAINT `FK7livp43laoljnitwoblv2tk5f` FOREIGN KEY (`owner_id`) REFERENCES `members` (`members_id`),
  CONSTRAINT `FKaf7jl16tlxwcn5m5u4wofh3p1` FOREIGN KEY (`contributor_id`) REFERENCES `members` (`members_id`),
  CONSTRAINT `FKg6m6b85i9uko9edfggixgre61` FOREIGN KEY (`flower_id`) REFERENCES `flower` (`flower_id`)
) ENGINE=InnoDB AUTO_INCREMENT=379 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weather_resource`
--

LOCK TABLES `weather_resource` WRITE;
/*!40000 ALTER TABLE `weather_resource` DISABLE KEYS */;
INSERT INTO `weather_resource` VALUES
(1,'2023-02-14 15:31:47.128359','2023-02-14 15:31:55.790082','SUNNY',5,10,15),
(2,'2023-02-14 15:32:00.779868','2023-02-14 15:57:52.303733','SUNNY',2,9,13),
(3,'2023-02-14 15:41:43.358786','2023-02-14 15:41:54.301575','SUNNY',5,17,22),
(4,'2023-02-14 15:42:34.440667',NULL,'RAINY',3,NULL,19),
(5,'2023-02-14 15:43:28.001917','2023-02-14 15:43:37.244088','SUNNY',5,20,24),
(6,'2023-02-14 15:44:05.458644','2023-02-15 16:02:50.890484','SUNNY',22,21,4),
(7,'2023-02-14 15:45:23.487036','2023-02-14 15:45:55.166767','SUNNY',4,17,22),
(8,'2023-02-14 15:47:22.650975','2023-02-14 15:48:11.566990','RAINY',23,20,24),
(9,'2023-02-15 15:24:54.418178','2023-02-15 17:19:35.119270','SUNNY',1,12,3),
(10,'2023-02-15 15:24:54.421753','2023-02-15 17:19:32.101760','RAINY',1,12,3),
(11,'2023-02-15 15:24:54.422737','2023-02-15 17:19:35.569940','SUNNY',1,12,3),
(12,'2023-02-15 15:24:54.424179','2023-02-15 17:19:34.603033','RAINY',1,12,3),
(13,'2023-02-15 15:24:54.427961','2023-02-15 17:19:37.076198','SUNNY',1,12,3),
(14,'2023-02-15 15:24:54.429145','2023-02-15 17:19:36.109737','RAINY',1,12,3),
(15,'2023-02-15 15:24:54.430218','2023-02-15 17:19:37.569431','SUNNY',1,12,3),
(16,'2023-02-15 15:24:54.431285','2023-02-15 17:19:36.531224','RAINY',1,12,3),
(17,'2023-02-15 15:24:54.434080','2023-02-15 17:19:38.725467','SUNNY',1,12,3),
(18,'2023-02-15 15:24:54.435097','2023-02-15 17:19:39.315746','RAINY',1,12,3),
(19,'2023-02-15 15:24:54.436105','2023-02-15 21:33:46.784865','SUNNY',1,38,3),
(20,'2023-02-15 15:24:54.436908','2023-02-15 21:33:48.541663','RAINY',1,38,3),
(21,'2023-02-15 15:24:54.437971','2023-02-15 21:33:46.935708','SUNNY',1,38,3),
(22,'2023-02-15 15:24:54.438809','2023-02-15 21:35:33.611279','RAINY',1,40,3),
(23,'2023-02-15 15:24:54.439714','2023-02-15 21:33:47.092361','SUNNY',1,38,3),
(24,'2023-02-15 15:24:54.440591','2023-02-15 21:35:34.330463','RAINY',1,40,3),
(25,'2023-02-15 15:24:54.441579','2023-02-15 21:33:47.263558','SUNNY',1,38,3),
(26,'2023-02-15 15:24:54.442563','2023-02-15 21:35:34.664067','RAINY',1,40,3),
(27,'2023-02-15 15:24:54.443453','2023-02-15 21:33:47.434979','SUNNY',1,38,3),
(28,'2023-02-15 15:24:54.444394','2023-02-15 21:35:34.965944','RAINY',1,40,3),
(29,'2023-02-15 15:24:54.445131','2023-02-15 21:33:47.591460','SUNNY',1,38,3),
(30,'2023-02-15 15:24:54.447544','2023-02-15 21:35:35.197935','RAINY',1,40,3),
(31,'2023-02-15 15:24:54.448417','2023-02-15 21:33:47.759837','SUNNY',1,38,3),
(32,'2023-02-15 15:24:54.449221','2023-02-15 21:35:35.415298','RAINY',1,40,3),
(33,'2023-02-15 15:24:54.450014','2023-02-15 21:33:47.920579','SUNNY',1,38,3),
(34,'2023-02-15 15:24:54.450775','2023-02-15 21:35:35.615741','RAINY',1,40,3),
(35,'2023-02-15 15:24:54.451626','2023-02-15 21:33:48.088836','SUNNY',1,38,3),
(36,'2023-02-15 15:24:54.452401','2023-02-15 21:35:35.810974','RAINY',1,40,3),
(37,'2023-02-15 15:24:54.453224','2023-02-15 21:35:33.126794','SUNNY',1,40,3),
(38,'2023-02-15 15:24:54.454257','2023-02-15 21:37:26.016771','RAINY',1,41,3),
(39,'2023-02-15 15:24:54.455113','2023-02-15 21:35:36.444258','SUNNY',1,40,3),
(40,'2023-02-15 15:24:54.455967','2023-02-15 21:37:26.474730','RAINY',1,41,3),
(41,'2023-02-15 15:24:54.456868','2023-02-15 21:37:26.925333','SUNNY',1,41,3),
(42,'2023-02-15 15:24:54.457805','2023-02-15 21:37:27.767047','RAINY',1,41,3),
(43,'2023-02-15 15:24:54.458700','2023-02-15 21:37:27.339139','SUNNY',1,41,3),
(44,'2023-02-15 15:24:54.459555','2023-02-15 21:37:28.165204','RAINY',1,41,3),
(45,'2023-02-15 15:24:54.460450','2023-02-15 21:37:28.585231','SUNNY',1,41,3),
(46,'2023-02-15 15:24:54.461297','2023-02-15 21:37:29.352372','RAINY',1,41,3),
(47,'2023-02-15 15:24:54.462262','2023-02-15 21:37:28.917535','SUNNY',1,41,3),
(48,'2023-02-15 15:24:54.464843','2023-02-15 21:37:29.750860','RAINY',1,41,3),
(49,'2023-02-15 15:24:54.465608','2023-02-15 21:41:47.340367','SUNNY',1,42,3),
(50,'2023-02-15 15:24:54.466471','2023-02-15 21:41:45.896232','RAINY',1,42,3),
(51,'2023-02-15 15:24:54.467196','2023-02-15 21:41:47.520862','SUNNY',1,42,3),
(52,'2023-02-15 15:24:54.468093','2023-02-15 21:41:46.100943','RAINY',1,42,3),
(53,'2023-02-15 15:24:54.468922','2023-02-15 21:41:47.709859','SUNNY',1,42,3),
(54,'2023-02-15 15:24:54.469847','2023-02-15 21:41:46.342306','RAINY',1,42,3),
(55,'2023-02-15 15:24:54.470885','2023-02-15 21:41:47.965817','SUNNY',1,42,3),
(56,'2023-02-15 15:24:54.471675','2023-02-15 21:41:46.524800','RAINY',1,42,3),
(57,'2023-02-15 15:24:54.472731',NULL,'SUNNY',1,NULL,3),
(58,'2023-02-15 15:24:54.473595','2023-02-15 21:41:46.752639','RAINY',1,42,3),
(59,'2023-02-15 15:24:54.474329',NULL,'SUNNY',1,NULL,3),
(60,'2023-02-15 15:24:54.475205','2023-02-15 21:41:48.574658','RAINY',1,42,3),
(61,'2023-02-15 15:24:54.476027',NULL,'SUNNY',1,NULL,3),
(62,'2023-02-15 15:24:54.476798',NULL,'RAINY',1,NULL,3),
(63,'2023-02-15 15:24:54.477690',NULL,'SUNNY',1,NULL,3),
(64,'2023-02-15 15:24:54.478648',NULL,'RAINY',1,NULL,3),
(65,'2023-02-15 15:24:54.486958',NULL,'SUNNY',1,NULL,3),
(66,'2023-02-15 15:24:54.487948',NULL,'RAINY',1,NULL,3),
(67,'2023-02-15 15:24:54.488816',NULL,'SUNNY',1,NULL,3),
(68,'2023-02-15 15:24:54.489607',NULL,'RAINY',1,NULL,3),
(69,'2023-02-15 15:24:54.490392',NULL,'SUNNY',1,NULL,3),
(70,'2023-02-15 15:24:54.491201',NULL,'RAINY',1,NULL,3),
(71,'2023-02-15 15:24:54.492150',NULL,'SUNNY',1,NULL,3),
(72,'2023-02-15 15:24:54.492917',NULL,'RAINY',1,NULL,3),
(73,'2023-02-15 15:24:54.493745',NULL,'SUNNY',1,NULL,3),
(74,'2023-02-15 15:24:54.494743',NULL,'RAINY',1,NULL,3),
(75,'2023-02-15 15:24:54.495687',NULL,'SUNNY',1,NULL,3),
(76,'2023-02-15 15:24:54.496704',NULL,'RAINY',1,NULL,3),
(77,'2023-02-15 15:24:54.497972',NULL,'SUNNY',1,NULL,3),
(78,'2023-02-15 15:24:54.498864',NULL,'RAINY',1,NULL,3),
(79,'2023-02-15 15:24:54.499958',NULL,'SUNNY',1,NULL,3),
(80,'2023-02-15 15:24:54.500713',NULL,'RAINY',1,NULL,3),
(81,'2023-02-15 15:24:54.501539',NULL,'SUNNY',1,NULL,3),
(82,'2023-02-15 15:24:54.502406',NULL,'RAINY',1,NULL,3),
(83,'2023-02-15 15:24:54.504931',NULL,'SUNNY',1,NULL,3),
(84,'2023-02-15 15:24:54.505855',NULL,'RAINY',1,NULL,3),
(85,'2023-02-15 15:24:54.506663',NULL,'SUNNY',1,NULL,3),
(86,'2023-02-15 15:24:54.507348',NULL,'RAINY',1,NULL,3),
(87,'2023-02-15 15:24:54.508238',NULL,'SUNNY',1,NULL,3),
(88,'2023-02-15 15:24:54.509053',NULL,'RAINY',1,NULL,3),
(89,'2023-02-15 15:24:54.510078',NULL,'SUNNY',1,NULL,3),
(90,'2023-02-15 15:24:54.510974',NULL,'RAINY',1,NULL,3),
(91,'2023-02-15 15:24:54.511655',NULL,'SUNNY',1,NULL,3),
(92,'2023-02-15 15:24:54.512628',NULL,'RAINY',1,NULL,3),
(93,'2023-02-15 15:24:54.513640',NULL,'SUNNY',1,NULL,3),
(94,'2023-02-15 15:24:54.514667',NULL,'RAINY',1,NULL,3),
(95,'2023-02-15 15:24:54.515606',NULL,'SUNNY',1,NULL,3),
(96,'2023-02-15 15:24:54.516517',NULL,'RAINY',1,NULL,3),
(97,'2023-02-15 15:24:54.517453',NULL,'SUNNY',1,NULL,3),
(98,'2023-02-15 15:24:54.518438',NULL,'RAINY',1,NULL,3),
(99,'2023-02-15 15:24:54.519455',NULL,'SUNNY',1,NULL,3),
(100,'2023-02-15 15:24:54.521895',NULL,'RAINY',1,NULL,3),
(101,'2023-02-15 15:24:54.522802',NULL,'SUNNY',1,NULL,3),
(102,'2023-02-15 15:24:54.523492',NULL,'RAINY',1,NULL,3),
(103,'2023-02-15 15:24:54.524220',NULL,'SUNNY',1,NULL,3),
(104,'2023-02-15 15:24:54.525307',NULL,'RAINY',1,NULL,3),
(105,'2023-02-15 15:24:54.526194',NULL,'SUNNY',1,NULL,3),
(106,'2023-02-15 15:24:54.527101',NULL,'RAINY',1,NULL,3),
(107,'2023-02-15 15:24:54.528014',NULL,'SUNNY',1,NULL,3),
(108,'2023-02-15 15:24:54.528984',NULL,'RAINY',1,NULL,3),
(109,'2023-02-15 15:25:00.177762','2023-02-15 16:03:33.791002','SUNNY',1,21,4),
(110,'2023-02-15 15:25:00.178755','2023-02-15 16:02:53.663061','RAINY',1,21,4),
(111,'2023-02-15 15:25:00.179643','2023-02-15 16:03:34.354666','SUNNY',1,21,4),
(112,'2023-02-15 15:25:00.180363','2023-02-15 16:03:32.815488','RAINY',1,21,4),
(113,'2023-02-15 15:25:00.181066','2023-02-15 16:03:34.826671','SUNNY',1,21,4),
(114,'2023-02-15 15:25:00.181883','2023-02-15 16:03:33.083583','RAINY',1,21,4),
(115,'2023-02-15 15:25:00.182637','2023-02-15 16:03:35.872499','SUNNY',1,21,4),
(116,'2023-02-15 15:25:00.183354','2023-02-15 16:03:35.347589','RAINY',1,21,4),
(117,'2023-02-15 15:25:00.184126','2023-02-15 17:48:08.931864','SUNNY',1,37,4),
(118,'2023-02-15 15:25:00.184877','2023-02-15 16:03:36.351415','RAINY',1,21,4),
(119,'2023-02-15 15:25:00.185699','2023-02-15 17:48:09.369117','SUNNY',1,37,4),
(120,'2023-02-15 15:25:00.188760','2023-02-15 17:48:05.843393','RAINY',1,37,4),
(121,'2023-02-15 15:25:00.189664','2023-02-15 17:48:09.765458','SUNNY',1,37,4),
(122,'2023-02-15 15:25:00.190415','2023-02-15 17:48:06.454624','RAINY',1,37,4),
(123,'2023-02-15 15:25:00.191279','2023-02-15 17:48:10.145755','SUNNY',1,37,4),
(124,'2023-02-15 15:25:00.192189','2023-02-15 17:48:06.888999','RAINY',1,37,4),
(125,'2023-02-15 15:25:00.192995','2023-02-15 20:13:58.417843','SUNNY',1,39,4),
(126,'2023-02-15 15:25:00.194093','2023-02-15 17:48:07.389894','RAINY',1,37,4),
(127,'2023-02-15 15:25:00.194855','2023-02-15 20:13:58.551642','SUNNY',1,39,4),
(128,'2023-02-15 15:25:00.195835','2023-02-15 17:48:07.793496','RAINY',1,37,4),
(129,'2023-02-15 15:25:00.196601','2023-02-15 20:13:58.704110','SUNNY',1,39,4),
(130,'2023-02-15 15:25:00.197358','2023-02-15 17:48:08.206280','RAINY',1,37,4),
(131,'2023-02-15 15:25:00.198205','2023-02-15 20:13:58.846378','SUNNY',1,39,4),
(132,'2023-02-15 15:25:00.199033',NULL,'RAINY',1,NULL,4),
(133,'2023-02-15 15:25:00.199798','2023-02-15 20:13:58.988601','SUNNY',1,39,4),
(134,'2023-02-15 15:25:00.200580',NULL,'RAINY',1,NULL,4),
(135,'2023-02-15 15:25:00.201361','2023-02-15 20:13:59.126462','SUNNY',1,39,4),
(136,'2023-02-15 15:25:00.203969',NULL,'RAINY',1,NULL,4),
(137,'2023-02-15 15:25:00.204678','2023-02-15 20:13:59.277515','SUNNY',1,39,4),
(138,'2023-02-15 15:25:00.205434',NULL,'RAINY',1,NULL,4),
(139,'2023-02-15 15:25:00.206315','2023-02-15 20:13:59.413559','SUNNY',1,39,4),
(140,'2023-02-15 15:25:00.207139',NULL,'RAINY',1,NULL,4),
(141,'2023-02-15 15:25:00.208019','2023-02-15 20:13:59.541052','SUNNY',1,39,4),
(142,'2023-02-15 15:25:00.208795',NULL,'RAINY',1,NULL,4),
(143,'2023-02-15 15:25:00.209585','2023-02-15 20:13:59.695443','SUNNY',1,39,4),
(144,'2023-02-15 15:25:00.210607',NULL,'RAINY',1,NULL,4),
(145,'2023-02-15 15:25:00.211396',NULL,'SUNNY',1,NULL,4),
(146,'2023-02-15 15:25:00.212316',NULL,'RAINY',1,NULL,4),
(147,'2023-02-15 15:25:00.213209',NULL,'SUNNY',1,NULL,4),
(148,'2023-02-15 15:25:00.214111',NULL,'RAINY',1,NULL,4),
(149,'2023-02-15 15:25:00.214932',NULL,'SUNNY',1,NULL,4),
(150,'2023-02-15 15:25:00.215803',NULL,'RAINY',1,NULL,4),
(151,'2023-02-15 15:25:00.216773',NULL,'SUNNY',1,NULL,4),
(152,'2023-02-15 15:25:00.217584',NULL,'RAINY',1,NULL,4),
(153,'2023-02-15 15:25:00.218466',NULL,'SUNNY',1,NULL,4),
(154,'2023-02-15 15:25:00.220940',NULL,'RAINY',1,NULL,4),
(155,'2023-02-15 15:25:00.221906',NULL,'SUNNY',1,NULL,4),
(156,'2023-02-15 15:25:00.222749',NULL,'RAINY',1,NULL,4),
(157,'2023-02-15 15:25:00.223689',NULL,'SUNNY',1,NULL,4),
(158,'2023-02-15 15:25:00.224520',NULL,'RAINY',1,NULL,4),
(159,'2023-02-15 15:25:00.225446',NULL,'SUNNY',1,NULL,4),
(160,'2023-02-15 15:25:00.226438',NULL,'RAINY',1,NULL,4),
(161,'2023-02-15 15:25:00.227282',NULL,'SUNNY',1,NULL,4),
(162,'2023-02-15 15:25:00.228201',NULL,'RAINY',1,NULL,4),
(163,'2023-02-15 15:25:00.229045',NULL,'SUNNY',1,NULL,4),
(164,'2023-02-15 15:25:00.229852',NULL,'RAINY',1,NULL,4),
(165,'2023-02-15 15:25:00.230794',NULL,'SUNNY',1,NULL,4),
(166,'2023-02-15 15:25:00.231680',NULL,'RAINY',1,NULL,4),
(167,'2023-02-15 15:25:00.232594',NULL,'SUNNY',1,NULL,4),
(168,'2023-02-15 15:25:00.233533',NULL,'RAINY',1,NULL,4),
(169,'2023-02-15 15:25:00.234303',NULL,'SUNNY',1,NULL,4),
(170,'2023-02-15 15:25:00.235228',NULL,'RAINY',1,NULL,4),
(171,'2023-02-15 15:25:00.236140',NULL,'SUNNY',1,NULL,4),
(172,'2023-02-15 15:25:00.238447',NULL,'RAINY',1,NULL,4),
(173,'2023-02-15 15:25:00.239332',NULL,'SUNNY',1,NULL,4),
(174,'2023-02-15 15:25:00.240128',NULL,'RAINY',1,NULL,4),
(175,'2023-02-15 15:25:00.240916',NULL,'SUNNY',1,NULL,4),
(176,'2023-02-15 15:25:00.241960',NULL,'RAINY',1,NULL,4),
(177,'2023-02-15 15:25:00.242859',NULL,'SUNNY',1,NULL,4),
(178,'2023-02-15 15:25:00.243679',NULL,'RAINY',1,NULL,4),
(179,'2023-02-15 15:25:00.244543',NULL,'SUNNY',1,NULL,4),
(180,'2023-02-15 15:25:00.245351',NULL,'RAINY',1,NULL,4),
(181,'2023-02-15 15:25:00.246015',NULL,'SUNNY',1,NULL,4),
(182,'2023-02-15 15:25:00.246777',NULL,'RAINY',1,NULL,4),
(183,'2023-02-15 15:25:00.247609',NULL,'SUNNY',1,NULL,4),
(184,'2023-02-15 15:25:00.248413',NULL,'RAINY',1,NULL,4),
(185,'2023-02-15 15:25:00.249362',NULL,'SUNNY',1,NULL,4),
(186,'2023-02-15 15:25:00.250204',NULL,'RAINY',1,NULL,4),
(187,'2023-02-15 15:25:00.251133',NULL,'SUNNY',1,NULL,4),
(188,'2023-02-15 15:25:00.251946',NULL,'RAINY',1,NULL,4),
(189,'2023-02-15 15:25:00.254566',NULL,'SUNNY',1,NULL,4),
(190,'2023-02-15 15:25:00.255500',NULL,'RAINY',1,NULL,4),
(191,'2023-02-15 15:25:00.256450',NULL,'SUNNY',1,NULL,4),
(192,'2023-02-15 15:25:00.257217',NULL,'RAINY',1,NULL,4),
(193,'2023-02-15 15:25:00.258056',NULL,'SUNNY',1,NULL,4),
(194,'2023-02-15 15:25:00.259233',NULL,'RAINY',1,NULL,4),
(195,'2023-02-15 15:25:00.260101',NULL,'SUNNY',1,NULL,4),
(196,'2023-02-15 15:25:00.261207',NULL,'RAINY',1,NULL,4),
(197,'2023-02-15 15:25:00.262239',NULL,'SUNNY',1,NULL,4),
(198,'2023-02-15 15:25:00.263109',NULL,'RAINY',1,NULL,4),
(199,'2023-02-15 15:25:00.264018',NULL,'SUNNY',1,NULL,4),
(200,'2023-02-15 15:25:00.264839',NULL,'RAINY',1,NULL,4),
(201,'2023-02-15 15:25:00.267498',NULL,'SUNNY',1,NULL,4),
(202,'2023-02-15 15:25:00.268509',NULL,'RAINY',1,NULL,4),
(203,'2023-02-15 15:25:00.269491',NULL,'SUNNY',1,NULL,4),
(204,'2023-02-15 15:25:00.270390',NULL,'RAINY',1,NULL,4),
(205,'2023-02-15 15:25:00.271212',NULL,'SUNNY',1,NULL,4),
(206,'2023-02-15 15:25:00.272083',NULL,'RAINY',1,NULL,4),
(207,'2023-02-15 15:25:00.272928',NULL,'SUNNY',1,NULL,4),
(208,'2023-02-15 15:25:00.273763',NULL,'RAINY',1,NULL,4),
(209,'2023-02-15 15:25:04.968835',NULL,'SUNNY',1,NULL,5),
(210,'2023-02-15 15:25:04.969953',NULL,'RAINY',1,NULL,5),
(211,'2023-02-15 15:25:04.970746',NULL,'SUNNY',1,NULL,5),
(212,'2023-02-15 15:25:04.973922',NULL,'RAINY',1,NULL,5),
(213,'2023-02-15 15:25:04.974665',NULL,'SUNNY',1,NULL,5),
(214,'2023-02-15 15:25:04.975613',NULL,'RAINY',1,NULL,5),
(215,'2023-02-15 15:25:04.976678',NULL,'SUNNY',1,NULL,5),
(216,'2023-02-15 15:25:04.977801',NULL,'RAINY',1,NULL,5),
(217,'2023-02-15 15:25:04.978711',NULL,'SUNNY',1,NULL,5),
(218,'2023-02-15 15:25:04.979841',NULL,'RAINY',1,NULL,5),
(219,'2023-02-15 15:25:04.980923',NULL,'SUNNY',1,NULL,5),
(220,'2023-02-15 15:25:04.982228',NULL,'RAINY',1,NULL,5),
(221,'2023-02-15 15:25:04.983292',NULL,'SUNNY',1,NULL,5),
(222,'2023-02-15 15:25:04.984311',NULL,'RAINY',1,NULL,5),
(223,'2023-02-15 15:25:04.985426',NULL,'SUNNY',1,NULL,5),
(224,'2023-02-15 15:25:04.986707',NULL,'RAINY',1,NULL,5),
(225,'2023-02-15 15:25:04.988000',NULL,'SUNNY',1,NULL,5),
(226,'2023-02-15 15:25:04.988946',NULL,'RAINY',1,NULL,5),
(227,'2023-02-15 15:25:04.989966',NULL,'SUNNY',1,NULL,5),
(228,'2023-02-15 15:25:04.991013',NULL,'RAINY',1,NULL,5),
(229,'2023-02-15 15:25:04.992024',NULL,'SUNNY',1,NULL,5),
(230,'2023-02-15 15:25:04.995556',NULL,'RAINY',1,NULL,5),
(231,'2023-02-15 15:25:04.996627',NULL,'SUNNY',1,NULL,5),
(232,'2023-02-15 15:25:04.997838',NULL,'RAINY',1,NULL,5),
(233,'2023-02-15 15:25:04.999011',NULL,'SUNNY',1,NULL,5),
(234,'2023-02-15 15:25:05.000161',NULL,'RAINY',1,NULL,5),
(235,'2023-02-15 15:25:05.001214',NULL,'SUNNY',1,NULL,5),
(236,'2023-02-15 15:25:05.002434',NULL,'RAINY',1,NULL,5),
(237,'2023-02-15 15:25:05.003239',NULL,'SUNNY',1,NULL,5),
(238,'2023-02-15 15:25:05.004281',NULL,'RAINY',1,NULL,5),
(239,'2023-02-15 15:25:05.005273',NULL,'SUNNY',1,NULL,5),
(240,'2023-02-15 15:25:05.006151',NULL,'RAINY',1,NULL,5),
(241,'2023-02-15 15:25:05.007051',NULL,'SUNNY',1,NULL,5),
(242,'2023-02-15 15:25:05.008004',NULL,'RAINY',1,NULL,5),
(243,'2023-02-15 15:25:05.008846',NULL,'SUNNY',1,NULL,5),
(244,'2023-02-15 15:25:05.009755',NULL,'RAINY',1,NULL,5),
(245,'2023-02-15 15:25:05.010526',NULL,'SUNNY',1,NULL,5),
(246,'2023-02-15 15:25:05.011687',NULL,'RAINY',1,NULL,5),
(247,'2023-02-15 15:25:05.015079',NULL,'SUNNY',1,NULL,5),
(248,'2023-02-15 15:25:05.016103',NULL,'RAINY',1,NULL,5),
(249,'2023-02-15 15:25:05.017095',NULL,'SUNNY',1,NULL,5),
(250,'2023-02-15 15:25:05.018060',NULL,'RAINY',1,NULL,5),
(251,'2023-02-15 15:25:05.018926',NULL,'SUNNY',1,NULL,5),
(252,'2023-02-15 15:25:05.020019',NULL,'RAINY',1,NULL,5),
(253,'2023-02-15 15:25:05.020866',NULL,'SUNNY',1,NULL,5),
(254,'2023-02-15 15:25:05.021887',NULL,'RAINY',1,NULL,5),
(255,'2023-02-15 15:25:05.022843',NULL,'SUNNY',1,NULL,5),
(256,'2023-02-15 15:25:05.023829',NULL,'RAINY',1,NULL,5),
(257,'2023-02-15 15:25:05.024639',NULL,'SUNNY',1,NULL,5),
(258,'2023-02-15 15:25:05.025753',NULL,'RAINY',1,NULL,5),
(259,'2023-02-15 15:25:05.026702',NULL,'SUNNY',1,NULL,5),
(260,'2023-02-15 15:25:05.027683',NULL,'RAINY',1,NULL,5),
(261,'2023-02-15 15:25:05.028843',NULL,'SUNNY',1,NULL,5),
(262,'2023-02-15 15:25:05.029775',NULL,'RAINY',1,NULL,5),
(263,'2023-02-15 15:25:05.030828',NULL,'SUNNY',1,NULL,5),
(264,'2023-02-15 15:25:05.031830',NULL,'RAINY',1,NULL,5),
(265,'2023-02-15 15:25:05.034604',NULL,'SUNNY',1,NULL,5),
(266,'2023-02-15 15:25:05.035548',NULL,'RAINY',1,NULL,5),
(267,'2023-02-15 15:25:05.036576',NULL,'SUNNY',1,NULL,5),
(268,'2023-02-15 15:25:05.037308',NULL,'RAINY',1,NULL,5),
(269,'2023-02-15 15:25:05.038491',NULL,'SUNNY',1,NULL,5),
(270,'2023-02-15 15:25:05.039863',NULL,'RAINY',1,NULL,5),
(271,'2023-02-15 15:25:05.040813',NULL,'SUNNY',1,NULL,5),
(272,'2023-02-15 15:25:05.041579',NULL,'RAINY',1,NULL,5),
(273,'2023-02-15 15:25:05.042447',NULL,'SUNNY',1,NULL,5),
(274,'2023-02-15 15:25:05.043599',NULL,'RAINY',1,NULL,5),
(275,'2023-02-15 15:25:05.044401',NULL,'SUNNY',1,NULL,5),
(276,'2023-02-15 15:25:05.045233',NULL,'RAINY',1,NULL,5),
(277,'2023-02-15 15:25:05.046334',NULL,'SUNNY',1,NULL,5),
(278,'2023-02-15 15:25:05.047276',NULL,'RAINY',1,NULL,5),
(279,'2023-02-15 15:25:05.048301',NULL,'SUNNY',1,NULL,5),
(280,'2023-02-15 15:25:05.049109',NULL,'RAINY',1,NULL,5),
(281,'2023-02-15 15:25:05.051788',NULL,'SUNNY',1,NULL,5),
(282,'2023-02-15 15:25:05.052660',NULL,'RAINY',1,NULL,5),
(283,'2023-02-15 15:25:05.053662',NULL,'SUNNY',1,NULL,5),
(284,'2023-02-15 15:25:05.054577',NULL,'RAINY',1,NULL,5),
(285,'2023-02-15 15:25:05.055481',NULL,'SUNNY',1,NULL,5),
(286,'2023-02-15 15:25:05.056591',NULL,'RAINY',1,NULL,5),
(287,'2023-02-15 15:25:05.057550',NULL,'SUNNY',1,NULL,5),
(288,'2023-02-15 15:25:05.058403',NULL,'RAINY',1,NULL,5),
(289,'2023-02-15 15:25:05.059358',NULL,'SUNNY',1,NULL,5),
(290,'2023-02-15 15:25:05.060217',NULL,'RAINY',1,NULL,5),
(291,'2023-02-15 15:25:05.061090',NULL,'SUNNY',1,NULL,5),
(292,'2023-02-15 15:25:05.062029',NULL,'RAINY',1,NULL,5),
(293,'2023-02-15 15:25:05.062879',NULL,'SUNNY',1,NULL,5),
(294,'2023-02-15 15:25:05.063661',NULL,'RAINY',1,NULL,5),
(295,'2023-02-15 15:25:05.064593',NULL,'SUNNY',1,NULL,5),
(296,'2023-02-15 15:25:05.065651',NULL,'RAINY',1,NULL,5),
(297,'2023-02-15 15:25:05.066631',NULL,'SUNNY',1,NULL,5),
(298,'2023-02-15 15:25:05.069284',NULL,'RAINY',1,NULL,5),
(299,'2023-02-15 15:25:05.070236',NULL,'SUNNY',1,NULL,5),
(300,'2023-02-15 15:25:05.071227',NULL,'RAINY',1,NULL,5),
(301,'2023-02-15 15:25:05.071967',NULL,'SUNNY',1,NULL,5),
(302,'2023-02-15 15:25:05.072860',NULL,'RAINY',1,NULL,5),
(303,'2023-02-15 15:25:05.073851',NULL,'SUNNY',1,NULL,5),
(304,'2023-02-15 15:25:05.074859',NULL,'RAINY',1,NULL,5),
(305,'2023-02-15 15:25:05.075855',NULL,'SUNNY',1,NULL,5),
(306,'2023-02-15 15:25:05.076885',NULL,'RAINY',1,NULL,5),
(307,'2023-02-15 15:25:05.077753',NULL,'SUNNY',1,NULL,5),
(308,'2023-02-15 15:25:05.078594',NULL,'RAINY',1,NULL,5),
(309,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(310,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(311,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(312,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(313,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(314,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(315,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(316,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(317,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(318,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(319,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(320,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(321,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(322,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(323,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(324,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(325,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(326,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(327,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(328,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(329,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(330,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(331,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(332,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(333,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(334,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(335,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(336,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(337,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(338,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(339,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(340,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(341,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(342,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(343,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(344,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(345,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(346,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(347,'2023-02-16 10:03:00.853066',NULL,'SUNNY',1,NULL,44),
(348,'2023-02-16 10:03:00.853066',NULL,'RAINY',1,NULL,44),
(349,'2023-02-16 10:04:23.398441',NULL,'SUNNY',1,45,44),
(350,'2023-02-16 10:04:23.398441',NULL,'SUNNY',2,45,44),
(351,'2023-02-16 10:04:23.398441',NULL,'SUNNY',3,45,44),
(352,'2023-02-16 10:04:23.398441',NULL,'SUNNY',4,45,44),
(353,'2023-02-16 10:04:23.398441',NULL,'SUNNY',5,45,44),
(354,'2023-02-16 10:04:23.398441',NULL,'SUNNY',6,45,44),
(355,'2023-02-16 10:04:23.398441',NULL,'SUNNY',5,45,44),
(356,'2023-02-16 10:04:23.398441',NULL,'SUNNY',4,45,44),
(357,'2023-02-16 10:04:23.398441',NULL,'SUNNY',3,45,44),
(358,'2023-02-16 10:04:23.398441',NULL,'SUNNY',2,45,44),
(359,'2023-02-16 10:04:23.398441',NULL,'SUNNY',1,46,44),
(360,'2023-02-16 10:04:23.398441',NULL,'SUNNY',2,46,44),
(361,'2023-02-16 10:04:23.398441',NULL,'SUNNY',3,46,44),
(362,'2023-02-16 10:04:23.398441',NULL,'SUNNY',4,46,44),
(363,'2023-02-16 10:04:23.398441',NULL,'SUNNY',5,46,44),
(364,'2023-02-16 10:04:23.398441',NULL,'SUNNY',6,46,44),
(365,'2023-02-16 10:04:23.398441',NULL,'SUNNY',5,46,44),
(366,'2023-02-16 10:04:23.398441',NULL,'SUNNY',4,46,44),
(367,'2023-02-16 10:04:23.398441',NULL,'SUNNY',3,46,44),
(368,'2023-02-16 10:04:23.398441',NULL,'SUNNY',2,46,44),
(369,'2023-02-16 10:04:23.398441',NULL,'SUNNY',1,47,44),
(370,'2023-02-16 10:04:23.398441',NULL,'SUNNY',2,47,44),
(371,'2023-02-16 10:04:23.398441',NULL,'SUNNY',3,47,44),
(372,'2023-02-16 10:04:23.398441',NULL,'SUNNY',4,47,44),
(373,'2023-02-16 10:04:23.398441',NULL,'SUNNY',5,47,44),
(374,'2023-02-16 10:04:23.398441',NULL,'SUNNY',6,47,44),
(375,'2023-02-16 10:04:23.398441',NULL,'SUNNY',5,47,44),
(376,'2023-02-16 10:04:23.398441',NULL,'SUNNY',4,47,44),
(377,'2023-02-16 10:04:23.398441',NULL,'SUNNY',3,47,44),
(378,'2023-02-16 10:04:23.398441',NULL,'SUNNY',2,47,44);
/*!40000 ALTER TABLE `weather_resource` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 10:07:33
