use std::num::ParseIntError;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct GenresRaw(pub String);

impl TryInto<Vec<i32>> for GenresRaw {
    type Error = ParseIntError;
    fn try_into(self) -> Result<Vec<i32>, Self::Error> {
        let genres_raw = self.0.split(',');
        let mut genres = Vec::new();

        // let genres: Vec<Result<i32, Self::Error>> = genres_raw.map(|e| {
        //     e.parse::<i32>()
        // }).collect();

        for ele in genres_raw {
            let genre = ele.parse::<i32>()?;
            genres.push(genre)
        }
        Ok(genres) 
    }
}

impl From<GenresRaw> for String {
    fn from(value: GenresRaw) -> Self {
        value.0
    }
}


impl From<String> for GenresRaw {
    fn from(value: String) -> Self {
        GenresRaw(value)
    }
}

// impl From<std::option::Option<String>> for std::option::Option<GenresRaw> {
//     fn from(value: Option<String>) -> Self {
//         Some(GenresRaw(value?))
//     }
// }

// impl<T, K> From<Option<T>> for Option<K>
// where T: From<K> {
//     fn from(value: Option<T>) -> Self {
//         Some(K::from(value?)) 
//     }
// }
