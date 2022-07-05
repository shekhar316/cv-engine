# CV-Engine

The CV-Engine is an online job recruitment portal for colleges that serves as a one-stop destination for all things related to placement management. The CV-Engine comprises a job posting and job application tracking system, advanced notification system for jobs, certificates request management system, student management system and an online archival library for notes. Administering all of this manually will be a challenging task. As a result, The CV-Engine simplifies administration by utilizing the most recent technological advancements. In addition, an it provides convenient access to job notifications at any time and from any location.

----

* Project Report: https://drive.google.com/file/d/1LRTWqghnWzresHfnYaRrrC1lGNUrX5KA/view?usp=sharing
* Live Azure Deployment Address: http://20.196.213.24:8000/
----


### Steps to run the project:

* Clone the repository.
* Create a SQL database named cv-engine in your preferred DBMS software.
* Import the `cv-engine.sql` file in the database you have created.
* Update the `.env` file with your credentials.
* For Testing Server: `npm test`
* For Development Server: `npm start` or `node index.js`
* For Production Server: `npm i pm2 -g`, then run `pm2 start index.js`.

