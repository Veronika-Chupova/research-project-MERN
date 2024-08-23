export default function getSize (resolution, sides, gap) {
    const letter_size =(resolution - sides*2 - gap*9)/10

    return letter_size
} 