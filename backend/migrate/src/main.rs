use sqlx::Connection;

#[tokio::main]
async fn main() -> sqlx::Result<()> {
    let os = std::env::consts::OS;

    let env_path;

    match os {
        "windows" => {
            env_path = String::from("..\\.env");
        }
        _ => {
            env_path = String::from("../.env");
        }
    }
    dotenv::from_path(env_path).ok();
    // load .env file
    let url = match std::env::var("DATABASE_URL") {
        Ok(val) => val,
        Err(_) => panic!("can't read enviroment valriable"),
    };
    let url = url.as_str();

    // connect to database
    let mut pool = sqlx::mysql::MySqlConnection::connect(url).await?;

    // sqlx::migrate!("..\\migrations").run(&mut pool).await?;
    sqlx::migrate!("../migrations").run(&mut pool).await?;

    Ok(())
}
