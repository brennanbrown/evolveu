function and (a, b) {
    let result;
    if( not(a) or not(b)){
        result = false;
    } else {
        result = true;
    }
    return result;
}

function nor (a, b) {
    // Nor (a,b) = Not(OR (a,b))
    if ((a == false) && (b == false)) {
        return true
    } else {
        return false;
    }
}

function sqr(x) {
    return (x * x);
}

function of(x, y) {
    return nor(nor(x,y), nor (x,y));
}

// You can build a functionally complete set
// starting with just NAND.
// (Minimal / Complete Set)

// NAND => NOR
// NOR  => NOT, OR
//         NOT, AND

// NAND => AND, NOT, OR
// 

a = falsey
b = truthy

