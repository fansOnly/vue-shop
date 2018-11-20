// const carts = [];
// const coupons = [];

function calcSum(carts = []) {
    return carts.filter(item => item.checked).reduce((a, b) => a + b.price * b.goods_num, 0);
    // return carts.reduce((a, b) => a + b.price * b.quantity, 0);
}

function GetCommonIds(carts = [], coupons = []) {
    const result = [];
    const cartIds = [].concat(carts.map(item => item.category_id));
    // console.log("cartIds", cartIds);
    coupons.forEach(ele => {
            if (ele.isAll == 1) {
                result.push(ele);
            } else {
                const couponsIds = ele.categories.split(',').map(item => Number(item));
                // console.log("couponsIds", couponsIds);
                const commonIds = couponsIds.filter(item => cartIds.includes(item));
                // console.log("commonIds", commonIds);
                const cartsChecked = carts.filter(item => commonIds.includes(item.category_id));
                // console.log("cartsChecked", cartsChecked);
                const sum = calcSum(cartsChecked);
                if (commonIds.length && ele.man < sum) {
                    result.push(ele);
                }
            }
        })
        // console.log(result);
    return result;
}

function GetPrice(good = {}) {
    return Number(good.mprice) > 0 ? Number(good.mprice) : Number(good.price);
}

function filterCoupon(carts = [], coupons = []) {
    // 筛选满足满减条件的
    const condition1 = coupons.filter(item => item.man < calcSum(carts));
    // console.log("condition1", condition1);
    // 筛选满足分类的
    const condition3 = GetCommonIds(carts, coupons);
    // console.log("condition3", condition3);
    // 求交集
    const cp = condition1.filter(item => condition3.includes(item));
    // console.log("cp", cp);
    // 筛选优惠最大的
    const best = cp.sort((a, b) => b.jian - a.jian)[0];
    // console.log("best", best);
    return best ? best : {};
}

export default function GetBestCoupon(carts = [], coupons = []) {
    return filterCoupon(carts, coupons);
}