BEGIN TRANSACTION;

INSERT INTO photo(id,albumId,title,url,thumbnailUrl) VALUES(1,1,'accusamus beatae ad facilis cum similique qui sunt','https://via.placeholder.com/600/92c952','https://via.placeholder.com/150/92c952');

INSERT INTO photo(id,albumId,title,url,thumbnailUrl) VALUES(2,1,'reprehenderit est deserunt velit ipsam','https://via.placeholder.com/600/771796','https://via.placeholder.com/150/771796');

COMMIT;