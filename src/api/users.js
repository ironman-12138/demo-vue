import {request1} from '@/network/request'
import {request2} from '@/network/request'

/**
 * 导出excel
 */
export const excel = (id) => {
    return request1({
        url: "/screenAdmin/excelHistory/downloadExcel",
        method: "get",
        responseType: 'blob',
        header: {
            headers: { 
                        'Content-Type': 'application/x-download' ,
                        'Accept-Encoding': 'gzip, deflate,br'
                    },  
        },
        params: {"id": id}
    })
}

/**
 *      
 */
 export const typeList = (data) => {
    return request1({
        url: "/screenAdmin/project/list",
        method: "get",
        params: data
    })
}

/**
 * 测试
 */
 export const text = (url, data) => {
    return request1({
        url: url,
        method: "post",
        data: data
    })
}

/**
 * 登录
 */
 export const login = (url, data) => {
    return request1({
        url: url,
        method: "post",
        data: data
    })
}

/**
 * 获取用户信息
 */
 export const userInfo = (data) => {
    return request1({
        url: "/front/userInfo",
        method: "get",
        data: data
    })
}

/**
 * 忽略Token验证测试
 */
 export const notToken = (data) => {
    return request1({
        url: "/front/notToken",
        method: "get",
        data: data
    })
}

/**
 * 导出excel
 */
 export const postExcel = (data) => {
    return request1({
        url: "/screenAdmin/excelHistory/downloadExcel",
        method: "post",
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}

/**
 * 获取系统信息
 */
 export const getServer = () => {
    return request1({
        url: "/test/serverData",
        method: "post"
    })
}


/**
 * 获取系统信息
 */
 export const getResourceList = () => {
    return request1({
        url: "/screenAdmin/resource/list",
        method: "post",
        headers: {"Content-Type":"application/json"},
        data: {"name":"","pageNum":1,"pageSize":10,"type":""}
    })
}

/**
 * 生命周期档案导出
 */
 export const exportList = (data) => {
    return request2({
        url: "/quzhouCity/projectLife/exportList",
        method: "post",
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    })
}

/**
 * 导出excel
 */
export const excelTwo = (data) => {
    return request1({
        url: "/qscrm/customer/export",
        method: "post",
        responseType: 'blob',
        data: data
    })
}