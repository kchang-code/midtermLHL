-- Users table seeds here (Example)
INSERT INTO users (name,password,email)
VALUES
('Alice','AlicePassword','123@123'),
('Bob','KiraPassword','abc@abc');

INSERT INTO maps (name,description)
VALUES
('Vancouver','rainy'),
('Edmonton','sunny');

INSERT INTO favourite_maps (user_id,map_id)
VALUES
(1,2),
(2,1);
INSERT INTO
pins (title,
description,
image,
map_id,
user_id,
lat,
lng)
VALUES
('position1','I dont know where it is 1','💩',2,1,49.2609, -123.1140),
('position2','I dont know where it is 2','💩',2,1,56, -50),
('position3','I dont know where it is 3','💩',1,2,49.260727, -123.126545);
<<<<<<< HEAD
=======

>>>>>>> 2f6ca30ce2e24115d38f414d18768174d8596629
