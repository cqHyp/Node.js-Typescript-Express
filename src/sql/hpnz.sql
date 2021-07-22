/*
 Navicat Premium Data Transfer

 Source Server         : 112.74.198.15_3306
 Source Server Type    : MySQL
 Source Server Version : 50731
 Source Host           : 112.74.198.15:3306
 Source Schema         : hpnz

 Target Server Type    : MySQL
 Target Server Version : 50731
 File Encoding         : 65001

 Date: 22/07/2021 09:53:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for smscode
-- ----------------------------
DROP TABLE IF EXISTS `smscode`;
CREATE TABLE `smscode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '手机号',
  `code` int(11) DEFAULT NULL COMMENT '短信验证码',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '账号',
  `mobile` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '手机号',
  `avatar` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '头像',
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '密码',
  `shopId` int(11) DEFAULT NULL COMMENT '门店id',
  `token` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '登录验证信息',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`),
  UNIQUE KEY `mobile` (`mobile`),
  KEY `shopId` (`shopId`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '标题',
  `imgUrl` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '图片地址',
  `type` smallint(6) DEFAULT NULL COMMENT '类型 1：默认',
  `sortCode` int(11) DEFAULT NULL COMMENT '权重',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '分类标题',
  `desc` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '分类简述',
  `sortCode` int(11) DEFAULT NULL COMMENT '权重',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '商品名称',
  `price` bigint(20) DEFAULT NULL COMMENT '原价',
  `discountPrice` bigint(20) DEFAULT NULL COMMENT '折扣价格(真实)',
  `subTitle` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '副标题',
  `description` text COLLATE utf8mb4_bin COMMENT '商品详情富文本',
  `thumb` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '商品预览图',
  `imgArray` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '商品轮播图id数组',
  `category` int(11) DEFAULT NULL COMMENT '分类id',
  `status` smallint(6) DEFAULT NULL COMMENT '商品状态 0：已下架、1：已上架',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for screw
-- ----------------------------
DROP TABLE IF EXISTS `screw`;
CREATE TABLE `screw` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '弹簧名称',
  `model` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '弹簧型号',
  `price` bigint(20) DEFAULT NULL COMMENT '单价',
  `status` smallint(6) DEFAULT NULL COMMENT '商品状态 0：已下架、1：已上架',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shopName` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '门店名称',
  `shopNumber` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '门店编号',
  `shopAddress` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '门店地址',
  `license_url` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '营业执照照片',
  `legal_person_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '法人姓名',
  `legal_mobile` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '法人手机号',
  `legal_idcard_number` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '法人身份证号码',
  `legal_hometown` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '法人籍贯',
  `legal_idcard_front` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '法人身份证正面（国徽）',
  `legal_idcard_back` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '法人身份证反面（人脸）',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for smscode
-- ----------------------------
DROP TABLE IF EXISTS `smscode`;
CREATE TABLE `smscode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '手机号',
  `code` int(11) DEFAULT NULL COMMENT '短信验证码',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Table structure for t_dailya
-- ----------------------------
DROP TABLE IF EXISTS `t_dailya`;
CREATE TABLE `t_dailya` (
  `dailyA_id` int(11) NOT NULL AUTO_INCREMENT,
  `report_date` datetime DEFAULT '2021-07-21 02:50:14' COMMENT '日报日期',
  `user_id` int(11) DEFAULT NULL COMMENT '提交人外键t_user.id',
  `iteration` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '迭代号，如Ver 1.28.0',
  `R_pass_num` int(11) DEFAULT '0' COMMENT '测试通过需求数',
  `R_pass_detail` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '测试通过需求明细',
  `R_deny_num` int(11) DEFAULT '0' COMMENT '测试不通过需求数',
  `R_deny_detail` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '测试不通过需求明细',
  `R_checkdeny_num` int(11) DEFAULT '0' COMMENT '验收被打回需求数',
  `R_checkdeny_detail` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '验收被打回需求明细',
  `R_optimization_num` int(11) DEFAULT '0' COMMENT '提交优化需求数',
  `R_optimization_detail` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '提交优化需求明细',
  `R_totest` int(11) DEFAULT '0' COMMENT '截止当天下班待测试需求数',
  `R_intest` int(11) DEFAULT '0' COMMENT '截止当天下班测试中需求数',
  `B_test_num` int(11) DEFAULT '0' COMMENT '提交测试缺陷数',
  `B_test_detail` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '提交测试缺陷明细',
  `B_pass_num` int(11) DEFAULT '0' COMMENT '复测通过缺陷数',
  `B_pass_detail` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '复测通过缺陷明细',
  `B_deny_num` int(11) DEFAULT '0' COMMENT '复测不通过缺陷数',
  `B_deny_detail` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '复测不通过缺陷明细',
  `B_checkdeny_num` int(11) DEFAULT '0' COMMENT '被提仿真环境缺陷数',
  `B_checkdeny_detail` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '被提仿真环境缺陷明细',
  `B_formal_num` int(11) DEFAULT '0' COMMENT '提交正式缺陷数',
  `B_formal_detail` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '提交正式缺陷明细',
  `B_totest` int(11) DEFAULT '0' COMMENT '截止当天下班待测试缺陷数',
  `memo` text COLLATE utf8mb4_bin COMMENT '备注',
  `submittime` datetime DEFAULT '2021-07-21 02:50:14' COMMENT '日报提交时间',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`dailyA_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of t_dailya
-- ----------------------------
BEGIN;
INSERT INTO `t_dailya` VALUES (6, '2021-07-21 16:51:00', 1, '', 21, 'XZG-9309、XZG-9310、XZG-9312、XZG-9314、XZG-9315、XZG-9317、XZG-9319、XZG-9321、XZG-9323、XZG-9324、XZG-9325、XZG-9327、XZG-9328、XZG-9330、XZG-9333、XZG-9336、XZG-9339、XZG-9343、XZG-9344、XZG-9347、XZG-9350', 21, 'XZG-9309、XZG-9310、XZG-9312、XZG-9314、XZG-9315、XZG-9317、XZG-9319、XZG-9321、XZG-9323、XZG-9324、XZG-9325、XZG-9327、XZG-9328、XZG-9330、XZG-9333、XZG-9336、XZG-9339、XZG-9343、XZG-9344、XZG-9347、XZG-9350', 21, 'XZG-9309、XZG-9310、XZG-9312、XZG-9314、XZG-9315、XZG-9317、XZG-9319、XZG-9321、XZG-9323、XZG-9324、XZG-9325、XZG-9327、XZG-9328、XZG-9330、XZG-9333、XZG-9336、XZG-9339、XZG-9343、XZG-9344、XZG-9347、XZG-9350', 21, 'XZG-9309、XZG-9310、XZG-9312、XZG-9314、XZG-9315、XZG-9317、XZG-9319、XZG-9321、XZG-9323、XZG-9324、XZG-9325、XZG-9327、XZG-9328、XZG-9330、XZG-9333、XZG-9336、XZG-9339、XZG-9343、XZG-9344、XZG-9347、XZG-9350', 1, 2, 21, 'XZG-9309、XZG-9310、XZG-9312、XZG-9314、XZG-9315、XZG-9317、XZG-9319、XZG-9321、XZG-9323、XZG-9324、XZG-9325、XZG-9327、XZG-9328、XZG-9330、XZG-9333、XZG-9336、XZG-9339、XZG-9343、XZG-9344、XZG-9347、XZG-9350', 21, 'XZG-9309、XZG-9310、XZG-9312、XZG-9314、XZG-9315、XZG-9317、XZG-9319、XZG-9321、XZG-9323、XZG-9324、XZG-9325、XZG-9327、XZG-9328、XZG-9330、XZG-9333、XZG-9336、XZG-9339、XZG-9343、XZG-9344、XZG-9347、XZG-9350', 21, 'XZG-9309、XZG-9310、XZG-9312、XZG-9314、XZG-9315、XZG-9317、XZG-9319、XZG-9321、XZG-9323、XZG-9324、XZG-9325、XZG-9327、XZG-9328、XZG-9330、XZG-9333、XZG-9336、XZG-9339、XZG-9343、XZG-9344、XZG-9347、XZG-9350', 21, 'XZG-9309、XZG-9310、XZG-9312、XZG-9314、XZG-9315、XZG-9317、XZG-9319、XZG-9321、XZG-9323、XZG-9324、XZG-9325、XZG-9327、XZG-9328、XZG-9330、XZG-9333、XZG-9336、XZG-9339、XZG-9343、XZG-9344、XZG-9347、XZG-9350', 21, 'XZG-9309、XZG-9310、XZG-9312、XZG-9314、XZG-9315、XZG-9317、XZG-9319、XZG-9321、XZG-9323、XZG-9324、XZG-9325、XZG-9327、XZG-9328、XZG-9330、XZG-9333、XZG-9336、XZG-9339、XZG-9343、XZG-9344、XZG-9347、XZG-9350', 1, '', '2021-07-21 15:11:14', '2021-07-21 16:51:21', '2021-07-21 16:51:21');
COMMIT;

-- ----------------------------
-- Table structure for t_dailyb
-- ----------------------------
DROP TABLE IF EXISTS `t_dailyb`;
CREATE TABLE `t_dailyb` (
  `dailyB_id` int(11) NOT NULL AUTO_INCREMENT,
  `report_date` datetime DEFAULT '2021-07-21 02:50:14' COMMENT '日报日期',
  `user_id` int(11) DEFAULT NULL COMMENT '提交人外键t_user.id',
  `iteration` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '迭代号，如Ver 1.28.0',
  `task1_no` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务1测试编号',
  `task1_interface_num` int(11) DEFAULT '0' COMMENT '任务1涉及接口数',
  `task1_sampler_num` int(11) DEFAULT '0' COMMENT '任务1涉及请求数',
  `task1_script` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务1涉及脚本名',
  `task2_no` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务2测试编号',
  `task2_interface_num` int(11) DEFAULT '0' COMMENT '任务2涉及接口数',
  `task2_sampler_num` int(11) DEFAULT '0' COMMENT '任务2涉及请求数',
  `task2_script` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务2涉及脚本名',
  `task3_no` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务3测试编号',
  `task3_interface_num` int(11) DEFAULT '0' COMMENT '任务3涉及接口数',
  `task3_sampler_num` int(11) DEFAULT '0' COMMENT '任务3涉及请求数',
  `task3_script` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务3涉及脚本名',
  `task4_no` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务4测试编号',
  `task4_interface_num` int(11) DEFAULT '0' COMMENT '任务4涉及接口数',
  `task4_sampler_num` int(11) DEFAULT '0' COMMENT '任务4涉及请求数',
  `task4_script` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务4涉及脚本名',
  `task5_no` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务5测试编号',
  `task5_interface_num` int(11) DEFAULT '0' COMMENT '任务5涉及接口数',
  `task5_sampler_num` int(11) DEFAULT '0' COMMENT '任务5涉及请求数',
  `task5_script` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务5涉及脚本名',
  `task6_no` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务6测试编号',
  `task6_interface_num` int(11) DEFAULT '0' COMMENT '任务6涉及接口数',
  `task6_sampler_num` int(11) DEFAULT '0' COMMENT '任务6涉及请求数',
  `task6_script` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '任务6涉及脚本名',
  `memo` text COLLATE utf8mb4_bin COMMENT '备注',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`dailyB_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of t_dailyb
-- ----------------------------
BEGIN;
INSERT INTO `t_dailyb` VALUES (3, '2021-07-21 16:50:02', 1, 'Ver 1.30.0', 'XGZ-2311', 3, 6, 'test.jmx', '', 0, 0, '', '', 0, 0, '', '', 0, 0, '', '', 0, 0, '', '', 0, 0, '', '', '2021-07-21 16:50:37', '2021-07-21 16:50:37');
COMMIT;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '姓名',
  `indate` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '入职年月',
  `isactive` smallint(6) DEFAULT '1' COMMENT '1-在职，0-离职',
  `dailyA` smallint(6) DEFAULT '1' COMMENT '是否参与迭代功能测试 1-是，0-否',
  `dailyB` smallint(6) DEFAULT '0' COMMENT '是否参与接口自动化测试 1-是，0-否',
  `dailyC` smallint(6) DEFAULT '0' COMMENT '是否参与UI自动化测试 1-是，0-否',
  `dailyD` smallint(6) DEFAULT '1' COMMENT '是否参与其他工作 1-是，0-否',
  `memo` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '备注',
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT '123456' COMMENT '密码',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
-- Records of t_user
-- ----------------------------
BEGIN;
INSERT INTO `t_user` VALUES (1, '潘慕洁', '2021年2月', 1, 1, 1, 0, 1, NULL, '123456', '2021-07-21 10:51:30', '2021-07-21 10:51:42');
INSERT INTO `t_user` VALUES (2, '栗瑶', '2020年12月', 1, 1, 0, 0, 1, NULL, '123456', '2021-07-21 10:51:33', '2021-07-21 10:51:44');
INSERT INTO `t_user` VALUES (3, '成烁', '2021年5月', 1, 1, 0, 0, 1, NULL, '123456', '2021-07-21 10:51:36', '2021-07-21 10:51:47');
INSERT INTO `t_user` VALUES (4, '何嘉琦', '2021年5月', 1, 1, 0, 0, 1, NULL, '123456', '2021-07-21 10:51:38', '2021-07-21 10:51:49');
INSERT INTO `t_user` VALUES (5, '王文龙', '2021年7月', 1, 1, 0, 0, 1, NULL, '123456', '2021-07-21 10:51:40', '2021-07-21 10:51:51');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `unionid` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '姓名',
  `nickName` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '昵称',
  `gender` smallint(6) DEFAULT '0' COMMENT '性别 0：未知、1：男、2：女',
  `language` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '语言',
  `city` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '市',
  `province` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '省',
  `country` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '国家',
  `avatarUrl` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '头像地址',
  `password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '密码',
  `email` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '邮箱',
  `status` smallint(6) DEFAULT '1' COMMENT '状态 0：禁用、 1：正常',
  `company` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '公司',
  `mobile` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '手机号',
  `address` varchar(255) COLLATE utf8mb4_bin DEFAULT '' COMMENT '地址',
  `token` varchar(255) COLLATE utf8mb4_bin DEFAULT '',
  `session_key` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `session_key_updated_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

SET FOREIGN_KEY_CHECKS = 1;
