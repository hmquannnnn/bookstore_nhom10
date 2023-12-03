use sqlx::{QueryBuilder, MySql};

pub fn book_genres<'a>() -> QueryBuilder<'a, MySql> {
    QueryBuilder::new(
    "select book_id id, concat('[',group_concat(genre_id),']') genres 
    from book_genre
    group by id")
}


pub fn book_genres_filter<'a>(genre_ids: &Vec<i32>) -> QueryBuilder<'a, MySql> {
    let mut sql_builder: QueryBuilder<MySql> = 
        QueryBuilder::new("select book_id id, count(*) num from book_genre where genre_id in ("); 
    let mut separated = sql_builder.separated(',');
    for genre_id in genre_ids {
        separated.push(genre_id);
    }

    separated.push_unseparated(") ");

    sql_builder.push("group by id having num >= ");
    sql_builder.push(genre_ids.len());

    sql_builder
}


pub fn book_genres_filter_full<'a>(genre_ids: &Vec<i32>) -> QueryBuilder<'a, MySql> {
    let mut main_builder: QueryBuilder<'a, MySql> = 
        QueryBuilder::new("select id, genres from (");

    let filter_query = book_genres_filter(&genre_ids);
    let genre_query = book_genres();

    main_builder.push(filter_query.sql());
    main_builder.push(") book_valid natural join (");
    main_builder.push(genre_query.sql());
    main_builder.push(") book_genre");
    main_builder
}

pub fn book_author<'a>() -> QueryBuilder<'a, MySql> {
    QueryBuilder::new("select book.*, author.name author_name from book left join author on author.id = author_id")
}

// pub enum QueryJoinType {
//     Right,
//     Left,
//     Natural
// }
//
// impl Into<String> for QueryJoinType {
//     fn into(self) -> String {
//         match self {
//            Self::Right => "right".to_string(),
//            Self::Left=> "left".to_string(),
//            Self::Natural=> "natural".to_string(),
//         }
//     }
// }
//
//
// pub fn join_query<'a, DB>(query1: QueryBuilder<'a, DB>, query2: QueryBuilder<'a, DB>, join_type: QueryJoinType) -> QueryBuilder<'a, DB> {
//     match join_type {
//        QueryJoinType::Left | QueryJoinType::Right => {
//
//        },
//        QueryJoinType::Natural => {
//        }
//     }  
// }
