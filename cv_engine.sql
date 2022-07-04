-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 04, 2022 at 10:25 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cv_engine`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `jobID` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `applyDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `archives`
--

CREATE TABLE `archives` (
  `name` varchar(200) NOT NULL,
  `link` varchar(200) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `archives`
--

INSERT INTO `archives` (`name`, `link`, `id`) VALUES
('GEU Previous Year Papers 5th Sem', 'https://drive.google.com/drive/folders/1TRJz5l76RQ6Cb0a0EHywARAXN3LsKduj?usp=sharing', 1),
('TCS 501 System Software Lectures', 'https://drive.google.com/drive/folders/1RtQ3uXReVTDMtvujMQDQOjYySTFuuI_T?usp=sharing', 2),
('TCS 502 Operating System Lectures', 'https://drive.google.com/drive/folders/1ZkPPOxaLnmvYbAnGm6kDT-1ZP3alB4lx?usp=sharing', 3),
('PCS 503 DBMS Lab Work', 'https://drive.google.com/drive/folders/1-mC0CMreqrxpsxm4Iis2ik7awmPxhHah?usp=sharing', 4),
('Algorithms Hand Written Notes', 'https://drive.google.com/drive/folders/1nVyzjJDXpMnPnpAQidDtsOZWvAQ6_YXz?usp=sharing', 5),
('GATE CS MadeEasy HandWritten Notes', 'https://drive.google.com/drive/folders/16ScA03QIGDLtiUhoBMdGIwdToGS4_ujG?usp=sharing', 6),
('Mini Project', 'https://drive.google.com/drive/folders/1wNGD2C7NGNYGSJ69_kJmtUv5tntDRO6v?usp=sharing', 7);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `jobID` int(11) NOT NULL,
  `identifier` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `last_date` date NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `company` varchar(45) NOT NULL,
  `url` varchar(1000) NOT NULL,
  `min_xth` int(11) NOT NULL,
  `min_xii` int(11) NOT NULL,
  `min_curr` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`jobID`, `identifier`, `title`, `description`, `last_date`, `status`, `company`, `url`, `min_xth`, `min_xii`, `min_curr`, `created_at`) VALUES
