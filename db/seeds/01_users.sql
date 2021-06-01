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


INSERT INTO pins (title, description, map_id, user_id, latitude, longitude)
VALUES ('Sad Kitty', 'Come see a sad kitty', 1, 2, 53.61, 115.8);

-- curl -X POST -d 'title=SadKittydddddddddddddd' -d 'description=aaaaa' -d 'map_id=1' -d 'user_id=2' -d 'latitude=10' -d 'longitude=5' localhost:8080/pins
-- psql -U labber -d midterm
-- npm run db:reset


-- curl -X POST -d 'title=Edmonton' localhost:8080/maps/delete
