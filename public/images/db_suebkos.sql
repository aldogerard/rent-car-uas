-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2023 at 06:10 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_suebkos`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`username`, `password`) VALUES
('admin', '123');

-- --------------------------------------------------------

--
-- Table structure for table `pengaduan`
--

CREATE TABLE `pengaduan` (
  `id` int(10) NOT NULL,
  `id_kamar` varchar(20) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `aduan` varchar(100) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengaduan`
--

INSERT INTO `pengaduan` (`id`, `id_kamar`, `nama`, `aduan`, `status`) VALUES
(1, '01', 'Budi Santoso', 'Kunci pagar lupa belum diberikan', 'Selesai'),
(2, '03', 'Febri Sulaiman', 'Air kamar mandi kotor', 'Selesai'),
(3, '05', 'Setyo Rahmanto', 'Air kamar mandi banyak uget-uget', 'Selesai'),
(4, '02', 'Reza Gunawan', 'kamar mandinya airnya keruh', 'Selesai'),
(5, '02', 'Reza Gunawan', 'Kamar sebelah gaduh banget', 'Belum Selesai');

-- --------------------------------------------------------

--
-- Table structure for table `penghuni`
--

CREATE TABLE `penghuni` (
  `id_kamar` varchar(20) NOT NULL,
  `nama` varchar(30) NOT NULL,
  `nik` varchar(30) NOT NULL,
  `kontak` varchar(20) NOT NULL,
  `alamat` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penghuni`
--

INSERT INTO `penghuni` (`id_kamar`, `nama`, `nik`, `kontak`, `alamat`, `password`) VALUES
('01', 'Budi Santoso', '3174020101940001', '082334567890', 'Jl. Merdeka No. 123, Jakarta Pusat', ''),
('02', 'Reza Gunawan', '1205072006950002', '089876543210', 'Jl. Raya Mawar 5A, Pasuruan', ''),
('03', 'Febri Sulaiman', '6401013103990003', '085765432109', 'Jl. Diponegoro No. 45, Bandung', ''),
('04', 'Slamet Widodo', '5106010110970005', '089876543210', 'Jl. Anggrek 7, Semarang', ''),
('05', 'Setyo Rahmanto', '9120081402990004', '082345678901', 'Jl. Pahlawan 10, Yogyakarta', ''),
('06', 'Ipul Miladi', '12313213321312', '3323323', 'Karangrejo1', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `tamu`
--

CREATE TABLE `tamu` (
  `id` int(10) NOT NULL,
  `id_kamar` varchar(20) NOT NULL,
  `nama_penghuni` varchar(30) NOT NULL,
  `nama_tamu` varchar(30) NOT NULL,
  `kontak_tamu` varchar(20) NOT NULL,
  `alasan` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tamu`
--

INSERT INTO `tamu` (`id`, `id_kamar`, `nama_penghuni`, `nama_tamu`, `kontak_tamu`, `alasan`) VALUES
(1, '03', 'Joko Raharjo', 'Ahmad Surya', '08345678901', 'Paman mengunjungi joko'),
(2, '01', 'Budi Santoso', 'Andi Wijaya', '085123456789', 'Mengantar saudara'),
(3, '02', 'Reza Gunawan', 'Maya Dewi', '08456789012', 'Ibu mengunjungi anak'),
(4, '02', 'Reza Gunawan', 'Raihan Putra', '08234567890', 'Kakak mengunjungi adik'),
(5, '01', 'Budi Santoso', 'Rudi Kurniawan', '08567890123', 'Mengantar Saudara');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pengaduan`
--
ALTER TABLE `pengaduan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penghuni`
--
ALTER TABLE `penghuni`
  ADD PRIMARY KEY (`id_kamar`);

--
-- Indexes for table `tamu`
--
ALTER TABLE `tamu`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_tamu` (`nama_tamu`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pengaduan`
--
ALTER TABLE `pengaduan`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tamu`
--
ALTER TABLE `tamu`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