(18, 'ea1b250b-a2b4-47c3-a66a-1ef9f4cc74c8', 'Backend Developer Internship', '<p><strong>About the Startup!</strong></p><p>BharatX is a startup trying to change how the 250 million Indian Middle-Class Indians get access to credit. We give Credit via other consumer-facing apps and platforms as-a-Feature to their customers via a simple integration of our APIs in a Plug-and-Play manner. Our offerings enable journeys like Postpaid on Uber/Ola, Pay after Trial on Lenskart/Meesho, Pay in 3 on Flipkart/BoAt, Credit-Line on PhonePe/Gpay in a white-labelled and embedded manner!</p><p><br></p><p><strong>Who We Are:</strong></p><p>A team of young, ambitious, and bold people love to dedicate their life’s work towards something meaningful for India &amp; the world. We love to have a shit ton of fun and cut the bullshit corporate culture! We are not colleagues, we are a family, in it for the long run!</p><p><br></p><p><strong>Folks who believe in us:</strong></p><p>We have been fortunate to have a lot of Global VCs, Founders, Clients, Angels and Industry veterans back us in our journey. We also have a lot of mentors in the Industry Globally who work with us day in, day out on building BharatX. Some of our Investors Include:</p><p><br></p><p><strong>Global VCs</strong></p><ul><li>Y Combinator (Batch of W22) (25+ Unicorns)</li><li>Soma Capital (20+ Unicorns)</li><li>8i Ventures (Slice &amp; M2P seed investors)</li><li>WorldQuant (Global Hedge Fund) &amp; it’s Executives</li><li>Multiply Ventures (Ex-Paytm President’s Fund)</li><li>Java Capital</li><li>Letsventure &amp; more…</li></ul><p><br></p><p><strong>Angels</strong></p><ul><li>Harshil Mathur and Shashank - Founders @ Razorpay</li><li>Kunal Shah - Founder @ CRED</li><li>Arash Ferdowsi - Co-Founder @ Dropbox</li><li>Vikas Chowdhury - President @ Reliance Jio</li><li>Ankur Aggarwal - Co-Founder @ Dunzo</li><li>Sajid Rahman - Board member - South Bangla Bank</li><li>Faiz Mayalakkara - Director of Investments @ UAE’s Sovereign Wealth Fund &amp; more….</li></ul><p><br></p><p>A special shout out to some of the clients of BharatX who have also chosen to back us, their vote of confidence in our product and vision is the most valuable to us.</p><p><br></p><p><strong>What you will impact:</strong></p><p>You will be directly owning and working on modules that will be or are already used in production. These modules are built for scale, and seeing something you worked on scaling to cater to so many users is amazing! You will be exposed to an array of technologies used within BharatX - including but not limited to SQL and NoSQL databases, message brokers, and HTTP servers. As a backend developer, you would be directly working on one or more of:</p><ul><li>Production server apps and systems that affect all our customers.</li><li>Realisation of algorithms connecting different data pipelines.</li><li>Infrastructure deployments that we use to support our products and services.</li><li>Integrations with third-party service providers.</li><li>Existing systems’ optimizations or redesign for better scale and stability.</li></ul><p><br></p><p><strong>What you will learn:</strong></p><p>How to get stuff done! You will solve real-world challenges that no experience or training can help you. Only your grit and passion for solving the problem will help you figure out how to deal with them. You will learn to deploy in scale that will affect millions in multiple ways - be it underwriting algorithms, APIs or databases.</p><p><br></p><p><strong><span class=\"ql-cursor\">﻿</span>Key Responsibilities:</strong></p><ul><li><strong>Develop back-end components, services, and APIs.</strong></li><li><strong>Write elegant, effective, and scalable code while maintaining the highest level of coding standards.</strong></li><li><strong>Take complete ownership of projects and ensure timely deliveries.</strong></li><li><strong>Participate actively in code reviews.</strong></li></ul><p><br></p>', '2022-07-31', 1, 'BharatX', '', 60, 60, 60, '2022-07-03 08:20:44'),
(19, '89d55c47-37f5-49f1-a6f3-cba10aab6c73', 'Software Development Intern', '<p><strong>About the job</strong></p><p>Sarva Labs is looking for Software Development Interns to join our multinational engineering team. You will get to work with a passionate group of experienced developers and contribute to the development of a state of art blockchain and distributed systems protocol called&nbsp;<a href=\"https://www.moi.technology/\" target=\"_blank\" style=\"color: rgb(10, 108, 255);\">MOI</a>.</p><p><br></p><p>Candidates must possess solid problem solving skills and programming experience in one or more system development languages such as C/C++, Java, Python or Golang.</p><p><br></p><p>During the course of the internship, you will learn programming in Golang and contribute to the development of the MOI Protocol. This will include acquiring knowledge on distributed systems, peer-to-peer networking concepts and decentralised computation.</p><p><br></p><p><strong>Must Haves:</strong></p><p><strong>• Development experience in one or more among C/C++, Java, Python and Go.</strong></p><p><strong>• Experience with Git or other Version Control Systems.</strong></p><p><strong>• Clear, effective, and proactive communication skills</strong></p><p><br></p><p><strong>Nice to Haves:</strong></p><p>• Knowledge about Blockchain Concepts, Dapps, Smart Contracts, etc</p><p>• Knowledge about Distributed Systems, Consensus Algorithms and Peer-to-Peer Networking.</p><p>• Knowledge about cryptographic principles used in blockchain technologies</p><p><br></p><p><a href=\"http://www.sarva.ai/\" target=\"_blank\" style=\"color: rgb(10, 108, 255);\"><strong>www.sarva.ai</strong></a></p><p><a href=\"http://www.moi.technology/\" target=\"_blank\" style=\"color: rgb(10, 108, 255);\"><strong>www.moi.technology</strong></a></p>', '2022-07-01', 1, 'Starva Labs', '', 75, 75, 75, '2022-07-03 08:22:23'),
(20, 'd8614b8f-9f92-47c4-8f60-70efd8b21ba8', 'AWS DevOps Engineer', '<h2>Job description</h2><p><br></p><p>Location : PAN India</p><p>Experience : 6+</p><p><br></p><p><strong>Roles and Responsibilities</strong></p><p><br></p><ul><li>Cloud Technologies ideally AWS plus AWS Associate Solution Architecture Certification or higher</li><li>Configuration Management either Ansible</li><li>Source Control Systems Git</li><li>Infrastructure as Code Terraform</li><li>Scripting skills – PowerShell, Bash, Python</li><li>Code Pipeline</li><li>containerization</li><li>Containerization Orchestration</li><li>Virtualization Technologies ideally one of the following</li><li>Windows Server</li><li>Linux Server (Cent OS)</li><li>Hands-on experience on DevOps tools like Jenkins, GIT will be added advantage</li><li>Knowledge on configuration tools like puppet/ansible</li></ul><p><br></p>', '2022-07-25', 1, 'TCS', '', 75, 75, 100, '2022-07-03 08:25:52'),
(21, '62ad0486-db67-4ca8-bb19-eef6b1c226ef', 'Big Data Lead', '<h2>Job description</h2><p><br></p><p>TCS IS HIRING FOR&nbsp;<strong>Big Data Lead - L3 Proficiency</strong></p><p><br></p><p>Role :<strong>Big Data Lead - L3 Proficiency</strong></p><p>Experience Range:&nbsp;<strong>5-12 yrs(Relevant)</strong></p><p>Location:&nbsp;<strong>Pan India</strong></p><p><br></p><p><strong>JD:</strong></p><p><br></p><p>Big Data Lead - L3 Proficiency</p><p><br></p><p>Must Have:</p><p><br></p><ul><li>Big Data Administrator with Infra experience (Hadoop / Cloudera)</li><li>Performance tuning of Hadoop clusters/ Upgrades</li></ul><p>Good to Have:</p><p><br></p><ul><li>5+ years of experience in Scala development</li><li>5+ Python Scripting</li><li>GIT Knowledge is required</li><li>Knowledge of ELK stack and their plugins</li><li>Knowledge on JSON</li><li>Play-framework or similar kind of any framework experience like MVC/jQuery.</li><li>Experiencing in using/maintaining the APIs</li></ul><p><br></p><p>Interested candidates pls share your cv to mailid :&nbsp;<strong>c.nayana@tcs.com</strong>&nbsp;with subject \"&nbsp;<strong>Big Data Lead\"</strong></p>', '2022-07-28', 1, 'TCS', '', 75, 75, 90, '2022-07-03 08:26:35'),
(22, '58d1b661-65cd-4498-8ecb-44a8f66bc001', 'Backend Developer', '<h3>About the job</h3><p><br></p><ul><li>Backend web developer with strong experience in Nodejs stack (Node, Express)</li><li>Experience with SQL (Postgres or similar) and NoSQL databases (MongoDB or similar). Experience in writing advanced DB queries with high performance.</li><li>Experience working AWS for deployment and management</li><li>Git and DevOps experience</li><li>Application security fundamentals including JWT, Oauth etc.</li></ul><p><br></p>', '2022-07-19', 1, 'NearBuzz', '', 80, 80, 80, '2022-07-03 08:33:16');

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `id` int(11) NOT NULL,
  `title` varchar(1000) NOT NULL,
  `body` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`id`, `title`, `body`, `created_at`, `updated_at`) VALUES
