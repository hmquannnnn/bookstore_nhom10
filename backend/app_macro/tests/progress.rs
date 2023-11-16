use app_macro::make_update;

#[test]
fn tests() {
    let a = make_update!();   
    assert_eq!(5, a);
}
