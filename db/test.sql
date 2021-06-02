DELETE from pins
where id in
(
select id
from pins
where
map_id='2'
and user_id='2'
and lat='-67.067433351083'
and lng='27.0701424713848'
);
