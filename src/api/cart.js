import request from '@/libs/request';

export default {
    GetUserCart(param, cb){
        request.get('Cart/GetUserCart', {user_id: param.user_id})
        .then(res=>cb(res))
        .catch(err=>cb(err))
    },
    OperateUserCart(param, cb){
        request.post('Cart/OperateUserCart', {user_id: param.user_id, id:param.id, isAll: param.isAll})
        .then(res=>cb(res))
        .catch(err=>cb(err))
    },
    EditCartNum(param, cb){
        request.post('Cart/EditUserCartNum', {user_id: param.user_id, cartid:param.id, type: 'edit'})
        .then(res=>cb(res))
        .catch(err=>cb(err))
    },
    IncrementNum(param, cb){
        request.post('Cart/EditUserCartNum', {user_id: param.user_id, cartid:param.id, type: 'plus'})
        .then(res=>cb(res))
        .catch(err=>cb(err))
    },
    DecrementNum(param, cb){
        request.post('Cart/EditUserCartNum', {user_id: param.user_id, cartid:param.id, type: 'minus'})
        .then(res=>cb(res))
        .catch(err=>cb(err))
    }
}