select distinct maps.name
from maps
join pins on maps.id=pins.map_id
join users on users.id=pins.user_id
where pins.user_id=1;
