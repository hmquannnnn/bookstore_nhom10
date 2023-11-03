1. migrate database
<p>
  cargo install sqlx-cli<br>
  sqlx migrate run
</p>

2. chay code
<p>cargo run</p>


api:

update các field trong bảng
PATCH /{table}

{
    "id_field": {
        "key": "email",
        "value": "khuong@11"
    },
    "value_field" : {
        "key": "name",
        "value": "1124333243"
    }
}

xoa hang

DELETE /{table}
{
    "key": "name",
    "value": "1124333243"
}
