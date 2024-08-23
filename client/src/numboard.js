export default function setNumboard () {
    // const letters = [...Array(26).keys()].map(each => String.fromCharCode(each + 97))
    // const lines = [
    //         ['q','w','e','r','t','y','u','i','o','p'],
    //         ['a','s','d','f','g','h','j','k','l'],
    //         ['z','x','c','v','b','n','m']
    //     ]
    // const symbols = [
    //         ['-','\\',':',';','(',')','£','&','@','"'],
    //         ['[',']','{','}','#','%','^','*','+','='],
    //         ['|','~','<','>','€','$','¥','•'],
    //         ['.',',','_','/','?','!','\'']
    //     ]
    const numbers = [0,1,2,3,4,5,6,7,8,9]
    // let shuffled_num
    // let num_not_ready = true

    function shuffle(array) {
        let remain = array.length
        let i
        while (remain > 0 ) {
          i = Math.floor(Math.random() * remain--);
          [array[i], array[remain]] = [array[remain], array[i]]
        }
        return array
      }
    // function quality_check(shuffled, refference) {
    //     const shuff_string = shuffled.join('')
    //     const result = refference.reduce((acc, line) => {
    //         for (let end = 2; end < line.length; end++) {
    //             const frame = line.slice(end-2, end+1)
    //             const reversed = frame.reverse()
    //             acc = acc || shuff_string.includes(frame.join('')) || shuff_string.includes(reversed.join(''))
    //         }
    //         return acc
    //     }, false)
    //     return result
    // }

    // while (num_not_ready) {
    //     shuffled_num = shuffle(numbers)
    //     num_not_ready = quality_check(shuffled_num, [numbers])
    // }
    // while (kb_not_ready) {
    //     shuffled_kb = shuffle(letters)
    //     kb_not_ready = quality_check(shuffled_kb, lines)
    // }
    const shuffled_num = shuffle(numbers)
    const result = [shuffled_num.slice(0,3), shuffled_num.slice(3,6), shuffled_num.slice(6,9), shuffled_num.slice(9)]  
    return result
}