drop database if exists faceter;

create database if not exists faceter character set='utf8';

use faceter;

set default_storage_engine=innodb;

create table if not exists User (
    userId int auto_increment not null,
    userName varchar(32) not null,
    userMail varchar(256) not null,
    userPassword varchar(32) not null,

    primary key(userId)
);

create table if not exists Post (
    postId int auto_increment not null,
    postAuthor int not null,
    postType enum('text', 'image', 'link') not null,
    postContent varchar(256) not null,
    postDate date not null,

    primary key(postId)
);

create table if not exists Tag (
    postId int not null,
    tagText varchar(32) not null
);

create table if not exists Reaction (
    postId int not null,
    userId int not null,
    reactionType varchar(256) not null,

    primary key(postId, userId)
);


create table if not exists Follow (
    followerId int not null,
    followedId int not null,

    primary key(followerId, followedId)
);

alter table Post add constraint fkPostAuthor foreign key (postAuthor) references User(userId);
alter table Tag add constraint fkTagPost foreign key (postId) references Post(postId);
alter table Reaction add constraint fkReactionUtilisateur foreign key (userId) references User(userId);
alter table Reaction add constraint fkReactionPost foreign key (postId) references Post(postId);
alter table Follow add constraint fkFollowFollower foreign key (followerId) references User(userId);
alter table Follow add constraint fkFollowFollowed foreign key (followedId) references User(userId);