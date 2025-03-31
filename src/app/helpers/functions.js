import {css_colors} from './colors'

const hex_letters = ["a", "b", "c", "d", "e", "f"]


function is_color(colors){
    let temp_arr = []
    for(let i=0; i<colors.length; i++){
        if(css_colors.includes(colors[i])){
            temp_arr.push(colors[i])
            continue
        }
        if(colors[i] && colors[i][0] === "#" && (colors[i].length > 3 && colors[i].length < 8)){
            for(let j=1; j<colors[i].length; j++){
                if(isNaN(colors[i][j])){
                    if(!hex_letters.includes(colors[i][j].toLowerCase())){
                        temp_arr.push("gray")
                        continue
                    }
                }
                else{
                    if(colors[i][j] > 9){
                        temp_arr.push("gray")
                        continue
                    }
                }
            }
            temp_arr.push(colors[i])
            continue
        }
        temp_arr.push("gray")
    }
    return temp_arr
}


async function parse_file(file, start, end){
    let words = []
    for(let i=0; i<file.length; i++){
        if(file[i] === start){
            let word = ""
            for(let j=i+1; j<file.length; j++){
                if(file[j] === end){
                    word.replaceAll(" ", "")
                    words.push(word)
                    i = j
                    break
                }
                word = word + file[j]
            }
        }
    }
    return words
}


async function read_file(){
    var retrieved = null

    const response = await fetch('styles/file_scan');
    const retrieve = await response.json().then((data) => retrieved = data)

    const promise = new Promise((resolve, reject) => {
        resolve(parse_file(retrieved, ".", "{"))
    }).then(result => {
        return result
    })  
}


export const global_functions = {"is_color": is_color, "parse_file": parse_file, "read_file": read_file}