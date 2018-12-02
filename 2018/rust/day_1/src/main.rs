extern crate regex;
use std::io::Read;
use std::fs::File;

use regex::Regex;
fn main() {
    let filename = "../../day_1_input.txt";
    let mut f = File::open(filename).expect("file not found");

    let mut contents = String::new();
    f.read_to_string(&mut contents)
        .expect("something went wrong reading the file");
    let input: Vec<i64> = convert_text(contents);


    // let input: Vec<i64> = [ 1, 2, 3 ].to_vec();
    let total = sum(&input.clone());
    let second_instance = find_second_instance(&input);

    println!("Anser To Part 1: {}", total);
    println!("Answer to Part 2: {}", second_instance);
}


fn sum(values: &Vec<i64>) -> i64 {
    let mut total: i64 = 0;
    for i in values {
        total += i;
    }
    total
}


fn find_second_instance(values: &Vec<i64>) -> i64 {
    let mut total: i64 = 0;
    let mut step_totals: Vec<i64> = [total].to_vec();
    loop {
        for i in values {
            total += i;
            if (&step_totals).into_iter().any(|v| v == &total) {
                println!("Got It!: {}", total);
                return total;
            } else {
                if step_totals.len() > 146478 {
                    println!("Something is Fuckey here");
                    return -1;
                }
                step_totals.push(total);
            }
        }
    }
}

fn convert_text(text: String) -> Vec<i64> {
    let re = Regex::new(r"\+").unwrap();
    let result = re.replace_all(&text, "");
    let new_result = result.split("\n");
    new_result.filter(|x| x != &"").map(|x| x.parse::<i64>().unwrap()).collect()
}