(7, 'NOTICE: STUDENT OUTREACH – IIT-DELHI & SAMSUNG PRESENT SOLVE FOR TOMORROW INNOVATION COMPETITION', '<p>FITT-IIT Delhi has partnered with Samsung India to launch an education and innovation competition called&nbsp;<strong>‘Solve for Tomorrow’</strong>&nbsp;to invite India’s brightest young minds to come up with innovative ideas that can transform the lives of people and communities.</p><p><br></p><p>Solve for Tomorrow aims to provide support to youth in India aged 16-22 years from across cities, towns, and villages. The competition is inviting ideas in the areas of Education, Environment, Healthcare, and Agriculture, the priority UN Sustainable Development Goals for India. Participants who want to apply for the Solve for Tomorrow competition can get detailed information on the program at&nbsp;<a href=\"http://www.samsung.com/in/solvefortomorrow\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">www.samsung.com/in/solvefortomorrow</a>.</p><p><br></p><p>The applications are open until 5 pm on&nbsp;<strong>31st July 2022</strong>. The winning teams will be rewarded with Samsung gadgets and up to&nbsp;<strong>Rs 1 Crore&nbsp;</strong>to scale their idea.</p><p><br></p><p>In this context,&nbsp;FITT-IIT Delhi is&nbsp;<strong>planning to organize an informative and engaging session with the young and talented minds</strong>. Through this session, they aim to motivate young innovators to come up with impactful ideas that have the potential to address the challenges faced by society. The tentative date for the session is 8th July 2022.</p><p><br></p><p>Once registered, kindly fill out the below google form and join the WhatsApp group for more updates:</p><p><br></p><p>Google form link:<a href=\"https://docs.google.com/forms/d/e/1FAIpQLSecZv4_OH7Wqa4wGnYeNHOENBnWJjxAVBFZCqdczOkVIS_TrQ/viewform?usp=sf_link\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">https://docs.google.com/forms/d/e/1FAIpQLSecZv4_OH7Wqa4wGnYeNHOENBnWJjxAVBFZCqdczOkVIS_TrQ/viewform?usp=sf_link</a></p><p><br></p><p>WhatsApp group:&nbsp;<a href=\"https://chat.whatsapp.com/BhvyUJ5NR9D9A8MXiVkikx\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">https://chat.whatsapp.com/BhvyUJ5NR9D9A8MXiVkikx</a></p>', '2022-07-03 02:40:57', '2022-07-03 02:40:57'),
(8, 'INFOSYS CERTIFICATION PROGRAM FOR 2023 PASS OUT BATCH', '<p>Infosys Certification is a technology accreditation that endorses the industry-readiness of students so that they can build a career of their choice. The examination process for Infosys Certification will test students for their knowledge in programming and databases. Students who clear the examination will become an ‘Infosys Certified Software Programmer’ and receive an interview opportunity for the Systems Engineer role at Infosys</p><p>Students may visit the Infosys Certification page and its FAQs on&nbsp;<a href=\"http://infytq.onwingspan.com/\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">InfyTQ</a>&nbsp;for more details.</p><p>Registrations for Infosys Certification are open from Monday, November 29, 2021, at InfyTQ (<a href=\"https://infytq.onwingspan.com/en/infytq-login\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">https://infytq.onwingspan.com/en/infytq-login</a>)&nbsp;for B.E., B.Tech, M.E., M.Tech, M.Sc., MCA, and MCM students graduating in 2023.</p><p><br></p><p><strong>Important points to note:</strong></p><p><strong><span class=\"ql-cursor\">﻿</span></strong></p><ul><li>All the rounds of Infosys Certification examination will be web-proctored online tests</li><li>Slots for the Certification Round will be available on a first-come, first-serve basis</li><li>It is advised to complete the recommended learning journey for Infosys Certification before taking the examination</li><li>Advantage Round is an optional round for students who clear the Certification Round to secure a pre-placement interview (PPI) opportunity for the Specialist Programmer and Digital Specialist Engineer roles</li><li>Certified students who opt to appear in the Advantage Round and do not clear it will continue to have the interview opportunity for the Systems Engineer role.</li></ul><p><br></p><p><strong>&nbsp;All 2023 passout students are advised to register at the earliest.&nbsp;</strong></p>', '2022-07-03 02:41:38', '2022-07-03 02:41:38'),
(9, 'SUSTAINABILITY HACKATHON BY ACCENTURE', '<p>Greetings from Accenture!</p><p><br></p><p>We are excited to share with you the Launch of the Sustainability Hackathon.</p><p><br></p><p>At Accenture, we are committed to infusing sustainability into everything we do and everyone we work with. Using the power of human ingenuity and technology, we are shaping a better world for our clients, partners, communities and our people. Our people are creating incredible things that don’t just last long but leave long-lasting value for future generations.</p><p><br></p><p>Students can participate in the Hackathon and register themselves for the event.</p><p><strong>Eligibility:</strong></p><p><strong>Students from all the batches – current batches (all years). This event is for only Engineering students.</strong></p><p><strong>last date for registration</strong>:&nbsp;<strong>5th&nbsp;May,2022</strong>.</p><p><strong>Registration Link:</strong></p><p><a href=\"https://www.hackerearth.com/challenges/hackathon/accenture-campus-students/\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">https://www.hackerearth.com/challenges/hackathon/accenture-campus-students/</a></p><p><strong>&nbsp;</strong></p><p><strong>For more information:</strong></p><p><a href=\"https://www.hackerearth.com/challenges/hackathon/accenture-campus-students/\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">https://www.hackerearth.com/challenges/hackathon/accenture-campus-students/</a></p><p><br></p><p><img src=\"https://www.accenture.com/t20220408T183020Z__w__/in-en/_acnmedia/Accenture/Redesign-Assets/Careers/Images/Marquee/17/Accenture-IN-sustainability-hackathon-marquee.jpg\" alt=\"Sustainability Hackathon | Accenture\"></p>', '2022-07-03 02:42:35', '2022-07-03 02:42:35'),
(10, 'TCS_ FLAGSHIP CONTESTS_CODEVITA AND ENQUODE REGISTRATIONS ARE OPEN', '<p>TCS Flagship Contests have started for students passing out in 2020, Other than exciting prizes there are Internship opportunities and chances of getting Pre Placement offers through these contests for the students.</p><p> </p><p><strong>Registration Link :</strong></p><p><br></p><ul><li><strong>Codevita:&nbsp;</strong><a href=\"https://on.tcs.com/2J0wp9A\" target=\"_blank\" style=\"color: blue;\"><strong>https://on.tcs.com/2J0wp9A</strong></a></li><li><strong>Registration Start Date: 8 March 2019</strong></li><li><strong>Registration End Date: 14 July 2019</strong></li><li><strong>Enquode:&nbsp;</strong><a href=\"https://on.tcs.com/2Yb3K5f\" target=\"_blank\" style=\"color: blue;\"><strong>https://on.tcs.com/2Yb3K5f</strong></a></li><li><strong>Registration Start Date: 21 March 2019</strong></li><li><strong>Registration End Date: 30 June 2019</strong></li><li><a href=\"http://csitgeu.in/wp/wp-content/uploads/2019/04/Steps-of-registration-on-Campus-Portal.pdf\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">Steps of registration on Campus Portal</a></li><li><a href=\"http://csitgeu.in/wp/wp-content/uploads/2019/04/Steps-to-access-Campus-Commune-.pdf\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">Steps to access Campus Commune</a></li><li><a href=\"http://csitgeu.in/wp/wp-content/uploads/2019/04/EIA-Infographic-Poster.pdf\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">EIA Infographic Poster</a></li></ul><p><br></p><p><br></p><p><a href=\"http://csitgeu.in/wp/wp-content/uploads/2019/04/CC-Blog-image-Enquode-2019.jpg\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\"><img src=\"http://csitgeu.in/wp/wp-content/uploads/2019/04/CC-Blog-image-Enquode-2019-300x185.jpg\" height=\"185\" width=\"300\"></a></p><p><br></p><p><br></p><p><a href=\"http://csitgeu.in/wp/wp-content/uploads/2019/04/Enquode-TPO-Mailer.jpg\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\"><img src=\"http://csitgeu.in/wp/wp-content/uploads/2019/04/Enquode-TPO-Mailer-225x300.jpg\" height=\"300\" width=\"225\"></a></p>', '2022-07-03 02:43:52', '2022-07-03 02:43:52'),
(11, '12 WEEKS INTERNSHIP ON “ARTIFICIAL INTELLIGENCE &amp; INTERNET OF THINGS: INNOVATION AND APPLICATIONS”', '<h2>12 Weeks Internship on “Artificial Intelligence &amp; Internet of Things: Innovation and Applications”</h2><p><br></p><p>GEU IEEE Student Branch, GEU ACM Student Chapter, GEU IEI Student Chapter, Department of Computer Science and Engineering &amp; Institution’s Innovation Council, Ministry of Education is offering 12 weeks internship on&nbsp;“Artificial Intelligence &amp; Internet of Things: Innovation and Applications” for Btech 2nd&nbsp;and 3rd&nbsp;Year CSE all specialization.</p><p><br></p><p><strong>Internship Duration</strong></p><p><strong>Btech(CSE all specialization)&nbsp;2nd&nbsp;Year – 15 July to 15th&nbsp;October 2022</strong></p><p><strong>Btech(CSE all specialization)&nbsp;3rd&nbsp;Year – 1st&nbsp;July to 30th&nbsp;September</strong></p><p><br></p><h3>Interested students can select the project topic from the link:<a href=\"https://docs.google.com/spreadsheets/d/1WeOjSH2RfTH6rSZhIUHfek1zmblOE_-D/edit?usp=sharing&amp;ouid=117671466224472858006&amp;rtpof=true&amp;sd=true\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">https://docs.google.com/spreadsheets/d/1WeOjSH2RfTH6rSZhIUHfek1zmblOE_-D/edit?usp=sharing&amp;ouid=117671466224472858006&amp;rtpof=true&amp;sd=true</a></h3><h3><br></h3><h3>Registration link:&nbsp;<a href=\"https://forms.gle/t1NGxWtv6UVhj4SS6\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">https://forms.gle/t1NGxWtv6UVhj4SS6</a></h3><p><br></p><p>Last date of registration for</p><ul><li><strong>Btech 2nd&nbsp;Year – 4:00 PM, 30 June</strong></li><li><strong>Btech 3rd&nbsp;Year – 4:00 PM, 5 July</strong></li></ul><p>No applications will be entertained after the deadline.</p>', '2022-07-03 02:45:16', '2022-07-03 04:16:08'),
(12, 'COMPULSORY INTERNSHIP FOR STUDENTS AFTER 6TH SEMESTER', '<p>All upcoming 7th&nbsp;Semester students are hereby informed that as per their scheme of study they have to mandatorily complete a 42-days or 6weeks internship after completion of their End Term Exams of 6thsemester. After completion, they have to present their work in a detailed report and also undergo a viva which carries a 100 marks component in their 7th&nbsp;semester scheme.</p><p>Some of the possible choices:</p><ol><li>Visit&nbsp;<a href=\"https://internship.aicte-india.org/\" target=\"_blank\" style=\"color: rgb(36, 137, 13);\">https://internship.aicte-india.org/</a></li><li>Popular Internship platform like Internshala, Letsintern, Internin, Interntheory etc</li><li>Internships offered by different Govt, Private Organizations, MNCs. Startups etc.</li><li>Projects under Academicians, Researchers of Institutes of Repute like IITs, NITs, DRDO etc</li><li>Projects under Faculty members of GEU/GEHU (with prior permission)</li></ol><p>While selecting an internship you may discuss with your class coordinator/mentor regarding the suitability.</p><p>Students who are already undergoing long term internships (with prior permission) in an organization can continue with the same.</p>', '2022-07-03 02:45:54', '2022-07-03 02:45:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` varchar(45) NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` varchar(150) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `pin` varchar(45) NOT NULL,
  `role` int(11) NOT NULL,
  `xth` int(11) NOT NULL DEFAULT 0,
  `xii` int(11) NOT NULL DEFAULT 0,
  `curr` int(11) NOT NULL DEFAULT 0,
  `resume` varchar(1000) NOT NULL DEFAULT 'NA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `password`, `gender`, `dob`, `email`, `phone`, `address`, `city`, `state`, `pin`, `role`, `xth`, `xii`, `curr`, `resume`) VALUES
(1, 'Admin', 'User', '$2b$10$wcgjJphHbf/wCY8ZN6ege.rTd.a5vJh8DaANGKFTQrgmsPckSTvKW', 'Male', '2001-04-16', 'admin@cvengine.com', '+918126967071', 'GEU, Clement Town, Bell Road', 'Dehradun', 'Uttrakhand', '2480002', 3, 0, 0, 0, 'NA'),
(2, 'Shekhar', 'Saxena', '$2b$10$wcgjJphHbf/wCY8ZN6ege.rTd.a5vJh8DaANGKFTQrgmsPckSTvKW', 'Male', '2002-02-16', 'shekharsaxena316@gmail.com', '+919412446081', '528, Chahbai, Near Sankat Mochan Mandir', 'Bareilly', 'Uttar Pradesh', '243001', 0, 88, 91, 97, 'https://tinyurl.com/shekhar316Resume');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jobid-unique` (`jobID`),
  ADD KEY `bookid_idx` (`jobID`),
  ADD KEY `userid_idx` (`userid`);

--
-- Indexes for table `archives`
--
ALTER TABLE `archives`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`jobID`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `archives`
--
ALTER TABLE `archives`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `jobID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `bookid` FOREIGN KEY (`jobID`) REFERENCES `jobs` (`jobID`),
  ADD CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
