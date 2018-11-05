import request from '@/libs/request';

export default {
    GetUserCart(param, cb, errorCb){
        request.get('Cart/GetUserCart', {user_id: param.user_id})
        .then((res)=>{
            cb(res);
        })
        .catch((err)=>{
            errorCb(err);
        })
    },
    OperateUserCart(param, cb, errorCb){
        request.post('Cart/OperateUserCart', {user_id: param.user_id, id:param.id, isAll: param.isAll})
        .then((res)=>{
            cb(res);
        })
        .catch((err)=>{
            errorCb(err);
        })
    },
    EditCartNum(param, cb, errorCb){
        request.post('Cart/EditUserCartNum', {user_id: param.user_id, cartid:param.id, type: 'edit'})
        .then((res)=>{
            cb(res);
        })
        .catch((err)=>{
            errorCb(err);
        })
    },
    IncrementNum(param, cb, errorCb){
        request.post('Cart/EditUserCartNum', {user_id: param.user_id, cartid:param.id, type: 'plus'})
        .then((res)=>{
            cb(res);
        })
        .catch((err)=>{
            errorCb(err);
        })
    },
    DecrementNum(param, cb, errorCb){
        request.post('Cart/EditUserCartNum', {user_id: param.user_id, cartid:param.id, type: 'minus'})
        .then((res)=>{
            cb(res);
        })
        .catch((err)=>{
            errorCb(err);
        })
    }
}