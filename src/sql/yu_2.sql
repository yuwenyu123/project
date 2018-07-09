-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.5-10.0.14-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 h5-1803 的数据库结构
CREATE DATABASE IF NOT EXISTS `h5-1803` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `h5-1803`;


-- 导出  表 h5-1803.shopping 结构
CREATE TABLE IF NOT EXISTS `shopping` (
  `index` int(99) NOT NULL AUTO_INCREMENT,
  `id` varchar(50) NOT NULL DEFAULT '0',
  `name` varchar(50) NOT NULL DEFAULT '0',
  `qty` varchar(50) NOT NULL DEFAULT '0',
  `price` varchar(50) NOT NULL DEFAULT '0',
  `node` varchar(50) NOT NULL DEFAULT '0',
  `imgurl` varchar(50) NOT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='购物车';

-- 正在导出表  h5-1803.shopping 的数据：~1 rows (大约)
DELETE FROM `shopping`;
/*!40000 ALTER TABLE `shopping` DISABLE KEYS */;
INSERT INTO `shopping` (`index`, `id`, `name`, `qty`, `price`, `node`, `imgurl`) VALUES
	(3, '1', '通用名称：枸橼酸西地那非片', '1', '￥115.00', '商品编号：B01001530x', '../img/goods_1_4.jpg');
/*!40000 ALTER TABLE `shopping` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
