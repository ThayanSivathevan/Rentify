-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: rentify
-- ------------------------------------------------------
-- Server version	5.7.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `BranchID` int(11) NOT NULL AUTO_INCREMENT,
  `Location` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `BranchName` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`BranchID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'1st Street','Bob\'s Branch','Toronto'),(2,'2nd Street','Micheal\'s Branch','Mississauga'),(3,'3rd Street','Sophia\'s Branch','Ottawa'),(4,'4th Street','Diana\'s Branch','Oshawa'),(5,'5th Street','Jeff\'s Branch','Milton'),(6,'6th Street','Mylo\'s Branch','Newmarket');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `carsID` int(11) NOT NULL AUTO_INCREMENT,
  `carMake` varchar(45) DEFAULT NULL,
  `carUrl` varchar(1000) CHARACTER SET latin1 NOT NULL,
  `carBuild` varchar(45) CHARACTER SET latin1 NOT NULL,
  `carType` varchar(45) CHARACTER SET latin1 NOT NULL,
  `carModel` varchar(45) NOT NULL,
  `dailyPrice` float NOT NULL,
  `branchID` int(11) NOT NULL,
  PRIMARY KEY (`carsID`),
  KEY `branch-ID_idx` (`branchID`),
  CONSTRAINT `branch-ID` FOREIGN KEY (`branchID`) REFERENCES `branch` (`BranchID`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (10,'Acura','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-acura-tlx-467-1600871922.jpg?crop=0.628xw:0.470xh;0.120xw,0.398xh&resize=1200:*','Sedan','Classic','TLX',37,1),(11,'Acura','https://images.glaciermedia.ca/polopoly_fs/1.24176042.1595623306!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/acura-rdx-front-web-jpg.jpg','SUV','Classic','RDX',59,2),(12,'Acura','https://upload.wikimedia.org/wikipedia/commons/a/a7/2019_Acura_ILX_A-Spec%2C_front_11.4.19.jpg','Sedan','Classic','ILX',44,3),(13,'BMW','https://media.ed.edmunds-media.com/bmw/m3/2021/oem/2021_bmw_m3_sedan_base_fq_oem_4_1600.jpg','Sedan','Classic','M3',41,4),(14,'BMW','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-bmw-x5-mmp-1-1600284201.jpg','SUV','Classic','X5',47,5),(15,'BMW','https://www.carscoops.com/wp-content/uploads/2019/11/84223dd6-2020-bmw-m2-cs.jpg','Coupe','Classic','M2',50,6),(16,'Chrysler','https://medias.fcacanada.ca//specs/chrysler/chryslergrandcaravan/year-2021/media/images/feature/2021-chrysler-grand-caravan-feature-exterior-blue-minivan-parked-near-building_b1a15580d6a2ea74cecfe57c3419f800-1200x800.jpg','Van','Classic','Pacifica-Hybrid',70,1),(17,'Chrysler','https://www.motortrend.com/uploads/sites/5/2020/03/2020-Chrysler-300-005.jpg','Sedan','Classic','300',34,2),(18,'Chrysler','https://s.aolcdn.com/os/ab/_cms/2019/10/15035709/2020-chrysler-pacifica-red-s-1015-1.jpg','Van','Classic','Pacifica',33,3),(19,'Dodge','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-dodge-charger-mmp-1-1599602312.jpg?crop=0.971xw:0.727xh;0,0.125xh&resize=1200:*','Sedan','Classic','Charger',62,4),(20,'Dodge','https://cnet2.cbsistatic.com/img/UlWYWYKtnW3FEg98DPk0JrzIv_M=/756x425/2018/07/12/9025ef13-6a95-49e3-bf38-3be669a9a840/2019-dodge-durango-gt.jpg','SUV','Classic','Durango',35,5),(21,'Dodge','https://medias.fcacanada.ca//sites/brand/dodge/images/2019-dodge-grand-caravan-vehicle-selection-DCA18CA4_023_1bc349f02031a80bca99b66012bda694-630x300.jpg','Van','Classic','Grand Caravan',40,6),(22,'Ford','https://file.kelleybluebookimages.com/kbb/base/house/2020/2020-Ford-Fusion-FrontSide_FOFUS2001_640x480.jpg','Sedan','Classic','Fusion',68,1),(23,'Ford','https://cdn.jdpower.com/JDPA_2020%20Ford%20Expedition%20King%20Ranch%20White%20Front%20Quarter%20View.jpg','SUV','Classic','Expedition',77,2),(24,'Ford','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-ford-f-150-rendering-1586190703.jpg','Truck','Classic','F-150',69,3),(25,'Honda','https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/800x450/format/jpg/quality/85/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2020-11/26bf2920-2857-11eb-9f7c-b27e16ea465c','Sedan','Classic','Civic',65,4),(26,'Honda','https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/2019_Honda_Odyssey_EX-L_3.5L_front%2C_4.29.19.jpg/1200px-2019_Honda_Odyssey_EX-L_3.5L_front%2C_4.29.19.jpg','Van','Classic','Odyssey',37,5),(27,'Honda','https://media.ed.edmunds-media.com/honda/cr-v/2020/oem/2020_honda_cr-v_4dr-suv_touring_fq_oem_3_1600.jpg','SUV','Classic','CR-V',66,6),(28,'Nissan','https://cdn.jdpower.com/JDPA_2020%20Nissan%20Sentra%20SR%20Monarch%20Orange%20Front%20Quarter%20Small.jpg','Sedan','Classic','Sentra',37,1),(29,'Nissan','https://www.motortrend.com/uploads/sites/5/2019/09/2020-Nissan-TITAN-PRO-4X-front-three-quarter-2.jpg?fit=around%7C875:492','Truck','Classic','Titan',57,2),(30,'Nissan','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-nissan-rogue-107-1591910983.jpg?crop=0.897xw:0.673xh;0.0881xw,0.305xh&resize=1200:*','SUV','Classic','Rogue',78,3),(31,'Toyota','https://i.gaw.to/vehicles/photos/40/22/402203-2020-toyota-camry.jpg?640x400','Sedan','Classic','Camry',65,4),(32,'Toyota','https://cdn.motor1.com/images/mgl/Rp1oA/s1/2021-toyota-sienna.jpg','Van','Classic','Sienna',64,5),(33,'Toyota','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-toyota-trd-model-105-1594132097.jpg?crop=0.901xw:0.674xh;0.0641xw,0.139xh&resize=1200:*','Truck','Classic','Tacoma',72,6),(34,'Aston Martin','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2019-aston-martin-rapide-amr-101-1528815870.jpg','Sedan','Luxury','Rapide',232,1),(35,'Aston Martin','https://www.autocar.co.uk/sites/autocar.co.uk/files/styles/gallery_slide/public/images/car-reviews/first-drives/legacy/crop_dbx_12.jpg?itok=d48IIpcQ','SUV','Luxury','DBX',202,2),(36,'Bentley','https://www.motortrend.com/uploads/sites/5/2020/06/2021-Bentley-Bentayga-1.jpg','SUV','Luxury','Bentayga',130,3),(37,'Bentley','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2020-bentley-flying-spur-133-1571111916.jpg?crop=0.607xw:0.497xh;0.127xw,0.262xh&resize=1200:*','Sedan','Luxury','Flying Spur ',118,4),(38,'Cadillac','https://upload.wikimedia.org/wikipedia/commons/2/2e/2015_Cadillac_Escalade_ESV_Premium%2C_front_8.31.19.jpg','SUV','Luxury','Escalade',128,5),(39,'Cadillac','https://media.ed.edmunds-media.com/cadillac/cts-v/2018/oem/2018_cadillac_cts-v_sedan_base_fq_oem_1_1600.jpg','Sedan','Luxury','CTS',219,6),(40,'Ferrari','https://api.ferrarinetwork.ferrari.com/v2/network-content/medias/resize/5ddb97392cdb32285a799dfa-laferrari-2013-share?apikey=9QscUiwr5n0NhOuQb463QEKghPrVlpaF&width=1080','Coupe','Luxury','LaFerrari',112,1),(41,'Ferrari','https://coolmaterial.com/wp-content/uploads/2019/01/Jason-Stathams-2014-Ferrari-F12-Berlinetta-2-1000x600.jpg','Coupe','Luxury','F12',97,2),(42,'Jaguar','https://car-images.bauersecure.com/pagefiles/92452/jaguar_ftype_100.jpg','Coupe','Luxury','F-Type',263,3),(43,'Jaguar','https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/16q4/671590/2017-jaguar-f-pace-s-test-review-car-and-driver-photo-671927-s-original.jpg?fill=2:1&resize=480:*','SUV','Luxury','F-Pace',279,4),(44,'Lamborghini','https://www.motortrend.com/uploads/sites/5/2020/02/2020-Lamborghini-Aventador-SVJ-Roadster-45.jpg','Coupe','Luxury','Aventador SVJ',204,5),(45,'Lamborghini','https://media.ed.edmunds-media.com/lamborghini/urus/2019/oem/2019_lamborghini_urus_4dr-suv_base_fq_oem_1_1600.jpg','SUV','Luxury','Urus',236,6),(46,'Porsche','https://www.motortrend.com/uploads/sites/5/2017/04/2018-Porsche-911-GT3-front-three-quarter-in-motion-21-e1493739939385.jpg?fit=around%7C875:492','Coupe','Luxury','911 GT3',155,1),(47,'Porsche','https://images.hgmsites.net/hug/porsche-cayenne_100701552_h.jpg','SUV','Luxury','Cayenne',256,2),(48,'Rolls Royce','https://media.ed.edmunds-media.com/rolls-royce/phantom/2018/oem/2018_rolls-royce_phantom_sedan_base_fq_oem_2_1600.jpg','Sedan','Luxury','Phantom',144,3),(49,'Rolls Royce','https://www.cstatic-images.com/car-pictures/xl/usc90rrs011a01300.png','SUV','Luxury','Cullinan',155,4),(50,'Tesla','https://cdn.shopify.com/s/files/1/0196/5170/files/homepage_model_image_MX_caronly_1024x1024.jpg?v=1601062617','SUV','Luxury','X',172,5),(51,'Tesla','https://cdn.vox-cdn.com/thumbor/PY43CzvFnrR-r-11KvbVMNZkg6s=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9699825/Roadster_Front_58.jpg','Coupe','Luxury','Roadster',283,6);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `branchID` int(11) NOT NULL,
  `carID` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `totalPrice` float DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `user-id_idx` (`userID`),
  KEY `car-id_idx` (`carID`),
  KEY `orderBranch-id_idx` (`branchID`),
  CONSTRAINT `car-id` FOREIGN KEY (`carID`) REFERENCES `car` (`carsID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `orderBranch-id` FOREIGN KEY (`branchID`) REFERENCES `branch` (`BranchID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user-id` FOREIGN KEY (`userID`) REFERENCES `users` (`UsersID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (10,1,1,18,'2020-11-24','2020-11-27',132),(11,2,2,37,'2020-11-24','2020-11-26',354),(13,4,4,27,'2020-11-22','2020-11-24',198),(14,5,5,29,'2020-11-24','2020-11-30',399),(15,6,6,16,'2020-11-25','2020-11-29',350),(17,3,1,10,'2020-11-26','2020-11-26',37),(18,3,1,10,'2020-11-23','2020-11-25',111),(22,3,3,12,'2020-11-23','2020-11-27',220),(24,3,1,10,'2020-11-19','2020-11-22',1000),(25,3,1,10,'2020-11-15','2020-11-20',1000),(26,3,2,11,'2020-11-23','2020-11-23',118),(27,3,1,10,'2020-11-28','2020-12-05',296),(28,3,3,12,'2020-11-28','2020-12-02',220),(29,3,4,43,'2020-11-24','2020-11-28',1395);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UsersID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `lastName` varchar(45) CHARACTER SET latin1 NOT NULL,
  `password` varchar(45) CHARACTER SET latin1 NOT NULL,
  `Email` varchar(45) NOT NULL,
  PRIMARY KEY (`UsersID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`),
  UNIQUE KEY `UsersID_UNIQUE` (`UsersID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Monil','Patel','1234','patel@email.com'),(2,'Soham','Bhasvar','1234','bhasvar@email.com'),(3,'Thayan','Sivathevan','1234','siva@email.com'),(4,'Lefrancois','Valenski','1234','val@email.com'),(5,'Corey','Cors','1234','cors@email.com'),(6,'Avi','Raj','1234','raj@email.com'),(14,'Bob','Jobs','12345','bob1@email.com'),(15,'Thayan','Sivathevan','12345','bob@email.com'),(19,'Thayan','Sivathevan','12345','bob123@email.com'),(20,'Thayan','Sivathevan','1234','thayan123.siva@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-24 15:09:47
