https://www.youtube.com/watch?v=KcTqDEy0BA4&list=PLaIfT4YsrqUkqsRRnA4-yEd9B4h5Pj5m9&index=1&t=186s
1.00.15 minute

DROP TABLE xio_testcase;

CREATE TABLE xio_testcase (
ID SERIAL PRIMARY KEY,
suite VARCHAR(200) NOT NULL,
testcasename VARCHAR(200) NOT NULL,
status VARCHAR(30) NOT NULL,
env VARCHAR(10),
failurereason VARCHAR(300),
duration VARCHAR(20),
timestamp timestamp not null default current_timestamp,
reportpath VARCHAR(300),
subscriptionkey integer
);

INSERT INTO xio_testcase
(suite,testcasename, status, env,failurereason,duration)
VALUES
('Chrome','UX_TestCase_Device','PASS','QE','Login failure','20');

select \* from xio_testcase;

DROP TABLE xio_defects;
CREATE TABLE xio_defects (
ID SERIAL PRIMARY KEY,
suite VARCHAR(200) NOT NULL,
testcase VARCHAR(200),
jirakey VARCHAR(30),
env VARCHAR(10),
timestamp timestamp not null default current_timestamp
);
select \* from xio_defects;
insert into xio_defects (suite,testcase,jirakey,env) VALUES ('Touch','ABC_Test','ABC','QE');

DROP TABLE xio_maintenance;
CREATE TABLE xio_maintenance (
ID SERIAL PRIMARY KEY,
suite VARCHAR(200) NOT NULL,
testcase VARCHAR(200),
env VARCHAR(10),
timestamp timestamp not null default current_timestamp
);
select \* from xio_maintenance;
insert into xio_maintenance (suite,testcase,env) VALUES ('Touch','ABC_Test','QE');
