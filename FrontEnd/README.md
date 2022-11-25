https://www.youtube.com/watch?v=KcTqDEy0BA4&list=PLaIfT4YsrqUkqsRRnA4-yEd9B4h5Pj5m9&index=1&t=186s
1.00.15 minute

DROP TABLE testcase;

CREATE TABLE testcase (
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

INSERT INTO testcase
(suite,testcasename, status, env,failurereason,duration,reportpath,subscriptionkey)
VALUES
('Chrome','UX_TestCase_Device','PASS','QE','Login failure','20',':/txt',123456);

select \* from testcase;

DROP TABLE defects;
CREATE TABLE defects (
ID SERIAL PRIMARY KEY,
suite VARCHAR(200) NOT NULL,
testcasename VARCHAR(200),
jirakey VARCHAR(30),
env VARCHAR(30),
failurereason VARCHAR(300),
timestamp timestamp not null default current_timestamp
);
select \* from defects;
insert into defects (suite,testcasename,jirakey,env) VALUES ('Touch','ABC_Test','ABC','QE');

DROP TABLE maintenance;
CREATE TABLE maintenance (
ID SERIAL PRIMARY KEY,
suite VARCHAR(200) NOT NULL,
testcasename VARCHAR(200),
env VARCHAR(10),
failurereason VARCHAR(300),
timestamp timestamp not null default current_timestamp
);
select \* from maintenance;
insert into maintenance (suite,testcasename,env) VALUES ('Touch','ABC_Test','QE');

https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
